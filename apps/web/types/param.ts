export type Params = { slug: string };

export type SearchParams = {
  page?: string;
  limit?: string;
  search?: string;
  sortBy?: 'createdAt' | 'updatedAt' | 'title' | 'views';
  sortOrder?: 'asc' | 'desc';
  type?: string;
};
