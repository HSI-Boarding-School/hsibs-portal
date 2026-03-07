'use client';

import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
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

import { useMockedUser } from 'src/auth/hooks';
import { getUserLinks } from 'src/lib/supabase-client';
import { LucideIcon } from 'src/components/lucide-icon';

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

export function LinkPreview() {
  const theme = useTheme();
  const router = useRouter();
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
      console.log('Link preview fetching for user:', user?.id);
      const data = await getUserLinks(user.id);
      console.log('Link preview data:', data);
      // Ensure data is always an array
      const linksArray = Array.isArray(data) ? data : [];
      setLinks(linksArray);
    } catch (error) {
      console.error('Error fetching links:', error);
      setLinks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLinkClick = (linkId) => {
    console.log(`Link ${linkId} clicked`);
  };

  const handleViewPublic = () => {
    router.push('/links/hsiboardingschool');
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          py: 4,
          px: 2,
          borderRadius: 2,
          minHeight: 400,
        }}
      >
        <CircularProgress sx={{ color: 'white' }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
        py: 4,
        px: 2,
        borderRadius: 2,
        position: 'relative',
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
        {[...Array(8)].map((_, i) => (
          <Box
            key={i}
            component="img"
            src="/logo/logohsibs-white.png"
            sx={{
              position: 'absolute',
              width: `${60 + (i % 3) * 15}px`,
              height: `${60 + (i % 3) * 15}px`,
              objectFit: 'contain',
              opacity: 0.1,
              left: `${(i * 20) % 100}%`,
              top: `${(i * 25) % 100}%`,
              transform: `rotate(${i * 45}deg)`,
            }}
          />
        ))}
      </Box>

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: 420,
          width: '100%',
        }}
      >
        {/* Logo Section */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: 120,
              height: 120,
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
                width: 120,
                height: 120,
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
                width: 100,
                height: 100,
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
              fontSize: '0.95rem',
            }}
          >
            HSI BOARDING SCHOOL
          </Typography>
        </Box>

        {/* Contact Icons */}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: 'center',
            mb: 3,
          }}
        >
          <IconButton
            component="a"
            href="https://wa.me/6289524513151"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              width: 48,
              height: 48,
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
            <LucideIcon icon="solar:phone-bold" width={24} />
          </IconButton>
          <IconButton
            component="a"
            href="https://mail.google.com/mail/?view=cm&fs=1&to=boardingschool@hsi.id"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              width: 48,
              height: 48,
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
            <LucideIcon icon="solar:mail-bold" width={24} />
          </IconButton>
        </Stack>

        {/* Links Section */}
        <Stack spacing={1.5} sx={{ mb: 2 }}>
          {links.map((link) => {
            const IconComponent = getPlatformIcon(link.title);
            return (
              <Button
                key={link.id}
                fullWidth
                variant="contained"
                size="medium"
                onClick={() => {
                  handleLinkClick(link.id);
                  window.open(link.url, '_blank');
                }}
                sx={{
                  py: 1.5,
                  px: 2,
                  bgcolor: 'primary.main',
                  color: 'white',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: 2,
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
                    gap: 1.5,
                    flex: 1,
                  }}
                >
                  <IconComponent size={28} strokeWidth={1.5} />
                  <Box sx={{ textAlign: 'left', flex: 1 }}>{link.title}</Box>
                </Box>
                <LucideIcon icon="solar:arrow-right-bold" width={20} />
              </Button>
            );
          })}
        </Stack>

        {/* View Public Button */}
        <Button
          fullWidth
          variant="contained"
          size="medium"
          endIcon={<LucideIcon icon="solar:arrow-right-bold" />}
          onClick={handleViewPublic}
          sx={{
            py: 1.5,
            bgcolor: 'white',
            color: 'primary.main',
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: 2,
            '&:hover': {
              bgcolor: 'primary.lighter',
            },
          }}
        >
          View Public
        </Button>
      </Box>
    </Box>
  );
}
