# Implementation Plan: Location Auto-Generation and Hero Fix

## Overview

This implementation plan covers two features:
1. Location auto-generation with service focus - a template-based content generation system for creating location-specific landing pages
2. Hero section text overflow fix - CSS adjustments to prevent text cutoff

The implementation follows a bottom-up approach: database schema → business logic → server actions → UI components → testing.

## Tasks

- [x] 1. Update database schema and run migration
  - Add `serviceFocus` field to LocationPage model in Prisma schema
  - Field should be optional String with default value "all-services"
  - Run `npx prisma migrate dev` to apply schema changes
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [x] 2. Create template generation system
  - [x] 2.1 Create lib/location-templates.ts with core interfaces and types
    - Define LocationContent interface with hero, story, leadingCompany, services sections
    - Define service focus constants and slug pattern mappings
    - Implement slug normalization helper function
    - _Requirements: 3.1, 3.2, 3.12_
  
  - [x] 2.2 Implement generateLocationContent function with all six service templates
    - Implement template logic for web-development, digital-marketing, seo-services
    - Implement template logic for graphic-designing, content-writing, all-services
    - Generate slugs, titles, descriptions, and content sections for each template
    - Ensure meta descriptions are 120-160 characters
    - _Requirements: 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10, 3.11, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8_
  
  - [ ]* 2.3 Write property tests for template generation
    - **Property 1: Complete Content Generation** - All required sections present
    - **Property 2: Service Focus Differentiation** - Different service focus produces different content
    - **Property 3: Slug Normalization** - Slugs are lowercase with hyphens
    - **Property 9: Title Pattern Compliance** - Titles follow "{Service} in {Location} | WebDesino"
    - **Property 10: Meta Description Length** - Descriptions are 120-160 characters
    - **Property 11: Meta Description Content** - Contains location and service focus
    - **Property 12: Hero Subtitle Content** - Contains location and service focus
    - **Property 13: Story Paragraph Count** - At least two paragraphs
    - **Property 14: Services Count** - At least three service items
    - **Property 15: SEO Keyword Inclusion** - Location appears in key fields
    - **Property 17: Slug Character Validation** - Only lowercase, numbers, hyphens
    - **Validates: Requirements 3.3, 3.4, 3.12, 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.8, 10.4**
  
  - [ ]* 2.4 Write unit tests for template generation
    - Test each service focus generates correct slug pattern
    - Test location name normalization edge cases
    - Test content structure completeness
    - Test empty location name handling
    - _Requirements: 3.5, 3.6, 3.7, 3.8, 3.9, 3.10, 3.11, 10.1_

- [ ] 3. Checkpoint - Verify template generation works correctly
  - Ensure all tests pass, ask the user if questions arise.

- [x] 4. Update server actions to handle serviceFocus
  - [x] 4.1 Update createLocation action in lib/actions.ts
    - Extract serviceFocus from formData
    - Include serviceFocus in Prisma create operation
    - _Requirements: 6.1, 6.3_
  
  - [x] 4.2 Update updateLocation action in lib/actions.ts
    - Extract serviceFocus from formData
    - Include serviceFocus in Prisma update operation
    - _Requirements: 6.2, 6.3_
  
  - [ ]* 4.3 Write integration tests for server actions
    - Test createLocation saves serviceFocus correctly
    - Test updateLocation updates serviceFocus correctly
    - Test null serviceFocus defaults to "all-services"
    - **Property 6: Service Focus Persistence on Create**
    - **Property 7: Service Focus Persistence on Update**
    - **Validates: Requirements 6.1, 6.2, 6.3, 9.1**

- [x] 5. Update LocationForm component with service focus UI
  - [x] 5.1 Add service focus dropdown to LocationForm
    - Add serviceFocus state variable with default "all-services"
    - Create dropdown with six options (Web Development, Digital Marketing, SEO Services, Graphic Designing, Content Writing, All Services)
    - Position dropdown between location name and slug fields
    - Load saved serviceFocus value when editing existing location
    - Include serviceFocus in form submission
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 6.4_
  
  - [x] 5.2 Add Auto-Generate Content button to LocationForm
    - Add button with Sparkles icon from lucide-react
    - Position button below service focus dropdown
    - Implement click handler to read location name and service focus
    - Call generateLocationContent and populate all form fields
    - Show validation message if location name is empty
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 4.10, 10.1, 10.2_
  
  - [x] 5.3 Ensure all form fields are controlled inputs with React state
    - Verify location name, slug, title, description are controlled inputs
    - Ensure manual edits are preserved until next auto-generation
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7_
  
  - [ ]* 5.4 Write component tests for LocationForm
    - Test service focus dropdown renders with all options
    - Test "All Services" is default selection
    - Test auto-generate button exists with sparkle icon
    - Test button click populates form fields
    - Test manual edits persist
    - Test empty location name validation
    - **Property 4: Form Field Population** - All fields populated after generation
    - **Property 5: Manual Edit Persistence** - Manual edits are saved
    - **Property 8: Service Focus Round-Trip** - Saved value displays in dropdown
    - **Property 16: Form Validation** - Required fields validated
    - **Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5, 4.1, 4.2, 4.6, 4.7, 4.8, 4.9, 5.5, 5.6, 6.4, 10.1, 10.2, 10.3**

- [x] 6. Fix Hero component text overflow
  - [x] 6.1 Update Hero.tsx rotating text span styling
    - Replace min-w-[24ch] or similar constraints with responsive text sizing
    - Apply classes "text-3xl sm:text-4xl md:text-5xl lg:text-6xl" to rotating text span
    - Ensure rotating text is one size smaller than main heading at all breakpoints
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_
  
  - [ ]* 6.2 Write component tests for Hero
    - Test rotating text span has correct responsive classes
    - Test rotating text span does not have min-width constraint
    - Test component renders without errors
    - _Requirements: 7.1, 7.2, 7.3_

- [ ] 7. Final checkpoint - End-to-end verification
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- The implementation uses TypeScript, Next.js 14, Prisma, and PostgreSQL
- Property tests use fast-check library with minimum 100 iterations
- Database migration must be run before testing other components
- Backward compatibility is maintained - existing location pages without serviceFocus will default to "all-services"
