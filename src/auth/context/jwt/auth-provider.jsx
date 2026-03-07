'use client';

import { useSetState } from 'minimal-shared/hooks';
import { useMemo, useEffect, useCallback } from 'react';

import { supabase } from 'src/lib/supabase';
import { JWT_STORAGE_KEY } from './constant';
import { AuthContext } from '../auth-context';
import { setSession, isValidToken } from './utils';

// ----------------------------------------------------------------------

export function AuthProvider({ children }) {
  const { state, setState } = useSetState({ user: null, loading: true });

  const checkUserSession = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(JWT_STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        // Get current user from Supabase
        if (supabase?.auth) {
          const { data, error } = await supabase.auth.getUser(accessToken);

          if (error || !data.user) {
            setState({ user: null, loading: false });
            return;
          }

          const user = data.user;

          setState({
            user: {
              id: user.id,
              email: user.email,
              name: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
              displayName: user.user_metadata?.name || user.email?.split('@')[0] || 'User',
              photoURL: user.user_metadata?.avatar_url || null,
              role: 'admin',
              accessToken,
            },
            loading: false,
          });
        } else {
          setState({ user: null, loading: false });
        }
      } else {
        setState({ user: null, loading: false });
      }
    } catch (error) {
      console.error('Error checking user session:', error);
      setState({ user: null, loading: false });
    }
  }, [setState]);

  useEffect(() => {
    checkUserSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Listen for auth state changes
  useEffect(() => {
    if (!supabase?.auth) return;

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.access_token) {
          setSession(session.access_token);
          await checkUserSession();
        } else {
          setState({ user: null, loading: false });
        }
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [checkUserSession, setState]);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user ? { ...state.user, role: state.user?.role ?? 'admin' } : null,
      checkUserSession,
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
    }),
    [checkUserSession, state.user, status]
  );

  return <AuthContext value={memoizedValue}>{children}</AuthContext>;
}
