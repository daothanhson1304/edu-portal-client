'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@edu/ui/components/dialog';
import { Button } from '@edu/ui/components/button';
import { X } from 'lucide-react';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

// Fallback images for when API is not available
const fallbackImages: GalleryImage[] = [
  {
    id: '1',
    src: '/images/hero.jpg',
    alt: 'Trường học',
    category: 'Tổng quan',
  },
  {
    id: '2',
    src: '/images/facilities/auditorium.png',
    alt: 'Hội trường',
    category: 'Cơ sở vật chất',
  },
  {
    id: '3',
    src: '/images/facilities/building.png',
    alt: 'Tòa nhà chính',
    category: 'Cơ sở vật chất',
  },
  {
    id: '4',
    src: '/images/facilities/library.png',
    alt: 'Thư viện',
    category: 'Cơ sở vật chất',
  },
  {
    id: '5',
    src: '/images/facilities/canteen.png',
    alt: 'Căng tin',
    category: 'Cơ sở vật chất',
  },
  {
    id: '6',
    src: '/images/facilities/courtyard.png',
    alt: 'Sân trường',
    category: 'Cơ sở vật chất',
  },
  {
    id: '7',
    src: '/images/facilities/studio.png',
    alt: 'Phòng học',
    category: 'Cơ sở vật chất',
  },
  {
    id: '8',
    src: '/images/facilities/a.jpg',
    alt: 'Hoạt động học tập',
    category: 'Hoạt động',
  },
  {
    id: '9',
    src: '/images/facilities/b.jpg',
    alt: 'Hoạt động ngoại khóa',
    category: 'Hoạt động',
  },
];

const categories = ['Tất cả', 'Tổng quan', 'Cơ sở vật chất', 'Hoạt động'];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [galleryImages, setGalleryImages] =
    useState<GalleryImage[]>(fallbackImages);
  const [loading, setLoading] = useState(true);

  // Fetch images from API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/nextapi/gallery');
        const data = await response.json();
        if (response.ok && data.images && data.images.length > 0) {
          setGalleryImages(data.images);
        }
      } catch (error) {
        console.error('Failed to fetch gallery images:', error);
        // Keep fallback images
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const filteredImages =
    selectedCategory === 'Tất cả'
      ? galleryImages
      : galleryImages.filter(img => img.category === selectedCategory);

  return (
    <>
      {/* Category Filter */}
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

      {/* Gallery Grid */}
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
          {filteredImages.map(image => (
            <Dialog key={image.id}>
              <DialogTrigger asChild>
                <div className='group cursor-pointer'>
                  <div className='relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300'>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={300}
                      height={200}
                      className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300'
                    />
                    <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center'>
                      <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                        <div className='bg-white bg-opacity-90 rounded-full p-2'>
                          <svg
                            className='w-6 h-6 text-gray-800'
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              strokeWidth={2}
                              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7'
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='mt-2'>
                    <h3 className='font-medium text-gray-900'>{image.alt}</h3>
                    <p className='text-sm text-gray-500'>{image.category}</p>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className='max-w-4xl max-h-[90vh] p-0'>
                <div className='relative'>
                  <Button
                    variant='ghost'
                    size='icon'
                    className='absolute top-4 right-4 z-10 bg-white bg-opacity-80 hover:bg-opacity-100'
                    onClick={() => setSelectedImage(null)}
                  >
                    <X className='h-4 w-4' />
                  </Button>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={800}
                    height={600}
                    className='w-full h-auto max-h-[80vh] object-contain'
                  />
                  <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6'>
                    <h3 className='text-white text-xl font-semibold mb-2'>
                      {image.alt}
                    </h3>
                    <p className='text-white text-opacity-80'>
                      {image.category}
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      )}

      {/* Empty State */}
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
    </>
  );
}
