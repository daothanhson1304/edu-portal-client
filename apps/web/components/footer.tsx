import Link from 'next/link';
import { Facebook, Youtube } from 'lucide-react';
import { EMAIL_SUPPORT } from '@/constants';

export default function Footer() {
  return (
    <footer className='bg-primary text-primary-foreground pt-10 pb-6 px-6 text-sm'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col lg:flex-row justify-between items-start gap-6'>
          <div className='flex-1'>
            <div className='mb-3 font-bold text-lg'>
              Trường Trung học Cơ sở Đồng Than
            </div>
            <p className='mb-2'>
              Địa chỉ: <strong>Đường 318, Xã Hoàn Long, Tỉnh Hưng Yên</strong>
            </p>
            <p className='mb-1'>
              Email: <strong>{EMAIL_SUPPORT}</strong>
            </p>
            <p className='mt-2 text-xs italic'>
              “Chất lượng giáo dục là nền tảng – Học sinh là trung tâm”
            </p>
            <p className='text-xs mt-1'>
              Thời gian làm việc: 7h00 – 17h00 (T2 - T7)
            </p>
          </div>

          <div className='flex items-center space-x-4 mt-4 lg:mt-0'>
            <Link href='https://facebook.com' target='_blank'>
              <Facebook className='w-6 h-6 text-white hover:text-gray-300' />
            </Link>
            <Link href='https://youtube.com' target='_blank'>
              <Youtube className='w-6 h-6 text-white hover:text-gray-300' />
            </Link>
          </div>
        </div>

        <div className='mt-6 border-t border-white/20 pt-4 text-center text-xs opacity-80'>
          © 2025 Trường THCS Đồng Than. Mọi quyền được bảo lưu. Nội dung thuộc
          bản quyền của nhà trường.
        </div>
      </div>
    </footer>
  );
}
