import Image from 'next/image';

const galleryImages = [
  '/gallery1.jpg',
  '/gallery2.jpg',
  '/gallery3.jpg',
  '/gallery4.jpg',
  '/gallery5.jpg',
  '/gallery6.jpg',
  '/gallery7.jpg',
];

export default function Feature() {
  return (
    <section className='bg-primary py-14 px-6'>
      <div className='max-w-7xl mx-auto text-white mb-10'>
        <p className='uppercase tracking-widest text-sm'>
          Hoạt động nhà trường
        </p>
        <h2 className='text-3xl font-bold mt-2'>
          Hình ảnh tiêu biểu trong năm học
        </h2>
      </div>

      <div className='max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {galleryImages.map((src, index) => (
          <div key={index} className='overflow-hidden rounded'>
            <Image
              src={src}
              alt={`PTIT Gallery ${index + 1}`}
              width={400}
              height={300}
              className='object-cover w-full h-full'
            />
          </div>
        ))}
      </div>
    </section>
  );
}
