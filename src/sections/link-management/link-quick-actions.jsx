'use client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/navigation';

import { LucideIcon } from 'src/components/lucide-icon';

// ----------------------------------------------------------------------

export function LinkQuickActions() {
  const router = useRouter();

  const actions = [
    {
      label: 'Add Link',
      icon: 'solar:add-circle-bold',
      action: () => router.push('/dashboard/link-management'),
    },
    {
      label: 'Edit Link',
      icon: 'solar:pen-bold',
      action: () => router.push('/dashboard/link-management'),
    },
    {
      label: 'Manage Links',
      icon: 'solar:settings-bold',
      action: () => router.push('/dashboard/link-management'),
    },
  ];

  return (
    <Card sx={{ p: 3 }}>
      <Box sx={{ mb: 2, typography: 'h6' }}>Quick Actions</Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        {actions.map((action) => (
          <Button
            key={action.label}
            variant="contained"
            startIcon={<LucideIcon icon={action.icon} />}
            onClick={action.action}
            sx={{ flex: 1 }}
          >
            {action.label}
          </Button>
        ))}
      </Stack>
    </Card>
  );
}
