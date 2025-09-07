import { NextRequest, NextResponse } from 'next/server';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const galleryDir = join(process.cwd(), 'public', 'images', 'gallery');

    // Check if gallery directory exists
    try {
      await stat(galleryDir);
    } catch {
      return NextResponse.json({ images: [] });
    }

    const files = await readdir(galleryDir);
    const imageFiles = files.filter(file =>
      /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
    );

    const images = await Promise.all(
      imageFiles.map(async file => {
        const filePath = join(galleryDir, file);
        const stats = await stat(filePath);

        return {
          id: file.split('-')[0], // Use timestamp as ID
          filename: file,
          src: `/images/gallery/${file}`,
          alt: file.split('.')[0]?.replace(/^\d+-/, '') || '', // Remove timestamp prefix
          category: 'Tổng quan', // Default category, can be enhanced with metadata
          uploadedAt: stats.birthtime.toISOString().split('T')[0],
          size: stats.size,
        };
      })
    );

    // Sort by upload date (newest first)
    images.sort(
      (a, b) =>
        new Date(b.uploadedAt || '').getTime() -
        new Date(a.uploadedAt || '').getTime()
    );

    // Filter by category if specified
    const filteredImages =
      category && category !== 'Tất cả'
        ? images.filter(img => img.category === category)
        : images;

    return NextResponse.json({ images: filteredImages });
  } catch (error) {
    console.error('Gallery API error:', error);
    return NextResponse.json(
      { error: 'Lỗi khi lấy danh sách ảnh' },
      { status: 500 }
    );
  }
}
