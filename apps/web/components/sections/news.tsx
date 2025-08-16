import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { Button } from '@edu/ui/components/button';
import { Card, CardContent } from '@edu/ui/components/card';
import { BASE_URL, PUBLIC_ROUTES } from '@/constants';
import { Post } from '@/types';
import { formatDateTime } from '@/lib';

const TAG = 'featured-newsqweqwqe';

async function getFeaturedNews(): Promise<Post[]> {
  try {
    const url = `${BASE_URL}/api/posts?type=news&limit=6`;

    const res = await fetch(url, {
      next: { revalidate: 600, tags: [TAG] },
    });
    if (!res.ok) {
      console.error('Failed to fetch news:', res.status);
      return [];
    }
    const data = await res.json();
    console.log('data', data);
    return (data?.data ?? data ?? []) as Post[];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

export default async function FeaturedNewsSection() {
  const newsData = await getFeaturedNews();

  return (
    <section className='py-10 px-6 max-w-7xl mx-auto'>
      <div className='text-center mb-8'>
        <h2 className='text-primary text-sm font-semibold tracking-widest uppercase'>
          Tin tức sự kiện
        </h2>
        <h1 className='text-4xl font-bold text-secondary mt-2'>
          Tin tức nổi bật
        </h1>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {newsData.length === 0
          ? Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className='overflow-hidden animate-pulse'>
                <div className='w-full h-48 bg-gray-200' />
                <CardContent className='p-4'>
                  <div className='h-4 w-28 bg-gray-200 mb-3 rounded' />
                  <div className='h-5 w-full bg-gray-200 rounded' />
                </CardContent>
              </Card>
            ))
          : newsData.map(news => (
              <Card key={news.id} className='overflow-hidden gap-0'>
                <Image
                  src={news.thumbnailUrl}
                  alt={news.title}
                  width={600}
                  height={600}
                  className='w-full h-48 object-cover'
                  priority={false}
                />
                <CardContent className='p-4'>
                  <div className='flex items-center text-sm text-muted-foreground mb-2'>
                    <Calendar className='w-4 h-4 mr-1' />
                    <span>{formatDateTime(new Date(news.createdAt))}</span>
                  </div>
                  <Link
                    href={`${PUBLIC_ROUTES.NEWS}/${news.id}`}
                    className='font-semibold hover:underline text-base text-secondary line-clamp-3'
                  >
                    {news.title}
                  </Link>
                </CardContent>
              </Card>
            ))}
      </div>

      <div className='text-center mt-8'>
        <Link href={PUBLIC_ROUTES.NEWS} className='cursor-pointer'>
          <Button className='bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded'>
            Xem thêm
          </Button>
        </Link>
      </div>
    </section>
  );
}
