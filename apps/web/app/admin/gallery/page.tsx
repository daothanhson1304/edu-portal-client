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
import { Upload, Edit2, Trash2, Plus } from 'lucide-react';
import { toast } from '@edu/ui/components/sonner';

const categories = ['Tổng quan', 'Cơ sở vật chất', 'Hoạt động'];

interface GalleryImage {
  id: string;
  filename: string;
  src: string;
  alt: string;
  category: string;
  uploadedAt: string;
  size: number;
}

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
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
      const response = await fetch('/nextapi/gallery');
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

    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) {
        toast.error('Chỉ được upload file ảnh');
        continue;
      }

      if (file.size > 10 * 1024 * 1024) {
        toast.error('File quá lớn. Tối đa 10MB');
        continue;
      }

      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('alt', file.name.split('.')[0] || '');
        formData.append('category', 'Tổng quan');

        const response = await fetch('/nextapi/gallery/upload', {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();

        if (response.ok) {
          toast.success(`Đã upload ảnh: ${file.name}`);
          fetchImages(); // Refresh the list
        } else {
          toast.error(result.error || 'Lỗi khi upload ảnh');
        }
      } catch (error) {
        toast.error('Lỗi khi upload ảnh');
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleDelete = async (image: GalleryImage) => {
    try {
      const response = await fetch(
        `/nextapi/gallery/upload?filename=${image.filename}`,
        {
          method: 'DELETE',
        }
      );

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

  const handleSaveEdit = (formData: FormData) => {
    const alt = formData.get('alt') as string;
    const category = formData.get('category') as string;

    setImages(prev =>
      prev.map(img =>
        img.id === editingImage.id ? { ...img, alt, category } : img
      )
    );
    setIsEditDialogOpen(false);
    setEditingImage(null);
    toast.success('Đã cập nhật thông tin ảnh');
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
            <Button>
              <Plus className='w-4 h-4 mr-2' />
              Thêm ảnh mới
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
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDrop={handleDrop}
                onDragOver={e => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
              >
                <Upload className='w-12 h-12 mx-auto text-gray-400 mb-4' />
                <p className='text-gray-600 mb-2'>Kéo thả ảnh vào đây hoặc</p>
                <Button
                  variant='outline'
                  onClick={() => fileInputRef.current?.click()}
                >
                  Chọn file
                </Button>
                <input
                  ref={fileInputRef}
                  type='file'
                  multiple
                  accept='image/*'
                  className='hidden'
                  onChange={e => handleFileUpload(e.target.files)}
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
            <Card key={image.id} className='overflow-hidden'>
              <div className='relative'>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={300}
                  height={200}
                  className='w-full h-48 object-cover'
                />
                <div className='absolute top-2 right-2 flex gap-1'>
                  <Button
                    size='icon'
                    variant='secondary'
                    className='h-8 w-8'
                    onClick={() => handleEdit(image)}
                  >
                    <Edit2 className='h-4 w-4' />
                  </Button>
                  <Button
                    size='icon'
                    variant='destructive'
                    className='h-8 w-8'
                    onClick={() => handleDelete(image)}
                  >
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </div>
              </div>
              <CardHeader className='pb-2'>
                <CardTitle className='text-sm font-medium truncate'>
                  {image.alt}
                </CardTitle>
              </CardHeader>
              <CardContent className='pt-0'>
                <div className='space-y-1'>
                  <p className='text-xs text-gray-500'>
                    Danh mục: {image.category}
                  </p>
                  <p className='text-xs text-gray-500'>
                    Upload: {image.uploadedAt}
                  </p>
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
