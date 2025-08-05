import Header from '@/components/header/header';
import {
  Banner,
  Event,
  Feature,
  HighlightStats,
  New,
  Notification,
} from '@/components/sections';
export default function Page() {
  return (
    <main>
      <Banner />
      <New />
      <HighlightStats />
      <Event />
      <Feature />
      <Notification />
    </main>
  );
}

export const metadata = {
  title: 'Trường THCS Đồng Than',
  description: 'Trường THCS Đồng Than',
};
