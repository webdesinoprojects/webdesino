# Design Document: Location Auto-Generation and Hero Fix

## Overview

This design document outlines the implementation of two features for the WebDesino Next.js 14 application:

1. **Location Auto-Generation with Service Focus**: A template-based content generation system that enables admins to create location-specific landing pages with service-focused content variations
2. **Hero Section Text Overflow Fix**: A CSS adjustment to prevent text cutoff in the homepage hero section's rotating text display

The location auto-generation feature introduces a new `serviceFocus` field to the database schema, a template generation system with six service-specific templates, and an enhanced admin UI with a dropdown selector and auto-generate button. The hero fix addresses a visual issue where rotating text is cut off on certain screen sizes.

## Architecture

### System Components

The implementation spans multiple layers of the application:

**Database Layer (Prisma + PostgreSQL)**
- Extended `LocationPage` model with optional `serviceFocus` field
- Backward-compatible schema supporting existing location pages without migration

**Business Logic Layer**
- New `lib/location-templates.ts` module containing template generation logic
- Six distinct content templates mapped to service focus options
- Slug generation with location name normalization (lowercase, hyphenated)

**Server Actions Layer**
- Updated `createLocation` and `updateLocation` actions in `lib/actions.ts`
- Handling of `serviceFocus` field in form data processing
- JSON content serialization/deserialization

**Presentation Layer**
- Enhanced `LocationForm` component with service focus dropdown
- Auto-generate button with sparkle icon triggering template generation
- Updated `Hero.tsx` component with responsive text sizing

### Data Flow

**Content Generation Flow:**
1. Admin selects location name and service focus in LocationForm
2. Admin clicks "Auto-Generate Content" button
3. Client-side handler calls `generateLocationContent(locationName, serviceFocus)`
4. Template system returns structured content object
5. React state updates populate all form fields
6. Admin can manually edit any generated field
7. Form submission sends data to server action
8. Server action persists to database via Prisma

**Content Retrieval Flow:**
1. Admin navigates to edit existing location page
2. Server loads location data from database
3. LocationForm receives location prop with content and serviceFocus
4. Form initializes with saved values
5. Dropdown displays saved serviceFocus (defaults to "all-services" if null)

## Components and Interfaces

### Database Schema Changes

**LocationPage Model Extension:**
```prisma
model LocationPage {
  id          String   @id @default(cuid())
  slug        String   @unique
  location    String
  title       String
  description String?
  content     Json?
  serviceFocus String? @default("all-services")  // NEW FIELD
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

The `serviceFocus` field is optional (nullable) to support existing location pages without requiring data migration. The default value "all-services" applies to new records.

### Template Generation Module

**File:** `lib/location-templates.ts`

**Function Signature:**
```typescript
export function generateLocationContent(
  locationName: string,
  serviceFocus: string
): LocationContent
```

**LocationContent Interface:**
```typescript
interface LocationContent {
  slug: string;
  title: string;
  description: string;
  hero: {
    subtitle: string;
    ctaText: string;
    ctaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
    image: string;
  };
  story: {
    title: string;
    content: string[];
    image: string;
  };
  leadingCompany: {
    title: string;
    content: string;
  };
  services: Array<{
    title: string;
    items: string[];
    image: string;
  }>;
}
```

**Service Focus Options:**
- `"web-development"` → "best-web-development-company-in-{location}"
- `"digital-marketing"` → "digital-marketing-agency-in-{location}"
- `"seo-services"` → "seo-services-in-{location}"
- `"graphic-designing"` → "graphic-design-services-in-{location}"
- `"content-writing"` → "content-writing-services-in-{location}"
- `"all-services"` → "best-web-development-company-in-{location}" (default)

**Slug Generation Logic:**
```typescript
function generateSlug(locationName: string, serviceFocus: string): string {
  const normalizedLocation = locationName.toLowerCase().replace(/\s+/g, '-');
  const slugPattern = getSlugPattern(serviceFocus);
  return slugPattern.replace('{location}', normalizedLocation);
}
```

### LocationForm Component Updates

**New UI Elements:**

1. **Service Focus Dropdown**
   - Position: Between location name field and slug field
   - Options: Web Development, Digital Marketing, SEO Services, Graphic Designing, Content Writing, All Services
   - Default: "All Services"
   - Controlled component with React state

2. **Auto-Generate Content Button**
   - Icon: Sparkles from lucide-react
   - Position: Below service focus dropdown
   - Click handler: Reads location name and service focus, calls template generator, updates all form fields

**State Management:**
```typescript
const [serviceFocus, setServiceFocus] = useState<string>(
  location?.serviceFocus || "all-services"
);

const handleAutoGenerate = () => {
  const locationName = locationInputRef.current?.value || "";
  if (!locationName.trim()) {
    alert("Please enter a location name first");
    return;
  }
  
  const generated = generateLocationContent(locationName, serviceFocus);
  
  // Update all form fields
  setSlug(generated.slug);
  setTitle(generated.title);
  setDescription(generated.description);
  setContent(generated); // Updates hero, story, leadingCompany, services
};
```

### Server Actions Updates

**createLocation Action:**
```typescript
export async function createLocation(formData: FormData) {
  const location = formData.get("location") as string;
  const slug = formData.get("slug") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const serviceFocus = formData.get("serviceFocus") as string; // NEW
  const contentRaw = formData.get("content") as string;
  
  let content = {};
  try {
    content = contentRaw ? JSON.parse(contentRaw) : {};
  } catch (e) {
    console.error("Error parsing content JSON", e);
  }

  await prisma.locationPage.create({
    data: {
      location,
      slug,
      title,
      description,
      content,
      serviceFocus, // NEW
    },
  });

  revalidatePath("/admin/locations");
  revalidatePath("/", "layout");
  await logEmployeeAction("locations", `Created location page: "${title}"`);
  redirect(safeReturnPath(formData, "/admin/locations"));
}
```

**updateLocation Action:**
Similar changes to include `serviceFocus` in the update data.

### Hero Component Fix

**File:** `components/Hero.tsx`

**Current Issue:**
The rotating text span uses `min-w-[24ch]` which causes text cutoff on smaller screens and doesn't scale properly across breakpoints.

**Solution:**
Replace fixed min-width with responsive text sizing that's one size smaller than the main heading:

```typescript
// BEFORE (problematic):
<span className="inline-block min-w-[24ch]">{text}</span>

// AFTER (fixed):
<span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">{text}</span>
```

The main heading uses `text-4xl sm:text-5xl md:text-6xl lg:text-7xl`, so the rotating text will be consistently one size smaller at all breakpoints.

## Data Models

### LocationPage Model

**Fields:**
- `id`: String (CUID) - Primary key
- `slug`: String (unique) - URL-friendly identifier
- `location`: String - Human-readable location name
- `title`: String - Page title (H1)
- `description`: String? - Meta description for SEO
- `content`: Json? - Structured content object
- `serviceFocus`: String? - Service category selection (NEW)
- `createdAt`: DateTime - Creation timestamp
- `updatedAt`: DateTime - Last update timestamp

**Content JSON Structure:**
```json
{
  "hero": {
    "subtitle": "string",
    "ctaText": "string",
    "ctaLink": "string",
    "secondaryCtaText": "string",
    "secondaryCtaLink": "string",
    "image": "string"
  },
  "story": {
    "title": "string",
    "content": ["string", "string", "string"],
    "image": "string"
  },
  "leadingCompany": {
    "title": "string",
    "content": "string"
  },
  "services": [
    {
      "title": "string",
      "items": ["string", "string"],
      "image": "string"
    }
  ]
}
```

### Service Focus Mapping

**Internal Value → Display Name:**
- `"web-development"` → "Web Development"
- `"digital-marketing"` → "Digital Marketing"
- `"seo-services"` → "SEO Services"
- `"graphic-designing"` → "Graphic Designing"
- `"content-writing"` → "Content Writing"
- `"all-services"` → "All Services"

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Complete Content Generation

*For any* valid location name and service focus combination, the `generateLocationContent` function should return a content object containing all required sections: hero, story, leadingCompany, and services.

**Validates: Requirements 3.3**

### Property 2: Service Focus Differentiation

*For any* location name, when `generateLocationContent` is called with different service focus values, the generated slugs and titles should be different (except for "all-services" and "web-development" which share the same pattern).

**Validates: Requirements 3.4**

### Property 3: Slug Normalization

*For any* location name containing uppercase letters or spaces, the generated slug should be entirely lowercase with spaces replaced by hyphens.

**Validates: Requirements 3.12**

### Property 4: Form Field Population

*For any* generated content object, when the auto-generate button is clicked, all form fields (slug, title, description, hero, story, leadingCompany, services) should be populated with non-empty values.

**Validates: Requirements 4.6, 4.7, 4.8, 4.9**

### Property 5: Manual Edit Persistence

*For any* manually edited field values in the form, when the form is submitted, the saved location page should contain the manually edited values, not the originally generated values.

**Validates: Requirements 5.6**

### Property 6: Service Focus Persistence on Create

*For any* service focus value selected in the form, when a new location page is created, the saved database record should contain that exact service focus value.

**Validates: Requirements 6.1**

### Property 7: Service Focus Persistence on Update

*For any* service focus value selected in the form, when an existing location page is updated, the saved database record should contain the updated service focus value.

**Validates: Requirements 6.2**

### Property 8: Service Focus Round-Trip

*For any* service focus value saved to a location page, when that location page is loaded for editing, the form should display the same service focus value in the dropdown.

**Validates: Requirements 6.4**

### Property 9: Title Pattern Compliance

*For any* location name and service focus, the generated page title should follow the pattern "{Service} in {Location} | WebDesino".

**Validates: Requirements 8.1**

### Property 10: Meta Description Length

*For any* generated content, the meta description should be between 120 and 160 characters in length.

**Validates: Requirements 8.2**

### Property 11: Meta Description Content

*For any* generated content, the meta description should contain both the location name and a reference to the service focus.

**Validates: Requirements 8.3**

### Property 12: Hero Subtitle Content

*For any* generated content, the hero subtitle should mention both the location name and the service focus.

**Validates: Requirements 8.4**

### Property 13: Story Paragraph Count

*For any* generated content, the story section should contain at least two paragraphs.

**Validates: Requirements 8.5**

### Property 14: Services Count

*For any* generated content, the services section should contain at least three service items.

**Validates: Requirements 8.6**

### Property 15: SEO Keyword Inclusion

*For any* generated content, the location name should appear in the title, meta description, hero subtitle, and at least one service description.

**Validates: Requirements 8.8**

### Property 16: Form Validation

*For any* form submission attempt without a location name, slug, or title, the submission should fail validation.

**Validates: Requirements 10.3**

### Property 17: Slug Character Validation

*For any* slug value, it should only contain lowercase letters, numbers, and hyphens (no uppercase, spaces, or special characters).

**Validates: Requirements 10.4**

## Error Handling

### Template Generation Errors

**Empty Location Name:**
- Detection: Check if `locationName.trim()` is empty
- Handling: Display alert "Please enter a location name first"
- Recovery: User enters location name and retries

**Invalid Service Focus:**
- Detection: Service focus not in predefined list
- Handling: Fall back to "all-services" template
- Logging: Console warning about invalid service focus

### Form Submission Errors

**Missing Required Fields:**
- Detection: HTML5 `required` attribute on inputs
- Handling: Browser prevents submission, shows validation message
- User Action: Fill in required fields

**Duplicate Slug:**
- Detection: Prisma unique constraint violation
- Handling: Catch database error, display user-friendly message
- Recovery: User modifies slug and resubmits

**JSON Parsing Errors:**
- Detection: Try-catch around `JSON.parse(contentRaw)`
- Handling: Log error, use empty object as fallback
- Impact: Content sections will be empty but form submission succeeds

### Database Errors

**Connection Failures:**
- Detection: Prisma connection error
- Handling: Display generic error message to user
- Logging: Log full error details server-side
- Recovery: User retries after connection restored

**Migration Failures:**
- Detection: Prisma migrate command fails
- Handling: Rollback migration, investigate schema conflicts
- Recovery: Fix schema issues, re-run migration

## Testing Strategy

### Dual Testing Approach

This feature requires both unit tests and property-based tests for comprehensive coverage:

**Unit Tests** focus on:
- Specific examples of slug generation for each service focus
- UI component rendering (dropdown options, button presence)
- Edge cases (empty inputs, null values)
- Integration points (form submission, database operations)

**Property-Based Tests** focus on:
- Universal properties that hold for all inputs
- Content generation across all location/service combinations
- Data persistence round-trips
- Validation rules across input space

Together, unit tests catch concrete bugs in specific scenarios, while property tests verify general correctness across the entire input domain.

### Property-Based Testing Configuration

**Library:** fast-check (JavaScript/TypeScript property-based testing library)

**Configuration:**
- Minimum 100 iterations per property test
- Each test tagged with feature name and property reference
- Tag format: `// Feature: location-auto-generation-and-hero-fix, Property {number}: {property_text}`

**Example Property Test:**
```typescript
import fc from 'fast-check';

// Feature: location-auto-generation-and-hero-fix, Property 3: Slug Normalization
test('generated slugs are lowercase with hyphens', () => {
  fc.assert(
    fc.property(
      fc.string({ minLength: 1, maxLength: 50 }),
      fc.constantFrom('web-development', 'digital-marketing', 'seo-services', 
                      'graphic-designing', 'content-writing', 'all-services'),
      (locationName, serviceFocus) => {
        const content = generateLocationContent(locationName, serviceFocus);
        const slug = content.slug;
        
        // Slug should be lowercase
        expect(slug).toBe(slug.toLowerCase());
        
        // Slug should not contain spaces
        expect(slug).not.toMatch(/\s/);
        
        // Slug should only contain valid characters
        expect(slug).toMatch(/^[a-z0-9-]+$/);
      }
    ),
    { numRuns: 100 }
  );
});
```

### Unit Test Coverage

**Template Generation Tests:**
- Test each service focus generates correct slug pattern
- Test location name normalization (uppercase → lowercase, spaces → hyphens)
- Test content structure completeness
- Test title pattern matching
- Test meta description length constraints

**Component Tests:**
- Test LocationForm renders service focus dropdown
- Test dropdown contains all six options
- Test "All Services" is default selection
- Test auto-generate button exists and has sparkle icon
- Test button click triggers content generation
- Test form fields update after generation

**Integration Tests:**
- Test createLocation saves serviceFocus to database
- Test updateLocation updates serviceFocus in database
- Test loading existing location populates dropdown correctly
- Test null serviceFocus defaults to "all-services"
- Test form submission with generated content

**Hero Component Tests:**
- Test rotating text span has correct responsive classes
- Test rotating text span does not have min-width constraint
- Test component renders without errors

### Edge Cases and Error Conditions

**Edge Cases:**
- Empty location name triggers validation message
- Very long location names (>100 characters)
- Location names with special characters
- Null serviceFocus in existing records
- Empty content JSON

**Error Conditions:**
- Duplicate slug submission (database constraint)
- Invalid JSON in content field
- Network errors during form submission
- Database connection failures

### Test File Organization

```
__tests__/
  lib/
    location-templates.test.ts          # Unit + property tests
  components/
    admin/
      LocationForm.test.tsx             # Component tests
    Hero.test.tsx                       # Hero fix tests
  integration/
    location-crud.test.ts               # Server action tests
```

### Manual Testing Checklist

- [ ] Create new location with each service focus option
- [ ] Verify generated slugs match expected patterns
- [ ] Edit generated content manually and verify persistence
- [ ] Click auto-generate multiple times, verify overwrite
- [ ] Edit existing location without serviceFocus, verify default
- [ ] Test hero text on mobile, tablet, desktop viewports
- [ ] Verify no horizontal overflow on any screen size
- [ ] Test form validation with empty required fields
- [ ] Test duplicate slug error handling
