import { Button } from '@edu/ui/components/button';
import Link from 'next/link';

export default function PageLink({
  page,
  disabled,
  children,
  isActive,
}: {
  page: number | null;
  disabled?: boolean;
  children: React.ReactNode;
  isActive?: boolean;
}) {
  if (!page || disabled) {
    return (
      <Button variant='outline' size='sm' disabled>
        {children}
      </Button>
    );
  }
  const href = (prev: string) => {
    const url = new URL(prev, 'http://dummy'); // base ảo để thao tác
    url.searchParams.set('page', String(page));
    return url.search + url.hash;
  };
  // dùng Link giữ các query hiện tại
  return (
    <Link
      href={href(typeof window === 'undefined' ? '/news' : location.href)}
      scroll={false}
    >
      <Button variant={isActive ? 'default' : 'outline'} size='sm'>
        {children}
      </Button>
    </Link>
  );
}
