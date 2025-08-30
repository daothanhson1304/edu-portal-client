// components/admin/content-list.tsx
'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Eye,
  Heart,
  MoreVertical,
  Pencil,
  Trash2,
  CheckCircle2,
  CircleSlash2,
} from 'lucide-react';
import { Card, CardContent } from '@edu/ui/components/card';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@edu/ui/components/dropdown-menu';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTrigger,
} from '@edu/ui/components/alert-dialog';
import { Input } from '@edu/ui/components/input';
import { Badge } from '@edu/ui/components/badge';
import { Tabs, TabsList, TabsTrigger } from '@edu/ui/components/tabs';
import { Button } from '@edu/ui/components/button';
import { toast } from '@edu/ui/components/sonner';

export type AdminItem = {
  id: string;
  title: string;
  thumbnailUrl?: string;
  updatedAt: string;
  status?: 'draft' | 'published';
  views?: number;
  likes?: number;
  tags?: string[];
  metaText?: string;
};

export type ContentListConfig = {
  apiBase: string;
  resource: string;
  heading: string;
  createHref: string;
  editHref: string;
  publishable?: boolean;
  showCounters?: Array<'views' | 'likes'>;
};

export default function ContentList({
  initialItems,
  config,
}: {
  initialItems: AdminItem[];
  config: ContentListConfig;
}) {
  const {
    apiBase,
    resource,
    heading,
    createHref,
    editHref,
    publishable = true,
    showCounters = ['views', 'likes'],
  } = config;

  const [items, setItems] = useState<AdminItem[]>(initialItems);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<'all' | 'published' | 'draft'>(
    publishable ? 'published' : 'all'
  );
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const counts = useMemo(
    () => ({
      all: items.length,
      published: items.filter(i => i.status === 'published').length,
      draft: items.filter(i => i.status === 'draft').length,
    }),
    [items]
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let arr = items;
    if (publishable) {
      if (tab === 'published') arr = arr.filter(i => i.status === 'published');
      if (tab === 'draft') arr = arr.filter(i => i.status === 'draft');
    }
    if (q) {
      arr = arr.filter(i =>
        [i.title, i.metaText, ...(i.tags || [])]
          .filter(Boolean)
          .some(s => s!.toLowerCase().includes(q))
      );
    }
    return arr;
  }, [items, search, tab, publishable]);

  async function toggleStatus(id: string, current?: 'draft' | 'published') {
    if (!publishable) return;
    const next = current === 'published' ? 'draft' : 'published';

    try {
      const res = await fetch(`${apiBase}/api/${resource}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: next }),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) return toast.error(j?.error || 'Không đổi trạng thái được');
      setItems(prev =>
        prev.map(p => (p.id === id ? { ...p, status: next } : p))
      );
      toast.success(next === 'published' ? 'Đã publish' : 'Đã chuyển về draft');
    } catch (e: any) {
      toast.error(e?.message || 'Không đổi trạng thái được');
    }
  }

  async function deleteItem(id: string) {
    try {
      setDeleting(true);
      const res = await fetch(`${apiBase}/api/posts/${id}`, {
        method: 'DELETE',
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) return toast.error(j?.error || 'Xoá thất bại');
      setItems(prev => prev.filter(p => p.id !== id));
      toast.success('Đã xoá');
    } catch (e: any) {
      toast.error(e?.message || 'Xoá thất bại');
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div className='p-6 max-w-6xl mx-auto'>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold'>{heading}</h1>
        <Link href={createHref}>
          <Button>+ Tạo mới</Button>
        </Link>
      </div>

      {publishable ? (
        <Tabs
          value={tab}
          onValueChange={v => setTab(v as any)}
          className='w-full'
        >
          <TabsList className='mb-4'>
            <TabsTrigger value='all'>
              Tất cả <span className='ml-1'>{counts.all}</span>
            </TabsTrigger>
            <TabsTrigger value='published'>
              Đã xuất bản <span className='ml-1'>{counts.published}</span>
            </TabsTrigger>
            <TabsTrigger value='draft'>
              Nháp <span className='ml-1'>{counts.draft}</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      ) : null}

      <div className='flex items-center gap-3 mb-5'>
        <Input
          placeholder='Tìm theo tiêu đề, tag…'
          value={search}
          onChange={e => setSearch(e.target.value)}
          className='max-w-sm'
        />
      </div>

      <div className='space-y-4'>
        {filtered.length === 0 ? (
          <div className='text-center text-sm text-muted-foreground py-10'>
            Không có mục nào.
          </div>
        ) : (
          filtered.map(it => (
            <Card key={it.id} className='p-4'>
              <div className='flex gap-4 items-start'>
                <Link
                  href={editHref.replace('[id]', it.id)}
                  className='shrink-0'
                >
                  <Image
                    src={it.thumbnailUrl || '/default-thumbnail.jpg'}
                    alt=''
                    width={96}
                    height={96}
                    className='h-24 w-24 rounded-md object-cover border'
                  />
                </Link>

                <CardContent className='p-0 flex-1'>
                  <div className='flex items-start justify-between gap-3'>
                    <div>
                      <Link
                        href={editHref.replace('[id]', it.id)}
                        className='font-semibold text-lg hover:underline'
                      >
                        {it.title}
                      </Link>
                      <div className='mt-1 text-xs text-muted-foreground'>
                        Cập nhật:{' '}
                        {new Date(it.updatedAt).toLocaleString('vi-VN')}
                        {it.metaText ? ` · ${it.metaText}` : ''}
                      </div>
                      {it.tags?.length ? (
                        <div className='mt-2 flex flex-wrap gap-2'>
                          {it.tags.map((t, i) => (
                            <span
                              key={`${it.id}-tag-${i}`}
                              className='bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-md'
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>

                    <div className='flex items-center gap-2'>
                      {publishable ? (
                        <Badge
                          variant={
                            it.status === 'published' ? 'default' : 'secondary'
                          }
                        >
                          {it.status === 'published' ? 'Đã xuất bản' : 'Nháp'}
                        </Badge>
                      ) : null}

                      <AlertDialog>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant='ghost'
                              size='icon'
                              className='h-8 w-8 rounded-md'
                            >
                              <MoreVertical className='h-5 w-5' />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align='end' className='w-44'>
                            <DropdownMenuItem asChild>
                              <Link
                                href={editHref.replace('[id]', it.id)}
                                className='flex items-center gap-2'
                              >
                                <Pencil className='h-4 w-4' /> Sửa
                              </Link>
                            </DropdownMenuItem>

                            {publishable && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onSelect={() =>
                                    toggleStatus(it.id, it.status)
                                  } // dùng onSelect để menu tự đóng
                                  className='flex items-center gap-2'
                                >
                                  {it.status === 'published' ? (
                                    <>
                                      <CircleSlash2 className='h-4 w-4' /> Hủy
                                      xuất bản
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle2 className='h-4 w-4' /> Xuất
                                      bản
                                    </>
                                  )}
                                </DropdownMenuItem>
                              </>
                            )}

                            <DropdownMenuSeparator />

                            {/* Mở modal bằng AlertDialogTrigger; menu sẽ tự đóng */}
                            <DropdownMenuItem
                              asChild
                              onSelect={() => setConfirmId(it.id)} // set id trước khi mở dialog
                              className='text-red-600 focus:text-red-600'
                            >
                              <AlertDialogTrigger asChild>
                                <button className='flex w-full items-center gap-2'>
                                  <Trash2 className='h-4 w-4' /> Xoá
                                </button>
                              </AlertDialogTrigger>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Modal xác nhận */}
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Xoá mục này?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Hành động này không thể hoàn tác.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel disabled={deleting}>
                              Huỷ
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className='bg-red-600 hover:bg-red-700'
                              onClick={async () => {
                                if (confirmId) {
                                  await deleteItem(confirmId);
                                  setConfirmId(null); // đóng dialog sau khi xoá
                                }
                              }}
                              disabled={deleting}
                            >
                              {deleting ? 'Đang xoá…' : 'Xoá'}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>

                  <div className='mt-3 flex items-center gap-4 text-sm text-muted-foreground'>
                    {showCounters.includes('views') && (
                      <span className='flex items-center gap-1'>
                        <Eye className='h-4 w-4' />
                        {it.views ?? 0}
                      </span>
                    )}
                    {showCounters.includes('likes') && (
                      <span className='flex items-center gap-1'>
                        <Heart className='h-4 w-4' />
                        {it.likes ?? 0}
                      </span>
                    )}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
