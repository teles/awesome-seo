import React from 'react';
import { SortBy } from '../types';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { Search } from 'lucide-react';

interface SearchAndFiltersProps {
  searchQuery: string;
  selectedCategory: string;
  sortBy: SortBy;
  categories: string[];
  onSearchChange: (query: string) => void;
  onCategoryChange: (category: string) => void;
  onSortByChange: (sortBy: SortBy) => void;
}

export function SearchAndFilters({
  searchQuery,
  selectedCategory,
  sortBy,
  categories,
  onSearchChange,
  onCategoryChange,
  onSortByChange,
}: SearchAndFiltersProps) {
  return (
    <Card className="p-8 mb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Search Input */}
        <div className="lg:col-span-2">
          <label htmlFor="searchInput" className="block text-sm font-semibold mb-3">
            Search tools
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              id="searchInput"
              type="text" 
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search by name or description..."
              className="pl-10 h-11"
            />
          </div>
        </div>
        
        {/* Category Filter */}
        <div>
          <label htmlFor="categorySelect" className="block text-sm font-semibold mb-3">
            Filter by category
          </label>
          <Select value={selectedCategory || "all"} onValueChange={(value) => onCategoryChange(value === "all" ? "" : value)}>
            <SelectTrigger id="categorySelect" className="h-11">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Sort Options */}
      <div className="mt-8 flex flex-wrap gap-3 items-center">
        <span className="text-sm font-semibold">Sort by:</span>
        <Button 
          onClick={() => onSortByChange('name')}
          variant={sortBy === 'name' ? 'default' : 'outline'}
          size="sm"
        >
          Name
        </Button>
        <Button 
          onClick={() => onSortByChange('category')}
          variant={sortBy === 'category' ? 'default' : 'outline'}
          size="sm"
        >
          Category
        </Button>
      </div>
    </Card>
  );
}
