import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { Button } from '@edu/ui/components/button';
import { Card, CardContent } from '@edu/ui/components/card';
import { BASE_URL, PUBLIC_ROUTES } from '@/constants';
import { Post } from '@/types';
import { formatDateTime } from '@/lib';
import dayjs from 'dayjs';
import EmptySection from './empty-section';

const TAG = 'featured-events';

async function getFeaturedEvents(): Promise<Post[]> {
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
  const events = await getFeaturedEvents();
  const isEmpty = events.length === 0;

  return (
    <section className='bg-muted py-16 px-6'>
      <div className='text-center mb-10'>
        <p className='text-primary uppercase font-semibold tracking-wide'>
          Tin tức sự kiện
        </p>
        <h2 className='text-4xl font-bold text-secondary-foreground mt-2'>
          Sự kiện
        </h2>
        <div className='h-[2px] w-10 mx-auto mt-2 bg-primary' />
      </div>

      <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {isEmpty ? (
          <EmptySection
            variant='events'
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
            {events.map((event, index) => (
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
                  <div className='absolute top-4 right-4 bg-primary text-primary-foreground text-center rounded px-2 py-1'>
                    <p className='text-sm leading-none font-bold'>
                      {dayjs(event.createdAt).day()}
                    </p>
                    <p className='text-[10px] uppercase'>
                      TH{dayjs(event.createdAt).month() + 1}
                    </p>
                  </div>
                </div>
                <div className='p-4'>
                  <div className='flex items-center text-sm text-muted-foreground mb-2'>
                    <Calendar className='w-4 h-4 mr-1' />
                    <span>{formatDateTime(new Date(event.createdAt))}</span>
                  </div>
                  <Link
                    href={`${PUBLIC_ROUTES.EVENTS}/${event.id}`}
                    className='font-semibold text-secondary-foreground text-base line-clamp-2 hover:underline'
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
        <div className='text-center mt-10'>
          <Link href={PUBLIC_ROUTES.EVENTS} className='cursor-pointer'>
            <Button className='bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded'>
              Xem thêm
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
}
