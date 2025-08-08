// app/news/[slug]/page.tsx

import { notFound } from 'next/navigation';

interface NewsPageProps {
  params: { slug: string };
}

const mockNews = Array.from({ length: 8 }, (_, i) => ({
  slug: `news-${i + 1}`,
  title: [
    'Sinh viên PTIT giành huy chương Vàng tin học văn phòng thế giới 2025',
    'PTIT trao bằng Thạc sĩ chương trình VMCS',
    'Sinh viên xuất sắc tại Coding Fest 2025',
    'PTIT tổ chức hoạt động tri ân kỷ niệm 78 năm ngày Thương binh – Liệt sĩ',
    'Thông báo quy đổi điểm tuyển sinh đại học chính quy 2025',
    'PTIT và TMN hợp tác về AI, STEM và công nghệ xanh',
    'Tư vấn tuyển sinh đại học chính quy năm 2025',
    'Khai giảng chương trình “Lãnh đạo trẻ trong kỷ nguyên số”',
  ][i],
  content: 'Đây là nội dung chi tiết của bài viết.',
  date: `2025-07-${31 - i}`.padStart(10, '0'),
}));

export default function NewsDetailPage({ params }: NewsPageProps) {
  const post = mockNews.find(item => item.slug === params.slug);

  if (!post) return notFound();

  return (
    <div className='max-w-3xl mx-auto px-4 py-10'>
      <p className='text-sm text-muted-foreground mb-2'>
        📰 Tin tức · {post.date}
      </p>
      <h1 className='text-3xl font-bold text-primary mb-4'>{post.title}</h1>
      <div className='text-gray-800 leading-relaxed space-y-4'>
        <p>{post.content}</p>
        <p>Nội dung mẫu thêm... Bạn có thể fetch từ CMS hoặc DB thực tế.</p>
      </div>
    </div>
  );
}
