import { Input } from '@edu/ui/components/input';
import { Textarea } from '@edu/ui/components/textarea';
import { Button } from '@edu/ui/components/button';

export default function ContactPage() {
  return (
    <section className='py-16 px-6 max-w-3xl mx-auto'>
      <div className='text-center mb-10'>
        <h1 className='text-4xl font-bold text-secondary-foreground'>
          Liên hệ với chúng tôi
        </h1>
        <p className='text-muted-foreground mt-2'>
          Gửi thông tin hoặc thắc mắc cho Trung học Cơ sở Đồng Than, chúng tôi
          sẽ phản hồi sớm nhất.
        </p>
      </div>

      <form className='space-y-6'>
        <div>
          <label htmlFor='name' className='block mb-1 font-medium'>
            Họ và tên
          </label>
          <Input
            id='name'
            name='name'
            placeholder='Nhập họ tên của bạn'
            required
          />
        </div>

        <div>
          <label htmlFor='email' className='block mb-1 font-medium'>
            Email
          </label>
          <Input
            id='email'
            name='email'
            type='email'
            placeholder='Nhập email của bạn'
            required
          />
        </div>

        <div>
          <label htmlFor='subject' className='block mb-1 font-medium'>
            Tiêu đề
          </label>
          <Input
            id='subject'
            name='subject'
            placeholder='Nhập tiêu đề liên hệ'
          />
        </div>

        <div>
          <label htmlFor='message' className='block mb-1 font-medium'>
            Nội dung
          </label>
          <Textarea
            id='message'
            name='message'
            rows={6}
            placeholder='Nhập nội dung cần gửi...'
            required
          />
        </div>

        <div className='text-center'>
          <Button
            type='submit'
            className='px-8 bg-red-700 hover:bg-red-800 text-white'
          >
            Gửi liên hệ
          </Button>
        </div>
      </form>
    </section>
  );
}

export const metadata = {
  title: 'Liên hệ với chúng tôi',
  description: 'Liên hệ với chúng tôi',
};
