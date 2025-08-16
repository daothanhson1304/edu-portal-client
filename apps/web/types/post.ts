export type PostStatus = 'draft' | 'published';

export type PostType = 'news' | 'event' | 'notice' | 'other';

export type Post = {
  id: string;
  title: string;
  thumbnailUrl: string;
  content: string;
  status: PostStatus;
  tags: string[];
  type: PostType;
  views: number;
  createdAt: string;
  updatedAt: string;
};
