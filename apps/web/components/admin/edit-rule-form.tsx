'use client';

import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@edu/ui/components/card';
import { Label } from '@edu/ui/components/label';
import { Input } from '@edu/ui/components/input';
import { Textarea } from '@edu/ui/components/textarea';
import { Button } from '@edu/ui/components/button';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@edu/ui/components/select';
import { toast } from '@edu/ui/components/sonner';
import { useRouter } from 'next/navigation';

export default function EditRuleForm({
  apiBase,
  rule,
}: {
  apiBase: string;
  rule: any;
}) {
  const router = useRouter();

  const [number, setNumber] = useState(rule.number || '');
  const [issuedDate, setIssuedDate] = useState(
    rule.issuedDate ? new Date(rule.issuedDate).toISOString().slice(0, 10) : ''
  );
  const [effectiveDate, setEffectiveDate] = useState(
    rule.effectiveDate
      ? new Date(rule.effectiveDate).toISOString().slice(0, 10)
      : ''
  );
  const [summary, setSummary] = useState(rule.summary || '');
  const [docType, setDocType] = useState<string>(rule.type || 'Quyết định');
  const [agency, setAgency] = useState(rule.agency || '');
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [attachments, setAttachments] = useState<any[]>(rule.attachments ?? []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      // cập nhật thông tin
      const res = await fetch(`${apiBase}/api/rules/${rule._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          number,
          issuedDate,
          effectiveDate,
          summary,
          type: docType,
          agency,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Cập nhật thất bại');

      // up thêm file mới (nếu có)
      if (file) {
        const fd = new FormData();
        fd.append('file', file);
        const up = await fetch(`${apiBase}/api/attachments/rule/${rule._id}`, {
          method: 'POST',
          body: fd,
        });
        const ud = await up.json();
        if (!up.ok) throw new Error(ud?.error || 'Upload tệp thất bại');
        setAttachments(prev => [
          { _id: ud.fileId, originalName: ud.name },
          ...prev,
        ]);
        setFile(null);
      }

      toast.success('Đã lưu thay đổi');
      router.refresh();
    } catch (e: any) {
      toast.error(e?.message || 'Có lỗi xảy ra');
    } finally {
      setBusy(false);
    }
  }

  async function handleDeleteFile(fid: string) {
    if (!confirm('Xoá tệp đính kèm này?')) return;
    const res = await fetch(`${apiBase}/api/attachments/${fid}`, {
      method: 'DELETE',
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) return toast.error(data?.error || 'Xoá tệp thất bại');
    setAttachments(prev => prev.filter(f => f._id !== fid));
    toast.success('Đã xoá tệp');
  }

  return (
    <Card>
      <form onSubmit={handleSave}>
        <CardHeader>
          <CardTitle>Thông tin văn bản & tệp đính kèm</CardTitle>
        </CardHeader>
        <CardContent className='grid gap-5'>
          <div className='grid gap-4 md:grid-cols-3'>
            <div className='grid gap-2'>
              <Label htmlFor='number'>Số văn bản</Label>
              <Input
                id='number'
                value={number}
                onChange={e => setNumber(e.target.value)}
                required
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='issuedDate'>Ngày ban hành</Label>
              <Input
                id='issuedDate'
                type='date'
                value={issuedDate}
                onChange={e => setIssuedDate(e.target.value)}
                required
              />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='effectiveDate'>Thời gian bắt đầu hiệu lực</Label>
              <Input
                id='effectiveDate'
                type='date'
                value={effectiveDate}
                onChange={e => setEffectiveDate(e.target.value)}
                required
              />
            </div>
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='summary'>Trích yếu nội dung</Label>
            <Textarea
              id='summary'
              value={summary}
              onChange={e => setSummary(e.target.value)}
              required
            />
          </div>

          <div className='grid gap-4 md:grid-cols-2'>
            <div className='grid gap-2'>
              <Label>Loại văn bản</Label>
              <Select value={docType} onValueChange={setDocType}>
                <SelectTrigger>
                  <SelectValue placeholder='Chọn loại' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Quyết định'>Quyết định</SelectItem>
                  <SelectItem value='Hướng dẫn'>Hướng dẫn</SelectItem>
                  <SelectItem value='Thông báo'>Thông báo</SelectItem>
                  <SelectItem value='Kế hoạch'>Kế hoạch</SelectItem>
                  <SelectItem value='Khác'>Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className='grid gap-2'>
              <Label htmlFor='agency'>Cơ quan ban hành</Label>
              <Input
                id='agency'
                value={agency}
                onChange={e => setAgency(e.target.value)}
                required
              />
            </div>
          </div>

          <div className='grid gap-2'>
            <Label htmlFor='file'>Thêm tệp đính kèm</Label>
            <Input
              id='file'
              type='file'
              accept='.pdf,.doc,.docx,.xlsx,.xls,.jpg,.jpeg,.png'
              onChange={e => setFile(e.target.files?.[0] ?? null)}
            />
          </div>

          <div className='grid gap-2'>
            <Label>Danh sách tệp đính kèm</Label>
            {attachments?.length ? (
              <ul className='list-disc pl-6'>
                {attachments.map((f: any) => (
                  <li key={f._id} className='flex items-center gap-3'>
                    <a
                      className='underline'
                      href={`${apiBase}/api/attachments/${f._id}/download`}
                      target='_blank'
                    >
                      {f.originalName}
                    </a>
                    <Button
                      type='button'
                      variant='destructive'
                      size='sm'
                      onClick={() => handleDeleteFile(f._id)}
                    >
                      Xoá
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className='text-sm text-muted-foreground'>
                Chưa có tệp đính kèm.
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className='flex items-center gap-3'>
          <Button type='submit' disabled={busy}>
            {busy ? 'Đang lưu...' : 'Lưu thay đổi'}
          </Button>
          <Button
            variant='outline'
            type='button'
            onClick={() => router.push('/admin/documents')}
          >
            ← Quay lại danh sách
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
