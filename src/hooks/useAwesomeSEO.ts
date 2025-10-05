import { useState, useEffect, useCallback, useMemo } from 'react';
import { DataLoader } from '../services/DataLoader';
import { ClipboardService } from '../services/ClipboardService';
import { CategoryExtractor } from '../services/CategoryExtractor';
import { SearchFilter, CategoryFilter } from '../filters';
import { SorterFactory } from '../sorters';
import { Tool, SortBy } from '../types';
import { useToast } from './useToast';

export function useAwesomeSEO(apiUrl?: string) {
  const [dataLoader] = useState(() => new DataLoader(apiUrl));
  const [clipboardService] = useState(() => new ClipboardService());
  const [categoryExtractor] = useState(() => new CategoryExtractor());
  const [searchFilter] = useState(() => new SearchFilter());
  const [categoryFilter] = useState(() => new CategoryFilter());
  const { toasts, showToast, removeToast } = useToast();

  const [tools, setTools] = useState<Tool[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortBy>('name');
  const [loading, setLoading] = useState(true);

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const loadedTools = await dataLoader.loadData();
        setTools(loadedTools);
        setLoading(false);
      } catch (error) {
        console.error('Error loading data:', error);
        setLoading(false);
      }
    };

    loadData();
  }, [dataLoader]);

  // Clear filters
  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory([]);
  }, []);

  // Copy to clipboard
  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await clipboardService.copyToClipboard(text);
      showToast('URL copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy text:', error);
      showToast('Failed to copy URL');
    }
  }, [clipboardService, showToast]);

  // Get categories (memoized) - recalculates when tools change
  const categories = useMemo(() => {
    return categoryExtractor.extractCategories(tools);
  }, [categoryExtractor, tools]);

  // Get filtered tools (memoized) - recalculates when filters change
  const filteredTools = useMemo(() => {
    if (!tools || tools.length === 0) {
      return [];
    }

    let filtered = [...tools];

    // Apply search filter
    filtered = searchFilter.filter(filtered, searchQuery);

    // Apply category filter
    filtered = categoryFilter.filter(filtered, selectedCategory);

    // Apply sorting
    const sorter = SorterFactory.createSorter(sortBy);
    filtered = sorter.sort(filtered);

    return filtered;
  }, [tools, searchQuery, selectedCategory, sortBy, searchFilter, categoryFilter]);

  return {
    tools,
    searchQuery,
    selectedCategory,
    sortBy,
    loading,
    categories,
    filteredTools,
    setSearchQuery,
    setSelectedCategory,
    setSortBy,
    clearFilters,
    copyToClipboard,
    toasts,
    removeToast,
  };
}
