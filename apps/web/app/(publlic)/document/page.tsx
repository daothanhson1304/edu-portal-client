import DocsTable from '@/components/tables/docs-table';
import { BASE_URL } from '@/constants';

export const dynamic = 'force-static'; // ép build static
export const revalidate = 300; // ISR: 24h. Đặt false nếu muốn SSG thuần

type Rule = {
  _id: string;
  number: string;
  issuedDate: string;
  effectiveDate: string;
  summary: string;
  type: string;
  agency: string;
};

type Attachment = {
  _id: string;
  originalName: string;
  size: number;
  mime: string;
  createdAt: string;
};

async function getRules(): Promise<Rule[]> {
  const res = await fetch(`${BASE_URL}/api/rules`, {
    next: { revalidate },
  });
  if (!res.ok) throw new Error('Không lấy được danh sách văn bản');
  const data = await res.json();
  return (data?.rules ?? []) as Rule[];
}

async function getAttachments(ruleId: string): Promise<Attachment[]> {
  const res = await fetch(`${BASE_URL}/api/attachments/rule/${ruleId}`, {
    next: { revalidate },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return (data?.files ?? []) as Attachment[];
}

function fmtVN(d: string) {
  try {
    return new Date(d).toLocaleDateString('vi-VN');
  } catch {
    return d;
  }
}

export default async function RegulationDocumentsPage() {
  const rules = await getRules();

  // Pre-fetch attachments tại build (hoặc lần revalidate)
  const rulesWithFiles = await Promise.all(
    rules.map(async r => ({
      ...r,
      issuedDate: fmtVN(r.issuedDate),
      effectiveDate: fmtVN(r.effectiveDate),
      attachments: await getAttachments(r._id),
    }))
  );

  return (
    <section className='py-16 px-6 max-w-7xl mx-auto'>
      <div className='text-center mb-10'>
        <h1 className='text-4xl font-bold text-primary mt-2'>
          Các văn bản quy định về học tập và rèn luyện tại Trường THCS Đồng Than
        </h1>
      </div>

      <DocsTable
        data={rulesWithFiles}
        downloadBase={`${BASE_URL}/api/attachments`}
      />
    </section>
  );
}

export const metadata = {
  title: 'Văn bản & Hồ sơ',
  description: 'Văn bản & Hồ sơ',
};
