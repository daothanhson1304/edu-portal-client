import EditRuleForm from '@/components/admin/edit-rule-form';
import { BASE_URL } from '@/constants';

async function getDetail(id: string) {
  const r = await fetch(`${BASE_URL}/api/rules/${id}`, { cache: 'no-store' });
  if (!r.ok) return null;
  const data = await r.json();
  return data?.rule ?? null;
}

export default async function EditRulePage({
  params,
}: {
  params: { slug: string };
}) {
  const rule = await getDetail(params.slug);
  if (!rule) {
    return <div className='p-6'>Không tìm thấy văn bản.</div>;
  }
  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h1 className='text-2xl font-bold mb-4'>Sửa văn bản</h1>
      <EditRuleForm apiBase={BASE_URL} rule={rule} />
    </div>
  );
}
