import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@edu/ui/components/button';
import { Card, CardContent } from '@edu/ui/components/card';
import { Calendar } from 'lucide-react';

const newsData = [
  {
    date: '05/08/2025',
    title:
      'Bộ trưởng Bộ Công nghệ và Truyền thông CHDCND Lào thăm và làm việc với Học viện Công nghệ Bưu...',
    image: '/news1.jpg',
    link: '#',
  },
  {
    date: '01/08/2025',
    title:
      'PTIT tuyên dương, khen thưởng sinh viên đạt thành tích cao trong các cuộc thi quốc tế tại Mỹ và Úc',
    image: '/news2.jpg',
    link: '#',
  },
  {
    date: '01/08/2025',
    title:
      'PTIT chủ trì mạng lưới về Công nghệ mạng thế hệ sau, Công nghệ an ninh mạng thông minh và...',
    image: '/news3.jpg',
    link: '#',
  },
  {
    date: '01/08/2025',
    title:
      'PTIT trao quyết định công nhận Chuyên gia cao cấp, cố vấn đặc biệt...',
    image: '/news4.jpg',
    link: '#',
  },
  {
    date: '31/07/2025',
    title:
      'Sinh viên PTIT giành huy chương Vàng thi Tin học văn phòng thế giới 2025',
    image: '/news5.jpg',
    link: '#',
  },
  {
    date: '29/07/2025',
    title:
      'PTIT trao bằng Thạc Sĩ chương trình Khoa học máy tính giảng dạy bằng...',
    image: '/news6.jpg',
    link: '#',
  },
];

export default function FeaturedNewsSection() {
  return (
    <section className='py-10 px-6 max-w-7xl mx-auto'>
      <div className='text-center mb-8'>
        <h2 className='text-primary text-sm font-semibold tracking-widest uppercase'>
          Tin tức sự kiện
        </h2>
        <h1 className='text-4xl font-bold text-secondary-foreground mt-2'>
          Tin tức nổi bật
        </h1>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {newsData.map((news, index) => (
          <Card key={index} className='overflow-hidden'>
            <Image
              src={news.image}
              alt={news.title}
              width={600}
              height={400}
              className='w-full h-48 object-cover'
            />
            <CardContent className='p-4'>
              <div className='flex items-center text-sm text-muted-foreground mb-2'>
                <Calendar className='w-4 h-4 mr-1' />
                <span>{news.date}</span>
              </div>
              <Link
                href={news.link}
                className='font-semibold hover:underline text-base text-blue-800 line-clamp-3'
              >
                {news.title}
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className='text-center mt-8'>
        <Button className='bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded'>
          Xem thêm
        </Button>
      </div>
    </section>
  );
}
