# Database Structure - Locations with Services

## How Data is Stored

When you run the script, each location is created in the `LocationPage` table with this structure:

```json
{
  "id": "cm12abc34def56ghi78",
  "slug": "best-web-development-company-in-srinagar",
  "location": "Srinagar",
  "state": "Jammu & Kashmir",
  "title": "Best Web Development Company in Srinagar",
  "description": "WebDesino offers professional web development, digital marketing, and SEO services in Srinagar, Jammu & Kashmir. Trusted by businesses for custom solutions and growth strategies.",
  "serviceFocus": "all-services",
  "content": {
    "services": [
      {
        "slug": "website-solutions",
        "title": "Website Solutions"
      },
      {
        "slug": "digital-marketing",
        "title": "Digital Marketing"
      },
      {
        "slug": "seo-services",
        "title": "SEO Services"
      },
      {
        "slug": "graphic-designing",
        "title": "Graphic Designing"
      },
      {
        "slug": "content-writing",
        "title": "Content Writing"
      }
    ],
    "createdAt": "2025-03-25T10:30:00.000Z"
  },
  "createdAt": "2025-03-25T10:30:00.000Z",
  "updatedAt": "2025-03-25T10:30:00.000Z"
}
```

## Admin Panel Display

### Locations Page
```
Filter by State: [Jammu & Kashmir ▼]

📊 Showing 50 of 5000+ locations

| Location         | State                | Service Focus   | Created   |
|------------------|--------------------|-----------------|-----------| 
| Srinagar         | Jammu & Kashmir    | all-services    | Mar 25    |
| Jammu            | Jammu & Kashmir    | all-services    | Mar 25    |
| Anantnag         | Jammu & Kashmir    | all-services    | Mar 25    |
| ...              | ...                | ...             | ...       |
```

### State Filter Options (Auto-populated)
```
Select State
├─ All Indian States (from the JSON)
├─ Jammu & Kashmir
├─ Himachal Pradesh
├─ Punjab
├─ Haryana
├─ Delhi
├─ Uttarakhand
├─ Uttar Pradesh
├─ Rajasthan
├─ Gujarat
├─ Maharashtra
├─ Goa
├─ Karnataka
├─ Tamil Nadu
├─ Telangana
├─ And all other states...
```

## SQL View

### Total Locations
```sql
SELECT COUNT(*) FROM "LocationPage";
-- Result: 5000+ (depending on JSON)
```

### Locations by State
```sql
SELECT state, COUNT(*) as count 
FROM "LocationPage" 
GROUP BY state 
ORDER BY count DESC;

-- Result:
--  state              | count
-- --------------------|-------
--  Uttar Pradesh      | 85
--  Maharashtra        | 75
--  Jammu & Kashmir    | 20
--  Bihar              | 30
-- ...
```

### Services for a Location
```sql
SELECT 
  location,
  state,
  content->'services' as assigned_services
FROM "LocationPage"
WHERE location = 'Srinagar';

-- Result:
-- location | state               | assigned_services
-- ---------|--------------------|-----------------
-- Srinagar | Jammu & Kashmir    | [
--           |                    |   {"slug":"web-development",...},
--           |                    |   {"slug":"local-seo",...},
--           |                    |   ...
--           |                    | ]
```

## Services List (Assigned to Every Location)

All 5 main services are assigned to every location:

1. ✅ **Website Solutions** - Web development, design, e-commerce, maintenance
2. ✅ **Digital Marketing** - Social media, PPC, content, influencer marketing
3. ✅ **SEO Services** - Local, technical, on-page, off-page, audits
4. ✅ **Graphic Designing** - Logo, brand identity, UI/UX design
5. ✅ **Content Writing** - Website copy, blogs, social media, emails

**Every location gets exactly these 5 services (not randomly selected).**

## Upload Statistics

### Expected Results
```
Input: data/all_locations_data.json
├─ Total States: 28 (All Indian states/UTs)
└─ Total Locations: 5000+

Output: LocationPage table
├─ New Records: ~5000+
├─ States: 28
├─ Services per Location: 5
└─ Service Combinations: Millions (randomly assigned)
```

## How to Query Services for a Location

### JavaScript/TypeScript
```typescript
// Get a location with its services
const location = await prisma.locationPage.findUnique({
  where: { slug: 'best-web-development-company-in-srinagar' },
})

console.log(location.content?.services);
// Output:
// [
//   { slug: 'web-development', title: 'Web Development' },
//   { slug: 'local-seo', title: 'Local SEO' },
//   ...
// ]
```

### Direct SQL
```sql
SELECT 
  location,
  jsonb_array_length(content->'services') as service_count,
  content->'services' as services
FROM "LocationPage"
LIMIT 1;
```

## Verification Checklist

After running the script:

- [ ] Total locations > 0: `SELECT COUNT(*) FROM "LocationPage";`
- [ ] States exist: `SELECT DISTINCT state FROM "LocationPage";`
- [ ] Services stored: `SELECT content->'services' FROM "LocationPage" LIMIT 1;`
- [ ] Admin filter shows states: Visit Admin → Locations → State dropdown
- [ ] Can click on locations: Click any location to view details
- [ ] Services display: Check location details page shows assigned services

## Notes

- 🎲 Services are randomly selected - running script again will assign different services
- 🚀 Script uses UPSERT - won't create duplicates if run multiple times
- 📍 State field is essential for admin filtering
- 🔒 All locations set to "all-services" for serviceFocus
- ✨ SEO titles and descriptions auto-generated
