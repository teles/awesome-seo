import { IToolFilter } from '../interfaces';
import { Tool } from '../types';

export abstract class BaseFilter implements IToolFilter {
  abstract filter(tools: Tool[], criteria: unknown): Tool[];
  
  protected validateTools(tools: Tool[]): void {
    if (!Array.isArray(tools)) {
      throw new Error('Tools must be an array');
    }
  }
}

export class SearchFilter extends BaseFilter {
  filter(tools: Tool[], searchQuery: string): Tool[] {
    this.validateTools(tools);
    
    if (!searchQuery || searchQuery.trim() === '') {
      return tools;
    }
    
    const query = searchQuery.toLowerCase().trim();
    return tools.filter(tool => 
      tool.name.toLowerCase().includes(query) || 
      tool.description.toLowerCase().includes(query)
    );
  }
}

export class CategoryFilter extends BaseFilter {
  filter(tools: Tool[], selectedCategory: string): Tool[] {
    this.validateTools(tools);
    
    if (!selectedCategory || selectedCategory.trim() === '') {
      return tools;
    }
    
    return tools.filter(tool => tool.category === selectedCategory);
  }
}
