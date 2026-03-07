'use client';

import { z as zod } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useBoolean } from 'minimal-shared/hooks';
import { zodResolver } from '@hookform/resolvers/zod';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { LucideIcon } from 'src/components/lucide-icon';

import { useAuthContext } from 'src/auth/hooks';
import { getErrorMessage } from 'src/auth/utils';
import { signInWithPassword } from 'src/auth/context/jwt';

// ----------------------------------------------------------------------

export const SignInSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(6, { message: 'Password must be at least 6 characters!' }),
});

// ----------------------------------------------------------------------

export function LoginView() {
  const theme = useTheme();
  const router = useRouter();
  const showPassword = useBoolean();
  const { checkUserSession } = useAuthContext();
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: 'demo@minimals.cc',
      password: '@2Minimal',
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      setErrorMessage('');
      
      await signInWithPassword({ email: data.email, password: data.password });
      await checkUserSession?.();
      
      router.refresh();
    } catch (error) {
      console.error(error);
      const feedbackMessage = getErrorMessage(error);
      setErrorMessage(feedbackMessage || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'stretch',
      }}
    >
      {/* Left Side - Branding */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          p: 4,
          textAlign: 'center',
          [theme.breakpoints.down('md')]: {
            display: 'none',
          },
        }}
      >
        <Box
          component="img"
          src="/logo/logohsibs-white.png"
          sx={{
            width: 100,
            height: 'auto',
            mb: 3,
            objectFit: 'contain',
          }}
        />
        <Box sx={{ typography: 'h3', mb: 2, fontWeight: 700 }}>
          Selamat Datang di Portal HSI Boarding School
        </Box>
        <Box sx={{ typography: 'body1', opacity: 0.9, mb: 3, maxWidth: 400 }}>
          Kelola semua link Anda dengan mudah dan pantau performa setiap link secara real-time
        </Box>
        <Box sx={{ typography: 'caption', opacity: 0.7 }}>
          Platform manajemen link terpadu untuk HSI Boarding School
        </Box>
      </Box>

      {/* Right Side - Login Form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          bgcolor: 'background.paper',
          [theme.breakpoints.down('md')]: {
            flex: 1,
          },
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{ mb: 4 }}>
            <Box sx={{ typography: 'h4', mb: 1, fontWeight: 700 }}>
              Masuk ke Akun Anda
            </Box>
            <Box sx={{ typography: 'body2', color: 'text.secondary' }}>
              Gunakan email dan password untuk masuk ke dashboard
            </Box>
          </Box>

          {!!errorMessage && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {errorMessage}
            </Alert>
          )}

          <Box component="form" onSubmit={onSubmit} sx={{ gap: 3, display: 'flex', flexDirection: 'column' }}>
            <TextField
              fullWidth
              label="Email"
              placeholder="Masukkan email Anda"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <Box sx={{ gap: 1.5, display: 'flex', flexDirection: 'column' }}>
              <TextField
                fullWidth
                label="Password"
                placeholder="Masukkan password Anda"
                type={showPassword.value ? 'text' : 'password'}
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={showPassword.onToggle} edge="end">
                        <LucideIcon
                          icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <Button
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Masuk...' : 'Masuk'}
            </Button>
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Box sx={{ typography: 'body2', color: 'text.secondary' }}>
              Belum punya akun?{' '}
              <Link component={RouterLink} href={paths.auth.jwt.signUp} variant="subtitle2">
                Daftar di sini
              </Link>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}
