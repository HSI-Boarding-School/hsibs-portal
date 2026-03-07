import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from 'src/lib/supabase-client';

/**
 * POST /api/auth/login
 * 
 * Login user dengan email dan password
 * Return JWT token jika berhasil
 */
export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Validasi input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email dan password harus diisi' },
        { status: 400 }
      );
    }

    // Get user dari database
    const user = await getUserByEmail(email);

    if (!user) {
      return NextResponse.json(
        { error: 'Email atau password salah' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Email atau password salah' },
        { status: 401 }
      );
    }

    // Return user data (JWT akan di-generate di client)
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
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat login' },
      { status: 500 }
    );
  }
}
