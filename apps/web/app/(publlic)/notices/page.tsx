import Image from 'next/image';
import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@edu/ui/components/breadcrumb';
import { Card, CardContent } from '@edu/ui/components/card';
import { Metadata } from 'next';
import { BASE_URL } from '@/constants';
import { Controls } from '@/components/pagination';
import Pagination from '@/components/pagination/pagination';
import { PaginationInfo, PostSummary, SearchParams } from '@/types';

export const metadata: Metadata = {
  title: 'Thông báo | Trường THCS Đồng Than',
  description: 'Thông báo',
};

export const revalidate = 0;

async function getPosts(sp: SearchParams) {
  const params = new URLSearchParams({
    page: sp.page ?? '1',
    limit: sp.limit ?? '8',
    search: sp.search ?? '',
    sortBy: sp.sortBy ?? 'createdAt',
    sortOrder: sp.sortOrder ?? 'desc',
    type: sp.type ?? 'notification',
  });

  const url = `${BASE_URL}/api/posts?${params.toString()}`;
  const res = await fetch(url, { next: { revalidate } });
  if (!res.ok) return { data: [], pagination: null };
  const json = await res.json();
  return json as {
    data: PostSummary[];
    pagination: PaginationInfo | null;
  };
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = (await searchParams) ?? {};
  const { data, pagination } = await getPosts(sp);

  return (
    <div className='max-w-7xl mx-auto px-4 py-10'>
      <div className='relative h-32 w-full'>
        <div className='absolute inset-0 flex flex-col justify-center items-center text-white text-center'>
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
                    Thông báo
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </section>
        </div>
      </div>

      <Controls
        defaultSearch={sp.search ?? ''}
        defaultSort={`${sp.sortBy ?? 'createdAt'}:${sp.sortOrder ?? 'desc'}`}
      />

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
        {data.map(item => (
          <Card
            key={item.id}
            className='hover:shadow-lg transition-all duration-300 py-0 overflow-hidden gap-0'
          >
            <div className='relative w-full h-48'>
              <Image
                src={item.thumbnailUrl || '/images/og-default.jpg'}
                alt={item.title}
                fill
                className='object-cover'
              />
            </div>
            <CardContent className='py-4'>
              <p className='text-sm text-muted-foreground mb-2'>
                📰 Tin tức ·{' '}
                {new Date(item.createdAt).toLocaleDateString('vi-VN')}
              </p>
              <h3 className='font-semibold text-base text-blue-900 mb-2 line-clamp-3'>
                {item.title}
              </h3>
              <Link
                href={`/news/${item.id}`}
                className='text-primary text-sm hover:underline'
              >
                Xem chi tiết →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      )}
    </div>
  );
}
