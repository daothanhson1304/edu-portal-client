import Image from 'next/image';
import Menu from './menu';
import Logo from '@/public/images/logo.jpg';
import Link from 'next/link';

export default function Header() {
  return (
    <header className='bg-white shadow-md sticky top-0 z-50'>
      <div className='px-4 py-2 flex items-center justify-between'>
        <Link href='/'>
          <div className='flex items-center gap-2'>
            <Image src={Logo} alt='Logo' width={50} height={50} />
            <div>
              <p className='text-sm text-primary font-bold'>
                TRƯỜNG TRUNG HỌC CƠ SỞ ĐỒNG THAN
              </p>
              <p className='text-xs'>Trường đạt chuẩn quốc gia mức độ 1</p>
            </div>
          </div>
        </Link>
        <Menu />
      </div>
    </header>
  );
}
