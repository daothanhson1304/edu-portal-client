import { generateMetadata } from '@/utils';

export default function AboutPage() {
  return (
    <section className='py-16 px-6 max-w-4xl mx-auto'>
      <div className='text-center mb-10'>
        <h1 className='text-4xl font-bold text-primary'>
          Giới thiệu về trường
        </h1>
        <p className='text-muted-foreground mt-2'>
          Trường THCS Đồng Than - Nơi ươm mầm tài năng tương lai
        </p>
      </div>

      <div className='prose max-w-none'>
        <p className='text-lg leading-relaxed mb-6'>
          Trường Trung học Cơ sở Đồng Than được thành lập với sứ mệnh cung cấp
          nền giáo dục chất lượng cao, phát triển toàn diện về trí tuệ, thể chất
          và nhân cách cho học sinh.
        </p>

        <p className='text-lg leading-relaxed mb-6'>
          Với đội ngũ giáo viên giàu kinh nghiệm, cơ sở vật chất hiện đại,
          trường cam kết mang đến môi trường học tập tốt nhất cho các em học
          sinh.
        </p>
      </div>
    </section>
  );
}

export const metadata = generateMetadata('Giới thiệu về trường');
