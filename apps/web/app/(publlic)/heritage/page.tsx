import Image from 'next/image';
import HistoryTable from './components/history';

export default function SchoolHistoryPage() {
  const school = {
    name: 'Trường THCS Đồng Than',
    address: 'Đường 318, xã Hoàn Long, Tỉnh Hưng Yên',
    foundedYear: '1960',
    yearsActive: '26',
  };

  const content = {
    title: `Lịch sử & Truyền thống — ${school.name}`,
    lead: `${school.name}, tọa lạc tại ${school.address}, được thành lập vào năm ${school.foundedYear}. Trong suốt chặng đường 60 năm, từ khi thành lập vào năm 1960 đến nay, qua nhiều giai đoạn phát triển, trưởng thành, thầy và trò trường THCS Đồng Than luôn nỗ lực phấn đấu đạt danh hiệu Tập thể lao động xuất sắc, nhiều lần được nhận Bằng khen, giấy khen của tỉnh, huyện, … Đội ngũ cán bộ, giáo viên và nhân nhà trường ngày càng trưởng thành. Chất lượng giáo dục được nâng cao. Cơ ngơi nhà trường ngày một khang trang, xanh, sạch, đẹp và thân thiện. Trong bối cảnh ấy, những thành tích của thầy và trò nhà trường đạt được như những bông hoa tươi sắc điểm tô cho ngôi trường một nét đẹp riêng xứng với tên “Đồng Than - quê hương anh hùng”!`,
    history: `Tiền thân của trường là Trường cấp 2 Phổ thông Nông nghiệp Dân Chủ . Ban đầu với quy mô nhỏ, trường đã không ngừng mở rộng quy mô, nâng cấp cơ sở vật chất và đổi mới phương pháp dạy học. Sự nỗ lực của đội ngũ nhà giáo và sự ủng hộ của phụ huynh, cộng đồng đã giúp trường vươn lên đạt nhiều thành tích nổi bật.`,
    achievementsTitle: 'Thành tích nổi bật',
    achievements: [
      'Nhiều năm đạt danh hiệu Tập thể Lao động Xuất sắc.',
      'Học sinh đạt giải tại các cuộc thi học sinh giỏi cấp huyện, tỉnh.',
      'Hoạt động văn nghệ, thể thao và các hoạt động cộng đồng được duy trì đều đặn.',
    ],
    futureTitle: 'Hướng tới tương lai',
    future: `Nhà trường tiếp tục đổi mới chương trình, ứng dụng công nghệ trong giảng dạy, phát triển môi trường học tập thân thiện, sáng tạo, giúp học sinh phát huy tối đa năng lực.`,
    closing: `${school.name} tự hào với bề dày lịch sử và truyền thống tốt đẹp, cam kết tiếp tục viết tiếp những trang vàng trong sự nghiệp giáo dục.`,
  };

  return (
    <main className='min-h-screen py-12'>
      <div className='max-w-7xl mx-auto'>
        <div className='overflow-hidden'>
          {/* Hero */}
          <div className='relative aspect-[21/9] w-full'>
            <Image
              src='/images/abc.jpg'
              alt='school building'
              className='object-cover'
              placeholder='blur'
              fill
              blurDataURL='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJScgaGVpZ2h0PSc1MCUnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc+PC9zdmc+'
            />
            {/* <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/40' /> */}
            <div className='absolute left-6 bottom-6 text-white'>
              <h1 className='text-2xl md:text-3xl font-semibold drop-shadow'>
                {content.title}
              </h1>
            </div>
          </div>

          {/* Content */}
          <div className='mt-10'>
            <p className=''>{content.lead}</p>

            <section className='mt-6'>
              <h3 className='text-lg font-semibold'>Quá trình hình thành</h3>
              <p className='mt-3'>{content.history}</p>
            </section>

            <section className='mt-6'>
              <h3 className='text-lg font-semibold'>
                {content.achievementsTitle}
              </h3>
              <ul className='mt-3 list-disc list-inside space-y-2'>
                {content.achievements.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </section>

            <section className='mt-6'>
              <h3 className='text-lg font-semibold'>{content.futureTitle}</h3>
              <p className='mt-3'>{content.future}</p>
            </section>

            <section className='mt-8 border-l-4 border-blue-600 pl-4 py-3 bg-blue-50 rounded-md'>
              <p>{content.closing}</p>
            </section>

            {/* Simple timeline */}
            <section className='mt-10'>
              <h3 className='text-lg font-semibold'>Mốc thời gian tiêu biểu</h3>
              <div className='mt-4'>
                <HistoryTable />
              </div>
            </section>

            <div className='mt-10 text-right'>
              <p className='text-sm text-gray-500'>
                Cập nhật lần cuối: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export const metadata = {
  title: 'Lịch sử và truyền thống',
  description: 'Lịch sử và truyền thống của trường THCS Đồng Than',
};
