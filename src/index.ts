import { AwesomeSEOApp } from './AwesomeSEOApp';
import { DataLoader } from './services/DataLoader';
import { ClipboardService } from './services/ClipboardService';
import { CategoryExtractor } from './services/CategoryExtractor';
import { Tool, SortBy } from './types';

// Export types for external use
export * from './types';
export * from './interfaces';
export { AwesomeSEOApp };

// Factory function to create app instance
export function createAwesomeSEOApp(apiUrl?: string): AwesomeSEOApp {
  const dataLoader = new DataLoader(apiUrl);
  const clipboardService = new ClipboardService();
  const categoryExtractor = new CategoryExtractor();
  
  return new AwesomeSEOApp(dataLoader, clipboardService, categoryExtractor);
}

// Global function for Alpine.js compatibility
declare global {
  interface Window {
    awesomeSEO: () => any;
    AwesomeSEO: {
      createApp: typeof createAwesomeSEOApp;
    };
  }
}

// Create global Alpine.js compatible function
window.AwesomeSEO = {
  createApp: createAwesomeSEOApp
};

window.awesomeSEO = function() {
  const app = createAwesomeSEOApp();
  
  const data = {
    tools: [] as Tool[],
    searchQuery: '',
    selectedCategory: '',
    sortBy: 'name' as SortBy,
    loading: true,
    categories: [] as string[],
    filteredTools: [] as Tool[],

    async loadData() {
      try {
        await app.loadData();
        data.syncWithApp();
        data.updateFilteredData();
      } catch (error) {
        console.error('Error loading data:', error);
        data.loading = false;
      }
    },

    setSearchQuery(query: string) {
      app.setSearchQuery(query);
      data.searchQuery = query;
      data.updateFilteredData();
    },

    setSelectedCategory(category: string) {
      app.setSelectedCategory(category);
      data.selectedCategory = category;
      data.updateFilteredData();
    },

    setSortBy(sortBy: 'name' | 'category') {
      app.setSortBy(sortBy);
      data.sortBy = sortBy;
      data.updateFilteredData();
    },

    clearFilters() {
      app.clearFilters();
      data.syncWithApp();
      data.updateFilteredData();
    },

    async copyToClipboard(text: string) {
      try {
        await app.copyToClipboard(text);
      } catch (error) {
        console.error('Failed to copy text:', error);
      }
    },

    updateFilteredData() {
      data.categories = app.getCategories();
      data.filteredTools = app.getFilteredTools();
    },

    syncWithApp() {
      const state = app.getState();
      data.tools = state.tools;
      data.searchQuery = state.searchQuery;
      data.selectedCategory = state.selectedCategory;
      data.sortBy = state.sortBy;
      data.loading = state.loading;
    }
  };
  
  return data;
};
