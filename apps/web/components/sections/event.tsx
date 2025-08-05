import Image from 'next/image';
import { CalendarDays } from 'lucide-react';
import { Button } from '@edu/ui/components/button';

const eventData = [
  {
    day: '12',
    month: 'TH6',
    date: '12/06/2025 08:00 - 12/08/2025 12:00',
    title: 'Đại hội Đảng bộ Học viện Công nghệ Bưu chính Viễn...',
    image: '/event1.jpg',
  },
  {
    day: '11',
    month: 'TH6',
    date: '11/06/2025 08:00 - 12:00',
    title: 'Ra mắt Trung tâm Công nghệ chiến lược Úc – Việt và công...',
    image: '/event2.jpg',
  },
  {
    day: '23',
    month: 'TH5',
    date: '23/05/2025 08:00 - 17:00',
    title: 'PTIT tổ chức Lễ tốt nghiệp cho gần 1000 Kỹ sư, Thạc sỹ...',
    image: '/event3.jpg',
  },
];

export default function EventSection() {
  return (
    <section className='bg-muted py-16 px-6'>
      <div className='text-center mb-10'>
        <p className='text-primary uppercase font-semibold tracking-wide'>
          Tin tức sự kiện
        </p>
        <h2 className='text-4xl font-bold text-secondary-foreground mt-2'>
          Sự kiện
        </h2>
        <div className='h-[2px] w-10 mx-auto mt-2 bg-primary' />
      </div>

      <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {eventData.map((event, index) => (
          <div
            key={index}
            className='bg-white shadow-md rounded overflow-hidden'
          >
            <div className='relative'>
              <Image
                src={event.image}
                alt={event.title}
                width={600}
                height={400}
                className='w-full h-56 object-cover'
              />
              <div className='absolute top-4 left-4 bg-primary text-primary-foreground text-center rounded px-2 py-1'>
                <p className='text-sm leading-none font-bold'>{event.day}</p>
                <p className='text-[10px] uppercase'>{event.month}</p>
              </div>
            </div>
            <div className='p-4'>
              <div className='flex items-center text-sm text-muted-foreground mb-2'>
                <CalendarDays className='w-4 h-4 mr-1' />
                <span>{event.date}</span>
              </div>
              <h3 className='font-semibold text-secondary-foreground text-base line-clamp-2'>
                {event.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className='text-center mt-10'>
        <Button className='bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded'>
          Xem thêm
        </Button>
      </div>
    </section>
  );
}
