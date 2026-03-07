'use client';

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

import { DashboardContent } from 'src/layouts/dashboard';
import { useMockedUser } from 'src/auth/hooks';
import { getTotalLinksCount, getTotalClicksForUser } from 'src/lib/supabase-client';
import { _links } from 'src/_mock/_link';

import { LinkWidgetSummary } from './link-widget-summary';
import { LinkQuickActions } from './link-quick-actions';
import { LinkPreview } from './link-preview';

// ----------------------------------------------------------------------

export function LinkHomeView() {
  const { user } = useMockedUser();
  const [totalLinks, setTotalLinks] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user?.id) {
      fetchStats();
    }
  }, [user?.id]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching stats for user:', user?.id);
      
      const [links, clicks] = await Promise.all([
        getTotalLinksCount(user.id),
        getTotalClicksForUser(user.id),
      ]);
      
      console.log('Stats fetched - Links:', links, 'Clicks:', clicks);
      
      setTotalLinks(links);
      setTotalClicks(clicks);
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError('Failed to fetch statistics from database');
      // Fallback to mock data
      setTotalLinks(_links.length);
      setTotalClicks(_links.reduce((sum, link) => sum + (link.clicks || 0), 0));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <DashboardContent maxWidth="xl">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <CircularProgress />
        </Box>
      </DashboardContent>
    );
  }

  return (
    <DashboardContent maxWidth="xl">
      <Grid container spacing={3}>
        {/* Error Alert */}
        {error && (
          <Grid size={{ xs: 12 }}>
            <Alert severity="warning">
              {error} - Using demo data for now
            </Alert>
          </Grid>
        )}

        {/* Welcome Section */}
        <Grid size={{ xs: 12 }}>
          <Box
            sx={{
              py: 3,
              px: 3,
              borderRadius: 2,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
            }}
          >
            <Box sx={{ mb: 2 }}>
              <Box sx={{ typography: 'h4', mb: 1 }}>Assalamualaikum selamat datang di HSIBS Portal 👋</Box>
              <Box sx={{ typography: 'body2', opacity: 0.8 }}>
                Kelola semua link Anda dengan mudah dan pantau performa setiap link
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Summary Cards */}
        <Grid size={{ xs: 12, md: 6 }}>
          <LinkWidgetSummary
            title="Total Links"
            total={totalLinks}
            icon="solar:link-bold"
            chart={{ series: [{ data: [45] }] }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <LinkWidgetSummary
            title="Total Clicks"
            total={totalClicks}
            icon="solar:cursor-bold"
            chart={{ series: [{ data: [45] }] }}
            sx={{
              bgcolor: 'background.paper',
              '& > div:last-child': {
                bgcolor: 'primary.lighter',
              },
            }}
          />
        </Grid>

        {/* Quick Actions */}
        <Grid size={{ xs: 12 }}>
          <LinkQuickActions />
        </Grid>

        {/* Preview Section */}
        <Grid size={{ xs: 12 }}>
          <Box sx={{ mb: 2, typography: 'h6' }}>Preview Public View</Box>
          <LinkPreview />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
