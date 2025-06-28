import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { FilterPanel } from '@/components/FilterPanel';
import { ArticleGrid } from '@/components/ArticleGrid';
import { CategoryTabs } from '@/components/CategoryTabs';
import { PersonalizationPanel } from '@/components/PersonalizationPanel';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNewsAPI } from '@/hooks/useNewsAPI';
import { Article, NewsFilters } from '@/types/news';

const Index = () => {
  const [allNewsSearchQuery, setAllNewsSearchQuery] = useState('');
  const [personalizedSearchQuery, setPersonalizedSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [activeTab, setActiveTab] = useState('all');
  const [filters, setFilters] = useState<NewsFilters>({
    sources: [],
    dateRange: 'week',
    sortBy: 'publishedAt'
  });
  const [showPersonalization, setShowPersonalization] = useState(false);
  const [personalizedSources, setPersonalizedSources] = useState<string[]>([]);
  const [personalizedCategories, setPersonalizedCategories] = useState<string[]>(['general']);
  const [personalizedDateRange, setPersonalizedDateRange] = useState<'day' | 'week' | 'month'>('week');

  const { articles, loading, error, searchArticles, getTopHeadlines } = useNewsAPI();

  // Load persisted personalized filters on component mount
  useEffect(() => {
    const savedSources = localStorage.getItem('personalizedSources');
    const savedCategories = localStorage.getItem('personalizedCategories');
    const savedDateRange = localStorage.getItem('personalizedDateRange');
    
    if (savedSources) {
      const sources = JSON.parse(savedSources);
      setPersonalizedSources(sources);
    }
    
    if (savedCategories) {
      const categories = JSON.parse(savedCategories);
      setPersonalizedCategories(categories);
    }

    if (savedDateRange) {
      setPersonalizedDateRange(JSON.parse(savedDateRange));
    }
  }, []);

  // Load initial content based on active tab
  useEffect(() => {
    if (activeTab === 'all') {
      // Load general news for "All News" tab
      getTopHeadlines(selectedCategory);
    } else {
      // Load personalized news for "Personalized News" tab
      const primaryCategory = personalizedCategories[0] || 'general';
      getTopHeadlines(
        primaryCategory,
        personalizedSources.join(',') || undefined
      );
    }
  }, [activeTab, selectedCategory, personalizedSources, personalizedCategories]);

  const handleSearch = (query: string) => {
    if (activeTab === 'all') {
      setAllNewsSearchQuery(query);
      if (query.trim()) {
        searchArticles(query, filters);
      } else {
        getTopHeadlines(selectedCategory);
      }
    } else {
      setPersonalizedSearchQuery(query);
      if (query.trim()) {
        const personalizedFilters = {
          sources: personalizedSources,
          dateRange: personalizedDateRange,
          sortBy: 'publishedAt' as const
        };
        searchArticles(query, personalizedFilters);
      } else {
        const primaryCategory = personalizedCategories[0] || 'general';
        getTopHeadlines(primaryCategory, personalizedSources.join(',') || undefined);
      }
    }
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    
    // Clear search for current tab
    if (activeTab === 'all') {
      setAllNewsSearchQuery('');
      getTopHeadlines(category);
    } else {
      setPersonalizedSearchQuery('');
      getTopHeadlines(category, personalizedSources.join(',') || undefined);
    }
  };

  const handleFilterChange = (newFilters: NewsFilters) => {
    setFilters(newFilters);
    if (allNewsSearchQuery.trim()) {
      searchArticles(allNewsSearchQuery, newFilters);
    } else if (activeTab === 'all') {
      getTopHeadlines(selectedCategory, newFilters.sources.join(',') || undefined);
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    
    if (tab === 'personalized') {
      // Switch to personalized category when switching to personalized tab
      const primaryCategory = personalizedCategories[0] || 'general';
      setSelectedCategory(primaryCategory);
    } else {
      // Reset to general when switching to all news
      setSelectedCategory('general');
    }
  };

  const handlePersonalizedSourcesChange = (sources: string[]) => {
    setPersonalizedSources(sources);
    localStorage.setItem('personalizedSources', JSON.stringify(sources));
    
    // If we're on personalized tab, reload content
    if (activeTab === 'personalized') {
      const primaryCategory = personalizedCategories[0] || 'general';
      getTopHeadlines(primaryCategory, sources.join(',') || undefined);
    }
  };

  const handlePersonalizedCategoriesChange = (categories: string[]) => {
    setPersonalizedCategories(categories);
    localStorage.setItem('personalizedCategories', JSON.stringify(categories));
    
    // If we're on personalized tab, update the selected category and reload
    if (activeTab === 'personalized' && categories.length > 0) {
      const primaryCategory = categories[0];
      setSelectedCategory(primaryCategory);
      getTopHeadlines(primaryCategory, personalizedSources.join(',') || undefined);
    }
  };

  const handlePersonalizedDateRangeChange = (dateRange: 'day' | 'week' | 'month') => {
    setPersonalizedDateRange(dateRange);
    localStorage.setItem('personalizedDateRange', JSON.stringify(dateRange));
    
    // If we're on personalized tab, reload content with new date range
    if (activeTab === 'personalized') {
      const primaryCategory = personalizedCategories[0] || 'general';
      getTopHeadlines(primaryCategory, personalizedSources.join(',') || undefined);
    }
  };

  const handleClearFilters = () => {
    if (activeTab === 'all') {
      // Clear only filter panel filters for All News tab
      setFilters({
        sources: [],
        dateRange: 'week',
        sortBy: 'publishedAt'
      });
      setAllNewsSearchQuery('');
      getTopHeadlines(selectedCategory);
    } else {
      // Clear personalized filters for Personalized News tab
      setPersonalizedSources([]);
      setPersonalizedCategories(['general']);
      setSelectedCategory('general');
      setPersonalizedSearchQuery('');
      localStorage.removeItem('personalizedSources');
      localStorage.removeItem('personalizedCategories');
      getTopHeadlines('general');
    }
  };

  const hasActiveFilters = activeTab === 'all' 
    ? filters.sources.length > 0
    : personalizedSources.length > 0 || 
      (personalizedCategories.length > 0 && !personalizedCategories.includes('general'));

  const getCurrentCategory = () => {
    if (activeTab === 'personalized') {
      return personalizedCategories[0] || 'general';
    }
    return selectedCategory;
  };

  const getCurrentSearchQuery = () => {
    return activeTab === 'all' ? allNewsSearchQuery : personalizedSearchQuery;
  };

  const getAvailableCategories = () => {
    if (activeTab === 'personalized' && personalizedCategories.length > 0) {
      return personalizedCategories;
    }
    return undefined; // Show all categories for "All News" tab
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onPersonalizationClick={() => setShowPersonalization(true)}
        personalizedSources={personalizedSources}
        personalizedCategories={personalizedCategories}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={handleClearFilters}
        showCustomizeButton={activeTab === 'personalized'}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Stay Informed with Latest News
          </h1>
          <p className="text-xl text-gray-600">
            Discover stories from trusted sources worldwide
          </p>
        </div>

        <div className="mb-6">
          <SearchBar 
            value={getCurrentSearchQuery()} 
            onChange={handleSearch}
            placeholder="Search for news articles..."
          />
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="mb-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="all">All News</TabsTrigger>
            <TabsTrigger value="personalized">Personalized News</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col lg:flex-row gap-6">
          {activeTab === 'all' && (
            <aside className="lg:w-80">
              <FilterPanel 
                filters={filters}
                onFiltersChange={handleFilterChange}
              />
            </aside>
          )}

          <div className="flex-1">
            <CategoryTabs 
              selectedCategory={getCurrentCategory()}
              onCategoryChange={handleCategoryChange}
              availableCategories={getAvailableCategories()}
              className="mb-6"
            />

            {loading ? (
              <LoadingSpinner />
            ) : error ? (
              <div className="text-center py-12">
                <div className="text-red-600 text-lg font-medium mb-2">
                  Unable to load articles
                </div>
                <p className="text-gray-600">
                  {error}
                </p>
              </div>
            ) : (
              <ArticleGrid articles={articles} />
            )}
          </div>
        </div>
      </main>

      {showPersonalization && (
        <PersonalizationPanel
          isOpen={showPersonalization}
          onClose={() => setShowPersonalization(false)}
          selectedSources={personalizedSources}
          selectedCategories={personalizedCategories}
          selectedDateRange={personalizedDateRange}
          onSourcesChange={handlePersonalizedSourcesChange}
          onCategoriesChange={handlePersonalizedCategoriesChange}
          onDateRangeChange={handlePersonalizedDateRangeChange}
        />
      )}
    </div>
  );
};

export default Index;
