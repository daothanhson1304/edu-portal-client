import Link from 'next/link';
import { Button } from '@edu/ui/components/button';

export default function NotFoundPage() {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-white px-6 py-16 text-center'>
      <h1 className='text-7xl font-extrabold text-primary'>404</h1>
      <h2 className='text-2xl text-secondary-foreground font-semibold mt-4'>
        Trang không tồn tại
      </h2>
      <p className='text-muted-foreground mt-2 max-w-md'>
        Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa. Vui lòng
        kiểm tra lại đường dẫn hoặc quay về trang chủ.
      </p>
      <Link href='/'>
        <Button className='mt-6 bg-primary hover:bg-primary/80 text-white px-6 py-2'>
          Quay về trang chủ
        </Button>
      </Link>
    </div>
  );
}
