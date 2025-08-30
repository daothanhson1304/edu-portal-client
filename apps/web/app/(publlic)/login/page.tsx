import { Suspense } from 'react';
import { LoginForm } from './form';

export default function Page() {
  return (
    <div className='max-w-md mx-auto px-4 py-10'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold'>Đăng nhập</h1>
        <p className='text-gray-500'>
          Vui lòng đăng nhập để vào trang quản trị
        </p>
      </div>
      <div className='mt-6'>
        <Suspense fallback={<div className='p-6 text-center'>Đang tải…</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Đăng nhập | Trường THCS Đồng Than',
  description: 'Đăng nhập để vào trang quản trị',
};
