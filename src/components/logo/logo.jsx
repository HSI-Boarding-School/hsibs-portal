'use client';

import { mergeClasses } from 'minimal-shared/utils';

import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { logoClasses } from './classes';

// ----------------------------------------------------------------------

export function Logo({ sx, disabled, className, href, isSingle = true, ...other }) {
  const pathname = usePathname();
  
  // Jika di dashboard, link ke dashboard home. Jika tidak, link ke home
  const defaultHref = pathname?.includes('/dashboard') ? '/dashboard/link-home' : '/';
  const finalHref = href ?? defaultHref;

  const singleLogo = (
    <img
      alt="Logo HSIBS"
      src="/logo/logohsibs.png"
      width="100%"
      height="100%"
      style={{ objectFit: 'contain' }}
    />
  );

  const fullLogo = (
    <img
      alt="Logo HSIBS"
      src="/logo/logohsibs.png"
      width="100%"
      height="100%"
      style={{ objectFit: 'contain' }}
    />
  );

  return (
    <LogoRoot
      component={RouterLink}
      href={finalHref}
      aria-label="Logo"
      underline="none"
      className={mergeClasses([logoClasses.root, className])}
      sx={[
        {
          width: 40,
          height: 40,
          ...(!isSingle && { width: 102, height: 36 }),
          ...(disabled && { pointerEvents: 'none' }),
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      {isSingle ? singleLogo : fullLogo}
    </LogoRoot>
  );
}

// ----------------------------------------------------------------------

const LogoRoot = styled(Link)(() => ({
  flexShrink: 0,
  color: 'transparent',
  display: 'inline-flex',
  verticalAlign: 'middle',
}));
