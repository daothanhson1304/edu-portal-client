import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@edu/ui/components/card';
import Image from 'next/image';
import { Staff } from '../types';

function StaffCard({ staff }: { staff: Staff }) {
  return (
    <Card className='group hover:shadow-lg transition overflow-hidden'>
      <CardHeader className='pb-0'>
        <CardTitle className='text-base font-semibold leading-tight min-h-10'>
          {staff.name}
        </CardTitle>
      </CardHeader>
      <CardContent className='pt-4'>
        <div className='relative w-full aspect-[3/4] rounded-2xl overflow-hidden'>
          <Image
            src={staff.photo}
            alt={staff.name}
            fill
            className='object-cover group-hover:scale-105 transition'
          />
        </div>
        <div className='mt-3'>
          <p className='text-primary font-medium'>{staff.role}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default StaffCard;
