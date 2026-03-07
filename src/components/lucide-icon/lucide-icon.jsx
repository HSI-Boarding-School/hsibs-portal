'use client';

import * as LucideIcons from 'lucide-react';

// Icon mapping dari Iconify ke Lucide React
const ICON_MAP = {
  'solar:link-bold': 'Link',
  'solar:add-circle-bold': 'PlusCircle',
  'solar:pen-bold': 'Edit2',
  'solar:trash-bin-trash-bold': 'Trash2',
  'solar:arrow-right-bold': 'ArrowRight',
  'solar:eye-bold': 'Eye',
  'solar:eye-closed-bold': 'EyeOff',
  'solar:phone-bold': 'Phone',
  'solar:mail-bold': 'Mail',
  'solar:upload-bold': 'Upload',
  'solar:settings-bold': 'Settings',
  'solar:cursor-bold': 'MousePointer',
  'mingcute:close-line': 'X',
  'eva:arrow-ios-downward-fill': 'ChevronDown',
  'eva:arrow-ios-forward-fill': 'ChevronRight',
  'mingcute:add-line': 'Plus',
};

/**
 * LucideIcon Component
 * Wrapper untuk Lucide React icons yang kompatibel dengan Iconify API
 * 
 * @param {string} icon - Icon name (e.g., 'solar:link-bold')
 * @param {number} width - Icon width (default: 24)
 * @param {number} height - Icon height (default: 24)
 * @param {string} className - CSS class name
 * @param {object} sx - MUI sx prop (akan diabaikan)
 * @param {object} props - Props lainnya
 */
export function LucideIcon({ icon, width = 24, height = 24, className, sx, ...props }) {
  // Map icon name dari Iconify ke Lucide React
  const lucideIconName = ICON_MAP[icon] || 'HelpCircle';
  
  // Get icon component dari lucide-react
  const IconComponent = LucideIcons[lucideIconName];

  if (!IconComponent) {
    console.warn(`Icon "${icon}" (${lucideIconName}) not found in Lucide React`);
    return <LucideIcons.HelpCircle size={width} className={className} {...props} />;
  }

  return (
    <IconComponent 
      size={width} 
      className={className}
      {...props}
    />
  );
}
