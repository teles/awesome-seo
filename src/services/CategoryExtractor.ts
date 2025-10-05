import { ICategoryExtractor } from '../interfaces';
import { Tool } from '../types';

export class CategoryExtractor implements ICategoryExtractor {
  extractCategories(tools: Tool[]): string[] {
    if (!tools || tools.length === 0) {
      return [];
    }
    
    const uniqueCategories = [...new Set(tools.map(tool => tool.category))];
    return uniqueCategories.sort();
  }
}
