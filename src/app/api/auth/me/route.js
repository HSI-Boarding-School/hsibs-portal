import { NextResponse } from 'next/server';
import { getUserById } from 'src/lib/supabase-client';
import { verifyAuth } from 'src/lib/auth-utils';

/**
 * GET /api/auth/me
 * 
 * Get current user data
 * Requires valid JWT token in Authorization header
 */
export async function GET(request) {
  try {
    // Verify JWT token
    const userId = await verifyAuth(request);

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user dari database
    const user = await getUserById(userId);

    if (!user) {
      return NextResponse.json(
        { error: 'User tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        photoURL: user.photo_url,
        displayName: user.name,
      },
    });
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}
