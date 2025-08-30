'use client';

import Image from 'next/image';
import React from 'react';

export default function Banner() {
  return (
    <section className='relative w-full h-[800px]'>
      <Image
        src='/images/abc.jpg'
        alt='Banner'
        fill
        className='object-cover'
        priority
      />
    </section>
  );
}
