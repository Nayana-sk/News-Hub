
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { NewsFilters } from '@/types/news';

interface FilterPanelProps {
  filters: NewsFilters;
  onFiltersChange: (filters: NewsFilters) => void;
}

const availableSources = [
  { id: 'newsapi', name: 'NewsAPI.org' },
  { id: 'guardian', name: 'The Guardian' },
  { id: 'nyt', name: 'New York Times' }
];

export const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onFiltersChange }) => {
  const handleSourceToggle = (sourceId: string, checked: boolean) => {
    const newSources = checked
      ? [...filters.sources, sourceId]
      : filters.sources.filter(id => id !== sourceId);
    
    onFiltersChange({ ...filters, sources: newSources });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-3 block">
            Date Range
          </label>
          <Select
            value={filters.dateRange}
            onValueChange={(value: 'day' | 'week' | 'month') =>
              onFiltersChange({ ...filters, dateRange: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Past 24 hours</SelectItem>
              <SelectItem value="week">Past week</SelectItem>
              <SelectItem value="month">Past month</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-3 block">
            Sort by
          </label>
          <Select
            value={filters.sortBy}
            onValueChange={(value: 'publishedAt' | 'popularity' | 'relevancy') =>
              onFiltersChange({ ...filters, sortBy: value })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="publishedAt">Latest</SelectItem>
              <SelectItem value="popularity">Most Popular</SelectItem>
              <SelectItem value="relevancy">Most Relevant</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-3 block">
            News Sources
          </label>
          <div className="space-y-3">
            {availableSources.map((source) => (
              <div key={source.id} className="flex items-center space-x-2">
                <Checkbox
                  id={source.id}
                  checked={filters.sources.includes(source.id)}
                  onCheckedChange={(checked) =>
                    handleSourceToggle(source.id, checked as boolean)
                  }
                />
                <label
                  htmlFor={source.id}
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  {source.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
