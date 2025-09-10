'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@edu/ui/components/button';
import { Input } from '@edu/ui/components/input';
import { Label } from '@edu/ui/components/label';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@edu/ui/components/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@edu/ui/components/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@edu/ui/components/select';
import { Upload, Edit2, Trash2, Plus, Loader2 } from 'lucide-react';
import { toast } from '@edu/ui/components/sonner';
import { BASE_URL } from '@/constants';

const categories = ['Tổng quan', 'Cơ sở vật chất', 'Hoạt động'];

interface GalleryImage {
  id: string;
  filename: string;
  url: string;
  alt: string;
  category: string;
  uploadedAt: string;
  size: number;
}

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<any>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch images from API
  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/gallery`);
      const data = await response.json();
      if (response.ok) {
        setImages(data.images);
      } else {
        toast.error('Lỗi khi tải danh sách ảnh');
      }
    } catch (error) {
      toast.error('Lỗi khi tải danh sách ảnh');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const filteredImages =
    selectedCategory === 'Tất cả'
      ? images
      : images.filter(img => img.category === selectedCategory);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;

    setUploading(true);

    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) {
          toast.error('Chỉ được upload file ảnh');
          continue;
        }

        if (file.size > 10 * 1024 * 1024) {
          toast.error('File quá lớn. Tối đa 10MB');
          continue;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('alt', file.name.split('.')[0] || '');
        formData.append('category', 'Tổng quan');

        const response = await fetch(`${BASE_URL}/api/gallery/upload`, {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();

        if (response.ok) {
          toast.success(`Đã upload ảnh: ${file.name}`);
        } else {
          toast.error(result.error || 'Lỗi khi upload ảnh');
        }
      }

      // Refresh the list after all uploads
      await fetchImages();
    } catch (error) {
      toast.error('Lỗi khi upload ảnh');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDelete = async (image: GalleryImage) => {
    try {
      const response = await fetch(`${BASE_URL}/api/gallery/${image.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Đã xóa ảnh');
        fetchImages(); // Refresh the list
      } else {
        const result = await response.json();
        toast.error(result.error || 'Lỗi khi xóa ảnh');
      }
    } catch (error) {
      toast.error('Lỗi khi xóa ảnh');
    }
  };

  const handleEdit = (image: any) => {
    setEditingImage(image);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async (formData: FormData) => {
    const alt = formData.get('alt') as string;
    const category = formData.get('category') as string;

    try {
      const response = await fetch(
        `${BASE_URL}/api/gallery/${editingImage.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            filename: editingImage.filename,
            alt,
            category,
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        // Update local state
        setImages(prev =>
          prev.map(img =>
            img.id === editingImage.id ? { ...img, alt, category } : img
          )
        );
        setIsEditDialogOpen(false);
        setEditingImage(null);
        toast.success('Đã cập nhật thông tin ảnh');
      } else {
        toast.error(result.error || 'Lỗi khi cập nhật thông tin ảnh');
      }
    } catch (error) {
      toast.error('Lỗi khi cập nhật thông tin ảnh');
    }
  };

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold'>Quản lý thư viện ảnh</h1>
          <p className='text-gray-600 mt-2'>
            Upload và quản lý hình ảnh cho website
          </p>
        </div>
        <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button disabled={uploading}>
              {uploading ? (
                <Loader2 className='w-4 h-4 mr-2 animate-spin' />
              ) : (
                <Plus className='w-4 h-4 mr-2' />
              )}
              {uploading ? 'Đang upload...' : 'Thêm ảnh mới'}
            </Button>
          </DialogTrigger>
          <DialogContent className='max-w-md'>
            <DialogHeader>
              <DialogTitle>Upload ảnh mới</DialogTitle>
            </DialogHeader>
            <div className='space-y-4'>
              {/* Drag & Drop Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragOver
                    ? 'border-blue-500 bg-blue-50'
                    : uploading
                      ? 'border-gray-300 bg-gray-50 opacity-60'
                      : 'border-gray-300 hover:border-gray-400'
                }`}
                onDrop={handleDrop}
                onDragOver={e => {
                  e.preventDefault();
                  if (!uploading) setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
              >
                {uploading ? (
                  <>
                    <Loader2 className='w-12 h-12 mx-auto text-blue-500 mb-4 animate-spin' />
                    <p className='text-gray-600 mb-2'>Đang upload ảnh...</p>
                    <p className='text-sm text-gray-500'>
                      Vui lòng chờ trong giây lát
                    </p>
                  </>
                ) : (
                  <>
                    <Upload className='w-12 h-12 mx-auto text-gray-400 mb-4' />
                    <p className='text-gray-600 mb-2'>
                      Kéo thả ảnh vào đây hoặc
                    </p>
                    <Button
                      variant='outline'
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                    >
                      Chọn file
                    </Button>
                  </>
                )}
                <input
                  ref={fileInputRef}
                  type='file'
                  multiple
                  accept='image/*'
                  className='hidden'
                  onChange={e => handleFileUpload(e.target.files)}
                  disabled={uploading}
                />
              </div>
              <p className='text-sm text-gray-500 text-center'>
                Hỗ trợ: JPG, PNG, GIF. Tối đa 10MB mỗi file.
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filter */}
      <div className='flex items-center gap-4'>
        <Label htmlFor='category-filter'>Lọc theo danh mục:</Label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className='w-48'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='Tất cả'>Tất cả</SelectItem>
            {categories.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Images Grid */}
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
          <p className='text-gray-500'>Đang tải danh sách ảnh...</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {filteredImages.map(image => (
            <Card
              key={image.id}
              className='overflow-hidden group hover:shadow-lg transition-all duration-300 border-0 shadow-md'
            >
              <div className='relative overflow-hidden'>
                <Image
                  src={image.url}
                  alt={image.alt}
                  width={300}
                  height={200}
                  className='w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105'
                />
                {/* Gradient overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

                {/* Action buttons */}
                <div className='absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <Button
                    size='icon'
                    variant='secondary'
                    className='h-9 w-9 bg-white/90 hover:bg-white shadow-lg backdrop-blur-sm'
                    onClick={() => handleEdit(image)}
                  >
                    <Edit2 className='h-4 w-4 text-gray-700' />
                  </Button>
                  <Button
                    size='icon'
                    variant='destructive'
                    className='h-9 w-9 bg-red-500/90 hover:bg-red-600 shadow-lg backdrop-blur-sm'
                    onClick={() => handleDelete(image)}
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>

                {/* Category badge */}
                <div className='absolute top-3 left-3'>
                  <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
                    {image.category}
                  </span>
                </div>
              </div>

              <CardContent className='p-4'>
                <div className='space-y-3'>
                  {/* Title */}
                  <h3 className='font-semibold text-gray-900 line-clamp-2 leading-tight'>
                    {image.alt}
                  </h3>

                  {/* Metadata */}
                  <div className='space-y-2'>
                    <div className='flex items-center text-xs text-gray-500'>
                      <svg
                        className='w-3 h-3 mr-1.5'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z'
                          clipRule='evenodd'
                        />
                      </svg>
                      {new Date(image.uploadedAt).toLocaleDateString('vi-VN')}
                    </div>

                    <div className='flex items-center text-xs text-gray-500'>
                      <svg
                        className='w-3 h-3 mr-1.5'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                      >
                        <path
                          fillRule='evenodd'
                          d='M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                          clipRule='evenodd'
                        />
                      </svg>
                      {(image.size / 1024 / 1024).toFixed(1)} MB
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
            Không có ảnh nào
          </h3>
          <p className='text-gray-500 mb-4'>
            {selectedCategory === 'Tất cả'
              ? 'Chưa có ảnh nào được upload.'
              : `Không có ảnh nào trong danh mục "${selectedCategory}".`}
          </p>
          {selectedCategory === 'Tất cả' && (
            <Button onClick={() => setIsUploadDialogOpen(true)}>
              <Plus className='w-4 h-4 mr-2' />
              Upload ảnh đầu tiên
            </Button>
          )}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa thông tin ảnh</DialogTitle>
          </DialogHeader>
          {editingImage && (
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSaveEdit(new FormData(e.currentTarget));
              }}
              className='space-y-4'
            >
              <div className='space-y-2'>
                <Label htmlFor='alt'>Tên ảnh</Label>
                <Input
                  id='alt'
                  name='alt'
                  defaultValue={editingImage.alt}
                  required
                />
              </div>
              <div className='space-y-2'>
                <Label htmlFor='category'>Danh mục</Label>
                <Select name='category' defaultValue={editingImage.category}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className='flex justify-end gap-2'>
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Hủy
                </Button>
                <Button type='submit'>Lưu thay đổi</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
