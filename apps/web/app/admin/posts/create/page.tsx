'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@edu/ui/components/button';
import { Input } from '@edu/ui/components/input';
import { Card } from '@edu/ui/components/card';
import { ImagePlus, Trash2 } from 'lucide-react';
import TiptapEditor from '@/components/editor/tiptap-editor';

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleImageRemove = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (status: 'draft' | 'published') => {
    let uploadedImageUrl: string | null = 'null';

    if (image) {
      const formData = new FormData();
      formData.append('file', image);

      try {
        const res = await fetch('http://localhost:5000/api/image', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        uploadedImageUrl = data.url;
      } catch (err) {
        console.error('Image upload failed', err);
        return;
      }
    }

    try {
      const res = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          thumbnailUrl: uploadedImageUrl,
          status,
        }),
      });

      const data = await res.json();
      console.log('Post created:', data);
    } catch (err) {
      console.error('Error creating post:', err);
    }
  };

  return (
    <div className='max-w-6xl mx-auto p-6'>
      <Card className='p-6 space-y-6'>
        {/* Header */}
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-semibold'>Add New Post</h1>
          <div className='flex gap-2'>
            <Button variant='outline' onClick={() => handleSubmit('draft')}>
              Save as Draft
            </Button>
            <Button onClick={() => handleSubmit('published')}>Publish</Button>
          </div>
        </div>

        {/* Title Input */}
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Post Title</label>
          <Input
            placeholder='Enter post title'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        {/* Thumbnail Upload */}
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Cover Image</label>

          {previewUrl ? (
            <div className='relative w-full border rounded-md overflow-hidden'>
              <Image
                src={previewUrl}
                alt='Cover Preview'
                width={800}
                height={450}
                className='w-full h-auto object-contain rounded-md'
              />
              <Button
                type='button'
                size='icon'
                variant='destructive'
                className='absolute top-2 right-2'
                onClick={handleImageRemove}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ) : (
            <label
              htmlFor='cover-image'
              className='flex items-center justify-center border border-dashed border-gray-300 rounded-md bg-white py-12 px-4 cursor-pointer hover:bg-gray-50 transition'
            >
              <div className='flex flex-col items-center text-muted-foreground'>
                <ImagePlus className='w-8 h-8 mb-2' />
                <p>Click to upload a cover image</p>
              </div>
              <input
                type='file'
                id='cover-image'
                className='hidden'
                accept='image/*'
                onChange={handleImageUpload}
              />
            </label>
          )}

          {image && (
            <p className='text-sm text-gray-500 italic mt-1'>
              Selected file: {image.name}
            </p>
          )}
        </div>

        {/* Rich Text Editor */}
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Content</label>
          <TiptapEditor content={content} onChange={setContent} />
        </div>
      </Card>
    </div>
  );
}
