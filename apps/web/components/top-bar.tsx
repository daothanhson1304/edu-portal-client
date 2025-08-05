import { PUBLIC_ROUTES } from '@/constants';
import { Phone, Mail, House } from 'lucide-react';
import Link from 'next/link';
export default function TopBar() {
  return (
    <div className='w-full bg-primary text-primary-foreground text-sm'>
      <div className='px-4 flex justify-between items-center h-8'>
        <Link href={PUBLIC_ROUTES.HOME} className='flex items-center gap-2'>
          <span className='text-white'>
            <House size={16} />
          </span>
          <span className='text-xs'>
            Cổng thông tin điện tử Trường THCS Đồng Than
          </span>
        </Link>

        <div className='flex items-center gap-4 text-xs'>
          <div className='flex items-center gap-1'>
            <Phone className='w-4 h-4' />
            <span>0221 3 993 999</span>
          </div>
          <span>•</span>
          <div className='flex items-center gap-1'>
            <Mail className='w-4 h-4' />
            <span>thcsdongthan@edu.vn</span>
          </div>
        </div>
      </div>
    </div>
  );
}
