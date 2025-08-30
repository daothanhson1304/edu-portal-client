'use client';

import { useState } from 'react';
import { Button } from '@edu/ui/components/button';
import { Input } from '@edu/ui/components/input';
import { Label } from '@edu/ui/components/label';
import { useSearchParams } from 'next/navigation';
import { BASE_URL } from '@/constants';

export function LoginForm() {
  const sp = useSearchParams();
  const next = sp.get('next') || '/admin';

  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [message, setMessage] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setMessage('');

    const fd = new FormData(e.currentTarget);
    const email = String(fd.get('email') || '').trim();
    const password = String(fd.get('password') || '');

    const errs: typeof errors = {};
    if (!email) errs.email = 'Vui lòng nhập email';
    if (!password) errs.password = 'Vui lòng nhập mật khẩu';
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    try {
      setPending(true);
      const res = await fetch(`${BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json().catch(() => ({}));
      console.log('json', json);
      if (!res.ok) throw new Error(json?.error || 'Đăng nhập thất bại');

      window.location.href = next;
    } catch (err: any) {
      setMessage(err.message || 'Đăng nhập thất bại');
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div className='flex flex-col gap-2'>
        <div>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            name='email'
            type='email'
            placeholder='m@example.com'
          />
          {errors.email && (
            <p className='text-sm text-primary'>{errors.email}</p>
          )}
        </div>

        <div className='mt-4'>
          <div className='flex items-center justify-between'>
            <Label htmlFor='password'>Mật khẩu</Label>
          </div>
          <Input id='password' name='password' type='password' />
          {errors.password && (
            <p className='text-sm text-primary'>{errors.password}</p>
          )}
        </div>

        {message && <p className='text-sm text-primary'>{message}</p>}

        <Button
          type='submit'
          className='mt-4 w-full'
          disabled={pending}
          aria-disabled={pending}
        >
          {pending ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </Button>
      </div>
    </form>
  );
}
