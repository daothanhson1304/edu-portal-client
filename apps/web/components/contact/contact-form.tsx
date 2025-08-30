'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { Input } from '@edu/ui/components/input';
import { Textarea } from '@edu/ui/components/textarea';
import { Button } from '@edu/ui/components/button';

declare global {
  interface Window {
    turnstile?: any;
  }
}

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState<null | boolean>(null);
  const [error, setError] = useState<string | null>(null);

  const [captchaReady, setCaptchaReady] = useState(false);
  const [captchaToken, setCaptchaToken] = useState('');
  const [widgetId, setWidgetId] = useState<string | null>(null);

  const startedAtRef = useRef<string>('');
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';

  useEffect(() => {
    startedAtRef.current = Date.now().toString();
  }, []);

  // Khi script sẵn sàng -> render widget
  useEffect(() => {
    if (!captchaReady || !siteKey) return;
    if (!window.turnstile) return;
    if (!widgetId) {
      console.log('Rendering widget');
      const id = window.turnstile.render('#turnstile-container', {
        sitekey: siteKey,
        callback: (token: string) => {
          console.log('Captcha token', token);
          setCaptchaToken(token);
        },
        'expired-callback': () => setCaptchaToken(''),
        'error-callback': () => setCaptchaToken(''),
        // appearance: 'always', // hoặc 'interaction-only' tuỳ bạn
      });
      setWidgetId(id);
    }
  }, [captchaReady, siteKey, widgetId]);

  // Dọn dẹp widget khi unmount (optional)
  useEffect(() => {
    return () => {
      try {
        if (widgetId && window.turnstile?.remove) {
          window.turnstile.remove(widgetId);
        }
      } catch {}
    };
  }, [widgetId]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setOk(null);
    setError(null);

    // Không cho submit nếu chưa có token
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
      const res = await fetch('/nextapi/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error || 'Gửi thất bại');

      setOk(true);

      // Reset token & widget để lấy token mới cho lần sau
      setCaptchaToken('');
      if (widgetId && window.turnstile?.reset) {
        window.turnstile.reset(widgetId);
      }
    } catch (err: any) {
      setOk(false);
      setError(err.message || 'Gửi thất bại');
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

      {/* Honeypot + time-trap */}
      <input
        type='text'
        name='website'
        className='hidden'
        tabIndex={-1}
        autoComplete='off'
      />
      <input type='hidden' name='startedAt' value={startedAtRef.current} />

      {/* Turnstile script */}
      <Script
        src='https://challenges.cloudflare.com/turnstile/v0/api.js'
        async
        defer
        onLoad={() => setCaptchaReady(true)}
      />

      {/* Container để render widget bằng JS */}
      <div id='turnstile-container' />

      <div className='text-center space-y-2'>
        <Button
          type='submit'
          className='px-8 bg-primary hover:bg-primary/80 text-white'
          // 🔒 Disable nếu: đang gửi, script chưa sẵn sàng, hoặc CHƯA có token hợp lệ
          disabled={loading || !captchaReady || !captchaToken}
          aria-disabled={loading || !captchaReady || !captchaToken}
        >
          {loading ? 'Đang gửi…' : 'Gửi liên hệ'}
        </Button>

        {ok && (
          <p className='text-green-600 text-sm'>
            Đã gửi thành công! Cảm ơn bạn.
          </p>
        )}
        {ok === false && (
          <p className='text-destructive text-sm'>Lỗi: {error}</p>
        )}
      </div>

      {!siteKey && (
        <p className='text-sm text-destructive'>
          Thiếu NEXT_PUBLIC_TURNSTILE_SITE_KEY — vui lòng cấu hình .env
        </p>
      )}
    </form>
  );
}
