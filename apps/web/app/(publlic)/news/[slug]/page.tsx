import { notFound } from 'next/navigation';
import { BASE_URL } from '@/constants';
import { formatDateTime } from '@/lib';
import { htmlToPlain } from '@/utils';
import { Calendar } from 'lucide-react';

export const revalidate = 0;

async function fetchPost(slug: string) {
  const res = await fetch(`${BASE_URL}/api/posts/${slug}`, {
    next: { revalidate },
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data?.post ?? null;
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) {
    return {
      title: 'Tin không tồn tại',
      description: 'Bài viết bạn tìm không còn hoặc đã bị xóa.',
      robots: { index: false },
    };
  }

  const title = post.title;
  const description = post.description ?? htmlToPlain(post.content || '', 160);

  const url = `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/news/${slug}`;
  const image =
    post.thumbnailUrl ||
    `${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/og-default.jpg`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      images: [{ url: image }],
      siteName: 'PTIT News',
      locale: 'vi_VN',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) return notFound();

  return (
    <div className='max-w-5xl mx-auto px-4 py-10'>
      <p className='text-sm text-muted-foreground mb-2 flex items-center gap-2'>
        <span>
          <Calendar size={16} />
        </span>{' '}
        Tin tức · {formatDateTime(new Date(post.createdAt))}
      </p>
      <h1 className='text-3xl font-bold text-secondary mb-4'>{post.title}</h1>
      {post.thumbnailUrl && <div className='mb-4' />}
      <div className='text-gray-800 leading-relaxed space-y-4'>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </div>
  );
}
