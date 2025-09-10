import Image from 'next/image';
import { Card, CardContent } from '@edu/ui/components/card';
import { Separator } from '@edu/ui/components/separator';
import { Metadata } from 'next';
import { generateMetadata } from '@/utils';

const hero = '/images/facilities/hero.jpg';

const gallery: { src: string; alt: string; caption?: string }[] = [
  {
    src: '/images/facilities/courtyard.png',
    alt: 'Khuôn viên cây xanh',
    caption: 'Khuôn viên xanh – chỗ ngồi tự học',
  },
  {
    src: '/images/facilities/canteen.png',
    alt: 'Nhà ăn',
    caption: 'Nhà ăn sạch sẽ, nhiều lựa chọn',
  },
  {
    src: '/images/facilities/studio.png',
    alt: 'Studio thu âm',
    caption: 'Phòng thu âm – CLB Phát thanh',
  },
  {
    src: '/images/facilities/building.png',
    alt: 'Toà nhà học',
    caption: 'Khối nhà học 6 tầng',
  },
  {
    src: '/images/facilities/library.png',
    alt: 'Thư viện',
    caption: 'Thư viện thông minh – không gian đọc',
  },
  {
    src: '/images/facilities/auditorium.png',
    alt: 'Hội trường',
    caption: 'Hội trường đa năng – sinh hoạt, văn nghệ',
  },
];

export default function FacilitiesPage() {
  return (
    <div className='max-w-6xl mx-auto px-4 md:px-6 py-10'>
      {/* Hero */}
      <Card className='overflow-hidden shadow-lg border border-gray-200 py-0'>
        <CardContent className='p-0'>
          <div className='relative w-full aspect-[16/7]'>
            <Image
              src={hero}
              alt='Cơ sở vật chất'
              fill
              className='object-cover'
              priority
            />
          </div>
        </CardContent>
      </Card>

      {/* Intro */}
      <section className='mt-6'>
        <h2 className='text-2xl md:text-3xl font-bold text-primary'>
          Cơ sở vật chất Trường THCS Đồng Than
        </h2>

        <p className='text-sm md:text-base mt-3 text-muted-foreground leading-7'>
          Trường THCS Đồng Than được trang bị hệ thống phòng học đạt chuẩn, đủ
          ánh sáng và thiết bị giảng dạy hiện đại. Nhà trường có các phòng bộ
          môn Lý – Hóa – Sinh – Tin, phòng Ngoại ngữ, không gian STEM/Robotics,
          thư viện mở và phòng máy tính phục vụ học sinh tra cứu, thực hành và
          trải nghiệm.
        </p>

        <p className='text-sm md:text-base mt-3 text-muted-foreground leading-7'>
          Khu thể thao gồm nhà đa năng, sân bóng đá mini, sân bóng rổ/cầu lông
          và khu vận động ngoài trời. Canteen, khu nước uống, phòng y tế học
          đường và khuôn viên cây xanh tạo môi trường học tập thân thiện, an
          toàn. Toàn trường phủ sóng Wi-Fi, hệ thống camera và PCCC đáp ứng các
          tiêu chuẩn an ninh – an toàn học đường.
        </p>
      </section>

      <Separator className='my-6' />

      {/* Gallery */}
      <section>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
          {gallery.map((g, i) => (
            <figure key={i} className='group cursor-zoom-in'>
              <div className='relative w-full aspect-[4/3] overflow-hidden rounded-xl border bg-white'>
                <Image
                  src={g.src}
                  alt={g.alt}
                  fill
                  className='object-cover group-hover:scale-[1.03] transition-transform'
                />
              </div>
              {g.caption && (
                <figcaption className='mt-2 text-sm text-muted-foreground'>
                  {g.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </section>

      {/* Outro */}
      <section className='mt-6 text-sm md:text-base text-muted-foreground leading-7'>
        Ngoài hệ thống các giảng đường, phòng học thông minh, thư viện thân
        thiện dành cho học sinh, Học viện đặt mục tiêu xây dựng môi trường học
        đường xanh và "chill" để học sinh có thể thư giãn sau những giờ lên lớp.
      </section>
    </div>
  );
}

export const metadata: Metadata = generateMetadata('Cơ sở vật chất');
