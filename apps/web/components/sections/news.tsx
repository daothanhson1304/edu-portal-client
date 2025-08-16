import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { Button } from '@edu/ui/components/button';
import { Card, CardContent } from '@edu/ui/components/card';
import { BASE_URL, PUBLIC_ROUTES } from '@/constants';
import { Post } from '@/types';
import { formatDateTime } from '@/lib';
import EmptySection from './empty-section';

const TAG = 'featured-news';

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

    return (data?.data ?? data ?? []) as Post[];
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

export default async function FeaturedNewsSection() {
  const newsData = await getFeaturedNews();
  const isEmpty = newsData.length === 0;

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
        {isEmpty ? (
          <EmptySection
            variant='news'
            primaryAction={{
              label: 'Xem giới thiệu',
              href: PUBLIC_ROUTES.HERITAGE,
            }}
            secondaryAction={{
              label: 'Liên hệ nhà trường',
              href: PUBLIC_ROUTES.CONTACT,
              variant: 'outline',
            }}
          />
        ) : (
          <>
            {newsData.map((event, index) => (
              <div
                key={index}
                className='bg-white shadow-md rounded overflow-hidden'
              >
                <div className='relative'>
                  <Image
                    src={event.thumbnailUrl}
                    alt={event.title}
                    width={600}
                    height={400}
                    className='w-full h-56 object-cover'
                  />
                </div>
                <div className='p-4'>
                  <div className='flex items-center text-sm text-muted-foreground mb-2'>
                    <Calendar className='w-4 h-4 mr-1' />
                    <span>{formatDateTime(new Date(event.createdAt))}</span>
                  </div>
                  <Link
                    href={`${PUBLIC_ROUTES.EVENTS}/${event.id}`}
                    className='font-semibold text-secondary-foreground text-base line-clamp-3 hover:underline'
                  >
                    {event.title}
                  </Link>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      {!isEmpty && (
        <div className='text-center mt-8'>
          <Link href={PUBLIC_ROUTES.NEWS} className='cursor-pointer'>
            <Button className='bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded'>
              Xem thêm
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
}
