'use client';

import { useState } from 'react';
import { toast } from '@edu/ui/components/sonner';
import { useRouter } from 'next/navigation';
import { ActionsCell } from './actions-cell';

export default function ManageRulesTable({
  apiBase,
  initialData,
}: {
  apiBase: string;
  initialData: any[];
}) {
  const [rows, setRows] = useState(initialData);
  const router = useRouter();

  async function handleDelete(id: string) {
    const res = await fetch(`${apiBase}/api/rules/${id}`, { method: 'DELETE' });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) toast.error(data?.error || 'Xoá thất bại');

    setRows(prev => prev.filter((r: any) => r._id !== id));
    toast.success('Đã xoá văn bản');
    router.refresh();
  }

  return (
    <div className='overflow-x-auto'>
      <table className='w-full text-sm border-collapse bg-white'>
        <thead>
          <tr className='bg-gray-100 text-secondary-foreground font-semibold'>
            <th className='px-4 py-2 border'>STT</th>
            <th className='px-4 py-2 border'>Số văn bản</th>
            <th className='px-4 py-2 border'>Ngày ban hành</th>
            <th className='px-4 py-2 border'>Hiệu lực</th>
            <th className='px-4 py-2 border text-left'>Trích yếu</th>
            <th className='px-4 py-2 border'>Loại</th>
            <th className='px-4 py-2 border'>Cơ quan</th>
            <th className='px-4 py-2 border'>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                className='px-4 py-6 border text-center text-muted-foreground'
                colSpan={8}
              >
                Chưa có văn bản nào.
              </td>
            </tr>
          ) : (
            rows.map((r: any, idx: number) => (
              <tr key={r._id} className='hover:bg-gray-50 align-top'>
                <td className='px-4 py-2 border text-center'>{idx + 1}</td>
                <td className='px-4 py-2 border text-center'>{r.number}</td>
                <td className='px-4 py-2 border text-center'>
                  {new Date(r.issuedDate).toLocaleDateString('vi-VN')}
                </td>
                <td className='px-4 py-2 border text-center'>
                  {new Date(r.effectiveDate).toLocaleDateString('vi-VN')}
                </td>
                <td className='px-4 py-2 border'>{r.summary}</td>
                <td className='px-4 py-2 border text-center'>{r.type}</td>
                <td className='px-4 py-2 border text-center'>{r.agency}</td>
                <td className='px-4 py-2 border text-center'>
                  <ActionsCell
                    editHref={`/admin/documents/${r._id}/edit`}
                    onConfirmDelete={() => handleDelete(r._id)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
