# Admin Credentials Check Guide

## Quick Start

### Option 1: Using the Script (Easiest)
```bash
# From project root
node scripts/check-admin-credentials.js

# Or on Windows, double-click:
check-admin.bat
```

### Option 2: Using npm
Add this to your `package.json` scripts section:
```json
"check-admin": "node scripts/check-admin-credentials.js"
```

Then run:
```bash
npm run check-admin
```

## What the Script Can Do

1. **Check Current Admin** - Verify if admin exists and see details
2. **List All Admins** - See all admin users in database
3. **Reset Password** - Change admin password securely
4. **Create New Admin** - Add a new admin user (if none exists)
5. **View Env Info** - See what environment variables are used

## Default Credentials

Your default credentials (set in `.env`):
- **Email**: `admin@webdesino.com` (or your custom ADMIN_EMAIL)
- **Password**: `admin123` (or your custom ADMIN_PASSWORD)

## If You're Locked Out

### Step 1: Check if admin exists
```bash
npm run check-admin
# Select option 1
```

### Step 2: Reset password
```bash
npm run check-admin
# Select option 3
# Enter your admin email
# Enter a new password
```

### Step 3: Access admin panel
1. Go to `http://localhost:3000/admin`
2. Login with your email and new password

## Alternative Methods

### Using Prisma Studio
```bash
npx prisma studio
```
Then navigate to Admin table and manually update.

### Direct Database Reset
If you have database access, you can:
1. Delete the admin user
2. Run `npm run seed` to recreate with environment variables

### Using Forgot Password
1. Go to `http://localhost:3000/admin/forgot-password`
2. Enter your email
3. Check your email for reset link
4. Click link and set new password

## Requirements

- Node.js installed
- `.env` file configured with DATABASE_URL
- Prisma set up (`npx prisma migrate dev`)
- bcryptjs package (should already be installed)

## Troubleshooting

**"Database connection error"**
- Check `.env` has valid DATABASE_URL
- Ensure database is running
- Run `npx prisma migrate dev`

**"No admin user found"**
- Use option 4 to create new admin
- Or run `npm run seed`

**"Email already exists"**
- Choose option 3 to reset existing admin password
- Or delete admin and recreate

## Security Note

⚠️ This script uses bcryptjs with 12 salt rounds (industry standard).
Passwords are always hashed before storage - never stored in plaintext.
