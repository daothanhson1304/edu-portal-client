'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@edu/ui/components/dialog';
import { Button } from '@edu/ui/components/button';
import { Trash2, Check, Upload, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@edu/ui/lib/utils';

type Props = {
  open: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
};

export default function ImageGalleryModal({ open, onClose, onSelect }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  // Upload 1 ảnh
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setUploading(true);
    try {
      const res = await fetch('http://localhost:5000/api/image', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setImages(prev => [data.url, ...prev]);
    } catch (err) {
      console.error('Upload failed', err);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = '';
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/image');
        const data = await res.json();
        setImages(data.images);
      } catch (err) {
        console.error('Failed to fetch images', err);
      }
    };
    fetchImages();
  }, []);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-2xl font-semibold'>
            Upload or Choose Image
          </DialogTitle>
        </DialogHeader>

        {/* Upload Area */}
        <div
          onClick={() => inputRef.current?.click()}
          className={cn(
            'border border-dashed border-gray-300 rounded-md h-44 flex flex-col items-center justify-center cursor-pointer transition text-muted-foreground hover:bg-gray-50',
            uploading && 'opacity-60 pointer-events-none'
          )}
        >
          {uploading ? (
            <Loader2 className='animate-spin w-6 h-6 text-primary mb-2' />
          ) : (
            <>
              <Upload className='w-6 h-6 mb-2' />
              <p className='text-sm'>
                <span className='font-medium text-primary'>
                  Click to upload
                </span>{' '}
                or drag
              </p>
            </>
          )}
          <input
            ref={inputRef}
            type='file'
            accept='image/*'
            className='hidden'
            onChange={handleUpload}
          />
        </div>

        {/* Image Grid */}
        <div className='mt-6'>
          <div className='max-h-[500px] overflow-y-auto pr-1'>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4'>
              {images.map((url, index) => (
                <div
                  key={index}
                  className='relative rounded-md overflow-hidden border hover:shadow-sm transition'
                >
                  <Image
                    src={url}
                    alt='uploaded'
                    width={300}
                    height={200}
                    className='object-cover w-full h-40 rounded-md'
                    onClick={() => {
                      onSelect(url);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
