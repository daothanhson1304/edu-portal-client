// components/docs-table.tsx
'use client';

import { useMemo, useState } from 'react';
import { Input } from '@edu/ui/components/input';
import { Button } from '@edu/ui/components/button';
import { Rule } from '@/types';

export default function DocsTable({
  data,
  downloadBase,
}: {
  data: Rule[];
  downloadBase: string;
}) {
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const keyword = q.trim().toLowerCase();
    if (!keyword) return data;
    return data.filter(d =>
      [d.number, d.summary, d.type, d.agency]
        .filter(Boolean)
        .some(s => s.toLowerCase().includes(keyword))
    );
  }, [q, data]);

  return (
    <>
      <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mb-8'>
        <Input
          placeholder='Nhập từ khóa ...'
          className='w-64 bg-white'
          value={q}
          onChange={e => setQ(e.target.value)}
        />
        <Button
          type='button'
          className='bg-primary hover:bg-primary/80 text-white'
          onClick={() => {}}
        >
          Tìm kiếm
        </Button>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full text-sm border-collapse bg-white'>
          <thead>
            <tr className='bg-gray-100 text-secondary-foreground font-semibold'>
              <th className='px-4 py-2 border'>STT</th>
              <th className='px-4 py-2 border'>Số văn bản</th>
              <th className='px-4 py-2 border'>Ngày ban hành</th>
              <th className='px-4 py-2 border'>Thời gian bắt đầu hiệu lực</th>
              <th className='px-4 py-2 border text-left'>Trích yếu nội dung</th>
              <th className='px-4 py-2 border'>Loại văn bản</th>
              <th className='px-4 py-2 border'>Cơ quan ban hành</th>
              <th className='px-4 py-2 border'>Đính kèm</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  className='px-4 py-6 border text-center text-muted-foreground'
                  colSpan={8}
                >
                  Không có văn bản phù hợp{q ? ` với từ khóa “${q}”` : ''}.
                </td>
              </tr>
            ) : (
              filtered.map((doc, index) => (
                <tr key={doc._id} className='hover:bg-gray-50 align-top'>
                  <td className='px-4 py-2 border text-center'>{index + 1}</td>
                  <td className='px-4 py-2 border text-center'>{doc.number}</td>
                  <td className='px-4 py-2 border text-center'>
                    {doc.issuedDate}
                  </td>
                  <td className='px-4 py-2 border text-center'>
                    {doc.effectiveDate}
                  </td>
                  <td className='px-4 py-2 border'>{doc.summary}</td>
                  <td className='px-4 py-2 border text-center'>{doc.type}</td>
                  <td className='px-4 py-2 border text-center'>{doc.agency}</td>
                  <td className='px-4 py-2 border text-center'>
                    {doc.attachments?.length ? (
                      <div className='space-y-1'>
                        {doc.attachments.map(f => (
                          <a
                            key={f._id}
                            href={`${downloadBase}/${f._id}/download`}
                            className='text-secondary-foreground hover:underline block'
                          >
                            {f.originalName}
                          </a>
                        ))}
                      </div>
                    ) : (
                      <span className='text-muted-foreground'>—</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
