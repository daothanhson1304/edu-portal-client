import { Gallery } from '@/components/gallery';
import { generateMetadata } from '@/utils';

export default function GalleryPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='text-center mb-8'>
        <h1 className='text-4xl font-bold text-gray-900 mb-4'>Thư viện ảnh</h1>
        <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
          Khám phá những hình ảnh đẹp về trường học, cơ sở vật chất và các hoạt
          động học tập
        </p>
      </div>

      <Gallery />
    </div>
  );
}

export const metadata = generateMetadata('Thư viện ảnh');
