import { Tool } from '../types';

export interface IDataLoader {
  loadData(): Promise<Tool[]>;
}

export interface IToolFilter {
  filter(tools: Tool[], criteria: unknown): Tool[];
}

export interface IToolSorter {
  sort(tools: Tool[]): Tool[];
}

export interface ICategoryExtractor {
  extractCategories(tools: Tool[]): string[];
}

export interface IClipboardService {
  copyToClipboard(text: string): Promise<void>;
}
