# Lucide React Integration Guide

## Overview
Project ini akan mengintegrasikan **Lucide React** untuk menggantikan Iconify sebagai icon library utama.

## Teknologi Stack Project

### Frontend
- **Next.js 15.2.4**: React framework dengan SSR, SSG, dan API routes
- **React 19.1.0**: UI library dengan hooks
- **Material-UI 7.0.1**: Component library profesional
- **TypeScript/JavaScript**: Bahasa pemrograman
- **React Hook Form 7.55.0**: Form management
- **Zod 3.24.2**: Schema validation
- **Axios 1.8.4**: HTTP client
- **Framer Motion 12.6.1**: Animation library

### State Management
- React Context API untuk authentication
- Local state dengan useState

### Authentication
- JWT-based authentication
- Custom auth context dan guards

### Current Icon Library
- **Iconify React 5.2.0**: Icon library yang akan diganti

---

## Lucide React Integration Plan

### Step 1: Install Lucide React
```bash
npm install lucide-react
# atau
yarn add lucide-react
```

### Step 2: Icon Mapping
Berikut adalah mapping icon dari Iconify ke Lucide React:

| Iconify | Lucide React | Usage |
|---------|-------------|-------|
| solar:link-bold | Link | Link management |
| solar:add-circle-bold | PlusCircle | Add button |
| solar:pen-bold | Edit2 | Edit button |
| solar:trash-bin-trash-bold | Trash2 | Delete button |
| solar:arrow-right-bold | ArrowRight | Navigation arrow |
| solar:eye-bold | Eye | Show password |
| solar:eye-closed-bold | EyeOff | Hide password |
| solar:phone-bold | Phone | Phone contact |
| solar:mail-bold | Mail | Email contact |
| solar:upload-bold | Upload | File upload |
| solar:settings-bold | Settings | Settings |
| solar:cursor-bold | Cursor | Clicks counter |
| mingcute:close-line | X | Close button |
| eva:arrow-ios-downward-fill | ChevronDown | Dropdown |
| eva:arrow-ios-forward-fill | ChevronRight | Forward arrow |
| mingcute:add-line | Plus | Add icon |

### Step 3: Files to Update
1. `src/sections/link-management/link-home-view.jsx`
2. `src/sections/link-management/link-management-view.jsx`
3. `src/sections/link-management/link-quick-actions.jsx`
4. `src/sections/link-management/link-preview.jsx`
5. `src/sections/link-public/link-public-view.jsx`
6. `src/sections/auth/login-view.jsx`
7. `src/layouts/components/account-drawer.jsx`
8. `src/layouts/components/sign-out-button.jsx`
9. `src/layouts/dashboard/layout.jsx`
10. Dan file-file lainnya yang menggunakan Iconify

### Step 4: Implementation Pattern

**Before (Iconify):**
```jsx
import { Iconify } from 'src/components/iconify';

<Iconify icon="solar:link-bold" />
```

**After (Lucide React):**
```jsx
import { Link } from 'lucide-react';

<Link size={24} />
```

### Step 5: Benefits
- ✅ Lebih ringan (tree-shakeable)
- ✅ Lebih cepat loading
- ✅ Lebih mudah customize
- ✅ Lebih banyak icon pilihan
- ✅ Lebih baik untuk performance

---

## Status
- [ ] Install lucide-react
- [ ] Update link-home-view.jsx
- [ ] Update link-management-view.jsx
- [ ] Update link-quick-actions.jsx
- [ ] Update link-preview.jsx
- [ ] Update link-public-view.jsx
- [ ] Update login-view.jsx
- [ ] Update account-drawer.jsx
- [ ] Update sign-out-button.jsx
- [ ] Update layout.jsx
- [ ] Remove Iconify dependency (optional)

---

**Last Updated**: March 5, 2026
