'use client';

import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';
import { Button } from '@edu/ui/components/button';
import { BASE_URL } from '@/constants';

import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import Captions from 'yet-another-react-lightbox/plugins/captions';

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  category: string;
  width?: number;
  height?: number;
}

const categories = ['Tất cả', 'Tổng quan', 'Cơ sở vật chất', 'Hoạt động'];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  // state cho Lightbox
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/gallery`);
        const data = await res.json();
        if (res.ok && Array.isArray(data.images)) setGalleryImages(data.images);
      } catch (e) {
        console.error('Failed to fetch gallery images:', e);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const filteredImages = useMemo(
    () =>
      selectedCategory === 'Tất cả'
        ? galleryImages
        : galleryImages.filter(img => img.category === selectedCategory),
    [galleryImages, selectedCategory]
  );

  // slides cho Lightbox
  const slides = useMemo(
    () =>
      filteredImages.map(img => ({
        src: img.url,
        alt: img.alt,
        width: img.width ?? 1600,
        height: img.height ?? 900,
      })),
    [filteredImages]
  );

  return (
    <>
      {/* Filter */}
      <div className='flex flex-wrap justify-center gap-2 mb-8'>
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category)}
            className='rounded-full'
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className='text-center py-12'>
          <div className='text-gray-400 mb-4'>
            <svg
              className='w-16 h-16 mx-auto animate-spin'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1}
                d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
              />
            </svg>
          </div>
          <p className='text-gray-500'>Đang tải thư viện ảnh...</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {filteredImages.map((image, i) => (
            <button
              key={image.id}
              type='button'
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
              className='group text-left cursor-pointer'
            >
              <div className='relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300'>
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={300}
                  height={200}
                  className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300'
                />
              </div>
              <div className='mt-2'>
                <h3 className='font-medium text-gray-900 line-clamp-1'>
                  {image.alt}
                </h3>
                <p className='text-sm text-gray-500'>{image.category}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {!loading && filteredImages.length === 0 && (
        <div className='text-center py-12'>
          <div className='text-gray-400 mb-4'>
            <svg
              className='w-16 h-16 mx-auto'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1}
                d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
              />
            </svg>
          </div>
          <h3 className='text-lg font-medium text-gray-900 mb-2'>
            Không có hình ảnh
          </h3>
          <p className='text-gray-500'>
            Không tìm thấy hình ảnh nào trong danh mục này.
          </p>
        </div>
      )}

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        plugins={[Zoom, Thumbnails, Captions]}
        styles={{
          container: {
            backgroundColor: 'rgba(17, 24, 39, 0.35)',
            backdropFilter: 'blur(2px)',
          },
          slide: { borderRadius: 16, overflow: 'hidden' },
        }}
        carousel={{ padding: 24, finite: false }}
        animation={{ fade: 200 }}
        controller={{ closeOnBackdropClick: true }}
      />
    </>
  );
}
