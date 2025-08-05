import Image from 'next/image';
import Menu from './menu';

export default function Header() {
  return (
    <header className='bg-white shadow-md sticky top-0 z-50'>
      <div className='px-4 py-2 flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          {/* <Image src='/images/logo.png' alt='Logo' width={30} height={30} /> */}
          <div>
            <p className='text-sm text-primary font-bold'>
              Trường Trung Học Cơ Sở Đồng Than
            </p>
            <p className='text-xs'>Hoàn Long, Yên Mỹ, Hưng Yên</p>
          </div>
        </div>
        <Menu />
      </div>
    </header>
  );
}
