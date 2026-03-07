/**
 * Supabase Client Helper
 * 
 * Helper functions untuk query ke Supabase database
 * Schema: hsibs_links
 * Tables: links, click_logs, settings
 */

import { supabase } from './supabase';

// ============================================================
// AUTHENTICATION QUERIES
// ============================================================

/**
 * Get user by email from auth.users
 */
export async function getUserByEmail(email) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: '', // Dummy password untuk check existence
    });

    if (error && error.message.includes('Invalid login credentials')) {
      return null;
    }

    if (error) throw error;
    return data.user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

/**
 * Get user by ID from auth.users
 */
export async function getUserById(userId) {
  try {
    const { data, error } = await supabase.auth.admin.getUserById(userId);

    if (error) throw error;
    return data.user;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

/**
 * Verify user credentials
 */
export async function verifyUserCredentials(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data.user;
  } catch (error) {
    console.error('Error verifying credentials:', error);
    return null;
  }
}

// ============================================================
// LINKS QUERIES (hsibs_links.links table)
// ============================================================

/**
 * Get all links for a user
 */
export async function getUserLinks(userId) {
  try {
    if (!userId) {
      console.warn('getUserLinks: userId is required');
      return [];
    }

    console.log('getUserLinks called with userId:', userId);

    // Clean up user ID - remove "-0" suffix if present (Supabase auth sometimes adds this)
    let cleanUserId = userId;
    if (userId.endsWith('-0')) {
      cleanUserId = userId.slice(0, -2);
      console.log('Cleaned userId (removed -0):', cleanUserId);
    }

    // Validate UUID format
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(cleanUserId)) {
      console.warn('getUserLinks: Invalid UUID format:', cleanUserId);
      return [];
    }

    console.log('UUID validation passed, querying database...');

    const { data, error } = await supabase
      .from('links')
      .select('*')
      .eq('user_id', cleanUserId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error fetching links:', error.message);
      // If table not found, return empty array (will use mock data as fallback)
      if (error.message.includes('Could not find the table')) {
        console.warn('Table "links" not found in Supabase. Using mock data.');
        return [];
      }
      throw error;
    }
    
    console.log('Query successful, data:', data);
    
    // Ensure we always return an array
    const result = Array.isArray(data) ? data : [];
    console.log('Returning links:', result);
    return result;
  } catch (error) {
    console.error('Error fetching links:', error?.message || error);
    return [];
  }
}

/**
 * Get single link by ID
 */
export async function getLinkById(linkId) {
  try {
    const { data, error } = await supabase
      .from('links')
      .select('*')
      .eq('id', linkId)
      .single();

    if (error) {
      if (error.message.includes('Could not find the table')) {
        console.warn('Table "links" not found');
        return null;
      }
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error fetching link:', error?.message || error);
    return null;
  }
}

/**
 * Create new link
 */
export async function createLink(linkData) {
  try {
    // Clean up user ID - remove "-0" suffix if present
    let cleanData = { ...linkData };
    if (cleanData.user_id && cleanData.user_id.endsWith('-0')) {
      cleanData.user_id = cleanData.user_id.slice(0, -2);
    }

    const { data, error } = await supabase
      .from('links')
      .insert([cleanData])
      .select()
      .single();

    if (error) {
      if (error.message.includes('Could not find the table')) {
        console.warn('Table "links" not found');
        return null;
      }
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error creating link:', error?.message || error);
    return null;
  }
}

/**
 * Update link
 */
export async function updateLink(linkId, linkData) {
  try {
    const { data, error } = await supabase
      .from('links')
      .update(linkData)
      .eq('id', linkId)
      .select()
      .single();

    if (error) {
      if (error.message.includes('Could not find the table')) {
        console.warn('Table "links" not found');
        return null;
      }
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error updating link:', error?.message || error);
    return null;
  }
}

/**
 * Delete link
 */
export async function deleteLink(linkId) {
  try {
    const { error } = await supabase
      .from('links')
      .delete()
      .eq('id', linkId);

    if (error) {
      if (error.message.includes('Could not find the table')) {
        console.warn('Table "links" not found');
        return false;
      }
      throw error;
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting link:', error?.message || error);
    return false;
  }
}

/**
 * Get total links count for user
 */
export async function getTotalLinksCount(userId) {
  try {
    if (!userId) {
      console.warn('getTotalLinksCount: userId is required');
      return 0;
    }

    // Clean up user ID - remove "-0" suffix if present (Supabase auth sometimes adds this)
    let cleanUserId = userId;
    if (userId.endsWith('-0')) {
      cleanUserId = userId.slice(0, -2);
    }

    const { count, error } = await supabase
      .from('links')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', cleanUserId);

    if (error) {
      if (error.message.includes('Could not find the table')) {
        console.warn('Table "links" not found');
        return 0;
      }
      throw error;
    }
    
    return count || 0;
  } catch (error) {
    console.error('Error fetching links count:', error?.message || error);
    return 0;
  }
}

// ============================================================
// CLICK LOGS QUERIES (hsibs_links.click_logs table)
// ============================================================

/**
 * Record a link click
 */
export async function recordLinkClick(linkId) {
  try {
    // Insert click record
    const { error: insertError } = await supabase
      .from('click_logs')
      .insert([{ link_id: linkId, clicked_at: new Date().toISOString() }]);

    if (insertError) {
      if (insertError.message.includes('Could not find the table')) {
        console.warn('Table "click_logs" not found');
        return false;
      }
      throw insertError;
    }

    // Update total_clicks in links table
    const link = await getLinkById(linkId);
    if (link) {
      await updateLink(linkId, {
        total_clicks: (link.total_clicks || 0) + 1,
      });
    }

    return true;
  } catch (error) {
    console.error('Error recording click:', error?.message || error);
    return false;
  }
}

/**
 * Get total clicks for a link
 */
export async function getLinkClicks(linkId) {
  try {
    const { count, error } = await supabase
      .from('click_logs')
      .select('*', { count: 'exact', head: true })
      .eq('link_id', linkId);

    if (error) {
      if (error.message.includes('Could not find the table')) {
        console.warn('Table "click_logs" not found');
        return 0;
      }
      throw error;
    }
    
    return count || 0;
  } catch (error) {
    console.error('Error fetching link clicks:', error?.message || error);
    return 0;
  }
}

/**
 * Get total clicks for all user's links
 */
export async function getTotalClicksForUser(userId) {
  try {
    if (!userId) {
      console.warn('getTotalClicksForUser: userId is required');
      return 0;
    }

    // Get all links for user (getUserLinks handles user ID cleanup)
    const links = await getUserLinks(userId);
    
    // Ensure links is an array before mapping
    if (!Array.isArray(links)) {
      console.warn('getTotalClicksForUser: links is not an array', links);
      return 0;
    }
    
    const linkIds = links.map((link) => link.id);

    if (linkIds.length === 0) return 0;

    // Count clicks for all links
    const { count, error } = await supabase
      .from('click_logs')
      .select('*', { count: 'exact', head: true })
      .in('link_id', linkIds);

    if (error) {
      if (error.message.includes('Could not find the table')) {
        console.warn('Table "click_logs" not found');
        return 0;
      }
      throw error;
    }
    
    return count || 0;
  } catch (error) {
    console.error('Error fetching total clicks:', error?.message || error);
    return 0;
  }
}

/**
 * Get click statistics for a link
 */
export async function getLinkClickStats(linkId) {
  try {
    const { data, error } = await supabase
      .from('click_logs')
      .select('clicked_at')
      .eq('link_id', linkId)
      .order('clicked_at', { ascending: false });

    if (error) {
      if (error.message.includes('Could not find the table')) {
        console.warn('Table "click_logs" not found');
        return [];
      }
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Error fetching click stats:', error?.message || error);
    return [];
  }
}


// ============================================================
// USER PROFILE QUERIES
// ============================================================

/**
 * Update user display name in auth metadata
 */
export async function updateUserDisplayName(displayName) {
  try {
    if (!displayName || displayName.trim() === '') {
      console.warn('updateUserDisplayName: displayName is required');
      return null;
    }

    const { data, error } = await supabase.auth.updateUser({
      data: {
        name: displayName,
      },
    });

    if (error) {
      console.error('Error updating user display name:', error.message);
      throw error;
    }

    console.log('User display name updated:', displayName);
    return data.user;
  } catch (error) {
    console.error('Error updating user display name:', error?.message || error);
    return null;
  }
}

/**
 * Get current user profile
 */
export async function getCurrentUser() {
  try {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error('Error getting current user:', error.message);
      return null;
    }

    return data.user;
  } catch (error) {
    console.error('Error getting current user:', error?.message || error);
    return null;
  }
}


/**
 * Upload user profile photo to Supabase Storage
 */
export async function uploadProfilePhoto(file, userId) {
  try {
    if (!file || !userId) {
      console.warn('uploadProfilePhoto: file and userId are required');
      return null;
    }

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `${userId}-${timestamp}-${file.name}`;
    const filepath = `profile-photos/${filename}`;

    console.log('Uploading profile photo:', filepath);

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('profiles')
      .upload(filepath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Error uploading profile photo:', error.message);
      throw error;
    }

    console.log('Profile photo uploaded:', data);

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('profiles')
      .getPublicUrl(filepath);

    const photoUrl = publicUrlData.publicUrl;
    console.log('Profile photo URL:', photoUrl);

    return photoUrl;
  } catch (error) {
    console.error('Error uploading profile photo:', error?.message || error);
    return null;
  }
}

/**
 * Update user profile (display name and photo)
 */
export async function updateUserProfile(displayName, photoUrl) {
  try {
    const updateData = {};

    if (displayName) {
      updateData.name = displayName;
    }

    if (photoUrl) {
      updateData.avatar_url = photoUrl;
    }

    if (Object.keys(updateData).length === 0) {
      console.warn('updateUserProfile: no data to update');
      return null;
    }

    const { data, error } = await supabase.auth.updateUser({
      data: updateData,
    });

    if (error) {
      console.error('Error updating user profile:', error.message);
      throw error;
    }

    console.log('User profile updated');
    return data.user;
  } catch (error) {
    console.error('Error updating user profile:', error?.message || error);
    return null;
  }
}
