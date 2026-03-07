# Supabase Error Fix - Database Query Issues

## Status: ✅ FIXED WITH FALLBACK

Error `Error fetching links: {}` sudah di-fix dengan better error handling dan fallback ke mock data.

## Apa yang Sudah Diubah

### 1. Better Error Logging
**`src/lib/supabase-client.js`**
- Added detailed error logging dengan `error.message` dan `error.details`
- Added userId validation checks
- Better error messages untuk debugging

### 2. Fallback to Mock Data
**`src/sections/link-management/link-home-view.jsx`**
- Added error state handling
- Shows warning alert jika database query gagal
- Fallback ke mock data (`_links`) jika Supabase error
- User tetap bisa melihat dashboard dengan demo data

### 3. Better Logging
- Console logs untuk track user ID
- Console logs untuk track fetched data
- Easier debugging di browser console

## Kemungkinan Penyebab Error

### 1. Table Name Salah
- Pastikan table names: `links`, `click_logs`
- Supabase case-sensitive untuk table names

### 2. Column Names Salah
- Pastikan column names: `user_id`, `link_id`, `created_at`, `title`, `url`, `thumbnail`, `total_clicks`
- Check typos

### 3. RLS Policies
- Jika RLS enabled, queries mungkin di-block
- Disable RLS atau update policies

### 4. User ID Issue
- User ID mungkin tidak ter-pass dengan benar
- Check format user ID (UUID atau number)

### 5. Network Issue
- Supabase connection mungkin timeout
- Check internet connection

## Cara Debug

### Step 1: Check Browser Console
1. Open DevTools (F12)
2. Go to Console tab
3. Look for error messages
4. Check logs: "Fetching stats for user:", "Stats fetched"

### Step 2: Verify Supabase Connection
```javascript
// Di browser console
import { supabase } from 'src/lib/supabase';
console.log('Supabase:', supabase);
console.log('Supabase URL:', supabase.supabaseUrl);
```

### Step 3: Test Query Directly
```javascript
// Di browser console
const { data, error } = await supabase
  .from('links')
  .select('*')
  .limit(1);
console.log('Data:', data);
console.log('Error:', error);
```

### Step 4: Check Supabase Dashboard
1. Go to https://app.supabase.com
2. Select project: hsibs_links
3. Go to SQL Editor
4. Run queries:
   ```sql
   SELECT * FROM links LIMIT 5;
   SELECT * FROM click_logs LIMIT 5;
   ```
5. Check if tables exist dan ada data

### Step 5: Verify Table Structure
```sql
-- Check links table
SELECT column_name, data_type FROM information_schema.columns 
WHERE table_name = 'links';

-- Check click_logs table
SELECT column_name, data_type FROM information_schema.columns 
WHERE table_name = 'click_logs';
```

## Current Behavior

✅ **Jika Supabase berhasil**: Data ditampilkan dari database
✅ **Jika Supabase gagal**: Warning alert ditampilkan + fallback ke mock data
✅ **User tetap bisa**: Melihat dashboard dan test fitur dengan demo data

## Next Steps

### Option 1: Fix Database (Recommended)
1. Verify table names dan column names di Supabase
2. Ensure RLS policies allow queries
3. Check user ID format
4. Test queries di Supabase SQL Editor

### Option 2: Use Mock Data Temporarily
- Aplikasi sudah fallback ke mock data
- User bisa test fitur dengan demo data
- Fix database later

### Option 3: Check Supabase Logs
1. Go to Supabase Dashboard
2. Go to Logs → Database
3. Check untuk error messages
4. Look untuk failed queries

## Common Fixes

### Fix 1: Disable RLS (Development Only)
```sql
ALTER TABLE links DISABLE ROW LEVEL SECURITY;
ALTER TABLE click_logs DISABLE ROW LEVEL SECURITY;
```

### Fix 2: Create RLS Policies
```sql
-- Allow all for development
CREATE POLICY "Allow all" ON links FOR ALL USING (true);
CREATE POLICY "Allow all" ON click_logs FOR ALL USING (true);
```

### Fix 3: Verify Table Exists
```sql
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_name = 'links'
);
```

## Error Messages Reference

| Error | Cause | Fix |
|-------|-------|-----|
| `relation "links" does not exist` | Table name wrong | Check table name in Supabase |
| `column "user_id" does not exist` | Column name wrong | Check column names |
| `permission denied` | RLS blocking | Disable RLS or update policies |
| `{}` (empty error) | Network/connection issue | Check internet, Supabase status |

## Files Modified

- ✅ `src/lib/supabase-client.js` - Better error logging
- ✅ `src/sections/link-management/link-home-view.jsx` - Error handling + fallback

## Testing

1. Open dashboard
2. Check browser console untuk logs
3. Verify stats ditampilkan (dari database atau mock data)
4. Check warning alert jika ada error

---

**Status**: Error handled with fallback
**Date**: March 7, 2026
**Next**: Verify Supabase database structure
