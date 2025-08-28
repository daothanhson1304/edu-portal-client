import ManageRulesTable from '@/components/admin/manage-rules-table';
import { BASE_URL } from '@/constants';

export const dynamic = 'force-dynamic';

async function getRules() {
  const r = await fetch(`${BASE_URL}/api/rules`, { cache: 'no-store' });
  const data = await r.json();
  return (data?.rules ?? []) as any[];
}

export default async function AdminRulesPage() {
  const rules = await getRules();
  return (
    <div className='max-w-6xl mx-auto p-6'>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold'>Quản lý văn bản</h1>
        <a
          href='/admin/documents/new'
          className='inline-flex items-center rounded-md bg-primary px-4 py-2 text-white'
        >
          + Thêm văn bản
        </a>
      </div>

      <ManageRulesTable apiBase={BASE_URL} initialData={rules} />
    </div>
  );
}
