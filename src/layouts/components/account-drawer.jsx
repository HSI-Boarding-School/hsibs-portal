'use client';

import { useBoolean } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { LucideIcon } from 'src/components/lucide-icon';
import { Scrollbar } from 'src/components/scrollbar';

import { AccountButton } from './account-button';
import { SignOutButton } from './sign-out-button';

// ----------------------------------------------------------------------

export function AccountDrawer({ sx, ...other }) {
  const { value: open, onFalse: onClose, onTrue: onOpen } = useBoolean();

  return (
    <>
      <AccountButton onClick={onOpen} sx={sx} {...other} />

      <Drawer
        open={open}
        onClose={onClose}
        anchor="right"
        slotProps={{
          backdrop: { invisible: true },
          paper: { sx: { width: 320 } },
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            top: 12,
            left: 12,
            zIndex: 9,
            position: 'absolute',
          }}
        >
          <LucideIcon icon="mingcute:close-line" />
        </IconButton>

        <Scrollbar>
          <Box
            sx={{
              pt: 8,
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            {/* Logo */}
            <Box
              component="img"
              src="/logo/logohsibs.png"
              alt="HSI Logo"
              sx={{
                width: 96,
                height: 96,
                mb: 2,
                objectFit: 'contain',
              }}
            />

            {/* Fixed Name */}
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              HSI Boarding School
            </Typography>
          </Box>
        </Scrollbar>

        {/* Logout Button */}
        <Box sx={{ p: 2.5 }}>
          <SignOutButton onClose={onClose} />
        </Box>
      </Drawer>
    </>
  );
}
