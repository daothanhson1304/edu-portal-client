import { EMAIL_SUPPORT, PUBLIC_ROUTES } from '@/constants';
import { Phone, Mail, House } from 'lucide-react';
import Link from 'next/link';
export default function TopBar() {
  return (
    <div className='w-full bg-primary text-primary-foreground text-sm'>
      <div className='px-4 flex justify-between items-center h-8'>
        <div className='flex items-center gap-2'>
          <span className='text-white'>
            <House size={16} />
          </span>
          <span className='text-xs'>
            Cổng thông tin điện tử Trường THCS Đồng Than
          </span>
        </div>

        <div className='hidden md:flex items-center gap-4 text-xs'>
          <div className='flex items-center gap-1'>
            <Mail className='w-4 h-4' />
            <span>{EMAIL_SUPPORT}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
