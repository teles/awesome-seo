import { NameSorter, CategorySorter, SorterFactory } from '../sorters';
import { Tool } from '../types';

describe('Sorters', () => {
  const mockTools: Tool[] = [
    {
      name: 'Zebra Tool',
      url: 'https://zebra.com',
      description: 'Zebra description.',
      category: 'Category B'
    },
    {
      name: 'Alpha Tool',
      url: 'https://alpha.com',
      description: 'Alpha description.',
      category: 'Category A'
    },
    {
      name: 'Beta Tool',
      url: 'https://beta.com',
      description: 'Beta description.',
      category: 'Category C'
    }
  ];

  describe('NameSorter', () => {
    let nameSorter: NameSorter;

    beforeEach(() => {
      nameSorter = new NameSorter();
    });

    it('should sort tools by name alphabetically', () => {
      const result = nameSorter.sort(mockTools);
      
      expect(result).toHaveLength(3);
      expect(result[0]?.name).toBe('Alpha Tool');
      expect(result[1]?.name).toBe('Beta Tool');
      expect(result[2]?.name).toBe('Zebra Tool');
    });

    it('should not mutate original array', () => {
      const originalOrder = [...mockTools];
      nameSorter.sort(mockTools);
      
      expect(mockTools).toEqual(originalOrder);
    });

    it('should throw error for invalid tools input', () => {
      expect(() => nameSorter.sort(null as any)).toThrow('Tools must be an array');
    });
  });

  describe('CategorySorter', () => {
    let categorySorter: CategorySorter;

    beforeEach(() => {
      categorySorter = new CategorySorter();
    });

    it('should sort tools by category alphabetically', () => {
      const result = categorySorter.sort(mockTools);
      
      expect(result).toHaveLength(3);
      expect(result[0]?.category).toBe('Category A');
      expect(result[1]?.category).toBe('Category B');
      expect(result[2]?.category).toBe('Category C');
    });

    it('should not mutate original array', () => {
      const originalOrder = [...mockTools];
      categorySorter.sort(mockTools);
      
      expect(mockTools).toEqual(originalOrder);
    });

    it('should throw error for invalid tools input', () => {
      expect(() => categorySorter.sort(null as any)).toThrow('Tools must be an array');
    });
  });

  describe('SorterFactory', () => {
    it('should create NameSorter for "name" sort type', () => {
      const sorter = SorterFactory.createSorter('name');
      expect(sorter).toBeInstanceOf(NameSorter);
    });

    it('should create CategorySorter for "category" sort type', () => {
      const sorter = SorterFactory.createSorter('category');
      expect(sorter).toBeInstanceOf(CategorySorter);
    });

    it('should throw error for unknown sort type', () => {
      expect(() => SorterFactory.createSorter('unknown' as any)).toThrow('Unknown sort type: unknown');
    });
  });
});
