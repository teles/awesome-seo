import React from 'react';
import { Button } from './ui/button';
import { Loader2, Search } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message = 'Loading awesome SEO tools...' }: LoadingStateProps) {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
      </div>
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}

interface EmptyStateProps {
  onClearFilters: () => void;
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
        <Search className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No tools found</h3>
      <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria.</p>
      <Button onClick={onClearFilters}>
        Clear filters
      </Button>
    </div>
  );
}
