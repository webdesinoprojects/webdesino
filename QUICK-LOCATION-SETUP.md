# 🚀 Quick Start - Location Upload

## One-Command Setup

### Windows Users:
```bash
run-seed-locations.bat
```

### macOS/Linux Users:
```bash
npm run seed:all-locations
```

---

## What This Does

📍 **Reads** 5000+ locations from `data/all_locations_data.json`
🎯 **Creates** location pages with proper slugs & SEO titles
🔧 **Assigns** the 5 main services to each location (consistent across all)
🗺️ **Sets** state for admin panel filtering
✨ **Uploads** everything to your database

---

## After Upload

1. Visit: **Admin Panel → Locations**
2. See dropdown showing all **Indian States**
3. Click on any state to see its locations
4. Each location shows assigned services

---

## Example Locations Created

```
Srinagar, Jammu & Kashmir
├─ Website Solutions
├─ Digital Marketing
├─ SEO Services
├─ Graphic Designing
└─ Content Writing

Jammu, Jammu & Kashmir
├─ Website Solutions
├─ Digital Marketing
├─ SEO Services
├─ Graphic Designing
└─ Content Writing
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Command not found | Run `npm install` first |
| Database error | Check `.env` DATABASE_URL |
| No states in filter | Verify migration ran & data exists |

---

## Full Documentation

See `LOCATION-UPLOAD-GUIDE.md` for detailed information.
