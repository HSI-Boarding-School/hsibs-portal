'use client';

import { useEffect } from 'react';
import { useRouter } from 'src/routes/hooks';
import { SplashScreen } from 'src/components/loading-screen';
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export default function Page() {
  const router = useRouter();
  const { loading, authenticated } = useAuthContext();

  useEffect(() => {
    if (!loading) {
      if (authenticated) {
        router.replace('/dashboard/link-home');
      } else {
        router.replace('/login');
      }
    }
  }, [loading, authenticated, router]);

  return <SplashScreen />;
}
