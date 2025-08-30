'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@edu/ui/components/button';
import { Input } from '@edu/ui/components/input';
import { Card } from '@edu/ui/components/card';
import { ImagePlus, Trash2 } from 'lucide-react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@edu/ui/components/select';
import { toast } from '@edu/ui/components/sonner';
import TiptapEditor from '@/components/editor/tiptap-editor';
import { BASE_URL } from '@/constants';

export type PostStatus = 'draft' | 'published';
export type PostType = 'news' | 'event' | 'notice' | 'other';

type PostEditorProps = {
  mode: 'create' | 'edit';
  initial?: {
    _id: string;
    title: string;
    type: PostType;
    content: string;
    thumbnailUrl?: string | null;
    status: PostStatus;
  } | null;
};

export default function PostEditor({ mode, initial }: PostEditorProps) {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [type, setType] = useState<PostType | ''>('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [removeExistingImage, setRemoveExistingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && initial) {
      setTitle(initial.title ?? '');
      setType((initial.type as PostType) ?? '');
      setContent(initial.content ?? '');
      setPreviewUrl(initial.thumbnailUrl || null);
      setRemoveExistingImage(false);
    }
  }, [mode, initial]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setRemoveExistingImage(false);
  };

  const handleImageRemove = () => {
    setImage(null);
    setPreviewUrl(null);
    if (mode === 'edit' && initial?.thumbnailUrl) setRemoveExistingImage(true);
  };

  const resetForm = () => {
    setTitle('');
    setType('');
    setContent('');
    setImage(null);
    setPreviewUrl(null);
    setRemoveExistingImage(false);
  };

  async function handleSubmit(status: PostStatus) {
    if (!title.trim()) return toast.error('Thiếu tiêu đề');
    if (!content.trim()) return toast.error('Thiếu nội dung');
    if (!type) return toast.error('Chưa chọn loại bài viết');

    setSubmitting(true);
    try {
      let thumbnailUrlToSend: string | null | undefined =
        mode === 'edit' ? (initial?.thumbnailUrl ?? null) : null;

      if (image) {
        const fd = new FormData();
        fd.append('file', image);
        const resUpload = await fetch(`${BASE_URL}/api/image`, {
          method: 'POST',
          body: fd,
        });
        if (!resUpload.ok) {
          const err = await resUpload.json().catch(() => ({}));
          throw new Error(err?.error || 'Upload ảnh thất bại');
        }
        const dataUpload = await resUpload.json();
        thumbnailUrlToSend = dataUpload.url ?? null;
      } else if (mode === 'edit' && removeExistingImage) {
        thumbnailUrlToSend = null;
      }

      const payload = {
        title,
        content,
        type,
        status,
        thumbnailUrl: thumbnailUrlToSend,
      };

      const url =
        mode === 'create'
          ? `${BASE_URL}/api/posts`
          : `${BASE_URL}/api/posts/${initial!._id}`;
      const method = mode === 'create' ? 'POST' : 'PATCH';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || 'Lưu bài viết thất bại');

      toast.success(
        mode === 'create' ? 'Đã tạo bài viết' : 'Đã cập nhật bài viết'
      );

      if (mode === 'create') {
        resetForm();
      } else {
        router.refresh();
      }
    } catch (e: any) {
      toast.error(e?.message || 'Có lỗi xảy ra');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className='max-w-6xl mx-auto p-6'>
      <Card className='p-6 space-y-6'>
        {/* Header */}
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-semibold'>
            {mode === 'create' ? 'Tạo bài viết mới' : 'Sửa bài viết'}
          </h1>
          <div className='flex gap-2'>
            <Button
              variant='outline'
              onClick={() => handleSubmit('draft')}
              disabled={submitting}
            >
              {mode === 'create' ? 'Lưu nháp' : 'Lưu (nháp)'}
            </Button>
            <Button
              onClick={() => handleSubmit('published')}
              disabled={submitting}
            >
              {submitting
                ? mode === 'create'
                  ? 'Xuất bản…'
                  : 'Cập nhật…'
                : mode === 'create'
                  ? 'Xuất bản'
                  : 'Cập nhật & Publish'}
            </Button>
          </div>
        </div>

        {/* Title */}
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Tiêu đề</label>
          <Input
            placeholder='Nhập tiêu đề'
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>

        {/* Type */}
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Loại bài viết</label>
          <Select value={type} onValueChange={v => setType(v as PostType)}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Chọn loại bài viết' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='news'>Tin tức</SelectItem>
              <SelectItem value='event'>Sự kiện</SelectItem>
              <SelectItem value='notice'>Thông báo</SelectItem>
              <SelectItem value='other'>Khác</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Thumbnail */}
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Ảnh bìa</label>

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
                <p>Click để tải lên ảnh bìa</p>
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

        {/* Editor */}
        <div className='space-y-2'>
          <label className='text-sm font-medium'>Nội dung</label>
          <TiptapEditor content={content} onChange={setContent} />
        </div>
      </Card>
    </div>
  );
}
