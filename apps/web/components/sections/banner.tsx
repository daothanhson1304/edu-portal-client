'use client';
import React from 'react';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';

export default function Banner() {
  return (
    <section className='relative w-full h-[800px]'>
      <Swiper
        className='h-full'
        modules={[Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
          stopOnLastSlide: false,
        }}
        speed={1500}
        loop
      >
        <SwiperSlide className='relative h-full'>
          <Image
            src='/images/hero.jpg'
            alt='Banner'
            fill
            className='object-cover'
            priority
          />
        </SwiperSlide>
        <SwiperSlide className='relative h-full'>
          <Image
            src='/images/abc.jpg'
            alt='Banner'
            fill
            className='object-cover'
            priority
          />
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
