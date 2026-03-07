'use server';

// Placeholder untuk server actions
// Ini akan digunakan untuk komunikasi dengan backend API

/**
 * Fetch semua links untuk user
 * @param {string} userId - User ID
 * @returns {Promise<Array>} Array of links
 */
export async function fetchLinks(userId) {
  try {
    // TODO: Replace dengan actual API call
    // const response = await fetch(`${API_URL}/links/${userId}`);
    // return response.json();
    
    console.log('Fetching links for user:', userId);
    return [];
  } catch (error) {
    console.error('Error fetching links:', error);
    throw error;
  }
}

/**
 * Tambah link baru
 * @param {string} userId - User ID
 * @param {Object} linkData - Link data {name, url, thumbnail}
 * @returns {Promise<Object>} Created link
 */
export async function createLink(userId, linkData) {
  try {
    // TODO: Replace dengan actual API call
    // const response = await fetch(`${API_URL}/links`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ userId, ...linkData }),
    // });
    // return response.json();
    
    console.log('Creating link for user:', userId, linkData);
    return { id: Date.now(), ...linkData, clicks: 0 };
  } catch (error) {
    console.error('Error creating link:', error);
    throw error;
  }
}

/**
 * Update link
 * @param {string} linkId - Link ID
 * @param {Object} linkData - Link data to update
 * @returns {Promise<Object>} Updated link
 */
export async function updateLink(linkId, linkData) {
  try {
    // TODO: Replace dengan actual API call
    // const response = await fetch(`${API_URL}/links/${linkId}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(linkData),
    // });
    // return response.json();
    
    console.log('Updating link:', linkId, linkData);
    return { id: linkId, ...linkData };
  } catch (error) {
    console.error('Error updating link:', error);
    throw error;
  }
}

/**
 * Delete link
 * @param {string} linkId - Link ID
 * @returns {Promise<void>}
 */
export async function deleteLink(linkId) {
  try {
    // TODO: Replace dengan actual API call
    // const response = await fetch(`${API_URL}/links/${linkId}`, {
    //   method: 'DELETE',
    // });
    // return response.json();
    
    console.log('Deleting link:', linkId);
  } catch (error) {
    console.error('Error deleting link:', error);
    throw error;
  }
}

/**
 * Track link click
 * @param {string} linkId - Link ID
 * @returns {Promise<void>}
 */
export async function trackLinkClick(linkId) {
  try {
    // TODO: Replace dengan actual API call
    // const response = await fetch(`${API_URL}/links/${linkId}/click`, {
    //   method: 'POST',
    // });
    // return response.json();
    
    console.log('Tracking click for link:', linkId);
  } catch (error) {
    console.error('Error tracking click:', error);
    // Don't throw - tracking shouldn't break the user experience
  }
}

/**
 * Get public links untuk username
 * @param {string} username - Username
 * @returns {Promise<Array>} Array of public links
 */
export async function getPublicLinks(username) {
  try {
    // TODO: Replace dengan actual API call
    // const response = await fetch(`${API_URL}/public/${username}/links`);
    // return response.json();
    
    console.log('Fetching public links for:', username);
    return [];
  } catch (error) {
    console.error('Error fetching public links:', error);
    throw error;
  }
}
