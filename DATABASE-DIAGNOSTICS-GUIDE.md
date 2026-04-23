# 🔍 Database Diagnostics Guide

## Quick Start

### Option 1: Using npm (Recommended)
```bash
npm run diagnose:db
```

### Option 2: Using Windows Batch
```bash
run-db-diagnostics.bat
```

### Option 3: Basic Check Only
```bash
npm run check:db
```

---

## What Each Check Does

### 📋 **Environment Variables**
- **DATABASE_URL**: Connection string to your PostgreSQL database
- **DIRECT_URL**: Direct connection URL (bypasses connection pooling - important for migrations)

**If Failed:**
- Add these to your `.env` file
- Format: `postgresql://user:password@host:port/database_name`

---

### 🔗 **Connectivity**
Tests if your application can reach the PostgreSQL server.

**If Failed:**
- ❌ Check if database server is running
- ❌ Verify DATABASE_URL is correct
- ❌ Check network connectivity to database host
- ❌ Check firewall rules

---

### ⚙️ **Basic Query**
Runs `SELECT 1` to verify the database responds to queries.

**If Failed:**
- Database connection dropped
- Check database credentials
- Verify database isn't crashed

---

### 📊 **Database Size**
Shows total size of your database in disk space.

**What to Expect:**
- Small: < 1MB (empty/new database)
- Medium: 1MB - 100MB (typical production)
- Large: > 100MB (large dataset or heavy usage)

---

### 📋 **Tables**
Lists all tables in your database.

**If Failed/Empty:**
Your database schema hasn't been initialized yet. Run:
```bash
npx prisma migrate deploy
```

**Expected Tables:**
```
Admin, Employee, Project, Location, ServiceCategory, BlogPost, Enquiry, 
EmployeeLog, Testimonial, BlogComment, CaseStudy, ServiceEnquiry, 
LocationCategory, LocationComment, and _prisma_migrations
```

---

### 🔌 **Active Connections**
Shows how many active database connections exist.

**Normal:** 1-5 connections
**Warning:** 20+ connections (possible connection leak)
**Critical:** 100+ connections (application may be broken)

**If High:**
```bash
# Restart your Next.js server
npm run dev
```

---

### 🔄 **Migrations**
Shows which database migrations have been applied.

**If Failed/Empty:**
Run migrations:
```bash
npx prisma migrate deploy
```

---

### 📈 **Table Row Counts**
Shows how many records exist in each table.

**Example Output:**
```
Admin: 2
Employee: 5
Project: 12
Location: 1500
BlogPost: 45
```

---

### 🔎 **Indexes**
Shows database indexes for query performance.

**What to Expect:**
- Unique indexes on email fields (Admin.email, Employee.email)
- Index on commonly searched fields

**If Missing:**
Indexes will be created during Prisma migrations.

---

### ⏱️ **Query Performance**
Measures how fast the database responds to queries.

**Good:** < 100ms
**Acceptable:** 100-500ms
**Slow:** > 500ms

**If Slow:**
- Database may be under heavy load
- Check for long-running queries
- Consider database optimization

---

### 🔀 **Replication Status**
Shows WAL (Write-Ahead Logging) level for database reliability.

**Expected:** `wal_level = replica` or `logical`

---

## Understanding the Report

### Status Symbols
- ✅ **Green Check**: All good
- ⚠️ **Yellow Warning**: Minor issue or unusual
- ❌ **Red X**: Critical problem - database not working

### Exit Codes
- `0`: Success (all checks passed or minor warnings)
- `1`: Failure (critical issues found)

---

## Common Issues & Solutions

### ❌ "DATABASE_URL is not set"
**Solution:**
1. Create `.env` file in project root
2. Add: `DATABASE_URL="postgresql://user:password@host:port/db"`
3. Also add: `DIRECT_URL="postgresql://user:password@host:port/db"`
4. Save and restart

### ❌ "Failed to connect"
**Solutions:**
1. Check if PostgreSQL server is running
2. Verify DATABASE_URL is correct
3. Test connection manually:
   ```bash
   psql <your_database_url>
   ```
4. Check firewall/network access

### ⚠️ "No tables found" or "No migrations found"
**Solution:**
Initialize your database:
```bash
npx prisma migrate deploy
```

Or if starting fresh:
```bash
npx prisma migrate dev --name init
```

### ⚠️ "Queries very slow (>500ms)"
**Solutions:**
1. Check database server performance
2. Monitor active connections
3. Check for heavy queries in logs
4. Consider adding indexes to frequently searched columns

### ⚠️ "20+ active connections"
**Solution:**
```bash
# Restart your Next.js server
npm run dev
```

---

## Advanced Debugging

### Enable Query Logging
```bash
DEBUG_DB=1 npm run diagnose:db
```

This will show all SQL queries being executed.

### Check Database Logs
```bash
# PostgreSQL logs (varies by installation)
# Docker: docker logs <container_name>
# Local: Check /var/log/postgresql/
```

### Manual SQL Checks
Connect directly to database:
```bash
psql <DATABASE_URL>

# Check table sizes
SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename))
FROM pg_tables WHERE schemaname = 'public';

# Check active connections
SELECT count(*) FROM pg_stat_activity WHERE datname = current_database();

# Check for locks
SELECT * FROM pg_locks WHERE NOT granted;
```

---

## When to Run Diagnostics

1. **After deployment**: Verify database is working
2. **Performance issues**: Understand what's slow
3. **Errors in app**: Check if database is the issue
4. **Connection problems**: Diagnose connection issues
5. **Regular maintenance**: Run weekly as health check

---

## Need Help?

If you see critical errors:

1. **Run the full diagnostic**: `npm run diagnose:db`
2. **Check the output** for which specific check failed
3. **Review solutions above** for that check
4. **Check logs**: See DATABASE-STRUCTURE.md and other docs in project root

For Supabase users:
- Check Supabase dashboard for connection info
- Verify you're using correct DATABASE_URL
- Check Supabase project status/logs
