# Admin Authentication Configuration Summary

## Overview
The WebDesino application uses a hybrid authentication system with **Supabase Auth** as the primary authentication provider and **Prisma** for database user management with **bcryptjs** for password hashing.

---

## 1. Admin User Model (Prisma Schema)

### File: `prisma/schema.prisma`

```prisma
model Admin {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

**Key Fields:**
- `id`: Unique identifier (CUID format)
- `email`: Unique email address for login
- `password`: Hashed password stored in database
- `name`: Optional admin name
- `createdAt` / `updatedAt`: Timestamps

---

## 2. Password Hashing & Verification

### File: `lib/auth.ts`

```typescript
import { hash, compare } from "bcryptjs";

export async function hashPassword(password: string) {
  return await hash(password, 12);
}

export async function comparePassword(password: string, hash: string) {
  return await compare(password, hash);
}
```

**Hashing Details:**
- **Library**: bcryptjs
- **Salt Rounds**: 12 (security level)
- **Methods**: 
  - `hashPassword()`: Hashes plain password for storage
  - `comparePassword()`: Verifies plain password against hash

---

## 3. Admin Authentication Files

### 3.1 Login Page
**File**: `app/admin/page.tsx` (Admin Login)

- **Client Component** with form handling
- **Form Fields**: Email, Password
- **Links**: Forgot password link (`/admin/forgot-password`)
- **Action**: Calls `login()` from `lib/auth-actions`
- **UI**: Gradient backdrop, glass-morphism design with Lucide icons

### 3.2 Forgot Password Page
**File**: `app/admin/forgot-password/page.tsx`

- **Client Component** for password reset request
- **Form Field**: Email address
- **Action**: Calls `forgotPassword()` from `lib/auth-actions`
- **Success State**: Shows confirmation message
- **Error Handling**: Displays error messages

### 3.3 Reset Password Page
**File**: `app/admin/reset-password/page.tsx`

- **Client Component** for setting new password
- **Form Fields**: New password, Confirm password
- **Action**: Calls `updatePassword()` from `lib/auth-actions`
- **Token Handling**: Processes Supabase recovery tokens
- **Validation**: Minimum 6 character password

### 3.4 Admin Dashboard Layout
**File**: `app/admin/(protected)/layout.tsx`

- **Protected Route**: Uses Supabase session check
- **Components**:
  - Desktop sidebar (60px width)
  - Mobile sidebar toggle
  - Top navbar with user profile
  - User initial avatar
  - User email display
- **Session**: Retrieves user from Supabase Auth

---

## 4. Authentication Actions

### File: `lib/auth-actions.ts`

#### `login(formData: FormData)`
```typescript
- Extracts email and password
- Validates required fields
- Calls Supabase: signInWithPassword()
- Returns: { success: boolean, error?: string }
- No Prisma sync (Supabase is source of truth)
```

#### `logout()`
```typescript
- Signs out user from Supabase
- Redirects to /admin login page
```

#### `forgotPassword(formData: FormData)`
```typescript
- Extracts email from form
- Resolves app origin for redirect
- Sends Supabase password reset email
- Reset link redirects to: /admin/reset-password
- Returns: { success: boolean, error?: string }
```

#### `updatePassword(formData: FormData)`
```typescript
- Validates password and confirmation match
- Enforces minimum 6 character length
- Updates password in Supabase Auth
- Syncs password hash to Prisma Admin table (non-critical)
- Returns: { success: boolean, error?: string }
```

---

## 5. Middleware & Route Protection

### File: `middleware.ts`

**Admin Authentication Routes:**

| Path | Type | Protection | Behavior |
|------|------|-----------|----------|
| `/admin` | Public | None | Login page - redirects to dashboard if authenticated |
| `/admin/forgot-password` | Public | None | Password reset request page |
| `/admin/reset-password` | Public | None | Password reset form page |
| `/admin/auth-error` | Public | None | Error display page |
| `/admin/(protected)/**` | Protected | Session required | Redirects to `/admin` if not authenticated |
| `/admin/dashboard` | Protected | Session required | Main admin dashboard |

**Middleware Logic:**
```typescript
const isAdminPublicPath = path === "/admin" || path === "/admin/forgot-password" || 
                          path === "/admin/reset-password" || path === "/admin/auth-error";
const isProtectedPath = path.startsWith("/admin/") && !isAdminPublicPath;

// Unauth users accessing protected paths → redirect to /admin
if (isProtectedPath && !user) {
  return NextResponse.redirect(new URL("/admin", request.url));
}

// Auth users accessing login page → redirect to /admin/dashboard
if (isAuthPath && user) {
  return NextResponse.redirect(new URL("/admin/dashboard", request.url));
}
```

---

## 6. Environment Variables for Admin Setup

### File: `.env.example`

```env
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Supabase (Primary Auth Provider)
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Email (for password reset)
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASS="your-app-password"
EMAIL_FROM="noreply@webdesino.com"

# JWT (optional token-based auth)
JWT_SECRET="your-jwt-secret-key-here"

# Admin Credentials (for seeding)
ADMIN_EMAIL="admin@webdesino.com"
ADMIN_PASSWORD="admin123"
```

---

## 7. Admin Credential Seeding

### File: `prisma/seed.ts`

**Admin Creation Logic:**
```typescript
import { hash } from 'bcryptjs'

async function main() {
  // Get admin credentials from environment variables
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@webdesino.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  
  // Hash password with 12 salt rounds
  const password = await hash(adminPassword, 12)
  
  // Create or update admin user
  const admin = await prisma.admin.upsert({
    where: { email: adminEmail },
    update: {
      password: password,
    },
    create: {
      email: adminEmail,
      name: 'Admin',
      password,
    },
  })
}
```

**Running Seed:**
```bash
npx prisma db seed
```

---

## 8. Authentication Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│ Admin Login Flow                                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ 1. User visits /admin                                      │
│    └─> Shows login form (email + password)                │
│                                                             │
│ 2. User submits credentials                               │
│    └─> form data sent to login() action                   │
│                                                             │
│ 3. login() calls Supabase Auth                            │
│    └─> signInWithPassword(email, password)               │
│                                                             │
│ 4. Supabase returns session/auth token                     │
│    └─> Stored in browser cookies                         │
│                                                             │
│ 5. Middleware checks user session                          │
│    └─> If valid: redirect to /admin/dashboard            │
│    └─> If invalid: stay on /admin                        │
│                                                             │
│ 6. Dashboard layout verifies Supabase session              │
│    └─> Gets user email from session                       │
│    └─> Displays user profile in header                   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ Password Reset Flow                                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│ 1. User clicks "Forgot password?" on login page           │
│    └─> Navigate to /admin/forgot-password                 │
│                                                             │
│ 2. User enters email                                      │
│    └─> Calls forgotPassword() action                      │
│                                                             │
│ 3. forgotPassword() calls Supabase                         │
│    └─> resetPasswordForEmail(email, redirectTo)          │
│                                                             │
│ 4. Supabase sends password reset email                     │
│    └─> Contains magic link to /admin/reset-password       │
│                                                             │
│ 5. User clicks link in email                              │
│    └─> Reset page processes recovery token               │
│    └─> Via /auth/callback route                          │
│                                                             │
│ 6. User enters new password                               │
│    └─> Calls updatePassword() action                      │
│                                                             │
│ 7. updatePassword() calls Supabase                         │
│    └─> updateUser({ password: newPassword })             │
│                                                             │
│ 8. Password updated in Supabase Auth                       │
│    └─> Prisma Admin table synced (non-critical)          │
│    └─> Redirect to /admin login                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 9. Security Implementation

### Password Security
- **Hashing Algorithm**: bcryptjs (industry standard)
- **Salt Rounds**: 12 (computationally expensive, resistant to brute force)
- **Password Requirements**: Minimum 6 characters
- **Storage**: Passwords stored hashed, never in plaintext

### Session Security
- **Provider**: Supabase Auth (Hosted & Managed)
- **Session Storage**: HTTP-only cookies (XSS protection)
- **Token Expiry**: Managed by Supabase
- **Refresh**: Automatic token refresh in middleware

### Route Protection
- **Middleware**: All admin routes validated in `middleware.ts`
- **Protected Folder**: `app/admin/(protected)/` requires authentication
- **Public Routes**: Login, forgot password, reset password (no auth needed)
- **Fallback**: Unauthenticated access to protected routes redirects to login

### Email Verification
- **Service**: SMTP (Gmail configured)
- **Use**: Password reset token delivery only
- **Recovery**: No email confirmation required for login

---

## 10. Key Files Summary

| File | Purpose | Type |
|------|---------|------|
| `prisma/schema.prisma` | Admin model definition | Database Schema |
| `lib/auth.ts` | Password hash/verify utilities | Utilities |
| `lib/auth-actions.ts` | Authentication server actions | Server Logic |
| `middleware.ts` | Route protection & session check | Middleware |
| `app/admin/page.tsx` | Login form UI | Client Component |
| `app/admin/forgot-password/page.tsx` | Password reset request UI | Client Component |
| `app/admin/reset-password/page.tsx` | Password reset form UI | Client Component |
| `app/admin/(protected)/layout.tsx` | Protected dashboard layout | Server Component |
| `prisma/seed.ts` | Admin account seeding | Seed Script |
| `.env.example` | Environment variable template | Config |

---

## 11. Admin Setup Checklist

- [ ] Set `ADMIN_EMAIL` environment variable (default: admin@webdesino.com)
- [ ] Set `ADMIN_PASSWORD` environment variable (default: admin123)
- [ ] Configure Supabase credentials in `.env`
- [ ] Configure SMTP for password reset emails
- [ ] Run `npx prisma db seed` to create admin user
- [ ] Restart application to load new environment variables
- [ ] Verify login at `/admin`
- [ ] Test password reset flow
- [ ] Change default admin password after first login

---

## 12. Technology Stack

- **Frontend Auth UI**: React + Next.js
- **Auth Provider**: Supabase (OAuth/Session based)
- **Database**: PostgreSQL + Prisma ORM
- **Password Hashing**: bcryptjs
- **Email**: SMTP (Gmail)
- **Middleware**: Next.js middleware for route protection
- **UI Components**: Custom React components with Tailwind CSS
- **Icons**: Lucide React

---

## 13. Important Notes

1. **Supabase as Source of Truth**: Session stored in Supabase Auth, Prisma Admin table is optional backup
2. **Password Reset**: Uses Supabase recovery tokens, not custom JWT
3. **Email Required**: Admin must have valid email for password reset functionality
4. **Session Persistence**: Session persists across browser restarts (stored in cookies)
5. **Logout Behavior**: Clears Supabase session and redirects to login
6. **Multiple Tabs**: Session synced across browser tabs via Supabase
7. **Token Refresh**: Automatic background token refresh if still within refresh window
