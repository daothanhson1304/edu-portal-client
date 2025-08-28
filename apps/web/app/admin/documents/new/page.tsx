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
import { BASE_URL } from '@/constants';

export default function NewRulePage() {
  const [number, setNumber] = useState('');
  const [issuedDate, setIssuedDate] = useState('');
  const [effectiveDate, setEffectiveDate] = useState('');
  const [summary, setSummary] = useState('');
  const [docType, setDocType] = useState<string>('Quyết định');
  const [agency, setAgency] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (
      !number ||
      !issuedDate ||
      !effectiveDate ||
      !summary ||
      !docType ||
      !agency
    ) {
      toast.error('Vui lòng nhập đầy đủ các trường bắt buộc.');
      return;
    }

    setLoading(true);
    try {
      // 1) Tạo bản ghi văn bản
      const createRes = await fetch(`${BASE_URL}/api/rules`, {
        method: 'POST',
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

      const createData = await createRes.json();
      if (!createRes.ok)
        throw new Error(createData?.error || 'Không tạo được văn bản');
      const ruleId: string = createData?.id || createData?._id;

      // 2) Upload tệp đính kèm (nếu có) —> POST /api/attachments/rule/:ruleId
      if (file) {
        const fd = new FormData();
        fd.append('file', file);

        const upRes = await fetch(
          `${BASE_URL}/api/attachments/rule/${ruleId}`,
          {
            method: 'POST',
            body: fd,
          }
        );
        const upData = await upRes.json();
        if (!upRes.ok) throw new Error(upData?.error || 'Upload tệp thất bại');
      }

      toast.success('Lưu văn bản thành công.');
      // reset form
      setNumber('');
      setIssuedDate('');
      setEffectiveDate('');
      setSummary('');
      setDocType('Quyết định');
      setAgency('');
      setFile(null);
    } catch (err: any) {
      toast.error(err?.message || 'Đã có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='mx-auto max-w-4xl p-6'>
      <h1 className='text-3xl font-bold mb-6'>Thêm văn bản mới</h1>

      <Card>
        <form onSubmit={onSubmit}>
          <CardHeader>
            <CardTitle>Thông tin văn bản & tệp đính kèm</CardTitle>
          </CardHeader>

          <CardContent className='grid gap-5'>
            <div className='grid gap-4 md:grid-cols-3'>
              <div className='grid gap-2'>
                <Label htmlFor='number'>Số văn bản</Label>
                <Input
                  id='number'
                  placeholder='01/QĐ-THCS'
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
                <Label htmlFor='effectiveDate'>
                  Thời gian bắt đầu hiệu lực
                </Label>
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
                placeholder='Ví dụ: Quy định về nội quy học sinh Trường THCS Đồng Than năm học 2024–2025'
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
                    <SelectValue placeholder='Chọn loại văn bản' />
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
                  placeholder='Ban giám hiệu / Tổ chuyên môn …'
                  value={agency}
                  onChange={e => setAgency(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className='grid gap-2'>
              <Label htmlFor='file'>Đính kèm (PDF/Word/Excel/Ảnh)</Label>
              <Input
                id='file'
                type='file'
                accept='.pdf,.doc,.docx,.xlsx,.xls,.jpg,.jpeg,.png'
                onChange={e => setFile(e.target.files?.[0] ?? null)}
              />
              <p className='text-xs text-muted-foreground'>
                Nếu không chọn tệp, bạn vẫn có thể tạo văn bản trước rồi đính
                kèm sau.
              </p>
            </div>
          </CardContent>

          <CardFooter className='flex items-center gap-3 mt-3'>
            <Button type='submit' disabled={loading}>
              {loading ? 'Đang lưu...' : 'Lưu văn bản'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
