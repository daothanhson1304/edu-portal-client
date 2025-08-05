// app/admin/posts/page.tsx

import { Eye, Heart, Plus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { ADMIN_ROUTES } from '@/constants';
import { Button } from '@edu/ui/components/button';
import { Tabs, TabsList, TabsTrigger } from '@edu/ui/components/tabs';
import { Card, CardContent } from '@edu/ui/components/card';

type BlogPost = {
  _id: string;
  title: string;
  thumbnailUrl: string;
  views: number;
  likes: number;
  tags: string[];
  status: 'draft' | 'published';
  updatedAt: string;
};

async function getPosts(): Promise<BlogPost[]> {
  try {
    const res = await fetch(`http://localhost:5000/api/posts`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log('API Response:', data);
    return data; // Server returns array directly, not data.posts
  } catch (error) {
    console.error('Error fetching posts:', error);
    return []; // Return empty array on error
  }
}

export default async function AdminBlogPage() {
  const posts = await getPosts();

  return (
    <div className='p-6 max-w-5xl mx-auto'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold'>Blog Posts</h1>
        <Link href={ADMIN_ROUTES.POSTS_CREATE}>
          <Button>
            <Plus className='w-4 h-4 mr-2' />
            Create Post
          </Button>
        </Link>
      </div>

      <Tabs defaultValue='published' className='w-full'>
        <TabsList className='mb-6'>
          <TabsTrigger value='all'>
            All <span className='ml-1'>{posts.length}</span>
          </TabsTrigger>
          <TabsTrigger value='published'>
            Published{' '}
            <span className='ml-1'>
              {posts.filter(p => p.status === 'published').length}
            </span>
          </TabsTrigger>
          <TabsTrigger value='draft'>
            Draft{' '}
            <span className='ml-1'>
              {posts.filter(p => p.status === 'draft').length}
            </span>
          </TabsTrigger>
        </TabsList>

        <div className='space-y-4'>
          {posts.map(post => (
            <Card
              key={post._id}
              className='flex gap-4 items-center flex-nowrap flex-row p-4'
            >
              <Link href={`/admin/posts/${post._id}`}>
                <Image
                  src={post.thumbnailUrl || '/default-thumbnail.jpg'}
                  alt='Thumbnail'
                  className='w-20 h-20 rounded-md object-cover'
                  width={80}
                  height={80}
                />
                <CardContent className='flex-1'>
                  <h2 className='font-semibold text-lg leading-tight'>
                    {post.title}
                  </h2>
                  <p className='text-sm text-muted-foreground mb-2'>
                    Updated: {new Date(post.updatedAt).toLocaleString()}
                  </p>
                  <div className='flex items-center gap-4 text-sm text-muted-foreground mb-2'>
                    <span className='flex items-center gap-1'>
                      <Eye className='w-4 h-4' /> {post.views}
                    </span>
                    <span className='flex items-center gap-1'>
                      <Heart className='w-4 h-4' /> {post.likes}
                    </span>
                  </div>
                  <div className='flex flex-wrap gap-2'>
                    {post.tags.map((tag, i) => (
                      <span
                        key={i}
                        className='bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-md'
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
