
export interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  };
  author?: string;
  content?: string;
}

export interface NewsFilters {
  sources: string[];
  dateRange: 'day' | 'week' | 'month';
  sortBy: 'publishedAt' | 'popularity' | 'relevancy';
}

export interface NewsSource {
  id: string;
  name: string;
  description: string;
  category: string;
  country: string;
}
