import { Separator } from '@edu/ui/components/separator';
import { Badge } from '@edu/ui/components/badge';
import { Card, CardContent } from '@edu/ui/components/card';
import {
  Target,
  Lightbulb,
  Users2,
  ShieldCheck,
  Laptop,
  Microscope,
} from 'lucide-react';
import { Metadata } from 'next';
import { ForwardRefExoticComponent } from 'react';
import { LucideProps } from 'lucide-react';
import { RefAttributes } from 'react';

const SCHOOL_NAME = 'Trường THCS Đồng Than';

const pillars: {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  title: string;
  desc: string;
}[] = [
  {
    icon: Target,
    title: 'Nâng cao chất lượng dạy học',
    desc: 'Dạy học phân hoá – cá thể hoá, kiểm tra đánh giá vì sự tiến bộ của học sinh.',
  },
  {
    icon: Lightbulb,
    title: 'Nuôi dưỡng sáng tạo',
    desc: 'Khuyến khích nghiên cứu khoa học, dự án trải nghiệm và CLB sở thích.',
  },
  {
    icon: Users2,
    title: 'Văn hoá học đường hạnh phúc',
    desc: 'Xây dựng môi trường tôn trọng – thân thiện – kỷ luật tích cực; phòng chống bạo lực học đường.',
  },
  {
    icon: ShieldCheck,
    title: 'An toàn & chăm sóc',
    desc: 'Y tế học đường, tư vấn tâm lý, an ninh – PCCC, an toàn số cho học sinh.',
  },
  {
    icon: Laptop,
    title: 'Chuyển đổi số',
    desc: 'Ứng dụng LMS, học liệu số, kỹ năng công dân số và an toàn thông tin.',
  },
  {
    icon: Microscope,
    title: 'STEM & hướng nghiệp sớm',
    desc: 'Phòng Lab, Robotics, trải nghiệm nghề nghiệp phù hợp lứa tuổi THCS.',
  },
];
export default function VisionMissionPage() {
  return (
    <div className='max-w-5xl mx-auto px-4 md:px-6 py-10'>
      {/* Heading */}
      <header className='mb-6'>
        <h1 className='text-2xl md:text-4xl font-bold text-red-700'>
          Tầm nhìn – Sứ mạng của {SCHOOL_NAME}
        </h1>
      </header>

      {/* Vision */}
      <section className='space-y-3'>
        <h2 className='text-xl md:text-2xl font-extrabold'>Tầm nhìn</h2>
        <p className='text-muted-foreground leading-7'>
          {SCHOOL_NAME} phấn đấu trở thành môi trường học tập hạnh phúc, an toàn
          và sáng tạo; dẫn đầu về chất lượng giáo dục toàn diện tại địa phương,
          tiên phong ứng dụng công nghệ số, định hướng năng lực – phẩm chất,
          giúp học sinh sẵn sàng bước vào bậc THPT và tương lai công dân số.
        </p>
      </section>

      <Separator className='my-6' />

      {/* Mission */}
      <section className='space-y-3'>
        <h2 className='text-xl md:text-2xl font-extrabold'>Sứ mạng</h2>
        <p className='text-muted-foreground leading-7'>
          Tổ chức hoạt động dạy học và giáo dục theo định hướng phát triển năng
          lực, nuôi dưỡng nhân cách, bồi dưỡng kỹ năng tự học, giao tiếp, hợp
          tác và giải quyết vấn đề; tăng cường trải nghiệm STEM, rèn luyện thể
          chất, thẩm mỹ và kỹ năng số; kết nối gia đình – nhà trường – cộng đồng
          để mỗi học sinh đều được quan tâm và phát triển tối đa tiềm năng.
        </p>
      </section>

      <Separator className='my-6' />

      {/* Core values */}
      <section>
        <h2 className='text-xl md:text-2xl font-extrabold mb-3'>
          Giá trị cốt lõi
        </h2>
        <div className='flex flex-wrap gap-2'>
          {[
            'Tôn trọng',
            'Trách nhiệm',
            'Kỷ luật',
            'Trung thực',
            'Hợp tác',
            'Sáng tạo',
            'Nhân ái',
          ].map(v => (
            <Badge
              key={v}
              variant='secondary'
              className='text-sm text-white py-1 px-3'
            >
              {v}
            </Badge>
          ))}
        </div>
      </section>

      <Separator className='my-6' />

      {/* Strategic pillars */}
      <section>
        <h2 className='text-xl md:text-2xl font-extrabold mb-4'>
          Định hướng phát triển
        </h2>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch auto-rows-fr'>
          {pillars.map(({ icon: Icon, title, desc }, i) => (
            <Card key={i} className='h-full py-0'>
              <CardContent className='p-5 h-full'>
                <div className='flex items-start gap-3 h-full'>
                  <Icon className='h-5 w-5 mt-0.5 flex-shrink-0' />
                  <div className='space-y-1'>
                    <h3 className='font-semibold'>{title}</h3>
                    <p className='text-sm text-muted-foreground'>{desc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

export const metadata: Metadata = {
  title: 'Tầm nhìn – Sứ mạng của Trường THCS Đồng Thần',
  description: 'Tầm nhìn – Sứ mạng của Trường THCS Đồng Thần',
};
