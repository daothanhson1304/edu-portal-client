import Image from 'next/image';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { Button } from '@edu/ui/components/button';
import { BASE_URL, PUBLIC_ROUTES } from '@/constants';
import { Post } from '@/types';

const TAG = 'featured-news';

function formatDate(iso?: string) {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

async function getFeaturedNews(): Promise<Post[]> {
  try {
    const url = `${BASE_URL}/api/posts?type=notice&limit=8`;
    const res = await fetch(url, { next: { revalidate: 600, tags: [TAG] } });
    if (!res.ok) return [];
    const data = await res.json();
    return (data?.data ?? data ?? []) as Post[];
  } catch {
    return [];
  }
}

export default async function NotificationSection() {
  const newsData = await getFeaturedNews();
  const isEmpty = newsData.length === 0;

  return (
    <section className='relative py-16'>
      {/* subtle radial bg */}
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,theme(colors.primary/10),transparent_60%)]' />

      <div className='relative max-w-7xl mx-auto px-6'>
        <div className='text-center mb-10'>
          <p className='text-primary/80 uppercase font-semibold tracking-wider'>
            Thông tin học sinh
          </p>
          <h2 className='text-3xl md:text-4xl font-bold text-secondary-foreground mt-2'>
            Thông báo
          </h2>
          <div className='h-1 w-16 mx-auto mt-3 rounded-full bg-primary' />
        </div>

        {isEmpty ? (
          <div className='mx-auto max-w-2xl rounded-2xl border bg-white/70 p-10 text-center shadow-sm'>
            <p className='text-lg font-medium text-secondary-foreground'>
              Hiện chưa có thông báo mới
            </p>
            <p className='mt-1 text-muted-foreground'>
              Vui lòng quay lại sau nhé.
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {/* Left: cards 2x2 */}
            <div className='lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4'>
              {newsData.slice(0, 4).map(item => (
                <Link
                  key={item.id}
                  href={`${PUBLIC_ROUTES.NOTIFICATIONS}/${item.id ?? ''}`}
                  className='group rounded border bg-white/80 p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md'
                >
                  <div className='flex gap-3'>
                    <div className='relative w-24 h-20 flex-shrink-0 overflow-hidden rounded'>
                      <Image
                        src={item.thumbnailUrl || '/thumbnail-fallback.jpg'}
                        alt={item.title || 'thumbnail'}
                        fill
                        className='object-cover transition-transform duration-300 group-hover:scale-[1.03]'
                        sizes='96px'
                      />
                    </div>

                    <div className='min-w-0'>
                      <div className='flex items-center text-xs text-muted-foreground mb-1'>
                        <Calendar className='w-4 h-4 mr-1' />
                        {formatDate(item.createdAt)}
                      </div>
                      <h3 className='text-sm font-semibold text-secondary-foreground leading-snug line-clamp-3'>
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Right: vertical list */}
            <div className='rounded border bg-white/80 p-4 shadow-sm'>
              <ul className='divide-y'>
                {newsData.slice(0, 3).map(item => (
                  <li key={item.id} className='py-2 first:pt-0 last:pb-0'>
                    <Link
                      href={`${PUBLIC_ROUTES.NOTIFICATIONS}/${item.id ?? ''}`}
                      className='group block'
                    >
                      <p className='text-sm font-medium text-secondary-foreground leading-snug line-clamp-2 group-hover:underline'>
                        {item.title}
                      </p>
                      <span className='mt-1 inline-block text-xs text-muted-foreground'>
                        {formatDate(item.createdAt)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className='text-center mt-10'>
          <Link href={PUBLIC_ROUTES.NOTIFICATIONS}>
            <Button className='px-6 py-2 rounded shadow-sm'>Xem thêm</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
