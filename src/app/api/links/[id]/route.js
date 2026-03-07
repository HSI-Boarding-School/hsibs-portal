import { NextResponse } from 'next/server';
import { getLinkById, updateLink, deleteLink } from 'src/lib/supabase-client';
import { verifyAuth } from 'src/lib/auth-utils';

/**
 * GET /api/links/[id]
 * 
 * Get single link by ID
 */
export async function GET(request, { params }) {
  try {
    const { id } = params;

    const link = await getLinkById(id);

    if (!link) {
      return NextResponse.json(
        { error: 'Link tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json(link);
  } catch (error) {
    console.error('Get link error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/links/[id]
 * 
 * Update link
 */
export async function PUT(request, { params }) {
  try {
    const userId = await verifyAuth(request);

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;
    const { title, url, thumbnail } = await request.json();

    // Verify ownership
    const link = await getLinkById(id);
    if (!link || link.user_id !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const updateData = {};
    if (title) updateData.title = title;
    if (url) updateData.url = url;
    if (thumbnail !== undefined) updateData.thumbnail = thumbnail;

    const updatedLink = await updateLink(id, updateData);

    if (!updatedLink) {
      return NextResponse.json(
        { error: 'Gagal update link' },
        { status: 500 }
      );
    }

    return NextResponse.json(updatedLink);
  } catch (error) {
    console.error('Update link error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/links/[id]
 * 
 * Delete link
 */
export async function DELETE(request, { params }) {
  try {
    const userId = await verifyAuth(request);

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;

    // Verify ownership
    const link = await getLinkById(id);
    if (!link || link.user_id !== userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const success = await deleteLink(id);

    if (!success) {
      return NextResponse.json(
        { error: 'Gagal delete link' },
        { status: 500 }
      );
    }

    return NextResponse.json({ message: 'Link berhasil dihapus' });
  } catch (error) {
    console.error('Delete link error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan' },
      { status: 500 }
    );
  }
}
