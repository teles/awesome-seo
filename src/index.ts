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
  
  return {
    tools: [] as Tool[],
    searchQuery: '',
    selectedCategory: '',
    sortBy: 'name' as SortBy,
    loading: true,
    categories: [] as string[],
    filteredTools: [] as Tool[],

    async loadData() {
      try {
        this.loading = true;
        
        await app.loadData();
        
        // Sync data
        const state = app.getState();
        this.tools = state.tools;
        this.searchQuery = state.searchQuery;
        this.selectedCategory = state.selectedCategory;
        this.sortBy = state.sortBy;
        this.loading = state.loading;
        
        // Update filtered data
        this.categories = app.getCategories();
        this.filteredTools = app.getFilteredTools();
      } catch (error) {
        console.error('Error loading data:', error);
        this.loading = false;
      }
    },

    setSearchQuery(query: string) {
      app.setSearchQuery(query);
      this.searchQuery = query;
      this.updateFilteredData();
    },

    setSelectedCategory(category: string) {
      app.setSelectedCategory(category);
      this.selectedCategory = category;
      this.updateFilteredData();
    },

    setSortBy(sortBy: 'name' | 'category') {
      app.setSortBy(sortBy);
      this.sortBy = sortBy;
      this.updateFilteredData();
    },

    clearFilters() {
      app.clearFilters();
      this.syncWithApp();
      this.updateFilteredData();
    },

    async copyToClipboard(text: string) {
      try {
        await app.copyToClipboard(text);
      } catch (error) {
        console.error('Failed to copy text:', error);
      }
    },

    updateFilteredData() {
      this.categories = app.getCategories();
      this.filteredTools = app.getFilteredTools();
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
