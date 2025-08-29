'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@edu/ui/components/button';
import { Input } from '@edu/ui/components/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@edu/ui/components/select';
import { useEffect, useState } from 'react';

export default function Controls({
  defaultSearch,
  defaultSort,
}: {
  defaultSearch: string;
  defaultSort: string; // "createdAt:desc"
}) {
  const router = useRouter();
  const sp = useSearchParams();

  const [q, setQ] = useState(defaultSearch);
  const [sort, setSort] = useState(defaultSort);

  // Khi thay đổi sort/search → reset về page 1
  const apply = () => {
    const params = new URLSearchParams(sp?.toString());
    params.set('page', '1');
    if (q) params.set('search', q);
    else params.delete('search');

    const [sortBy, sortOrder] = (sort || 'createdAt:desc').split(':');
    params.set('sortBy', sortBy || 'createdAt');
    params.set('sortOrder', (sortOrder as 'asc' | 'desc') || 'desc');

    router.push(`/news?${params.toString()}`);
  };

  // Cho UX tốt: Enter để search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') apply();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [q, sort]);

  return (
    <div className='flex flex-col md:flex-row md:items-center md:justify-center gap-4 mb-6'>
      <Input
        type='text'
        placeholder='Nhập thông tin tìm kiếm'
        className='md:max-w-sm'
        value={q}
        onChange={e => setQ(e.target.value)}
      />
      <Select value={sort} onValueChange={setSort}>
        <SelectTrigger className='w-full md:w-52'>
          <SelectValue placeholder='Sắp xếp theo...' />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='createdAt:desc'>Mới nhất</SelectItem>
          <SelectItem value='createdAt:asc'>Cũ nhất</SelectItem>
          <SelectItem value='title:asc'>Tiêu đề (A–Z)</SelectItem>
          <SelectItem value='title:desc'>Tiêu đề (Z–A)</SelectItem>
          <SelectItem value='views:desc'>Lượt xem nhiều</SelectItem>
        </SelectContent>
      </Select>
      <Button className='w-full md:w-auto' onClick={apply}>
        Tìm kiếm
      </Button>
    </div>
  );
}
