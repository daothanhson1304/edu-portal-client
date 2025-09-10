import {
  Banner,
  Event,
  Feature,
  HighlightStats,
  News,
  Notification,
} from '@/components/sections';
import { generateMetadata } from '@/utils';

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

export const metadata = generateMetadata('Trang chủ');
