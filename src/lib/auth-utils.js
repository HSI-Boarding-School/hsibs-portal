/**
 * Authentication Utilities
 * 
 * Helper functions untuk JWT verification dan auth operations
 */

import { jwtDecode } from 'jwt-decode';

/**
 * Verify JWT token dari request header
 * Return user ID jika valid, null jika invalid
 */
export async function verifyAuth(request) {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);

    // Decode JWT token
    const decoded = jwtDecode(token);

    // Check if token is expired
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return null;
    }

    return decoded.sub || decoded.userId || decoded.id;
  } catch (error) {
    console.error('Token verification error:', error);
    return null;
  }
}

/**
 * Extract user ID dari JWT token
 */
export function getUserIdFromToken(token) {
  try {
    const decoded = jwtDecode(token);
    return decoded.sub || decoded.userId || decoded.id;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}

/**
 * Check if token is expired
 */
export function isTokenExpired(token) {
  try {
    const decoded = jwtDecode(token);
    if (!decoded.exp) return false;
    return decoded.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
}
