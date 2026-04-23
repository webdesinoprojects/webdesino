# Manual Testing Checklist - Post-Migration Verification
**Date:** April 23, 2026  
**Purpose:** Verify MongoDB migration is working correctly in production  
**Duration:** ~30-45 minutes for complete checklist

---

## Testing Instructions

For each test:
1. Perform the action described
2. Check for the expected result
3. Watch for migration bugs (listed under each test)
4. Mark ✅ if passed, ❌ if failed, ⚠️ if partial

**Critical:** Open browser DevTools Console (F12) during all tests to catch JavaScript errors.

---

## Top 10 Business-Critical Flows

### 1. Homepage - Data Aggregation Test
**Priority:** 🔴 CRITICAL  
**Route:** `/`  
**Why Critical:** Aggregates data from 4 MongoDB collections simultaneously

#### Actions to Perform:
1. Navigate to homepage in incognito/private window
2. Wait for full page load (all sections visible)
3. Scroll through entire page slowly
4. Check browser console for errors

#### Expected Results:
- ✅ Page loads within 3 seconds
- ✅ Hero section displays with showcase items
- ✅ Services section shows service categories (from `serviceCategory` collection)
- ✅ Testimonials section shows testimonials (from `testimonial` collection)
- ✅ FAQ section shows FAQs ordered correctly (from `faq` collection)
- ✅ Blog section shows recent blog posts (from `blogPost` collection)
- ✅ No console errors
- ✅ No "Loading..." stuck states
- ✅ All images load correctly

#### Migration Bug Indicators:
- ❌ Empty sections (services, testimonials, FAQs)
- ❌ Console error: "prisma.$queryRaw is not supported"
- ❌ Console error: "Cannot read property 'findMany' of undefined"
- ❌ Sections showing "0" items when data exists
- ❌ Page stuck on loading state
- ❌ Error: "Missing MONGODB_URI environment variable"
- ❌ 500 error page

**Notes:**
```
Services count: _______
Testimonials count: _______
FAQs count: _______
Console errors: _______
```

---

### 2. Location Page - Dynamic Route Test
**Priority:** 🔴 CRITICAL  
**Route:** `/[location-slug]` (e.g., `/web-development-uttam-nagar`)  
**Why Critical:** Tests MongoDB slug lookup and dynamic content rendering

#### Actions to Perform:
1. Go to homepage footer
2. Click any location link (e.g., "Uttam Nagar", "Kamla Nagar")
3. Verify page loads with correct location data
4. Check hero image displays
5. Check location-specific content renders
6. Try 2-3 different location pages

#### Expected Results:
- ✅ Location page loads successfully
- ✅ Page title includes location name
- ✅ Hero section shows location-specific title
- ✅ Hero image displays (if configured)
- ✅ Content sections render correctly
- ✅ Service focus displays correctly (if set)
- ✅ State/region displays correctly
- ✅ No 404 errors
- ✅ No console errors

#### Migration Bug Indicators:
- ❌ 404 "Page not found" for valid location
- ❌ Console error: "Cannot find location with slug"
- ❌ Empty page content (no title, no description)
- ❌ Hero image shows broken image icon
- ❌ State field shows "undefined" or empty
- ❌ Service focus shows "undefined"
- ❌ Error: "legacyId is not defined"
- ❌ Slug lookup returns null when data exists

**Test These Specific Locations:**
```
1. /web-development-uttam-nagar - Status: _______
2. /web-development-kamla-nagar - Status: _______
3. /seo-services-karol-bagh - Status: _______
```

**Notes:**
```
Location pages tested: _______
Errors found: _______
```

---

### 3. Services Pages - Nested Route Test
**Priority:** 🔴 CRITICAL  
**Route:** `/services/[category]/[slug]`  
**Why Critical:** Tests MongoDB relationship queries (category → subtypes)

#### Actions to Perform:
1. Navigate to `/services`
2. Click on a service category (e.g., "Web Development")
3. Click on a service subtype (e.g., "E-commerce Development")
4. Verify service details display
5. Check "Related Services" section shows other services in same category

#### Expected Results:
- ✅ Services listing page loads (`/services`)
- ✅ Service categories display with icons
- ✅ Category page loads (`/services/web-development`)
- ✅ Subtypes list displays for category
- ✅ Service detail page loads (`/services/web-development/ecommerce-development`)
- ✅ Service features array displays correctly
- ✅ Service benefits array displays correctly
- ✅ Related services show (same category)
- ✅ No console errors

#### Migration Bug Indicators:
- ❌ Category page shows 0 subtypes when they exist
- ❌ Console error: "Cannot read property 'subtypes' of null"
- ❌ Error: "categoryId is not defined"
- ❌ Error: "categoryLegacyId is not defined"
- ❌ Related services section empty
- ❌ Features/benefits show as empty arrays
- ❌ Service icon missing or broken
- ❌ 404 on valid service URL

**Test These Specific Services:**
```
1. /services - Status: _______
2. /services/web-development - Status: _______
3. /services/web-development/ecommerce-development - Status: _______
```

**Notes:**
```
Categories found: _______
Subtypes in first category: _______
Errors: _______
```

---

### 4. Blog Listing & Detail - Pagination Test
**Priority:** 🔴 CRITICAL  
**Route:** `/blog` and `/blog/[slug]`  
**Why Critical:** Tests MongoDB sorting, pagination, and slug lookup

#### Actions to Perform:
1. Navigate to `/blog`
2. Verify blog posts display in reverse chronological order
3. Click on a blog post
4. Verify blog content renders correctly
5. Check blog images display
6. Go back and try another blog post

#### Expected Results:
- ✅ Blog listing page loads
- ✅ Blog posts display with images, titles, excerpts
- ✅ Posts sorted by date (newest first)
- ✅ Blog detail page loads
- ✅ Blog title displays
- ✅ Blog content renders (HTML/rich text)
- ✅ Blog image displays
- ✅ Blog category displays
- ✅ Blog date displays correctly
- ✅ No console errors

#### Migration Bug Indicators:
- ❌ Blog listing shows 0 posts when posts exist
- ❌ Posts not sorted by date
- ❌ Console error: "Cannot read property 'date' of undefined"
- ❌ Blog detail page 404 for valid slug
- ❌ Blog content shows as "[object Object]"
- ❌ Blog image broken or missing
- ❌ Date shows as "Invalid Date"
- ❌ Error: "slug not found in blogPost collection"

**Test These Specific Blogs:**
```
1. /blog - Status: _______
2. /blog/[first-blog-slug] - Status: _______
3. /blog/[second-blog-slug] - Status: _______
```

**Notes:**
```
Total blogs visible: _______
Date sorting correct: Yes/No
Errors: _______
```

---

### 5. Enquiry Form Submission - Write Operation Test
**Priority:** 🔴 CRITICAL  
**Route:** `/contact`  
**Why Critical:** Tests MongoDB write operations and email integration

#### Actions to Perform:
1. Navigate to `/contact`
2. Fill out contact form:
   - Name: "Test User"
   - Email: "test@example.com"
   - Phone: "+91 9999999999"
   - Service: "Web Development"
   - Message: "This is a test enquiry for MongoDB migration verification"
3. Submit form
4. Wait for success message
5. Check browser console for errors

#### Expected Results:
- ✅ Form displays correctly
- ✅ All fields are editable
- ✅ Submit button works
- ✅ Loading state shows during submission
- ✅ Success message displays: "Message Sent!"
- ✅ Form resets after success
- ✅ No console errors
- ✅ No network errors in DevTools Network tab

#### Migration Bug Indicators:
- ❌ Form submission fails silently
- ❌ Error message: "Failed to submit enquiry"
- ❌ Console error: "prisma.enquiry.create is not a function"
- ❌ Console error: "Cannot insert into enquiry collection"
- ❌ Network error: 500 Internal Server Error
- ❌ Success message shows but enquiry not saved (check admin panel)
- ❌ Error: "legacyId generation failed"
- ❌ Form stays in loading state forever
- ❌ Email notification fails (check logs)

**Critical:** After submission, immediately proceed to Test #6 to verify enquiry was saved.

**Notes:**
```
Submission status: _______
Success message shown: Yes/No
Console errors: _______
Network status code: _______
```

---

### 6. Admin Enquiry Listing - Read After Write Test
**Priority:** 🔴 CRITICAL  
**Route:** `/admin/enquiries`  
**Why Critical:** Verifies enquiry from Test #5 was saved to MongoDB

#### Actions to Perform:
1. Navigate to `/admin/login`
2. Login with admin credentials
3. Navigate to `/admin/enquiries`
4. Look for the test enquiry from Test #5 (should be at top)
5. Click on the enquiry to view details
6. Verify all fields are correct

#### Expected Results:
- ✅ Admin login works
- ✅ Enquiries page loads
- ✅ Test enquiry appears at top of list
- ✅ Enquiry shows correct name: "Test User"
- ✅ Enquiry shows correct email: "test@example.com"
- ✅ Enquiry shows correct phone: "+91 9999999999"
- ✅ Enquiry shows correct service: "Web Development"
- ✅ Enquiry shows correct message
- ✅ Enquiry status is "new"
- ✅ Enquiry timestamp is recent (within last few minutes)
- ✅ No console errors

#### Migration Bug Indicators:
- ❌ Enquiries page shows 0 enquiries
- ❌ Test enquiry not found in list
- ❌ Enquiry fields show "undefined" or null
- ❌ Console error: "Cannot read enquiries from MongoDB"
- ❌ Error: "legacyId mismatch"
- ❌ Enquiry timestamp shows wrong date
- ❌ Status field empty or undefined
- ❌ 500 error loading enquiries page

**Notes:**
```
Enquiry found: Yes/No
All fields correct: Yes/No
Timestamp correct: Yes/No
Errors: _______
```

---

### 7. Admin Enquiry Status Update - Update Operation Test
**Priority:** 🔴 CRITICAL  
**Route:** `/admin/enquiries/[id]`  
**Why Critical:** Tests MongoDB update operations

#### Actions to Perform:
1. From enquiries list, click on test enquiry
2. On enquiry detail page, find status dropdown
3. Change status from "new" to "contacted"
4. Wait for update confirmation
5. Refresh page
6. Verify status persisted

#### Expected Results:
- ✅ Enquiry detail page loads
- ✅ Status dropdown shows current status ("new")
- ✅ Status can be changed to "contacted"
- ✅ Update happens without page reload (or with confirmation)
- ✅ Success message or indicator shows
- ✅ After refresh, status still shows "contacted"
- ✅ No console errors

#### Migration Bug Indicators:
- ❌ Status dropdown doesn't work
- ❌ Status update fails silently
- ❌ Console error: "prisma.enquiry.update is not a function"
- ❌ Error: "Cannot update enquiry in MongoDB"
- ❌ Status reverts to "new" after refresh
- ❌ Error: "legacyId not found for update"
- ❌ 500 error on status update
- ❌ Multiple enquiries updated instead of one

**Notes:**
```
Status update worked: Yes/No
Status persisted after refresh: Yes/No
Errors: _______
```

---

### 8. Admin Dashboard - Aggregate Count Test
**Priority:** 🟡 HIGH  
**Route:** `/admin/dashboard`  
**Why Critical:** Tests MongoDB count operations across multiple collections

#### Actions to Perform:
1. Navigate to `/admin/dashboard`
2. Check all stat cards display numbers
3. Verify counts are reasonable (not 0, not negative)
4. Click on each stat card to verify navigation works

#### Expected Results:
- ✅ Dashboard loads successfully
- ✅ "Total Projects" shows count > 0
- ✅ "Active Blogs" shows count > 0
- ✅ "Enquiries" shows count > 0 (at least 1 from Test #5)
- ✅ "Locations" shows count > 0
- ✅ All counts are numbers (not "NaN" or "undefined")
- ✅ Clicking stat cards navigates to correct pages
- ✅ No console errors

#### Migration Bug Indicators:
- ❌ All counts show 0 when data exists
- ❌ Counts show "NaN" or "undefined"
- ❌ Console error: "prisma.*.count is not a function"
- ❌ Error: "Cannot count documents in MongoDB"
- ❌ Dashboard shows error message
- ❌ Stat cards don't load (stuck on loading)
- ❌ 500 error on dashboard

**Notes:**
```
Projects count: _______
Blogs count: _______
Enquiries count: _______
Locations count: _______
All counts valid: Yes/No
Errors: _______
```

---

### 9. Media Upload & Display - File Storage Test
**Priority:** 🟡 HIGH  
**Route:** `/admin/media`  
**Why Critical:** Tests MongoDB + Supabase Storage integration

#### Actions to Perform:
1. Navigate to `/admin/media`
2. Click "Upload" or "Add Media" button
3. Upload a small test image (< 1MB)
4. Wait for upload to complete
5. Verify image appears in media library
6. Copy image URL
7. Open image URL in new tab to verify it loads

#### Expected Results:
- ✅ Media page loads
- ✅ Existing media items display
- ✅ Upload button works
- ✅ File picker opens
- ✅ Upload progress shows
- ✅ Upload completes successfully
- ✅ New image appears in media library
- ✅ Image has correct filename
- ✅ Image URL is valid (Supabase URL)
- ✅ Opening URL in new tab shows image
- ✅ No console errors

#### Migration Bug Indicators:
- ❌ Media page shows 0 items when media exists
- ❌ Upload fails with error
- ❌ Console error: "prisma.media.create is not a function"
- ❌ Error: "Cannot save media record to MongoDB"
- ❌ Image uploads to Supabase but not saved to MongoDB
- ❌ Image URL is broken or invalid
- ❌ Duplicate media entries created
- ❌ Error: "legacyId conflict in media collection"

**Notes:**
```
Upload successful: Yes/No
Image displays in library: Yes/No
Image URL works: Yes/No
Errors: _______
```

---

### 10. Sitemap Generation - SEO Critical Test
**Priority:** 🟡 HIGH  
**Route:** `/sitemap.xml`  
**Why Critical:** Tests MongoDB queries for all public content (SEO impact)

#### Actions to Perform:
1. Navigate to `/sitemap.xml` in browser
2. Verify XML loads (not 404 or 500)
3. Check sitemap contains:
   - Blog post URLs
   - Location page URLs
   - Service page URLs
   - Case study URLs
4. Verify URLs are valid (no "undefined" or "null" in URLs)
5. Check lastmod dates are present

#### Expected Results:
- ✅ Sitemap loads successfully (XML format)
- ✅ Contains `<urlset>` root element
- ✅ Contains multiple `<url>` entries
- ✅ Blog URLs present (e.g., `/blog/some-post`)
- ✅ Location URLs present (e.g., `/web-development-uttam-nagar`)
- ✅ Service URLs present (e.g., `/services/web-development/ecommerce`)
- ✅ All URLs are complete (start with `https://`)
- ✅ No "undefined" or "null" in URLs
- ✅ `<lastmod>` dates are valid ISO format
- ✅ No duplicate URLs

#### Migration Bug Indicators:
- ❌ Sitemap returns 404 or 500 error
- ❌ Sitemap is empty (no URLs)
- ❌ URLs contain "undefined" or "null" (e.g., `/blog/undefined`)
- ❌ Console error: "Cannot generate sitemap"
- ❌ Error: "prisma.*.findMany failed in sitemap"
- ❌ Missing entire sections (no blogs, no locations, etc.)
- ❌ Duplicate URLs in sitemap
- ❌ Invalid XML format

**Notes:**
```
Sitemap loads: Yes/No
Blog URLs count: _______
Location URLs count: _______
Service URLs count: _______
Invalid URLs found: _______
Errors: _______
```

---

## Additional Quick Checks

### 11. Admin Blog CRUD (Quick Test)
**Route:** `/admin/blogs`

**Actions:**
1. Navigate to `/admin/blogs`
2. Click "New Blog Post"
3. Fill minimal fields (title, slug, excerpt)
4. Save
5. Verify blog appears in list
6. Delete the test blog

**Expected:** ✅ Create and delete work without errors

**Bug Indicators:**
- ❌ Create fails
- ❌ Blog doesn't appear in list
- ❌ Delete fails or deletes wrong blog

---

### 12. Admin Location Filter (Quick Test)
**Route:** `/admin/locations`

**Actions:**
1. Navigate to `/admin/locations`
2. Look for state/region filter dropdown
3. Select a state (e.g., "Delhi")
4. Verify locations filter correctly

**Expected:** ✅ Filter works, shows only locations in selected state

**Bug Indicators:**
- ❌ Filter doesn't work
- ❌ Shows all locations regardless of filter
- ❌ Error: "state field undefined"

---

## Summary Checklist

After completing all tests, verify:

- [ ] All 10 critical flows passed
- [ ] No console errors in any test
- [ ] No 500 errors in any test
- [ ] Data writes persist (enquiry test)
- [ ] Data updates persist (status update test)
- [ ] Counts are accurate (dashboard test)
- [ ] Images load correctly (media test)
- [ ] Sitemap generates correctly (SEO test)
- [ ] No "undefined" or "null" in displayed data
- [ ] No Postgres-related errors in logs

---

## Common Migration Bug Patterns to Watch For

### 🔴 Critical Bugs:
1. **Empty Collections:** Pages load but show 0 items when data exists
2. **Slug Lookup Failures:** 404 errors on valid URLs
3. **Write Failures:** Forms submit but data not saved
4. **Type Mismatches:** Fields show "[object Object]" instead of values
5. **ID Mapping Issues:** Errors mentioning "legacyId" or "categoryLegacyId"

### 🟡 Medium Bugs:
1. **Sorting Issues:** Data not sorted correctly (dates, order fields)
2. **Relationship Failures:** Related data not loading (category → subtypes)
3. **Count Inaccuracies:** Dashboard counts don't match actual data
4. **Image URL Issues:** Images saved but URLs broken

### 🟢 Minor Bugs:
1. **Console Warnings:** Non-breaking warnings about deprecated fields
2. **Slow Queries:** Pages load but take >3 seconds
3. **Cache Issues:** Old data showing (needs hard refresh)

---

## If You Find Bugs

### Immediate Actions:
1. **Screenshot the error** (browser console + page)
2. **Note the exact URL** where error occurred
3. **Copy full error message** from console
4. **Check browser Network tab** for failed requests
5. **Try in incognito mode** to rule out cache issues

### Gather Debug Info:
```bash
# Check MongoDB connection
echo $MONGODB_URI

# Check if MongoDB is being used
# Look for "connectToMongo" in server logs

# Check Prisma adapter is active
# Look for imports from "@/lib/prisma" not "@prisma/client"
```

### Rollback Criteria:
**Consider rollback if:**
- ❌ 3+ critical flows fail
- ❌ Enquiry submission completely broken
- ❌ Admin dashboard shows all 0s
- ❌ Sitemap returns 500 error
- ❌ Multiple "legacyId" errors in console

**Safe to continue if:**
- ✅ All critical flows pass
- ✅ Only minor UI issues (styling, slow loads)
- ✅ No data loss or corruption
- ✅ Errors are isolated to 1-2 non-critical pages

---

## Testing Environment Notes

**Browser:** Use Chrome or Firefox with DevTools open  
**Network:** Test on stable connection  
**Cache:** Clear browser cache before starting  
**Incognito:** Use incognito/private mode for clean tests  
**Time:** Allow 30-45 minutes for complete checklist  

**Admin Credentials:**
- Check `.env` file for `ADMIN_EMAIL`
- Check `ADMIN-CREDENTIALS-GUIDE.md` for password

---

## Post-Testing Report Template

```
=== MONGODB MIGRATION VERIFICATION ===
Date: _______________
Tester: _______________
Environment: Production / Staging

CRITICAL FLOWS (10):
1. Homepage: ✅ / ❌ / ⚠️
2. Location Pages: ✅ / ❌ / ⚠️
3. Services Pages: ✅ / ❌ / ⚠️
4. Blog Pages: ✅ / ❌ / ⚠️
5. Enquiry Submission: ✅ / ❌ / ⚠️
6. Admin Enquiry List: ✅ / ❌ / ⚠️
7. Enquiry Status Update: ✅ / ❌ / ⚠️
8. Admin Dashboard: ✅ / ❌ / ⚠️
9. Media Upload: ✅ / ❌ / ⚠️
10. Sitemap: ✅ / ❌ / ⚠️

OVERALL STATUS: PASS / FAIL / PARTIAL

ISSUES FOUND:
1. _______________
2. _______________
3. _______________

RECOMMENDATION:
[ ] Continue with MongoDB (all tests passed)
[ ] Fix minor issues and retest
[ ] Consider rollback (critical failures)

NOTES:
_______________
_______________
```

---

**Ready to Test?** Start with Test #1 (Homepage) and work through sequentially. Good luck! 🚀
