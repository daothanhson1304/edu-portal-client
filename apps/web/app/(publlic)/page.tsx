import {
  Banner,
  Event,
  Feature,
  HighlightStats,
  News,
  Notification,
} from '@/components/sections';

export default function HomePage() {
  return (
    <>
      <Banner />
      <News />
      <HighlightStats />
      <Event />
      <Feature />
      <Notification />
    </>
  );
}

export const metadata = {
  title: 'Trường THCS Đồng Than',
  description: 'Trường THCS Đồng Than',
};
