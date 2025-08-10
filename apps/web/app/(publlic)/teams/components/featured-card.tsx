import { Card, CardContent } from '@edu/ui/components/card';
import Image from 'next/image';
import { GraduationCap } from 'lucide-react';
import { Staff } from '../types';

function FeaturedCard({ staff }: { staff: Staff }) {
  return (
    <Card className='overflow-hidden border border-gray-200 shadow-xl bg-gradient-to-b from-white to-slate-50'>
      <CardContent className='p-0'>
        <div className='grid md:grid-cols-[40%_60%]'>
          {/* Ảnh */}
          <div className='relative bg-white border-r border-gray-200'>
            <div className='relative h-64 md:h-[320px] flex items-center justify-center p-4 overflow-hidden'>
              <Image
                src={staff.photo}
                alt={staff.name}
                fill
                priority
                className='object-contain'
              />
            </div>
          </div>

          {/* Thông tin */}
          <div className='p-6 md:p-8 flex flex-col justify-center'>
            <div className='flex items-center gap-2 text-sm text-muted-foreground'>
              <GraduationCap className='h-4 w-4' />
              <span>Ban Giám hiệu</span>
            </div>

            <h2 className='text-2xl md:text-4xl font-bold mt-2 leading-tight'>
              {staff.name}
            </h2>

            <p className='text-base md:text-lg mt-1 text-primary font-semibold'>
              {staff.role}
            </p>

            <div className='mt-4 space-y-1 text-sm text-muted-foreground'>
              {staff.department && <p>Tổ/Phòng: {staff.department}</p>}
              {staff.phone && <p>Điện thoại: {staff.phone}</p>}
              {staff.email && <p>Email: {staff.email}</p>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default FeaturedCard;
