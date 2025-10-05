import React from 'react';
import { useAwesomeSEO } from './hooks/useAwesomeSEO';
import { useDarkMode } from './hooks/useDarkMode';
import { Hero } from './components/Hero';
import { SearchAndFilters } from './components/SearchAndFilters';
import { ToolCard } from './components/ToolCard';
import { LoadingState, EmptyState } from './components/States';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ui/toast';

export function App() {
  const {
    loading,
    categories,
    filteredTools,
    searchQuery,
    selectedCategory,
    sortBy,
    setSearchQuery,
    setSelectedCategory,
    setSortBy,
    clearFilters,
    copyToClipboard,
    toasts,
    removeToast,
  } = useAwesomeSEO();

  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="bg-gray-50 dark:bg-gray-900 font-sans antialiased min-h-screen transition-colors duration-200">
      {/* Hero Section */}
      <Hero 
        toolsCount={filteredTools.length} 
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />

      {/* Search and Filters Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SearchAndFilters
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          sortBy={sortBy}
          categories={categories}
          onSearchChange={setSearchQuery}
          onCategoryChange={setSelectedCategory}
          onSortByChange={setSortBy}
        />

        {/* Loading State */}
        {loading && <LoadingState />}

        {/* Tools Grid */}
        {!loading && filteredTools.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTools.map((tool) => (
              <ToolCard 
                key={tool.name} 
                tool={tool} 
                onCopyUrl={copyToClipboard}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredTools.length === 0 && (
          <EmptyState onClearFilters={clearFilters} />
        )}
      </section>

      {/* Footer */}
      <Footer />

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
    </div>
  );
}
