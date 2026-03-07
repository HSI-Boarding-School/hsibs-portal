# Database Integration Plan - HSI Links Portal

## Status: 🔄 PENDING DATABASE CONNECTION

Siap untuk mengintegrasikan database dengan fitur-fitur yang sudah ada.

## Database Schema

### 1. Tabel Users
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  photo_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Fungsi:**
- Menyimpan data admin yang bisa login
- Menghubungkan link dengan pembuat

### 2. Tabel Links
```sql
CREATE TABLE links (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  url VARCHAR(500) NOT NULL,
  thumbnail LONGBLOB,
  total_clicks INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

**Fungsi:**
- Menyimpan semua link yang dibuat admin
- Menyimpan thumbnail dan URL tujuan
- Menyimpan jumlah klik dari setiap link

### 3. Tabel Link_Clicks
```sql
CREATE TABLE link_clicks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  link_id INT NOT NULL,
  clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (link_id) REFERENCES links(id)
);
```

**Fungsi:**
- Mencatat setiap klik link
- Digunakan untuk analisis jumlah klik
- Bisa digunakan untuk statistik di dashboard

## Relasi Antar Tabel

```
Users (1) ──→ (Many) Links
  ↓
  └─→ Links (1) ──→ (Many) Link_Clicks
```

- **Users → Links**: 1 user dapat memiliki banyak link
- **Links → Link_Clicks**: 1 link dapat memiliki banyak data klik

## Fitur yang Akan Diintegrasikan

### Dashboard Home
- ✅ Total Links (dari tabel links)
- ✅ Total Clicks (dari tabel link_clicks)
- ✅ Link Preview (dari tabel links)

### Link Management
- ✅ Add Link (INSERT ke tabel links)
- ✅ Edit Link (UPDATE tabel links)
- ✅ Delete Link (DELETE dari tabel links)
- ✅ List Links (SELECT dari tabel links)

### Public View
- ✅ Display Links (SELECT dari tabel links)
- ✅ Track Clicks (INSERT ke tabel link_clicks, UPDATE total_clicks)

### Authentication
- ✅ Login (SELECT dari tabel users dengan email/password)
- ✅ User Session (SELECT dari tabel users)

## Informasi yang Dibutuhkan

Untuk melanjutkan integrasi, mohon sediakan:

1. **Database Connection String**
   ```
   DATABASE_URL="..."
   ```

2. **ORM/Database Client yang Digunakan**
   - [ ] Prisma
   - [ ] Drizzle
   - [ ] Supabase
   - [ ] Raw SQL
   - [ ] Lainnya: ___________

3. **Existing User Accounts**
   - Email: ___________
   - Password: ___________
   - (Untuk testing login)

4. **Database Type**
   - [ ] PostgreSQL
   - [ ] MySQL
   - [ ] SQLite
   - [ ] Lainnya: ___________

## Langkah Integrasi

### Phase 1: Setup Database Connection
- [ ] Update `.env` dengan DATABASE_URL
- [ ] Setup ORM/Database Client
- [ ] Test koneksi database

### Phase 2: Update Authentication
- [ ] Modify login untuk query dari tabel users
- [ ] Update JWT token generation
- [ ] Test login dengan existing account

### Phase 3: Update Link Management
- [ ] Replace mock data dengan database queries
- [ ] Implement Add Link (INSERT)
- [ ] Implement Edit Link (UPDATE)
- [ ] Implement Delete Link (DELETE)
- [ ] Implement List Links (SELECT)

### Phase 4: Update Dashboard
- [ ] Fetch total links dari database
- [ ] Fetch total clicks dari database
- [ ] Update link preview dengan data real

### Phase 5: Update Public View
- [ ] Fetch links dari database
- [ ] Implement click tracking (INSERT ke link_clicks)
- [ ] Update total_clicks counter

### Phase 6: Testing & Optimization
- [ ] Test semua fitur dengan database real
- [ ] Optimize queries
- [ ] Add error handling
- [ ] Performance testing

## File yang Akan Dimodifikasi

### Authentication
- `src/auth/context/jwt/action.js` - Login logic
- `src/sections/auth/login-view.jsx` - Login form

### Link Management
- `src/sections/link-management/link-management-view.jsx` - CRUD operations
- `src/sections/link-management/link-home-view.jsx` - Dashboard stats
- `src/actions/link.js` - Link actions

### Public View
- `src/sections/link-public/link-public-view.jsx` - Display & click tracking
- `src/app/links/[username]/page.jsx` - Public page

### Mock Data
- `src/_mock/_link.js` - Replace dengan database queries

## API Endpoints yang Akan Dibuat

```
POST   /api/auth/login          - Login user
GET    /api/auth/me             - Get current user
POST   /api/links               - Create link
GET    /api/links               - Get all links for user
PUT    /api/links/:id           - Update link
DELETE /api/links/:id           - Delete link
POST   /api/links/:id/click     - Track link click
GET    /api/links/stats         - Get link statistics
```

## Timeline

Menunggu informasi database dari user untuk memulai integrasi.

---

**Status**: Siap untuk integrasi
**Tanggal**: March 7, 2026
**Scope**: Full Database Integration
