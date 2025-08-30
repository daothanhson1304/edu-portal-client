'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { Input } from '@edu/ui/components/input';
import { Textarea } from '@edu/ui/components/textarea';
import { Button } from '@edu/ui/components/button';

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const [error, setError] = useState<string | null>(null);
  const [captchaReady, setCaptchaReady] = useState(false);
  const [captchaToken, setCaptchaToken] = useState('');
  const startedAtRef = useRef<string>('');

  useEffect(() => {
    startedAtRef.current = Date.now().toString();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setError(null);

    if (!captchaToken) {
      setLoading(false);
      setOk(false);
      setError('Vui lòng xác thực CAPTCHA trước khi gửi.');
      return;
    }

    const fd = new FormData(e.currentTarget);
    fd.set('startedAt', startedAtRef.current);
    fd.set('turnstileToken', captchaToken);
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
      setCaptchaToken('');
    } catch (err: any) {
      setOk(false);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className='space-y-6' onSubmit={onSubmit} noValidate>
      {/* Fields */}
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
          placeholder='Nhập nội dung...'
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
      <input type='hidden' name='startedAt' value={startedAtRef.current} />

      <Script
        src='https://challenges.cloudflare.com/turnstile/v0/api.js'
        async
        defer
        onLoad={() => setCaptchaReady(true)}
      />
      <div
        className='cf-turnstile'
        data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
        data-callback={(token: string) => setCaptchaToken(token)}
        data-expired-callback={() => setCaptchaToken('')}
        data-error-callback={() => setCaptchaToken('')}
      />

      <div className='text-center space-y-2'>
        <Button
          type='submit'
          className='px-8 bg-red-700 hover:bg-red-800 text-white'
          disabled={loading || !captchaReady || !captchaToken}
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
  );
}
