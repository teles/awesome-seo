import { CategoryExtractor } from '../services/CategoryExtractor';
import { Tool } from '../types';

describe('CategoryExtractor', () => {
  let categoryExtractor: CategoryExtractor;

  beforeEach(() => {
    categoryExtractor = new CategoryExtractor();
  });

  const mockTools: Tool[] = [
    {
      name: 'Tool 1',
      url: 'https://example.com',
      description: 'Description 1',
      category: 'Category B'
    },
    {
      name: 'Tool 2',
      url: 'https://example2.com',
      description: 'Description 2',
      category: 'Category A'
    },
    {
      name: 'Tool 3',
      url: 'https://example3.com',
      description: 'Description 3',
      category: 'Category B'
    },
    {
      name: 'Tool 4',
      url: 'https://example4.com',
      description: 'Description 4',
      category: 'Category C'
    }
  ];

  it('should extract unique categories sorted alphabetically', () => {
    const result = categoryExtractor.extractCategories(mockTools);
    
    expect(result).toEqual(['Category A', 'Category B', 'Category C']);
  });

  it('should return empty array for empty tools array', () => {
    const result = categoryExtractor.extractCategories([]);
    
    expect(result).toEqual([]);
  });

  it('should return empty array for null/undefined tools', () => {
    expect(categoryExtractor.extractCategories(null as any)).toEqual([]);
    expect(categoryExtractor.extractCategories(undefined as any)).toEqual([]);
  });

  it('should handle single tool', () => {
    const singleTool = [mockTools[0]!];
    const result = categoryExtractor.extractCategories(singleTool);
    
    expect(result).toEqual(['Category B']);
  });

  it('should handle tools with same category', () => {
    const sameCategory = mockTools.filter(tool => tool.category === 'Category B');
    const result = categoryExtractor.extractCategories(sameCategory);
    
    expect(result).toEqual(['Category B']);
  });
});
