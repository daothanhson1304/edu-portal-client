import ContentList, { AdminItem } from '@/components/admin/content-list';
import { BASE_URL, ADMIN_ROUTES } from '@/constants';

export const dynamic = 'force-dynamic';

type Raw = {
  id: string;
  title: string;
  thumbnailUrl?: string;
  updatedAt: string;
  status?: 'draft' | 'published';
  views?: number;
  likes?: number;
  tags?: string[];
  startDate?: string;
  location?: string;
};

async function getItems(resource: string): Promise<Raw[]> {
  const r = await fetch(`${BASE_URL}/api/posts?type=${resource}&limit=10`, {
    cache: 'no-store',
  });
  const j = await r.json();
  return Array.isArray(j) ? j : (j.data ?? []);
}

function normalize(raw: Raw, resource: string): AdminItem {
  return {
    id: raw.id,
    title: raw.title,
    thumbnailUrl: raw.thumbnailUrl,
    updatedAt: raw.updatedAt,
    status: raw.status ?? 'published',
    views: raw.views ?? 0,
    likes: raw.likes ?? 0,
    tags: raw.tags ?? [],
    metaText:
      resource === 'events' && raw.startDate
        ? `Diễn ra: ${new Date(raw.startDate).toLocaleDateString('vi-VN')}${raw.location ? ' · ' + raw.location : ''}`
        : undefined,
  };
}

export default async function AdminNewsPage() {
  const resource = 'news';
  const raws = await getItems(resource);
  const items: AdminItem[] = raws.map(r => normalize(r, resource));
  return (
    <ContentList
      initialItems={items}
      config={{
        apiBase: BASE_URL,
        resource,
        heading: 'Tin tức',
        createHref: ADMIN_ROUTES.HOME,
        publishable: true,
        editHref: `${ADMIN_ROUTES.NEWS}/[id]/edit`,
        showCounters: ['views', 'likes'],
      }}
    />
  );
}
