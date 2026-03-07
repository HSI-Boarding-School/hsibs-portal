'use client';

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import {
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  Music,
  Globe,
  MapPin,
  Phone,
  Mail,
  Share2,
} from 'lucide-react';

import { getUserLinks, recordLinkClick } from 'src/lib/supabase-client';
import { LucideIcon } from 'src/components/lucide-icon';
import { useMockedUser } from 'src/auth/hooks';

// Icon mapping for social media platforms
const PLATFORM_ICONS = {
  instagram: Instagram,
  youtube: Youtube,
  twitter: Twitter,
  linkedin: Linkedin,
  tiktok: Music,
  website: Globe,
  location: MapPin,
  phone: Phone,
  email: Mail,
};

// Get icon for platform
const getPlatformIcon = (platformName) => {
  const name = platformName.toLowerCase();
  return PLATFORM_ICONS[name] || Globe;
};

// ----------------------------------------------------------------------

export function LinkPublicView({ username }) {
  const theme = useTheme();
  const { user } = useMockedUser();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [shareSnackbar, setShareSnackbar] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (user?.id) {
      fetchLinks();
    }
  }, [user?.id]);

  const fetchLinks = async () => {
    try {
      setLoading(true);
      
      console.log('Public view fetching for user:', user?.id);
      const data = await getUserLinks(user.id);
      console.log('Public view links fetched:', data);
      
      // Ensure data is always an array
      const linksArray = Array.isArray(data) ? data : [];
      setLinks(linksArray);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching links:', error);
      setLinks([]);
      setLoading(false);
    }
  };

  const handleLinkClick = async (linkId, url) => {
    try {
      // Record the click
      await recordLinkClick(linkId);
      // Open the link
      window.open(url, '_blank');
    } catch (error) {
      console.error('Error recording click:', error);
      // Still open the link even if recording fails
      window.open(url, '_blank');
    }
  };

  const handleShare = async () => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'HSI Boarding School',
          text: 'Kunjungi portal HSI Boarding School',
          url: currentUrl,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(currentUrl);
        setShareSnackbar(true);
      } catch (error) {
        console.error('Error copying to clipboard:', error);
      }
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'background.paper',
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          pt: { xs: 4, sm: 6, md: 8 },
          pb: { xs: 8, sm: 10, md: 12 },
          px: { xs: 2, sm: 3, md: 4 },
          position: 'relative',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Background Pattern - Logo White Scattered */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.08,
            zIndex: 0,
            pointerEvents: 'none',
          }}
        >
          {/* Scattered logo pattern */}
          {[...Array(12)].map((_, i) => (
            <Box
              key={i}
              component="img"
              src="/logo/logohsibs-white.png"
              sx={{
                position: 'absolute',
                width: { xs: `${60 + (i % 3) * 10}px`, md: `${80 + (i % 3) * 20}px` },
                height: { xs: `${60 + (i % 3) * 10}px`, md: `${80 + (i % 3) * 20}px` },
                objectFit: 'contain',
                opacity: 0.1,
                left: `${(i * 17) % 100}%`,
                top: `${(i * 23) % 100}%`,
                transform: `rotate(${i * 30}deg)`,
              }}
            />
          ))}
        </Box>

        {/* Circular Text - "BOARDING SCHOOL" */}
        <Box
          sx={{
            position: 'absolute',
            top: { xs: 10, md: 20 },
            left: '50%',
            transform: 'translateX(-50%)',
            width: { xs: 200, md: 280 },
            height: { xs: 200, md: 280 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.15,
            zIndex: 0,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: { xs: '16px', md: '24px' },
              fontWeight: 'bold',
              color: 'white',
              letterSpacing: { xs: '4px', md: '8px' },
            }}
          >
            BOARDING SCHOOL
          </Box>
        </Box>

        {/* Logo Section */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: { xs: 2, sm: 3 },
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: { xs: 100, sm: 120, md: 140 },
              height: { xs: 100, sm: 120, md: 140 },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: { xs: 1.5, sm: 2 },
            }}
          >
            {/* White Circle Background */}
            <Box
              sx={{
                position: 'absolute',
                width: { xs: 100, sm: 120, md: 140 },
                height: { xs: 100, sm: 120, md: 140 },
                borderRadius: '50%',
                bgcolor: 'white',
                boxShadow: `0 8px 24px rgba(0, 0, 0, 0.15)`,
              }}
            />
            {/* Logo Image */}
            <Box
              component="img"
              src="/logo/logohsibs.png"
              sx={{
                width: { xs: 80, sm: 100, md: 120 },
                height: { xs: 80, sm: 100, md: 120 },
                objectFit: 'contain',
                position: 'relative',
                zIndex: 1,
              }}
            />
          </Box>

          {/* School Name Text */}
          <Typography
            variant="h6"
            sx={{
              color: 'white',
              fontWeight: 700,
              letterSpacing: { xs: '1px', md: '2px' },
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
            }}
          >
            HSI BOARDING SCHOOL
          </Typography>
        </Box>

        {/* Contact Icons */}
        <Stack
          direction="row"
          spacing={{ xs: 2, sm: 2.5, md: 3 }}
          sx={{
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
            mt: { xs: 1.5, sm: 2 },
          }}
        >
          <IconButton
            component="a"
            href="https://wa.me/6289524513151"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              width: { xs: 44, sm: 48, md: 56 },
              height: { xs: 44, sm: 48, md: 56 },
              bgcolor: 'white',
              color: 'primary.main',
              borderRadius: '50%',
              boxShadow: `0 4px 12px rgba(0, 0, 0, 0.15)`,
              '&:hover': {
                bgcolor: 'primary.lighter',
                transform: 'scale(1.1)',
              },
              transition: theme.transitions.create(['all'], {
                duration: theme.transitions.duration.shorter,
              }),
            }}
            title="Hubungi via WhatsApp"
          >
            <LucideIcon icon="solar:phone-bold" width={isMobile ? 20 : 28} />
          </IconButton>
          <IconButton
            component="a"
            href="https://mail.google.com/mail/?view=cm&fs=1&to=boardingschool@hsi.id"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              width: { xs: 44, sm: 48, md: 56 },
              height: { xs: 44, sm: 48, md: 56 },
              bgcolor: 'white',
              color: 'primary.main',
              borderRadius: '50%',
              boxShadow: `0 4px 12px rgba(0, 0, 0, 0.15)`,
              '&:hover': {
                bgcolor: 'primary.lighter',
                transform: 'scale(1.1)',
              },
              transition: theme.transitions.create(['all'], {
                duration: theme.transitions.duration.shorter,
              }),
            }}
            title="Hubungi via Email"
          >
            <LucideIcon icon="solar:mail-bold" width={isMobile ? 20 : 28} />
          </IconButton>
        </Stack>
      </Box>

      {/* Main Content Section */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: { xs: 2, sm: 3, md: 4 },
          py: { xs: 3, sm: 4, md: 6 },
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <Box
            sx={{
              width: '100%',
              maxWidth: { xs: 400, sm: 500, md: 600 },
            }}
          >
            {/* Links Section */}
            <Stack spacing={{ xs: 1.5, sm: 2 }}>
              {links.map((link) => {
                const IconComponent = getPlatformIcon(link.title);
                return (
                  <Button
                    key={link.id}
                    fullWidth
                    variant="contained"
                    size={isMobile ? 'medium' : 'large'}
                    onClick={() => handleLinkClick(link.id, link.url)}
                    sx={{
                      py: { xs: 1.25, sm: 1.75, md: 2 },
                      px: { xs: 1.5, sm: 2, md: 2.5 },
                      bgcolor: 'primary.main',
                      color: 'white',
                      fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                      fontWeight: 600,
                      textTransform: 'none',
                      borderRadius: { xs: 1.5, md: 2.5 },
                      justifyContent: 'space-between',
                      boxShadow: `0 4px 12px rgba(33, 150, 243, 0.25)`,
                      transition: theme.transitions.create(['all'], {
                        duration: theme.transitions.duration.shorter,
                      }),
                      '&:hover': {
                        bgcolor: 'primary.dark',
                        transform: 'translateY(-2px)',
                        boxShadow: `0 6px 16px rgba(33, 150, 243, 0.35)`,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: { xs: 1, sm: 1.5 },
                        flex: 1,
                      }}
                    >
                      <IconComponent size={isMobile ? 24 : 32} strokeWidth={1.5} />
                      <Box sx={{ textAlign: 'left', flex: 1 }}>{link.title}</Box>
                    </Box>
                    <LucideIcon icon="solar:arrow-right-bold" width={isMobile ? 18 : 24} />
                  </Button>
                );
              })}
            </Stack>

            {/* Share Button */}
            <Button
              fullWidth
              variant="outlined"
              size={isMobile ? 'medium' : 'large'}
              startIcon={<Share2 size={isMobile ? 18 : 24} />}
              onClick={handleShare}
              sx={{
                mt: { xs: 2.5, sm: 3, md: 4 },
                py: { xs: 1.25, sm: 1.75, md: 2 },
                borderColor: 'primary.main',
                color: 'primary.main',
                fontWeight: 600,
                textTransform: 'none',
                borderRadius: { xs: 1.5, md: 2.5 },
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                '&:hover': {
                  borderColor: 'primary.dark',
                  bgcolor: 'primary.lighter',
                },
              }}
            >
              {isMobile ? 'Share' : 'Share Portal'}
            </Button>
          </Box>
        )}
      </Box>

      {/* Footer */}
      <Box
        sx={{
          py: { xs: 2, sm: 2.5, md: 3 },
          px: { xs: 2, sm: 3, md: 4 },
          textAlign: 'center',
          bgcolor: 'background.paper',
          borderTop: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Box
          sx={{
            typography: 'caption',
            color: 'primary.light',
            fontWeight: 600,
            letterSpacing: '0.5px',
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
          }}
        >
          Powered By HSIBS Portal
        </Box>
      </Box>

      {/* Share Snackbar */}
      <Snackbar
        open={shareSnackbar}
        autoHideDuration={3000}
        onClose={() => setShareSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setShareSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Link copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  );
}
