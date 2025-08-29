'use client';

import { useState } from 'react';
import { Input } from '@edu/ui/components/input';
import { Textarea } from '@edu/ui/components/textarea';
import { Button } from '@edu/ui/components/button';

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || 'Gửi thất bại');
      setOk(true);
      (e.currentTarget as HTMLFormElement).reset();
    } catch (err: any) {
      setOk(false);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className='py-16 px-6 max-w-3xl mx-auto'>
      <div className='text-center mb-10'>
        <h1 className='text-4xl font-bold text-primary'>
          Liên hệ với chúng tôi
        </h1>
        <p className='text-muted-foreground mt-2'>
          Gửi thông tin hoặc thắc mắc cho Trung học Cơ sở Đồng Than, chúng tôi
          sẽ phản hồi sớm nhất.
        </p>
      </div>

      <form className='space-y-6' onSubmit={onSubmit}>
        <div>
          <label htmlFor='name' className='block mb-1 font-medium'>
            Họ và tên
          </label>
          <Input
            id='name'
            name='name'
            placeholder='Nhập họ tên của bạn'
            required
          />
        </div>

        <div>
          <label htmlFor='email' className='block mb-1 font-medium'>
            Email
          </label>
          <Input
            id='email'
            name='email'
            type='email'
            placeholder='Nhập email của bạn'
            required
          />
        </div>

        <div>
          <label htmlFor='subject' className='block mb-1 font-medium'>
            Tiêu đề
          </label>
          <Input
            id='subject'
            name='subject'
            placeholder='Nhập tiêu đề liên hệ'
            required
          />
        </div>

        <div>
          <label htmlFor='message' className='block mb-1 font-medium'>
            Nội dung
          </label>
          <Textarea
            id='message'
            name='message'
            rows={6}
            placeholder='Nhập nội dung cần gửi...'
            required
          />
        </div>

        <input
          type='text'
          name='website'
          className='hidden'
          tabIndex={-1}
          autoComplete='off'
        />

        <div className='text-center space-y-2'>
          <Button
            type='submit'
            className='px-8 bg-red-700 hover:bg-red-800 text-white'
            disabled={loading}
          >
            {loading ? 'Đang gửi…' : 'Gửi liên hệ'}
          </Button>
          {ok && (
            <p className='text-green-600 text-sm'>
              Đã gửi thành công! Cảm ơn bạn.
            </p>
          )}
          {ok === false && <p className='text-red-600 text-sm'>Lỗi: {error}</p>}
        </div>
      </form>
    </section>
  );
}
