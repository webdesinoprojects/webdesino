# Ads Landing Pages and Ads Enquiries

## Goal

Add an isolated ads landing experience under `/landing-page` without changing the behavior of normal website pages, normal enquiries, or existing employee permissions.

## Routes

Create these public routes:

- `/landing-page` - landing hub with four service choices.
- `/landing-page/web-development`
- `/landing-page/google-ads`
- `/landing-page/meta-ads`
- `/landing-page/seo-optimization`

The four detail routes will follow the existing full service-page design and will include the real enquiry form. Web Development will adapt existing page content. Google Ads, Meta Ads, and SEO Optimization will use newly authored content in the same layout and visual style.

## Phase 1: Landing Experience

- Build a landing-only route experience using the existing site design language, typography, responsiveness, header, footer, bottom navigation, and floating contact widget.
- Add optional phone and WhatsApp number overrides to shared contact UI components.
- Keep existing website pages on their current phone and WhatsApp values.
- Use a centrally defined placeholder ads contact number for all `/landing-page/*` routes, initially `+91 90000 00000`, so it can be replaced later.
- Keep the floating WhatsApp/contact widget UI and behavior unchanged on landing routes except for the landing-only WhatsApp number override.
- Build the `/landing-page` hub with four service cards: Google Ads, Meta Ads, Website Development, and SEO Optimization.
- Link each card to its new landing detail page, not to an existing `/services/*` route.
- Create one reusable landing service-detail template matching the current service page sections, form treatment, layout, and responsive styling.

## Phase 2: Ads Enquiry Data and Admin Queue

- Continue storing leads in the existing enquiries collection. Do not create a separate MongoDB collection.
- Extend enquiry data with optional classification fields:
  - `source`: `"ads-landing"` for submissions from the four new landing detail forms only.
  - `landingService`: `"web-development"`, `"google-ads"`, `"meta-ads"`, or `"seo-optimization"`.
- Keep existing enquiry records valid by making the classification fields optional.
- Reuse the current enquiry form submission action, validation, sanitization, notifications, status workflow, and stored contact fields.
- Update the shared enquiry form/action interface so only landing forms submit the ads classification metadata.
- Leave the floating intro-call mini-form on its current normal enquiry flow, even when displayed on landing routes.
- Exclude ads-classified leads from the normal `/admin/enquiries` table.
- Add admin routes:
  - `/admin/enquiries/ads` - table showing only ads landing leads.
  - `/admin/enquiries/ads/[id]` - full lead detail and status view matching existing enquiry UI.
- Add a collapsible nested `Ads Enquiries` navigation item beneath `Enquiries` in the admin sidebar.
- Ensure status changes refresh the relevant admin and employee ads views as well as existing applicable enquiry views.

## Phase 3: Employee Permission and Verification

- Add an employee permission key named `ads-enquiries` with the label `Ads Enquiries`.
- Add it as an independent checkbox in employee create/edit permission forms.
- Permit employees to receive ads-enquiry access without receiving normal enquiry access.
- Add employee routes:
  - `/employee/dashboard/ads-enquiries`
  - `/employee/dashboard/ads-enquiries/[id]`
- Protect employee ads routes with the existing permission enforcement pattern for `ads-enquiries`.
- Display only enquiries with `source: "ads-landing"` in employee ads views.
- Add the ads module to employee navigation and dashboard counts only where the permission has been granted.
- Include `ads-enquiries` in a full administrator permission preset, but do not automatically grant it in other existing role presets.

## Content Scope

All four landing service pages will use the same design pattern and form placement:

- Website Development: reuse and adapt content from the current web development service page.
- Google Ads: new content covering paid search strategy, campaign build, targeting, optimization, tracking, and reporting.
- Meta Ads: new content covering Facebook and Instagram campaigns, creative/testing, audience strategy, retargeting, and reporting.
- SEO Optimization: new content covering technical SEO, on-page work, content opportunities, authority growth, tracking, and reporting.

## Data and Component Changes

- Shared landing form props gain optional ads source and landing service metadata.
- The Enquiry model and any maintained schema/type representation gain optional `source` and `landingService` fields.
- Shared navbar, footer, and floating contact UI gain optional phone/WhatsApp override props while retaining current values by default.
- A central landing contact constant stores the temporary placeholder number.

## Verification

- Confirm `/landing-page` shows all four service selections and links to the correct new routes.
- Confirm each detail page uses the established service-page layout and renders correctly on desktop and mobile.
- Confirm normal site pages continue showing existing phone and WhatsApp numbers.
- Confirm landing routes show the placeholder ads number in applicable header, footer, and floating WhatsApp contact targets while retaining the current widget UI.
- Submit each landing service form and confirm it creates an enquiry with `source: "ads-landing"` and the matching `landingService`.
- Submit existing contact/service forms and the floating intro-call form and confirm they remain normal enquiries without ads classification.
- Confirm normal admin enquiries exclude ads leads and the ads queue includes only landing form submissions.
- Confirm ads enquiry detail pages preserve full lead data and status updates.
- Confirm employees without `ads-enquiries` cannot access ads views.
- Confirm employees with only `ads-enquiries` can access ads views without gaining normal enquiry access.
- Run the project build/type validation and visually verify landing routes after implementation.

## Assumptions

- Only the four new full-page landing forms create Ads Enquiries.
- The floating intro-call form remains a normal enquiry, as its functionality is otherwise unchanged.
- Landing pages reuse the existing website styling and structure rather than introducing a separate redesign.
- Existing `/services/*`, `/contact`, normal admin enquiries, and current employee permissions remain behaviorally unchanged aside from excluding ads-classified records from normal enquiry lists.
