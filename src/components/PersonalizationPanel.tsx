
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PersonalizationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSources: string[];
  selectedCategories: string[];
  selectedDateRange: 'day' | 'week' | 'month';
  onSourcesChange: (sources: string[]) => void;
  onCategoriesChange: (categories: string[]) => void;
  onDateRangeChange: (dateRange: 'day' | 'week' | 'month') => void;
}

const availableSources = [
  { id: 'newsapi', name: 'NewsAPI.org', description: 'Breaking news and headlines from thousands of sources' },
  { id: 'guardian', name: 'The Guardian', description: 'International news and world events' },
  { id: 'nyt', name: 'New York Times', description: 'In-depth journalism and breaking news' }
];

const availableCategories = [
  { id: 'general', name: 'General News' },
  { id: 'technology', name: 'Technology' },
  { id: 'business', name: 'Business' },
  { id: 'health', name: 'Health' },
  { id: 'science', name: 'Science' },
  { id: 'sports', name: 'Sports' },
  { id: 'entertainment', name: 'Entertainment' }
];

export const PersonalizationPanel: React.FC<PersonalizationPanelProps> = ({
  isOpen,
  onClose,
  selectedSources,
  selectedCategories,
  selectedDateRange,
  onSourcesChange,
  onCategoriesChange,
  onDateRangeChange
}) => {
  const [tempSources, setTempSources] = useState<string[]>([]);
  const [tempCategories, setTempCategories] = useState<string[]>([]);
  const [tempDateRange, setTempDateRange] = useState<'day' | 'week' | 'month'>('week');
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize temp state when modal opens
  useEffect(() => {
    if (isOpen) {
      setTempSources([...selectedSources]);
      setTempCategories([...selectedCategories]);
      setTempDateRange(selectedDateRange);
      setHasChanges(false);
    }
  }, [isOpen, selectedSources, selectedCategories, selectedDateRange]);

  // Check for changes whenever temp values change
  useEffect(() => {
    const sourcesChanged = JSON.stringify(tempSources.sort()) !== JSON.stringify(selectedSources.sort());
    const categoriesChanged = JSON.stringify(tempCategories.sort()) !== JSON.stringify(selectedCategories.sort());
    const dateRangeChanged = tempDateRange !== selectedDateRange;
    setHasChanges(sourcesChanged || categoriesChanged || dateRangeChanged);
  }, [tempSources, tempCategories, tempDateRange, selectedSources, selectedCategories, selectedDateRange]);

  const handleSourceToggle = (sourceId: string, checked: boolean) => {
    if (checked) {
      setTempSources([...tempSources, sourceId]);
    } else {
      setTempSources(tempSources.filter(id => id !== sourceId));
    }
  };

  const handleCategoryToggle = (categoryId: string, checked: boolean) => {
    if (checked) {
      setTempCategories([...tempCategories, categoryId]);
    } else {
      setTempCategories(tempCategories.filter(id => id !== categoryId));
    }
  };

  const handleSave = () => {
    if (hasChanges) {
      onSourcesChange(tempSources);
      onCategoriesChange(tempCategories);
      onDateRangeChange(tempDateRange);
    }
    onClose();
  };

  const handleCancel = () => {
    setTempSources([...selectedSources]);
    setTempCategories([...selectedCategories]);
    setTempDateRange(selectedDateRange);
    setHasChanges(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Personalize Your News Feed</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 overflow-auto custom-scrollbar"
          style={{ height: 'calc(100vh - 408px)' }}>
          <Card>
            <CardHeader>
              <CardTitle>Preferred News Sources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {availableSources.map((source) => (
                <div key={source.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <Checkbox
                    id={source.id}
                    checked={tempSources.includes(source.id)}
                    onCheckedChange={(checked) =>
                      handleSourceToggle(source.id, checked as boolean)
                    }
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor={source.id}
                      className="font-medium text-gray-900 cursor-pointer block"
                    >
                      {source.name}
                    </label>
                    <p className="text-sm text-gray-600 mt-1">{source.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preferred Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {availableCategories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                    <Checkbox
                      id={category.id}
                      checked={tempCategories.includes(category.id)}
                      onCheckedChange={(checked) =>
                        handleCategoryToggle(category.id, checked as boolean)
                      }
                    />
                    <label
                      htmlFor={category.id}
                      className="font-medium text-gray-900 cursor-pointer"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Date Range</CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={tempDateRange}
                  onValueChange={(value: 'day' | 'week' | 'month') => setTempDateRange(value)}
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
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6 pt-6 border-t">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!hasChanges}
            className={!hasChanges ? "opacity-50 cursor-not-allowed" : ""}
          >
            Save Preferences
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
