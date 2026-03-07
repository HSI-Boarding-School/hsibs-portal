# Profile Photo Upload Feature

## Overview
Implemented feature untuk upload dan simpan foto profile per user ke Supabase Storage.

## How It Works

### 1. Upload Foto
- User click "Edit Profile" di account drawer
- Upload foto (max 5MB, image only)
- Foto di-preview sebelum disimpan

### 2. Simpan ke Supabase Storage
- Foto di-upload ke Supabase Storage bucket `profiles`
- Filename: `profile-photos/{userId}-{timestamp}-{originalName}`
- Public URL di-generate otomatis

### 3. Simpan URL ke Auth Metadata
- Foto URL disimpan ke `user_metadata.avatar_url`
- Linked dengan user ID

### 4. Fetch & Display
- Foto di-fetch dari user metadata saat load
- Ditampilkan di account drawer dan header
- Berbeda per user yang login

## Files Modified

### 1. src/lib/supabase-client.js
Added two new functions:
```javascript
// Upload profile photo to Supabase Storage
export async function uploadProfilePhoto(file, userId)

// Update user profile (name + photo)
export async function updateUserProfile(displayName, photoUrl)
```

### 2. src/layouts/components/account-drawer.jsx
- Added imports: `uploadProfilePhoto`, `updateUserProfile`
- Updated `handleSaveEdit()` untuk:
  - Upload foto jika ada file baru
  - Get public URL dari Supabase
  - Update profile dengan nama + foto URL
  - Show loading state

## Features
✅ Upload foto profile
✅ Validate file type (image only)
✅ Validate file size (max 5MB)
✅ Preview foto sebelum upload
✅ Simpan ke Supabase Storage
✅ Simpan URL ke auth metadata
✅ Real-time update
✅ Berbeda per user

## Data Storage
- **Foto**: Supabase Storage bucket `profiles`
- **URL**: Supabase auth `user_metadata.avatar_url`
- **Naming**: `profile-photos/{userId}-{timestamp}-{filename}`

## Prerequisites
Perlu buat Supabase Storage bucket bernama `profiles`:
1. Go to Supabase dashboard
2. Storage → Create new bucket
3. Name: `profiles`
4. Make public: Yes
5. Create

## Testing
1. Login ke dashboard
2. Click avatar di header
3. Click "Edit Profile"
4. Upload foto
5. Edit nama (optional)
6. Click "Simpan"
7. Foto harus update di drawer dan header
8. Logout dan login dengan user lain
9. Foto harus berbeda per user
10. Refresh page - foto harus tetap tersimpan

## Error Handling
- File type validation (image only)
- File size validation (max 5MB)
- Upload error handling
- User feedback via alerts

## Future Enhancements
- Crop foto sebelum upload
- Delete foto lama saat upload baru
- Foto compression
- Multiple photo support

## Status
✅ Complete - User dapat upload dan simpan foto profile per user
⚠️ Requires: Supabase Storage bucket `profiles` harus dibuat manually
