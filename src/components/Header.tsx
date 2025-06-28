
import React from 'react';
import { Button } from '@/components/ui/button';
import { Settings, Newspaper, X } from 'lucide-react';

interface HeaderProps {
  onPersonalizationClick: () => void;
  personalizedSources: string[];
  personalizedCategories: string[];
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  showCustomizeButton: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  onPersonalizationClick,
  personalizedSources, 
  personalizedCategories,
  hasActiveFilters,
  onClearFilters,
  showCustomizeButton
}) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
              <Newspaper className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">NewsHub</h1>
              <p className="text-xs text-gray-500">Your Personalized News</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">

            
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="h-8 px-3 text-sm"
                title="Clear all filters"
              >
                <X className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>
            )}
            
            {showCustomizeButton && (
              <Button
                variant="outline"
                size="sm"
                onClick={onPersonalizationClick}
                className="flex items-center space-x-2 relative"
              >
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Customize Feed</span>
                {hasActiveFilters && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
