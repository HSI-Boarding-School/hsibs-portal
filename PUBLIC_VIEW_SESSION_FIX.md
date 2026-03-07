# Fix: Public View Now Uses Session Storage for User ID

## Problem
Public view tidak bisa menggunakan `useAuthContext()` karena itu adalah public page yang bisa diakses tanpa login. Sehingga tidak bisa get user ID untuk fetch links.

## Solution
Extract user ID dari JWT token yang disimpan di session storage.

### How It Works

1. **When user logs in:**
   - JWT token disimpan di `sessionStorage.getItem('accessToken')`
   - Token berisi user ID di payload `sub` field

2. **When user visits public view:**
   - Component extract token dari session storage
   - Parse JWT payload untuk get user ID
   - Fetch links berdasarkan user ID

3. **JWT Token Structure:**
   ```
   Header.Payload.Signature
   
   Payload contains:
   {
     "sub": "8864c717-587d-472a-929a-8e5f298024da",  // user ID
     "email": "user@example.com",
     ...
   }
   ```

### Code Implementation

```javascript
useEffect(() => {
  // Try to get user ID from session storage (if user is logged in)
  const token = sessionStorage.getItem('accessToken');
  if (token) {
    try {
      // Parse JWT: split by '.', take payload (index 1), decode base64
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.sub) {
        setUserId(payload.sub);
      }
    } catch (error) {
      console.error('Error parsing token:', error);
    }
  }
}, []);

useEffect(() => {
  // Fetch links when userId is available
  if (userId) {
    fetchLinks();
  }
}, [userId]);
```

## Flow

```
User Login
    ↓
Token saved to sessionStorage
    ↓
User visits /links/[username]
    ↓
Component reads token from sessionStorage
    ↓
Extract user ID from JWT payload
    ↓
Fetch links for that user
    ↓
Display links in public view
```

## Files Modified
- `src/sections/link-public/link-public-view.jsx`
  - Removed `useAuthContext()` import
  - Added session storage token parsing
  - Extract user ID from JWT payload
  - Fetch links based on extracted user ID

## Testing
1. Login dengan akun
2. Add link di dashboard
3. Visit `/links/[username]` → link harus muncul
4. Refresh page → link masih muncul (karena token di session storage)
5. Logout → token dihapus, public view tidak bisa fetch links

## Status
✅ Fixed - Public view now fetches links from session storage token
