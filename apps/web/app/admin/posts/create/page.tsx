'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@edu/ui/components/button';
import { Input } from '@edu/ui/components/input';
import { Card } from '@edu/ui/components/card';
import { ImagePlus, Trash2 } from 'lucide-react';
import TiptapEditor from '@/components/editor/tiptap-editor';

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@edu/ui/components/select';
import { BASE_URL } from '@/constants';
import { toast } from '@edu/ui/components/sonner';

type PostStatus = 'draft' | 'published';
type PostType = 'news' | 'event' | 'notice' | 'other';

export default function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<PostType | ''>('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

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

  const handleResetForm = () => {
    setTitle('');
    setType('');
    setContent('');
    setImage(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (status: PostStatus) => {
    if (!title.trim()) return console.error('Title is required');
    if (!content.trim()) return console.error('Content is required');
    if (!type) return console.error('Type is required');

    setSubmitting(true);
    let uploadedImageUrl: string | null = null;

    try {
      if (image) {
        const formData = new FormData();
        formData.append('file', image);

        const resUpload = await fetch(`${BASE_URL}/api/image`, {
          method: 'POST',
          body: formData,
        });
        if (!resUpload.ok) throw new Error('Upload image failed');

        const dataUpload = await resUpload.json();
        uploadedImageUrl = dataUpload.url ?? null;
      }

      const res = await fetch(`${BASE_URL}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          thumbnailUrl: uploadedImageUrl,
          status,
          type,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error || 'Create post failed');
      }

      const data = await res.json();
      toast.success('Post created successfully');
      handleResetForm();
    } catch (err) {
      console.error('Error creating post:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='max-w-6xl mx-auto p-6'>
      <Card className='p-6 space-y-6'>
        {/* Header */}
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-semibold'>Add New Post</h1>
          <div className='flex gap-2'>
            <Button
              variant='outline'
              onClick={() => handleSubmit('draft')}
              disabled={submitting}
            >
              Save as Draft
            </Button>
            <Button
              onClick={() => handleSubmit('published')}
              disabled={submitting}
            >
              {submitting ? 'Publishing…' : 'Publish'}
            </Button>
          </div>
        </div>

        {/* Title */}
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Post Title</label>
          <Input
            placeholder='Enter post title'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        {/* Type */}
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Post Type</label>
          <Select value={type} onValueChange={v => setType(v as PostType)}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Select a type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='news'>News</SelectItem>
              <SelectItem value='event'>Event</SelectItem>
              <SelectItem value='notice'>Notice</SelectItem>
              <SelectItem value='other'>Other</SelectItem>
            </SelectContent>
          </Select>
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
