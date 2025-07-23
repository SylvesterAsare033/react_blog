export interface Article {
  id?: string;
  _id?: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  imageUrl: string;
  category: string;
  tags: string[];
  status: 'published' | 'draft';
  readTime: number;
  featured: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}