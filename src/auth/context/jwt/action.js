'use client';

import { supabase } from 'src/lib/supabase';
import { setSession } from './utils';
import { JWT_STORAGE_KEY } from './constant';

/** **************************************
 * Sign in with Supabase
 *************************************** */

export const signInWithPassword = async ({ email, password }) => {
  try {
    // Authenticate with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message || 'Login failed');
    }

    if (!data.session?.access_token) {
      throw new Error('Access token not found in response');
    }

    // Set session with JWT token
    setSession(data.session.access_token);

    return {
      user: data.user,
      session: data.session,
    };
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};

/** **************************************
 * Sign up
 *************************************** */

export const signUp = async ({ email, password, firstName, lastName }) => {
  try {
    // Create user with Supabase
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) {
      throw new Error(error.message || 'Sign up failed');
    }

    if (!data.session?.access_token) {
      throw new Error('Access token not found in response');
    }

    // Set session with JWT token
    setSession(data.session.access_token);

    return {
      user: data.user,
      session: data.session,
    };
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
  }
};

/** **************************************
 * Sign out
 *************************************** */

export const signOut = async () => {
  try {
    // Sign out from Supabase
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw new Error(error.message || 'Sign out failed');
    }

    // Clear session
    await setSession(null);
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};
