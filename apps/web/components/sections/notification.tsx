import Image from 'next/image';
import { Calendar } from 'lucide-react';
import { Button } from '@edu/ui/components/button';

const notificationsLeft = [
  {
    date: '03/07/2025',
    title:
      'Thông báo về việc hoãn phát bằng lễ tại cơ sở đào tạo Hà Đông trong tuần...',
    image: '/notice1.jpg',
  },
  {
    date: '27/06/2025',
    title:
      'Thông báo về việc hoãn phát bằng lễ tại cơ sở đào tạo Hà Đông trong tuần ...',
    image: '/notice2.jpg',
  },
  {
    date: '28/05/2025',
    title:
      'Thông báo danh sách gia hạn thẻ BHYT cho sinh viên hệ đại học chính qu...',
    image: '/notice3.jpg',
  },
  {
    date: '20/05/2025',
    title:
      'Thông báo V/v hướng dẫn sinh viên tham dự Lễ tốt nghiệp năm 2025 - đợt 1',
    image: '/notice4.jpg',
  },
];

const notificationsRight = [
  'Về việc thực hiện đánh giá kết quả rèn luyện sinh viên học kỳ 1…',
  'Thông báo kết quả cuộc thi tìm hiểu Nghị Quyết 57 chủ đề “Tuổi…',
  'Thông báo cuộc thi LG Dream Code 2025',
  'Thông báo v/v mua BHYT (đợt cuối) cho sinh viên hệ đại học…',
];

export default function NotificationSection() {
  return (
    <section className="bg-[url('/background-dots.png')] bg-cover bg-no-repeat py-16 px-6">
      <div className='text-center mb-10'>
        <p className='text-primary uppercase font-semibold tracking-wide'>
          Thông tin học sinh
        </p>
        <h2 className='text-4xl font-bold text-secondary-foreground mt-2'>
          Thông báo
        </h2>
        <div className='h-[2px] w-10 mx-auto mt-2 bg-primary' />
      </div>

      <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4'>
          {notificationsLeft.map((item, index) => (
            <div
              key={index}
              className='flex items-start gap-3 bg-white p-3 rounded shadow'
            >
              <Image
                src={item.image}
                alt='thumb'
                width={80}
                height={60}
                className='object-cover rounded w-20 h-14'
              />
              <div>
                <div className='flex items-center text-sm text-muted-foreground mb-1'>
                  <Calendar className='w-4 h-4 mr-1' />
                  {item.date}
                </div>
                <p className='text-secondary-foreground font-medium text-sm leading-snug line-clamp-2'>
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className='bg-white rounded p-4 shadow'>
          <ul className='space-y-3'>
            {notificationsRight.map((text, index) => (
              <li
                key={index}
                className='text-secondary-foreground hover:underline text-sm leading-snug cursor-pointer'
              >
                {text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='text-center mt-10'>
        <Button className='bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded'>
          Xem thêm
        </Button>
      </div>
    </section>
  );
}
