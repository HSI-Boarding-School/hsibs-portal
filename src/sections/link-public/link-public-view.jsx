'use client';

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';
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
          pt: 6,
          pb: 12,
          px: 2,
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
                width: `${80 + (i % 3) * 20}px`,
                height: `${80 + (i % 3) * 20}px`,
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
            top: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 280,
            height: 280,
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
              fontSize: '24px',
              fontWeight: 'bold',
              color: 'white',
              letterSpacing: '8px',
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
            mb: 3,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: 140,
              height: 140,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 2,
            }}
          >
            {/* White Circle Background */}
            <Box
              sx={{
                position: 'absolute',
                width: 140,
                height: 140,
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
                width: 120,
                height: 120,
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
              letterSpacing: '2px',
              fontSize: '1.1rem',
            }}
          >
            HSI BOARDING SCHOOL
          </Typography>
        </Box>

        {/* Contact Icons */}
        <Stack
          direction="row"
          spacing={3}
          sx={{
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
            mt: 2,
          }}
        >
          <IconButton
            component="a"
            href="https://wa.me/6289524513151"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              width: 56,
              height: 56,
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
            <LucideIcon icon="solar:phone-bold" width={28} />
          </IconButton>
          <IconButton
            component="a"
            href="https://mail.google.com/mail/?view=cm&fs=1&to=boardingschool@hsi.id"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              width: 56,
              height: 56,
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
            <LucideIcon icon="solar:mail-bold" width={28} />
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
          px: 2,
          py: 4,
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <Box
            sx={{
              width: '100%',
              maxWidth: 500,
            }}
          >
            {/* Links Section */}
            <Stack spacing={2.5}>
              {links.map((link) => {
                const IconComponent = getPlatformIcon(link.title);
                return (
                  <Button
                    key={link.id}
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={() => handleLinkClick(link.id, link.url)}
                    sx={{
                      py: 2,
                      px: 2.5,
                      bgcolor: 'primary.main',
                      color: 'white',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      textTransform: 'none',
                      borderRadius: 2.5,
                      justifyContent: 'space-between',
                      boxShadow: `0 4px 12px rgba(33, 150, 243, 0.25)`,
                      transition: theme.transitions.create(['all'], {
                        duration: theme.transitions.duration.shorter,
                      }),
                      '&:hover': {
                        bgcolor: 'primary.dark',
                        transform: 'translateY(-4px)',
                        boxShadow: `0 8px 20px rgba(33, 150, 243, 0.35)`,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        flex: 1,
                      }}
                    >
                      <IconComponent size={32} strokeWidth={1.5} />
                      <Box sx={{ textAlign: 'left', flex: 1 }}>{link.title}</Box>
                    </Box>
                    <LucideIcon icon="solar:arrow-right-bold" width={24} />
                  </Button>
                );
              })}
            </Stack>
          </Box>
        )}
      </Box>

      {/* Footer */}
      <Box
        sx={{
          py: 3,
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
          }}
        >
          Powered By HSIBS Portal
        </Box>
      </Box>
    </Box>
  );
}
