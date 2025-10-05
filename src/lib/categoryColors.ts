export type CategoryColorVariant = 
  | 'blue' 
  | 'purple' 
  | 'green' 
  | 'orange' 
  | 'pink' 
  | 'indigo';

const categoryColorMap: Record<string, CategoryColorVariant> = {
  'Analysis and Site Auditing': 'blue',
  'Content and Social Media': 'purple',
  'Documentation and Guidelines': 'green',
  'Keyword and Competitor Research': 'orange',
  'Performance and Speed': 'pink',
  'Rich Snippets and Structured Data': 'indigo',
};

export function getCategoryColor(category: string): CategoryColorVariant {
  return categoryColorMap[category] || 'blue';
}

export const categoryColorStyles: Record<CategoryColorVariant, string> = {
  blue: 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800',
  purple: 'bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800',
  green: 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800',
  orange: 'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800',
  pink: 'bg-pink-100 text-pink-800 border-pink-200 hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-300 dark:border-pink-800',
  indigo: 'bg-indigo-100 text-indigo-800 border-indigo-200 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800',
};
