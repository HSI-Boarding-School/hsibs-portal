# Link Management App

Aplikasi manajemen link seperti Linktree.

## 🚀 Akses

### Admin Dashboard
- **Sidebar**: Link Management → Home
- **URL**: `/dashboard/link-home`

### Link Management Portal
- **Sidebar**: Link Management → Portal
- **URL**: `/dashboard/link-management`

### Public View
- **URL**: `/links/azmanzakki`

## 📋 Fitur

### Home Dashboard
- Total links counter
- Total clicks counter
- Quick actions buttons

### Link Management Portal
- Tabel semua links
- Add link
- Edit link
- Delete link

### Public View
- Linktree-like design
- Clickable links

## 📁 File Structure

```
src/
├── sections/link-management/
│   ├── link-home-view.jsx
│   ├── link-management-view.jsx
│   ├── link-widget-summary.jsx
│   ├── link-quick-actions.jsx
│   └── index.js
├── sections/link-public/
│   ├── link-public-view.jsx
│   └── index.js
├── app/dashboard/
│   ├── link-home/page.jsx
│   └── link-management/page.jsx
├── app/links/[username]/page.jsx
├── _mock/_link.js
└── actions/link.js
```

## 🎯 Cara Menggunakan

### Tambah Link
1. Buka Link Management → Portal
2. Klik "Add Link"
3. Isi form (Nama, URL, Thumbnail)
4. Klik "Tambah"

### Edit Link
1. Di tabel, klik icon pen
2. Ubah data
3. Klik "Update"

### Hapus Link
1. Di tabel, klik icon trash
2. Konfirmasi penghapusan

### Lihat Public View
1. Buka `/links/azmanzakki`
2. Klik link untuk membuka URL

## 🔐 Authentication

Admin dashboard dilindungi oleh AuthGuard. Hanya user yang sudah login yang bisa mengakses.

## 📊 Mock Data

5 contoh links sudah tersedia:
- Instagram (1250 clicks)
- YouTube (2340 clicks)
- Twitter (890 clicks)
- LinkedIn (1560 clicks)
- TikTok (3200 clicks)

## 🎨 Design

- Material-UI components
- Responsive design
- Professional styling
- Icons dari Iconify

## 🔄 Next Steps

1. Backend integration
2. Database setup
3. User management
4. Analytics

---

**Ready to use! 🚀**
