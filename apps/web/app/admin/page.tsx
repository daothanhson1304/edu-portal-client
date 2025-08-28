import PostEditor from '@/components/admin/post-editor';
import { BASE_URL } from '@/constants';

export default function AdminPage() {
  return <PostEditor apiBase={BASE_URL} mode='create' initial={null} />;
}
