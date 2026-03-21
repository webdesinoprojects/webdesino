# Requirements Document

## Introduction

This document specifies requirements for two features in the WebDesino Next.js 14 fullstack project:

1. **Location Auto-Generation with Service Focus**: A template-based content generation system that allows admins to create location-specific landing pages with service-focused content variations
2. **Hero Section Text Overflow Fix**: A visual fix to prevent text cutoff in the homepage hero section's rotating text display

These features enhance the admin content management capabilities and improve the user experience on the homepage.

## Glossary

- **Admin**: A user with administrative privileges who can create and manage location pages through the admin panel
- **Location_Page**: A dynamically generated landing page targeting a specific geographic location (e.g., "Karol Bagh")
- **Service_Focus**: A categorical selection that determines which service-specific content template is used for location page generation (Web Development, Digital Marketing, SEO Services, Graphic Designing, Content Writing, or All Services)
- **Content_Template**: A predefined structure containing slug patterns, titles, descriptions, and page content specific to a service focus
- **Auto_Generation**: The process of populating location page fields using template-based patterns without external API calls
- **Hero_Section**: The primary above-the-fold section on the homepage containing the main headline and rotating text
- **Rotating_Text**: The animated typewriter text in the hero section that cycles through different service offerings
- **LocationPage_Model**: The Prisma database model representing location pages in the PostgreSQL database
- **LocationForm**: The React component used in the admin panel for creating and editing location pages
- **Prisma_Schema**: The database schema definition file that defines data models and relationships

## Requirements

### Requirement 1: Service Focus Field in Database

**User Story:** As a developer, I want the LocationPage model to include a serviceFocus field, so that the system can store and retrieve the selected service focus for each location page

#### Acceptance Criteria

1. THE Prisma_Schema SHALL include a serviceFocus field in the LocationPage model with type String
2. THE serviceFocus field SHALL have a default value of "all-services"
3. WHEN the schema is updated, THE Developer SHALL run a database migration to apply the changes
4. THE serviceFocus field SHALL be optional (nullable) to support existing location pages

### Requirement 2: Service Focus Selection Interface

**User Story:** As an admin, I want to select a service focus from a dropdown menu, so that I can specify which type of service the location page should emphasize

#### Acceptance Criteria

1. THE LocationForm SHALL display a service focus dropdown in the General Information section
2. THE dropdown SHALL include six options: "Web Development", "Digital Marketing", "SEO Services", "Graphic Designing", "Content Writing", and "All Services"
3. THE dropdown SHALL have "All Services" selected as the default option
4. WHEN editing an existing location page, THE dropdown SHALL display the currently saved service focus value
5. THE dropdown SHALL be positioned between the location name field and the slug field

### Requirement 3: Content Template System

**User Story:** As a developer, I want a template generation system with six service-specific templates, so that location pages can have content tailored to different service offerings

#### Acceptance Criteria

1. THE System SHALL create a new file at lib/location-templates.ts
2. THE location-templates.ts file SHALL export a function named generateLocationContent that accepts location name and service focus as parameters
3. THE generateLocationContent function SHALL return a content object containing hero, story, leadingCompany, and services sections
4. THE System SHALL implement six distinct content templates, one for each service focus option
5. WHEN service focus is "Web Development", THE template SHALL generate a slug pattern like "best-web-development-company-in-{location}"
6. WHEN service focus is "Digital Marketing", THE template SHALL generate a slug pattern like "digital-marketing-agency-in-{location}"
7. WHEN service focus is "SEO Services", THE template SHALL generate a slug pattern like "seo-services-in-{location}"
8. WHEN service focus is "Graphic Designing", THE template SHALL generate a slug pattern like "graphic-design-services-in-{location}"
9. WHEN service focus is "Content Writing", THE template SHALL generate a slug pattern like "content-writing-services-in-{location}"
10. WHEN service focus is "All Services", THE template SHALL generate a slug pattern like "best-web-development-company-in-{location}"
11. FOR ALL service focus options, THE template SHALL generate service-specific page titles, meta descriptions, and content sections
12. THE template SHALL convert location names to lowercase and replace spaces with hyphens for slug generation

### Requirement 4: Auto-Generate Content Button

**User Story:** As an admin, I want to click an "Auto-Generate Content" button, so that all location page fields are automatically populated based on the location name and selected service focus

#### Acceptance Criteria

1. THE LocationForm SHALL display an "Auto-Generate Content" button in the General Information section
2. THE button SHALL include a sparkle icon (Sparkles from lucide-react)
3. THE button SHALL be positioned below the service focus dropdown
4. WHEN the button is clicked, THE System SHALL read the current values from the location name input and service focus dropdown
5. WHEN the button is clicked, THE System SHALL call the generateLocationContent function with the location name and service focus
6. WHEN content is generated, THE System SHALL populate the slug field with the generated slug
7. WHEN content is generated, THE System SHALL populate the title field with the generated title
8. WHEN content is generated, THE System SHALL populate the description field with the generated meta description
9. WHEN content is generated, THE System SHALL update all content sections (hero, story, leadingCompany, services) with generated values
10. THE generated content SHALL be immediately visible in all form fields without requiring a page refresh

### Requirement 5: Editable Generated Fields

**User Story:** As an admin, I want to edit any auto-generated field, so that I can customize the content after generation if needed

#### Acceptance Criteria

1. THE location name field SHALL be a controlled input with React state
2. THE slug field SHALL be a controlled input with React state
3. THE title field SHALL be a controlled input with React state
4. THE description field SHALL be a controlled input with React state
5. WHEN an admin types in any field after auto-generation, THE field value SHALL update immediately
6. THE System SHALL preserve manual edits when the form is submitted
7. WHEN the Auto-Generate button is clicked again, THE System SHALL overwrite any manual edits with newly generated content

### Requirement 6: Service Focus Persistence

**User Story:** As an admin, I want the selected service focus to be saved with the location page, so that the service focus is preserved when I edit the page later

#### Acceptance Criteria

1. WHEN creating a new location page, THE createLocation action SHALL save the serviceFocus value from the form data
2. WHEN updating an existing location page, THE updateLocation action SHALL save the serviceFocus value from the form data
3. THE serviceFocus value SHALL be stored in the LocationPage database record
4. WHEN editing an existing location page, THE LocationForm SHALL load and display the saved serviceFocus value in the dropdown

### Requirement 7: Hero Section Text Size Fix

**User Story:** As a website visitor, I want to see the complete rotating text in the hero section without cutoff, so that I can read the full service descriptions

#### Acceptance Criteria

1. THE rotating text span in Hero.tsx SHALL use the CSS classes "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
2. THE rotating text span SHALL NOT include any min-width constraint (min-w-[28ch] or similar)
3. THE rotating text SHALL be one font size smaller than the black text above it at all breakpoints
4. WHEN the page is viewed on mobile devices, THE rotating text SHALL be fully visible without horizontal overflow
5. WHEN the page is viewed on desktop devices, THE rotating text SHALL be fully visible without being cut off

### Requirement 8: Template Content Quality

**User Story:** As an admin, I want generated content to be professional and SEO-friendly, so that location pages rank well and convert visitors

#### Acceptance Criteria

1. THE generated page titles SHALL follow the pattern "{Service} in {Location} | WebDesino"
2. THE generated meta descriptions SHALL be between 120 and 160 characters
3. THE generated meta descriptions SHALL include the location name and primary service focus
4. THE generated hero subtitle SHALL mention the location name and service focus
5. THE generated story section SHALL include at least two paragraphs of content
6. THE generated services section SHALL include at least three service items
7. THE generated content SHALL use proper grammar and professional language
8. THE generated content SHALL include relevant keywords for local SEO

### Requirement 9: Backward Compatibility

**User Story:** As a developer, I want existing location pages to continue working, so that the new feature does not break existing functionality

#### Acceptance Criteria

1. WHEN an existing location page without a serviceFocus value is loaded, THE System SHALL treat it as "all-services"
2. THE LocationForm SHALL display existing location pages correctly without requiring a serviceFocus value
3. WHEN editing an existing location page without a serviceFocus value, THE admin SHALL be able to select a service focus and save it
4. THE System SHALL not require migration of existing location page data

### Requirement 10: Form Validation

**User Story:** As an admin, I want validation on the location form, so that I cannot create invalid location pages

#### Acceptance Criteria

1. WHEN the location name field is empty, THE Auto-Generate button SHALL use a default placeholder value
2. WHEN the Auto-Generate button is clicked with an empty location name, THE System SHALL display a user-friendly message
3. THE form submission SHALL require a location name, slug, and title
4. THE slug field SHALL only accept lowercase letters, numbers, and hyphens
5. WHEN a duplicate slug is submitted, THE System SHALL return a database error (handled by Prisma unique constraint)
