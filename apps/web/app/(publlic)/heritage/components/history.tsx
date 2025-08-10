// components/history-table.tsx
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@edu/ui/components/table';

const historyData = [
  {
    date: 'Trước 1945',
    event: 'Tổng Đồng Than gồm ba xã: Đồng Than, Song Hồ, Yên Vĩnh.',
  },
  {
    date: '1945',
    event:
      'Cách mạng tháng 8 thành công, bắt đầu xây dựng hệ thống giáo dục mới tại địa phương.',
  },
  {
    date: '1954',
    event:
      'Miền Bắc hoàn toàn giải phóng, trường cấp 1 - 2 được củng cố và mở rộng.',
  },
  {
    date: '1960',
    event: 'Thành lập trường cấp 2 riêng biệt cho học sinh địa phương.',
  },
  {
    date: '1975',
    event:
      'Sau ngày thống nhất đất nước, trường mở rộng quy mô đào tạo và lớp học.',
  },
  {
    date: '1986',
    event: 'Thời kỳ đổi mới, trường được nâng cấp cơ sở vật chất.',
  },
  {
    date: '1990',
    event: 'Xây dựng thêm phòng học kiên cố thay cho lớp học tranh tre nứa lá.',
  },
  {
    date: '2000',
    event: 'Hoàn thành khu nhà học 2 tầng, đáp ứng nhu cầu học sinh tăng cao.',
  },
  {
    date: '2010',
    event: 'Trường đạt chuẩn Quốc gia giai đoạn 1.',
  },
  {
    date: '2015',
    event: 'Kỷ niệm 70 năm thành lập, nâng cấp trang thiết bị dạy học.',
  },
  {
    date: '2020',
    event:
      'Trường đạt chuẩn Quốc gia giai đoạn 2, cơ sở vật chất khang trang hiện đại.',
  },
];

export default function HistoryTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[150px]'>Ngày tháng</TableHead>
          <TableHead>Sự kiện</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {historyData.map((item, index) => (
          <TableRow key={index}>
            <TableCell className='font-medium align-top'>{item.date}</TableCell>
            <TableCell className='whitespace-pre-line'>{item.event}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
