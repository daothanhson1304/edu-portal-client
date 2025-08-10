import { Input } from '@edu/ui/components/input';

import { Button } from '@edu/ui/components/button';

const documents = [
  {
    number: '01/QĐ-THCS',
    issuedDate: '10/09/2024',
    effectiveDate: '10/09/2024',
    description:
      'Quy định về nội quy học sinh Trường THCS Đồng Than năm học 2024–2025',
    type: 'Quyết định',
    agency: 'Ban giám hiệu',
    link: '#',
  },
  {
    number: '02/QĐ-THCS',
    issuedDate: '15/09/2024',
    effectiveDate: '15/09/2024',
    description:
      'Quy chế tổ chức các hoạt động ngoại khoá và câu lạc bộ học sinh',
    type: 'Quyết định',
    agency: 'Ban giám hiệu',
    link: '#',
  },
  {
    number: '03/QĐ-THCS',
    issuedDate: '20/09/2024',
    effectiveDate: '20/09/2024',
    description: 'Quy định khen thưởng và xử lý vi phạm đối với học sinh',
    type: 'Quyết định',
    agency: 'Ban giám hiệu',
    link: '#',
  },
  {
    number: '04/QĐ-THCS',
    issuedDate: '25/09/2024',
    effectiveDate: '25/09/2024',
    description:
      'Hướng dẫn thực hiện quy chế đánh giá kết quả học tập và rèn luyện của học sinh',
    type: 'Hướng dẫn',
    agency: 'Tổ chuyên môn',
    link: '#',
  },
];
export default function RegulationDocumentsPage() {
  return (
    <section className='py-16 px-6 max-w-7xl mx-auto'>
      <div className='text-center mb-10'>
        <h1 className='text-4xl font-bold text-primary mt-2'>
          Các văn bản quy định về học tập và rèn luyện tại Trường THCS Đồng Than
        </h1>
      </div>

      <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mb-8'>
        <Input placeholder='Nhập từ khóa ...' className='w-64 bg-white' />
        <Button className='bg-primary hover:bg-primary/80 text-white'>
          Tìm kiếm
        </Button>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full text-sm border-collapse bg-white'>
          <thead>
            <tr className='bg-gray-100 text-secondary-foreground font-semibold'>
              <th className='px-4 py-2 border'>STT</th>
              <th className='px-4 py-2 border'>Số văn bản</th>
              <th className='px-4 py-2 border'>Ngày ban hành</th>
              <th className='px-4 py-2 border'>Thời gian bắt đầu hiệu lực</th>
              <th className='px-4 py-2 border text-left'>Trích yếu nội dung</th>
              <th className='px-4 py-2 border'>Loại văn bản</th>
              <th className='px-4 py-2 border'>Cơ quan ban hành</th>
              <th className='px-4 py-2 border'>Đính kèm</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, index) => (
              <tr key={index} className='hover:bg-gray-50'>
                <td className='px-4 py-2 border text-center'>{index + 1}</td>
                <td className='px-4 py-2 border text-center'>{doc.number}</td>
                <td className='px-4 py-2 border text-center'>
                  {doc.issuedDate}
                </td>
                <td className='px-4 py-2 border text-center'>
                  {doc.effectiveDate}
                </td>
                <td className='px-4 py-2 border'>{doc.description}</td>
                <td className='px-4 py-2 border text-center'>{doc.type}</td>
                <td className='px-4 py-2 border text-center'>{doc.agency}</td>
                <td className='px-4 py-2 border text-center'>
                  <a
                    href={doc.link}
                    className='text-secondary-foreground hover:underline'
                  >
                    {doc.number}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export const metadata = {
  title: 'Văn bản & Hồ sơ',
  description: 'Văn bản & Hồ sơ',
};
