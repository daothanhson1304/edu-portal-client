// app/contact/page.tsx (Server Component)
import { Metadata } from 'next';
import { ContactForm } from '@/components/contact';
import { generateMetadata } from '@/utils';

export const metadata: Metadata = generateMetadata(
  'Liên hệ',
  'Liên hệ với chúng tôi'
);

export default function ContactPage() {
  return (
    <section className='py-16 px-6 max-w-3xl mx-auto'>
      <div className='text-center mb-10'>
        <h1 className='text-4xl font-bold text-primary'>
          Liên hệ với chúng tôi
        </h1>
        <p className='text-muted-foreground mt-2'>
          Gửi thông tin hoặc thắc mắc cho Trung học Cơ sở Đồng Than, chúng tôi
          sẽ phản hồi sớm nhất.
        </p>
      </div>
      <ContactForm />
    </section>
  );
}
