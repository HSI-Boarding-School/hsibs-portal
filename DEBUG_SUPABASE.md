# Supabase Debug Guide

## Possible Issues

1. **Table Name Mismatch**
   - Check if table names are correct: `links`, `click_logs`
   - Supabase table names are case-sensitive

2. **User ID Issue**
   - Check if user.id is being passed correctly
   - Verify user ID format (should be UUID or number)

3. **RLS Policies**
   - If RLS is enabled, queries might be blocked
   - Check Supabase RLS policies

4. **Column Names**
   - Verify column names match exactly
   - Check for typos: `user_id`, `link_id`, `created_at`

## How to Debug

### Step 1: Check Browser Console
Open DevTools (F12) → Console tab
Look for error messages from Supabase

### Step 2: Check Supabase Dashboard
1. Go to https://app.supabase.com
2. Select your project
3. Go to SQL Editor
4. Run: `SELECT * FROM links LIMIT 1;`
5. Check if table exists and has data

### Step 3: Verify User ID
In browser console, run:
```javascript
const { user } = useAuthContext();
console.log('User ID:', user?.id);
```

### Step 4: Test Query Directly
In browser console:
```javascript
import { supabase } from 'src/lib/supabase';
const { data, error } = await supabase
  .from('links')
  .select('*')
  .limit(1);
console.log('Data:', data);
console.log('Error:', error);
```

## Common Errors

### "relation "links" does not exist"
- Table name is wrong
- Check exact table name in Supabase

### "permission denied for schema public"
- RLS policy is blocking access
- Disable RLS or update policies

### "column "user_id" does not exist"
- Column name is wrong
- Check exact column names

## Next Steps

1. Check Supabase dashboard for table structure
2. Verify table names and column names
3. Check if RLS is enabled
4. Verify user ID is being passed correctly
5. Check browser console for detailed error messages

---

**Note**: The error message `{}` means the error object is empty or not properly formatted. This usually indicates a network issue or Supabase client not initialized properly.
