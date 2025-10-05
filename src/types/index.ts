export interface Tool {
  name: string;
  url: string;
  description: string;
  category: string;
}

export interface AwesomeData {
  title: string;
  description: string;
  lastUpdated: string;
  totalTools: number;
  categories: string[];
  tools: Tool[];
}

export type SortBy = 'name' | 'category';

export interface AppState {
  tools: Tool[];
  searchQuery: string;
  selectedCategory: string[];
  sortBy: SortBy;
  loading: boolean;
}
