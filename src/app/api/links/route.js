import { NextResponse } from 'next/server';
import { getUserLinks, createLink, getTotalLinksCount } from 'src/lib/supabase-client';
import { verifyAuth } from 'src/lib/auth-utils';

/**
 * GET /api/links
 * 
 * Get all links for current user
 */
export async function GET(request) {
  try {
    const userId = await verifyAuth(request);

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const links = await getUserLinks(userId);
    const totalCount = await getTotalLinksCount(userId);

    return NextResponse.json({
      links,
      totalCount,
    });
  } catch (error) {
    console.error('Get links error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/links
 * 
 * Create new link
 */
export async function POST(request) {
  try {
    const userId = await verifyAuth(request);

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { title, url, thumbnail } = await request.json();

    // Validasi input
    if (!title || !url) {
      return NextResponse.json(
        { error: 'Title dan URL harus diisi' },
        { status: 400 }
      );
    }

    const linkData = {
      user_id: userId,
      title,
      url,
      thumbnail: thumbnail || null,
      total_clicks: 0,
    };

    const newLink = await createLink(linkData);

    if (!newLink) {
      return NextResponse.json(
        { error: 'Gagal membuat link' },
        { status: 500 }
      );
    }

    return NextResponse.json(newLink, { status: 201 });
  } catch (error) {
    console.error('Create link error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}
