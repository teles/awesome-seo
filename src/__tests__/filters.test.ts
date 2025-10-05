import { SearchFilter, CategoryFilter } from '../filters';
import { Tool } from '../types';

describe('Filters', () => {
  const mockTools: Tool[] = [
    {
      name: 'AHrefs',
      url: 'https://ahrefs.com',
      description: 'Backlinks searcher and SEO reporter.',
      category: 'Keyword and Competitor Research'
    },
    {
      name: 'Google Search Console',
      url: 'https://search.google.com/search-console',
      description: 'Monitor your website performance in Google search.',
      category: 'Analysis and Site Auditing'
    },
    {
      name: 'SEMrush',
      url: 'https://semrush.com',
      description: 'All-in-one marketing toolkit for digital marketing professionals.',
      category: 'Keyword and Competitor Research'
    }
  ];

  describe('SearchFilter', () => {
    let searchFilter: SearchFilter;

    beforeEach(() => {
      searchFilter = new SearchFilter();
    });

    it('should return all tools when search query is empty', () => {
      const result = searchFilter.filter(mockTools, '');
      expect(result).toEqual(mockTools);
    });

    it('should return all tools when search query is whitespace', () => {
      const result = searchFilter.filter(mockTools, '   ');
      expect(result).toEqual(mockTools);
    });

    it('should filter tools by name', () => {
      const result = searchFilter.filter(mockTools, 'AHrefs');
      expect(result).toHaveLength(1);
      expect(result[0]?.name).toBe('AHrefs');
    });

    it('should filter tools by description', () => {
      const result = searchFilter.filter(mockTools, 'backlinks');
      expect(result).toHaveLength(1);
      expect(result[0]?.name).toBe('AHrefs');
    });

    it('should be case insensitive', () => {
      const result = searchFilter.filter(mockTools, 'GOOGLE');
      expect(result).toHaveLength(1);
      expect(result[0]?.name).toBe('Google Search Console');
    });

    it('should return empty array when no matches found', () => {
      const result = searchFilter.filter(mockTools, 'nonexistent');
      expect(result).toHaveLength(0);
    });

    it('should throw error for invalid tools input', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => searchFilter.filter(null as any, 'test')).toThrow('Tools must be an array');
    });
  });

  describe('CategoryFilter', () => {
    let categoryFilter: CategoryFilter;

    beforeEach(() => {
      categoryFilter = new CategoryFilter();
    });

    it('should return all tools when category is empty string', () => {
      const result = categoryFilter.filter(mockTools, '');
      expect(result).toEqual(mockTools);
    });

    it('should return all tools when category array is empty', () => {
      const result = categoryFilter.filter(mockTools, []);
      expect(result).toEqual(mockTools);
    });

    it('should filter tools by single category (string)', () => {
      const result = categoryFilter.filter(mockTools, 'Keyword and Competitor Research');
      expect(result).toHaveLength(2);
      expect(result.every(tool => tool.category === 'Keyword and Competitor Research')).toBe(true);
    });

    it('should filter tools by single category (array)', () => {
      const result = categoryFilter.filter(mockTools, ['Keyword and Competitor Research']);
      expect(result).toHaveLength(2);
      expect(result.every(tool => tool.category === 'Keyword and Competitor Research')).toBe(true);
    });

    it('should filter tools by multiple categories', () => {
      const result = categoryFilter.filter(mockTools, ['Keyword and Competitor Research', 'Analysis and Site Auditing']);
      expect(result).toHaveLength(3);
    });

    it('should return empty array when category not found', () => {
      const result = categoryFilter.filter(mockTools, 'Nonexistent Category');
      expect(result).toHaveLength(0);
    });

    it('should return empty array when none of the categories match', () => {
      const result = categoryFilter.filter(mockTools, ['Nonexistent Category', 'Another Nonexistent']);
      expect(result).toHaveLength(0);
    });

    it('should throw error for invalid tools input', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect(() => categoryFilter.filter(null as any, 'test')).toThrow('Tools must be an array');
    });
  });
});
