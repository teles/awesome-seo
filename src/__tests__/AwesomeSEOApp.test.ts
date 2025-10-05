import { AwesomeSEOApp } from '../AwesomeSEOApp';
import { IDataLoader, IClipboardService, ICategoryExtractor } from '../interfaces';
import { Tool } from '../types';

describe('AwesomeSEOApp', () => {
  let app: AwesomeSEOApp;
  let mockDataLoader: jest.Mocked<IDataLoader>;
  let mockClipboardService: jest.Mocked<IClipboardService>;
  let mockCategoryExtractor: jest.Mocked<ICategoryExtractor>;

  const mockTools: Tool[] = [
    {
      name: 'Tool A',
      url: 'https://example.com',
      description: 'Description for tool A',
      category: 'Category 1'
    },
    {
      name: 'Tool B',
      url: 'https://example2.com',
      description: 'Description for tool B',
      category: 'Category 2'
    }
  ];

  beforeEach(() => {
    mockDataLoader = {
      loadData: jest.fn(),
    };

    mockClipboardService = {
      copyToClipboard: jest.fn(),
    };

    mockCategoryExtractor = {
      extractCategories: jest.fn(),
    };

    app = new AwesomeSEOApp(mockDataLoader, mockClipboardService, mockCategoryExtractor);
  });

  describe('loadData', () => {
    it('should load data successfully', async () => {
      mockDataLoader.loadData.mockResolvedValue(mockTools);

      await app.loadData();

      const state = app.getState();
      expect(state.tools).toEqual(mockTools);
      expect(state.loading).toBe(false);
    });

    it('should handle data loading errors', async () => {
      mockDataLoader.loadData.mockRejectedValue(new Error('Load error'));

      await expect(app.loadData()).rejects.toThrow('Load error');

      const state = app.getState();
      expect(state.tools).toEqual([]);
      expect(state.loading).toBe(false);
    });
  });

  describe('filtering and sorting', () => {
    beforeEach(async () => {
      mockDataLoader.loadData.mockResolvedValue(mockTools);
      await app.loadData();
    });

    it('should filter by search query', () => {
      app.setSearchQuery('Tool A');
      const filtered = app.getFilteredTools();
      
      expect(filtered).toHaveLength(1);
      expect(filtered[0]?.name).toBe('Tool A');
    });

    it('should filter by category', () => {
      app.setSelectedCategory(['Category 1']);
      const filtered = app.getFilteredTools();
      
      expect(filtered).toHaveLength(1);
      expect(filtered[0]?.category).toBe('Category 1');
    });

    it('should sort tools by name', () => {
      app.setSortBy('name');
      const filtered = app.getFilteredTools();
      
      expect(filtered[0]?.name).toBe('Tool A');
      expect(filtered[1]?.name).toBe('Tool B');
    });

    it('should clear filters', () => {
      app.setSearchQuery('test');
      app.setSelectedCategory(['Category 1']);
      
      app.clearFilters();
      
      const state = app.getState();
      expect(state.searchQuery).toBe('');
      expect(state.selectedCategory).toEqual([]);
    });
  });

  describe('categories', () => {
    it('should get categories from extractor', () => {
      const expectedCategories = ['Category 1', 'Category 2'];
      mockCategoryExtractor.extractCategories.mockReturnValue(expectedCategories);

      const categories = app.getCategories();

      expect(categories).toEqual(expectedCategories);
      expect(mockCategoryExtractor.extractCategories).toHaveBeenCalledWith(app.getState().tools);
    });
  });

  describe('clipboard operations', () => {
    it('should copy text to clipboard', async () => {
      mockClipboardService.copyToClipboard.mockResolvedValue();

      await app.copyToClipboard('test text');

      expect(mockClipboardService.copyToClipboard).toHaveBeenCalledWith('test text');
    });

    it('should propagate clipboard errors', async () => {
      mockClipboardService.copyToClipboard.mockRejectedValue(new Error('Clipboard error'));

      await expect(app.copyToClipboard('test text')).rejects.toThrow('Clipboard error');
    });
  });

  describe('state management', () => {
    it('should return immutable state copy', () => {
      const state1 = app.getState();
      const state2 = app.getState();

      expect(state1).not.toBe(state2); // Different object references
      expect(state1).toEqual(state2); // Same content
    });

    it('should update search query', () => {
      app.setSearchQuery('new query');
      
      expect(app.getState().searchQuery).toBe('new query');
    });

    it('should update selected category', () => {
      app.setSelectedCategory(['new category']);
      
      expect(app.getState().selectedCategory).toEqual(['new category']);
    });

    it('should update sort by', () => {
      app.setSortBy('category');
      
      expect(app.getState().sortBy).toBe('category');
    });
  });
});
