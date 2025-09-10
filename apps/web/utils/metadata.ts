import { DEFAULT_PAGE_TITLE } from '@/constants';

export function generateMetadata(title: string, description?: string) {
  return {
    title: `${title} | ${DEFAULT_PAGE_TITLE}`,
    description: description || title,
  };
}
