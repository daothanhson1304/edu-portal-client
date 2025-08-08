import { Card, CardContent } from '@edu/ui/components/card';
import { Button } from '@edu/ui/components/button';
import Link from 'next/link';
import Image from 'next/image';
import ExampleImage from '@/public/images/example.jpg';
import { Input } from '@edu/ui/components/input';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@edu/ui/components/breadcrumb';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@edu/ui/components/select';
import { Metadata } from 'next';

const mockNews = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  title: [
    'Sinh viên PTIT giành huy chương Vàng tin học văn phòng thế giới 2025',
    'PTIT trao bằng Thạc sĩ chương trình VMCS',
    'Sinh viên xuất sắc tại Coding Fest 2025',
    'PTIT tổ chức hoạt động tri ân kỷ niệm 78 năm ngày Thương binh – Liệt sĩ',
    'Thông báo quy đổi điểm tuyển sinh đại học chính quy 2025',
    'PTIT và TMN hợp tác về AI, STEM và công nghệ xanh',
    'Tư vấn tuyển sinh đại học chính quy năm 2025',
    'Khai giảng chương trình “Lãnh đạo trẻ trong kỷ nguyên số”',
  ][i],
  date: `2025-07-${31 - i}`.padStart(10, '0'),
  imageUrl: `/images/news-${i + 1}.jpg`,
  slug: `news-${i + 1}`,
}));

export default function NewsPage() {
  return (
    <div className='max-w-7xl mx-auto px-4 py-10'>
      <div className='relative h-64 w-full'>
        <div className='absolute inset-0 flex flex-col justify-center items-center text-white text-center'>
          {/* Breadcrumb - dùng shadcn UI */}
          <section className='py-10 px-4 text-center'>
            <Breadcrumb>
              <BreadcrumbList className='justify-center flex flex-wrap'>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href='/'
                    className='text-primary font-bold text-xl hover:text-secondary hover:underline'
                  >
                    Trang chủ
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator className='mx-2 text-primary' />
                <BreadcrumbItem>
                  <BreadcrumbPage className='text-primary font-bold text-xl'>
                    Sự kiện
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </section>
        </div>
      </div>
      <div className='flex flex-col md:flex-row md:items-center md:justify-center gap-4 mb-8'>
        <Input
          type='text'
          placeholder='Nhập thông tin tìm kiếm'
          className='md:max-w-sm'
        />
        <Select>
          <SelectTrigger className='w-full md:w-52'>
            <SelectValue placeholder='Sắp xếp theo...' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='latest'>Mới nhất</SelectItem>
            <SelectItem value='oldest'>Cũ nhất</SelectItem>
            <SelectItem value='title'>Tiêu đề (A-Z)</SelectItem>
          </SelectContent>
        </Select>
        <Button className='bg-primary text-white w-full md:w-auto'>
          Tìm kiếm
        </Button>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {mockNews.map(item => (
          <Card
            key={item.id}
            className='hover:shadow-lg transition-all duration-300 py-0 overflow-hidden'
          >
            <Image
              src={ExampleImage}
              alt={item.title ?? ''}
              width={400}
              height={250}
              className='w-full h-48 object-cover rounded-t-md hover:scale-105 transition-all duration-300'
            />
            <CardContent className='py-4'>
              <p className='text-sm text-muted-foreground mb-2'>
                📰 Tin Tức · {item.date}
              </p>
              <h3 className='font-semibold text-base text-blue-900 mb-2 line-clamp-3'>
                {item.title}
              </h3>
              <Link
                href={`/news/${item.slug}`}
                className='text-primary text-sm hover:underline'
              >
                Xem chi tiết →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className='flex justify-center gap-2 mt-10'>
        <Button variant='outline' size='sm'>
          {'<'}
        </Button>
        <Button variant='default' size='sm'>
          1
        </Button>
        <Button variant='outline' size='sm'>
          2
        </Button>
        <Button variant='outline' size='sm'>
          3
        </Button>
        <Button variant='ghost' size='sm'>
          ...
        </Button>
        <Button variant='outline' size='sm'>
          128
        </Button>
        <Button variant='outline' size='sm'>
          {'>'}
        </Button>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Sự kiện | Trường THCS Đồng Than',
  description: 'Sự kiện',
};
