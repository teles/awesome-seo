import { IToolSorter } from '../interfaces';
import { Tool, SortBy } from '../types';

export abstract class BaseSorter implements IToolSorter {
  abstract sort(tools: Tool[]): Tool[];
  
  protected validateTools(tools: Tool[]): void {
    if (!Array.isArray(tools)) {
      throw new Error('Tools must be an array');
    }
  }
}

export class NameSorter extends BaseSorter {
  sort(tools: Tool[]): Tool[] {
    this.validateTools(tools);
    return [...tools].sort((a, b) => a.name.localeCompare(b.name));
  }
}

export class CategorySorter extends BaseSorter {
  sort(tools: Tool[]): Tool[] {
    this.validateTools(tools);
    return [...tools].sort((a, b) => a.category.localeCompare(b.category));
  }
}

export class SorterFactory {
  static createSorter(sortBy: SortBy): IToolSorter {
    switch (sortBy) {
      case 'name':
        return new NameSorter();
      case 'category':
        return new CategorySorter();
      default:
        throw new Error(`Unknown sort type: ${sortBy}`);
    }
  }
}
