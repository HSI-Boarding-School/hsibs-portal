import { NextResponse } from 'next/server';
import { recordLinkClick } from 'src/lib/supabase-client';

/**
 * POST /api/links/[id]/click
 * 
 * Record a link click
 * Public endpoint (no auth required)
 */
export async function POST(request, { params }) {
  try {
    const { id } = params;

    const success = await recordLinkClick(id);

    if (!success) {
      return NextResponse.json(
        { error: 'Gagal mencatat klik' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Klik berhasil dicatat' });
  } catch (error) {
    console.error('Record click error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}
