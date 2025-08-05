// app/admin/posts/[id]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';

type Post = {
  _id: string;
  title: string;
  thumbnailUrl: string;
  content: string; // HTML string
  views: number;
  tags: string[];
  createdAt: string;
};

async function getPost(id: string): Promise<Post | null> {
  try {
    const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.post; // Server returns { post: {...} }
  } catch (err) {
    console.error('Error fetching post:', err);
    return null;
  }
}

export default async function PostDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const post = await getPost(params.id);

  if (!post) return notFound();

  return (
    <div className='max-w-3xl mx-auto px-4 py-10'>
      <h1 className='text-3xl font-bold mb-4'>{post.title}</h1>

      {post.thumbnailUrl && (
        <div className='mb-6'>
          <Image
            src={post.thumbnailUrl}
            alt={post.title}
            width={800}
            height={400}
            className='rounded-md w-full object-cover'
          />
        </div>
      )}

      <div
        className='prose max-w-none'
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className='mt-6 text-sm text-muted-foreground'>
        <p>Views: {post.views}</p>
        <p>Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>
        <div className='flex flex-wrap gap-2 mt-2'>
          {post.tags.map((tag, i) => (
            <span
              key={i}
              className='bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-md'
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
