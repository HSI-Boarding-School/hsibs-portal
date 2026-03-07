# Supabase Setup Guide - HSI Links Portal

## Status: 🔄 PENDING CONFIGURATION

Panduan lengkap untuk setup Supabase dan mengintegrasikan database dengan project.

## Prerequisites

1. Akun Supabase (https://supabase.com)
2. Project Supabase sudah dibuat
3. Database sudah memiliki 3 tabel: `users`, `links`, `link_clicks`

## Step 1: Dapatkan Supabase Credentials

1. Login ke Supabase Dashboard
2. Pilih project Anda
3. Pergi ke **Settings → API**
4. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Step 2: Update Environment Variables

Edit file `.env.local` atau `.env`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Database Configuration (jika diperlukan)
DATABASE_URL=postgresql://user:password@db.supabase.co:5432/postgres
```

## Step 3: Verify Database Tables

Pastikan 3 tabel berikut sudah ada di Supabase:

### Tabel: users
```sql
CREATE TABLE users (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Tabel: links
```sql
CREATE TABLE links (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  thumbnail TEXT,
  total_clicks INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### Tabel: link_clicks
```sql
CREATE TABLE link_clicks (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  link_id BIGINT NOT NULL REFERENCES links(id) ON DELETE CASCADE,
  clicked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Step 4: Create Indexes (Optional but Recommended)

```sql
-- Index untuk faster queries
CREATE INDEX idx_links_user_id ON links(user_id);
CREATE INDEX idx_link_clicks_link_id ON link_clicks(link_id);
CREATE INDEX idx_users_email ON users(email);
```

## Step 5: Insert Test User

```sql
INSERT INTO users (name, email, password) VALUES
(
  'Admin User',
  'admin@example.com',
  '$2a$10$...' -- bcrypt hashed password
);
```

**Untuk generate bcrypt password, gunakan:**
```bash
npm install bcryptjs
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('password123', 10))"
```

## Step 6: Enable Row Level Security (RLS)

Untuk keamanan, enable RLS pada tabel:

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE links ENABLE ROW LEVEL SECURITY;
ALTER TABLE link_clicks ENABLE ROW LEVEL SECURITY;

-- Policies untuk users (hanya bisa lihat diri sendiri)
CREATE POLICY "Users can view own data"
  ON users FOR SELECT
  USING (auth.uid()::text = id::text);

-- Policies untuk links (bisa lihat link milik sendiri)
CREATE POLICY "Users can view own links"
  ON links FOR SELECT
  USING (user_id = auth.uid()::bigint);

-- Policies untuk link_clicks (public read)
CREATE POLICY "Anyone can view link clicks"
  ON link_clicks FOR SELECT
  USING (true);
```

## Step 7: Install Dependencies

```bash
npm install jwt-decode bcryptjs
# atau
yarn add jwt-decode bcryptjs
```

## Step 8: Test Connection

Buat file test di root project:

```javascript
// test-supabase.js
import { supabase } from './src/lib/supabase.js';

async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .limit(1);

    if (error) throw error;
    console.log('✅ Supabase connection successful!');
    console.log('Users:', data);
  } catch (error) {
    console.error('❌ Connection failed:', error);
  }
}

testConnection();
```

Run test:
```bash
node test-supabase.js
```

## File Structure

```
src/
├── lib/
│   ├── supabase.js              # Supabase client
│   ├── supabase-client.js       # Database queries
│   └── auth-utils.js            # JWT utilities
├── app/
│   └── api/
│       ├── auth/
│       │   ├── login/route.js   # Login endpoint
│       │   └── me/route.js      # Get current user
│       └── links/
│           ├── route.js         # Get/Create links
│           └── [id]/
│               ├── route.js     # Get/Update/Delete link
│               └── click/route.js # Record click
```

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Links
- `GET /api/links` - Get all user's links
- `POST /api/links` - Create new link
- `GET /api/links/[id]` - Get single link
- `PUT /api/links/[id]` - Update link
- `DELETE /api/links/[id]` - Delete link
- `POST /api/links/[id]/click` - Record link click

## Next Steps

1. ✅ Setup Supabase project
2. ✅ Create database tables
3. ✅ Update environment variables
4. ⏳ Update authentication logic
5. ⏳ Update link management components
6. ⏳ Update dashboard components
7. ⏳ Test all features

## Troubleshooting

### Connection Error
- Verify SUPABASE_URL dan SUPABASE_ANON_KEY di .env
- Check Supabase project status
- Verify network connectivity

### Authentication Error
- Ensure user exists di tabel users
- Verify password hashing
- Check JWT token expiration

### Query Error
- Verify table names dan column names
- Check RLS policies
- Verify user permissions

## Security Notes

⚠️ **Important:**
- Never commit `.env` file dengan credentials
- Use `.env.local` untuk local development
- Rotate keys regularly
- Enable RLS untuk production
- Use HTTPS untuk API calls

---

**Status**: Ready for configuration
**Last Updated**: March 7, 2026
