// app/admin/posts/[id]/page.tsx
import PostEditor from '@/components/admin/post-editor';
import { BASE_URL } from '@/constants';

async function getPost(id: string) {
  const r = await fetch(`${BASE_URL}/api/posts/${id}`, { cache: 'no-store' });
  if (!r.ok) return null;
  const j = await r.json();

  return j?.data ?? j ?? null;
}

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getPost(id);
  if (!data) return <div className='p-6'>Không tìm thấy bài viết.</div>;

  const { post } = data;

  return (
    <PostEditor
      apiBase={BASE_URL}
      mode='edit'
      initial={{
        _id: post._id,
        title: post.title,
        type: post.type,
        content: post.content,
        thumbnailUrl: post.thumbnailUrl ?? null,
        status: post.status,
      }}
    />
  );
}
