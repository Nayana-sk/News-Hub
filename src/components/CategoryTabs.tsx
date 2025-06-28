
import React from 'react';
import { cn } from '@/lib/utils';

interface CategoryTabsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  className?: string;
  availableCategories?: string[];
}

const allCategories = [
  { id: 'general', name: 'General', emoji: '📰' },
  { id: 'technology', name: 'Technology', emoji: '💻' },
  { id: 'business', name: 'Business', emoji: '💼' },
  { id: 'health', name: 'Health', emoji: '🏥' },
  { id: 'science', name: 'Science', emoji: '🔬' },
  { id: 'sports', name: 'Sports', emoji: '⚽' },
  { id: 'entertainment', name: 'Entertainment', emoji: '🎬' }
];

export const CategoryTabs: React.FC<CategoryTabsProps> = ({ 
  selectedCategory, 
  onCategoryChange, 
  className,
  availableCategories
}) => {
  // Filter categories based on availableCategories prop
  const categoriesToShow = availableCategories 
    ? allCategories.filter(cat => availableCategories.includes(cat.id))
    : allCategories;

  return (
    <div className={cn("border-b border-gray-200", className)}>
      <nav className="-mb-px flex space-x-8 overflow-x-auto">
        {categoriesToShow.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors",
              selectedCategory === category.id
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
          >
            <span className="mr-2">{category.emoji}</span>
            {category.name}
          </button>
        ))}
      </nav>
    </div>
  );
};
