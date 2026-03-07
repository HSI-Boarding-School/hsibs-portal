# Login System Setup

## Overview
Sistem login telah diimplementasikan dengan layout 50/50 split design.

## Perubahan yang Dilakukan

### 1. Login Page
- **Path**: `/login`
- **File**: `src/app/login/page.jsx` dan `src/app/login/layout.jsx`
- **Component**: `src/sections/auth/login-view.jsx`

### 2. Layout 50/50
- **Kiri**: Branding section dengan logo HSIBS dan welcome message
- **Kanan**: Login form dengan email dan password fields
- **Responsive**: Di mobile, hanya form yang ditampilkan

### 3. Home Page Redirect
- **Path**: `/` (home page)
- **Behavior**: Redirect otomatis ke `/login`
- **File**: `src/app/(home)/page.jsx`

### 4. Authentication Flow
1. User membuka aplikasi → redirect ke `/login`
2. User login dengan email dan password
3. Setelah login → redirect ke `/dashboard/link-home`
4. User logout → redirect ke `/login`

### 5. Protected Routes
- Dashboard dan semua sub-routes dilindungi dengan `AuthGuard`
- Jika user tidak authenticated → redirect ke `/login`

## Credentials Demo
- **Email**: demo@minimals.cc
- **Password**: @2Minimal

## File Structure
```
src/
├── app/
│   ├── login/
│   │   ├── page.jsx
│   │   └── layout.jsx
│   ├── (home)/
│   │   └── page.jsx (redirect to /login)
│   └── dashboard/
│       └── layout.jsx (protected with AuthGuard)
├── sections/
│   └── auth/
│       └── login-view.jsx
└── routes/
    └── paths.js (added login path)
```

## Styling
- **Theme**: Blue gradient background (primary.main → primary.dark)
- **Logo**: logohsibs.png (inverted for white appearance)
- **Colors**: Menggunakan theme biru yang sudah dikonfigurasi
- **Dark Mode**: Fully supported

## Logout
- Logout button ada di Account Drawer (klik avatar di navbar)
- Setelah logout → redirect ke `/login`

---

**Status**: ✅ Complete
**Last Updated**: March 5, 2026
