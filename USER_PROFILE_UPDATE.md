# User Profile Update Feature

## Overview
Implemented feature untuk edit dan simpan nama user ke Supabase auth user_metadata.

## How It Works

### 1. User Edit Nama
- Click "Edit Profile" button di account drawer
- Edit display name di dialog
- Click "Simpan"

### 2. Simpan ke Database
- Nama disimpan ke Supabase auth `user_metadata.name`
- Menggunakan `updateUserDisplayName()` function
- Tidak perlu buat table baru

### 3. Fetch Nama
- Nama di-fetch dari Supabase auth saat load
- Ditampilkan di account drawer dan header

## Files Modified

### 1. src/lib/supabase-client.js
Added two new functions:
```javascript
// Update user display name in auth metadata
export async function updateUserDisplayName(displayName)

// Get current user profile
export async function getCurrentUser()
```

### 2. src/layouts/components/account-drawer.jsx
- Added import: `updateUserDisplayName` from supabase-client
- Added import: `CircularProgress` from MUI
- Added state: `isSaving` untuk track loading state
- Updated `handleSaveEdit()` untuk:
  - Validate input
  - Call `updateUserDisplayName()`
  - Show success/error message
  - Close dialog
- Updated dialog buttons untuk show loading state

## Features
✅ Edit display name
✅ Validate input (tidak boleh kosong)
✅ Loading state saat menyimpan
✅ Success/error messages
✅ Simpan ke Supabase auth metadata
✅ Real-time update

## Data Storage
- **Location**: Supabase auth `user_metadata`
- **Field**: `name`
- **Format**: String
- **Max length**: No limit (but recommended < 100 chars)

## Testing
1. Login ke dashboard
2. Click avatar di header
3. Click "Edit Profile"
4. Edit nama
5. Click "Simpan"
6. Nama harus update di drawer dan header
7. Refresh page - nama harus tetap tersimpan

## Future Enhancements
- Upload foto profile (currently UI only)
- Edit email
- Edit bio/description
- Profile picture storage di Supabase Storage

## Status
✅ Complete - User dapat edit dan simpan nama ke database
