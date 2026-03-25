# Pre-Flight Checklist - Bulk Location Creation

## Before Running the Script

Use this checklist to ensure everything is ready before executing the bulk creation script.

## ✅ Environment Setup

- [ ] **Node.js and npm installed**
  ```bash
  node --version  # Should be v18 or higher
  npm --version
  ```

- [ ] **Dependencies installed**
  ```bash
  npm install
  ```

- [ ] **Prisma client generated**
  ```bash
  npx prisma generate
  ```

- [ ] **Environment variables configured**
  - Check `.env` file exists
  - Verify `DATABASE_URL` is correct
  - Verify `DIRECT_URL` is correct (if using connection pooling)

## ✅ Database Verification

- [ ] **Database connection works**
  ```bash
  npm run location-stats
  ```
  This should connect successfully and show current statistics.

- [ ] **Database backup created**
  ```bash
  # PostgreSQL example
  pg_dump -U username -d database_name > backup_$(date +%Y%m%d).sql
  ```
  Or use your hosting provider's backup tool.

- [ ] **Check current location count**
  ```bash
  npm run location-stats
  ```
  Note the current count to compare after execution.

## ✅ Script Verification

- [ ] **Script files exist**
  - `scripts/bulk-create-locations.ts` ✓
  - `scripts/location-stats.ts` ✓
  - `scripts/test-location-generation.ts` ✓

- [ ] **npm scripts configured**
  ```bash
  npm run bulk-locations --help
  ```
  Should show the script is available (even if no help text).

- [ ] **Test content generation**
  ```bash
  ts-node --compiler-options {\"module\":\"CommonJS\"} scripts/test-location-generation.ts
  ```
  Should generate sample content without errors.

## ✅ Dry Run Verification

- [ ] **Run dry-run mode**
  ```bash
  npm run bulk-locations
  ```

- [ ] **Review dry-run output**
  - Total entries count is correct (should be 1,050)
  - Created count makes sense
  - Skipped count matches existing pages
  - No unexpected errors

- [ ] **Check sample slugs**
  Look at the output and verify slug format:
  - `best-web-development-company-in-{location}`
  - `best-digital-marketing-agency-in-{location}`
  - `best-seo-services-in-{location}`
  - etc.

## ✅ Server Resources

- [ ] **Check available disk space**
  ```bash
  # Linux/Mac
  df -h
  
  # Windows
  wmic logicaldisk get size,freespace,caption
  ```
  Ensure at least 1GB free space.

- [ ] **Check database size**
  ```sql
  SELECT pg_size_pretty(pg_database_size('your_database'));
  ```
  Ensure database has room to grow.

- [ ] **Check server load**
  - If running on production, consider off-peak hours
  - Monitor CPU and memory usage
  - Ensure no other heavy processes running

## ✅ Configuration Review

- [ ] **Review location lists**
  Open `scripts/bulk-create-locations.ts` and verify:
  - Location names are correct
  - No typos in city names
  - States are properly categorized

- [ ] **Review batch settings**
  ```typescript
  const BATCH_SIZE = 50;              // Adjust if needed
  const DELAY_BETWEEN_BATCHES = 100;  // Adjust if needed
  ```

- [ ] **Review service focuses**
  Verify all 6 service types are included:
  - web-development
  - digital-marketing
  - seo-services
  - graphic-designing
  - content-writing
  - all-services

## ✅ Safety Measures

- [ ] **Backup strategy in place**
  - Know how to restore from backup
  - Test restore process (optional but recommended)

- [ ] **Rollback plan ready**
  - Know how to identify newly created pages
  - Have SQL query ready to delete if needed:
    ```sql
    -- DO NOT RUN unless you need to rollback
    DELETE FROM "LocationPage" 
    WHERE "createdAt" > '2024-03-25 00:00:00';
    ```

- [ ] **Monitoring setup**
  - Have database monitoring tool ready
  - Can check server metrics during execution
  - Can stop script if issues arise (Ctrl+C)

## ✅ Communication

- [ ] **Team notified** (if applicable)
  - Inform team about bulk operation
  - Schedule during maintenance window if needed
  - Have backup person available

- [ ] **Maintenance mode** (optional)
  - Consider enabling maintenance mode
  - Prevents user interference during creation
  - Can be skipped for low-traffic sites

## ✅ Final Checks

- [ ] **Read documentation**
  - `scripts/QUICK-START.md` ✓
  - `scripts/README.md` ✓
  - `BULK-LOCATION-CREATION-SUMMARY.md` ✓

- [ ] **Understand the output**
  - Know what "Created", "Skipped", "Failed" mean
  - Understand progress percentage
  - Know when to stop if issues arise

- [ ] **Have time allocated**
  - ~2-3 minutes for 1,000 entries
  - ~20-30 minutes for 10,000 entries
  - Don't start if you need to leave soon

## 🚀 Ready to Execute

Once all items are checked:

```bash
npm run bulk-locations --execute
```

## 📊 During Execution

Monitor:
- [ ] Progress updates appear regularly
- [ ] Created/Skipped/Failed counts are reasonable
- [ ] No repeated error messages
- [ ] Server resources are stable

## ✅ Post-Execution

- [ ] **Verify statistics**
  ```bash
  npm run location-stats
  ```

- [ ] **Check total count**
  - Should match expected: previous count + created count

- [ ] **Spot check pages**
  - Visit 3-5 random location pages
  - Verify content looks correct
  - Check SEO metadata
  - Test responsive design

- [ ] **Check for errors**
  - Review any failed entries from output
  - Investigate and fix if needed
  - Re-run script to create failed entries

- [ ] **Monitor performance**
  - Check page load times
  - Verify database queries are fast
  - Monitor server resources

- [ ] **Update documentation**
  - Note how many pages were created
  - Document any issues encountered
  - Update location lists if needed

## 🎉 Success Criteria

✅ Script completed without fatal errors
✅ Created count matches expectations
✅ No duplicate slugs in database
✅ Sample pages display correctly
✅ Database statistics look correct
✅ Server performance is normal

## 🆘 Emergency Rollback

If something goes wrong:

1. **Stop the script**: Press Ctrl+C

2. **Assess the damage**:
   ```bash
   npm run location-stats
   ```

3. **Restore from backup** (if needed):
   ```bash
   psql -U username -d database_name < backup_20240325.sql
   ```

4. **Investigate the issue**:
   - Check error messages
   - Review script logs
   - Verify database connection
   - Check server resources

5. **Fix and retry**:
   - Address the root cause
   - Run dry-run again
   - Execute with fixes applied

## 📝 Notes

- The script is idempotent - safe to run multiple times
- Existing pages are automatically skipped
- No data is ever updated or deleted
- Footer locations are not affected
- Admin panel continues to work normally

## ✅ Checklist Complete

Date: _______________
Performed by: _______________
Backup location: _______________
Execution time: _______________
Pages created: _______________
Issues encountered: _______________

---

**Ready to proceed?** Run: `npm run bulk-locations --execute`
