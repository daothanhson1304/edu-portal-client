const stats = [
  {
    number: '800+',
    description: 'Học sinh đang theo học tại trường',
  },
  {
    number: '40+',
    description: 'Giáo viên và cán bộ nhân viên giàu kinh nghiệm',
  },
  {
    number: '15+',
    description: 'Giải thưởng học sinh giỏi cấp huyện và tỉnh mỗi năm',
  },
  {
    number: '10+',
    description: 'Câu lạc bộ học thuật và năng khiếu đang hoạt động',
  },
  {
    number: '3',
    description:
      'Phòng học Tin học, Ngoại ngữ và Thư viện được trang bị hiện đại',
  },
  {
    number: '5+',
    description: 'Chương trình hợp tác ngoại khoá với các đơn vị giáo dục',
  },
];

export default function HighlightStats() {
  return (
    <section className="bg-primary py-12 text-primary-foreground px-6 bg-[url('/background-footer.png')] bg-cover bg-no-repeat">
      <div className='max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center'>
        {stats.map((item, index) => (
          <div key={index} className='px-2'>
            <div className='text-2xl font-bold mb-1'>{item.number}</div>
            <p className='text-base leading-snug opacity-90'>
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
