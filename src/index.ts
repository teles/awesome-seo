import { AwesomeSEOApp } from './AwesomeSEOApp';
import { DataLoader } from './services/DataLoader';
import { ClipboardService } from './services/ClipboardService';
import { CategoryExtractor } from './services/CategoryExtractor';

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
  
  return {
    tools: [],
    searchQuery: '',
    selectedCategory: '',
    sortBy: 'name',
    loading: true,

    async loadData() {
      try {
        await app.loadData();
        this.syncWithApp();
      } catch (error) {
        console.error('Error loading data:', error);
        this.loading = false;
      }
    },

    get categories() {
      return app.getCategories();
    },

    get filteredTools() {
      return app.getFilteredTools();
    },

    setSearchQuery(query: string) {
      app.setSearchQuery(query);
      this.searchQuery = query;
    },

    setSelectedCategory(category: string) {
      app.setSelectedCategory(category);
      this.selectedCategory = category;
    },

    setSortBy(sortBy: 'name' | 'category') {
      app.setSortBy(sortBy);
      this.sortBy = sortBy;
    },

    clearFilters() {
      app.clearFilters();
      this.syncWithApp();
    },

    async copyToClipboard(text: string) {
      try {
        await app.copyToClipboard(text);
      } catch (error) {
        console.error('Failed to copy text:', error);
      }
    },

    syncWithApp() {
      const state = app.getState();
      this.tools = state.tools;
      this.searchQuery = state.searchQuery;
      this.selectedCategory = state.selectedCategory;
      this.sortBy = state.sortBy;
      this.loading = state.loading;
    }
  };
};
