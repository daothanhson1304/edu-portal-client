import { Users } from 'lucide-react';
import { Staff } from './types';
import FeaturedCard from './components/featured-card';
import StaffCard from './components/staff-card';
import { Metadata } from 'next';

const staffData: Staff[] = [
  {
    id: '1',
    name: 'Cô Chu Thị Nở',
    role: 'Hiệu trưởng',
    department: 'Ban Giám hiệu',
    phone: '0906 888 888',
    email: 'chu.chu@thcs.edu.vn',

    featured: true,
    photo: '/images/hieutruong.jpg',
  },
  {
    id: '2',
    name: 'Cô Đào Thị Hiên',
    role: 'Phó Hiệu trưởng',
    department: 'Ban Giám hiệu',
    phone: '0906 888 888',
    email: 'hien.dao@thcs.edu.vn',

    photo: '/images/staff/vp1.jpg',
  },

  {
    id: '4',
    name: 'Cô Lê Thu Hà',
    role: 'Tổ trưởng Ngữ văn',
    department: 'Tổ Ngữ văn',
    email: 'ha.le@thcs.edu.vn',

    photo: '/images/staff/literature.jpg',
  },
  {
    id: '5',
    name: 'Thầy Phạm Đức Long',
    role: 'Tổ trưởng Toán',
    department: 'Tổ Toán',
    email: 'long.pham@thcs.edu.vn',

    photo: '/images/staff/math.jpg',
  },
  {
    id: '6',
    name: 'Cô Vũ Khánh Linh',
    role: 'Giáo viên Tiếng Anh',
    department: 'Tổ Tiếng Anh',
    email: 'linh.vu@thcs.edu.vn',

    photo: '/images/staff/english.jpg',
  },
  {
    id: '7',
    name: 'Thầy Bùi Thanh Sơn',
    role: 'Tổng phụ trách Đội',
    department: 'Công tác Đội',
    email: 'son.bui@thcs.edu.vn',

    photo: '/images/staff/union.jpg',
  },
];

export default function StaffDirectoryPage() {
  return (
    <div className='max-w-7xl mx-auto px-4 md:px-6 py-10'>
      {/* Header */}
      <div className='text-center'>
        <h1 className='text-xl md:text-5xl font-bold mt-2 text-primary'>
          Ban Giám hiệu & Cán bộ chủ chốt
        </h1>
      </div>

      {/* Featured (Principal) */}
      {staffData.find(s => s.featured) && (
        <div className='mt-10'>
          <FeaturedCard staff={staffData.find(s => s.featured)!} />
        </div>
      )}

      {/* Deputies section (example) */}
      <section className='mt-10'>
        <div className='flex items-center gap-2 mb-4'>
          <Users className='h-5 w-5' />
          <h2 className='text-xl font-semibold'>Ban Giám hiệu</h2>
        </div>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {staffData
            .filter(s => s.department === 'Ban Giám hiệu')
            .map(s => (
              <StaffCard key={s.id} staff={s} />
            ))}
        </div>
      </section>

      {/* Other staff */}
      <section className='mt-10'>
        <div className='flex items-center gap-2 mb-4'>
          <Users className='h-5 w-5' />
          <h2 className='text-xl font-semibold'>Các tổ chuyên môn</h2>
        </div>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {staffData
            .filter(s => s.department !== 'Ban Giám hiệu')
            .map(s => (
              <StaffCard key={s.id} staff={s} />
            ))}
        </div>
      </section>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Cơ cấu tổ chức',
  description: 'Cơ cấu tổ chức',
};
