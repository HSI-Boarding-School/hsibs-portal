# Profile Edit Feature

## Overview
Fitur edit profile telah ditambahkan ke account drawer, memungkinkan admin untuk mengubah nama dan foto profile dengan file upload.

## Fitur

### Account Drawer
- Avatar dengan border animasi
- Nama user
- Email user
- **Tombol "Edit Profile"** (baru)
- Logout button

### Edit Profile Dialog
- **Display Name**: Ubah nama user
- **Foto Profile**: Upload file gambar dengan preview
  - Validasi: Hanya file gambar (image/*)
  - Validasi: Maksimal 5MB
  - Preview: Menampilkan gambar sebelum disimpan
  - Nama file: Ditampilkan di bawah tombol upload
- Tombol Batal dan Simpan

## Cara Menggunakan

1. Klik avatar di header (top-right)
2. Drawer terbuka menampilkan profil user
3. Klik tombol "Edit Profile"
4. Dialog terbuka dengan form:
   - Display Name (nama user)
   - Foto Profile (file upload)
5. Ubah data sesuai kebutuhan:
   - Ketik nama baru di Display Name
   - Klik "Upload Foto" untuk memilih file gambar
   - Preview gambar akan ditampilkan
6. Klik "Simpan" untuk menyimpan perubahan

## Validasi

- **File Type**: Hanya menerima file gambar (jpg, png, gif, dll)
- **File Size**: Maksimal 5MB
- **Display Name**: Tidak ada validasi khusus (bisa kosong)

## Implementation Notes

### Current State
- Form sudah berfungsi dengan baik
- File upload dengan preview sudah berfungsi
- Validasi file type dan size sudah berfungsi
- Data di-store di local state
- Console log menampilkan data yang akan disimpan

### TODO
- Integrasi dengan backend/auth context untuk menyimpan perubahan
- Upload file ke server/cloud storage
- Update user context setelah perubahan berhasil
- Loading state saat menyimpan
- Error handling untuk upload

## File Modified
- `src/layouts/components/account-drawer.jsx`

## Components Used
- Material-UI Dialog
- Material-UI TextField
- Material-UI Button
- Material-UI Stack
- Material-UI Card
- HTML5 File Input

---

**Status**: ✅ UI Complete with File Upload, Pending Backend Integration
**Last Updated**: March 5, 2026
