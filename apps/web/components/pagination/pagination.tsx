'use client';

import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import { Button } from '@edu/ui/components/button';
import Ellipsis from './ellipsis';

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const sp = useSearchParams();
  const pathname = usePathname();

  const pages = Array.from(
    new Set(
      [1, currentPage - 1, currentPage, currentPage + 1, totalPages].filter(
        p => p >= 1 && p <= totalPages
      )
    )
  ).sort((a, b) => a - b);

  const makeHref = (page: number) => {
    const params = new URLSearchParams(sp?.toString());
    params.set('page', String(page));
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className='flex justify-center gap-2 mt-10'>
      <Link
        href={currentPage > 1 ? makeHref(currentPage - 1) : '#'}
        aria-disabled={currentPage === 1}
      >
        <Button variant='outline' size='sm' disabled={currentPage === 1}>
          {'<'}
        </Button>
      </Link>

      {pages.map((p, i) => {
        const prev = pages[i - 1];
        const needEllipsis = i > 0 && p - (prev ?? 0) > 1;
        return (
          <span key={p} className='flex gap-2'>
            {needEllipsis && <Ellipsis />}
            <Link href={makeHref(p)}>
              <Button
                variant={p === currentPage ? 'default' : 'outline'}
                size='sm'
              >
                {p}
              </Button>
            </Link>
          </span>
        );
      })}

      <Link
        href={currentPage < totalPages ? makeHref(currentPage + 1) : '#'}
        aria-disabled={currentPage === totalPages}
      >
        <Button
          variant='outline'
          size='sm'
          disabled={currentPage === totalPages}
        >
          {'>'}
        </Button>
      </Link>
    </div>
  );
}
