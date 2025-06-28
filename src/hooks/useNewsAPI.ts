/* The above code is a TypeScript module that defines functions for fetching news articles from
different news APIs (NewsAPI, The Guardian, New York Times) based on a search query. It also
provides a custom hook `useNewsAPI` that manages state for articles, loading status, and errors, and
exposes functions for searching articles and getting top headlines based on category and news
sources. */

import { useState, useCallback } from 'react';
import { Article, NewsFilters } from '@/types/news';

// Hardcoded API keys - replace with your actual keys
const API_KEYS = {
  newsapi: import.meta.env.VITE_NEWSAPI_KEY,
  guardian: import.meta.env.VITE_GUARDIAN_KEY,
  nyt: import.meta.env.VITE_NYT_KEY
};

const fetchFromNewsAPI = async (query: string): Promise<Article[]> => {
  try {
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&apiKey=${API_KEYS.newsapi}&pageSize=20&sortBy=publishedAt`
    );
    
    if (!response.ok) throw new Error('NewsAPI request failed');
    
    const data = await response.json();
    return data.articles?.map((article: any) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt,
      source: { id: 'newsapi', name: 'NewsAPI.org' },
      author: article.author,
      content: article.content
    })) || [];
  } catch (error) {
    console.error('NewsAPI fetch error:', error);
    return [];
  }
};

const fetchFromGuardian = async (query: string): Promise<Article[]> => {
  try {
    const response = await fetch(
      `https://content.guardianapis.com/search?q=${encodeURIComponent(query)}&api-key=${API_KEYS.guardian}&show-fields=headline,trailText,thumbnail,byline&page-size=20`
    );
    
    if (!response.ok) throw new Error('Guardian API request failed');
    
    const data = await response.json();
    return data.response?.results?.map((article: any) => ({
      title: article.fields?.headline || article.webTitle,
      description: article.fields?.trailText || '',
      url: article.webUrl,
      urlToImage: article.fields?.thumbnail || '',
      publishedAt: article.webPublicationDate,
      source: { id: 'guardian', name: 'The Guardian' },
      author: article.fields?.byline || '',
      content: article.fields?.trailText || ''
    })) || [];
  } catch (error) {
    console.error('Guardian API fetch error:', error);
    return [];
  }
};

const fetchFromNYT = async (query: string): Promise<Article[]> => {
  try {
    const response = await fetch(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${encodeURIComponent(query)}&api-key=${API_KEYS.nyt}`
    );
    
    if (!response.ok) throw new Error('NYT API request failed');
    
    const data = await response.json();
    return data.response?.docs?.map((article: any) => ({
      title: article.headline?.main || '',
      description: article.abstract || article.lead_paragraph || '',
      url: article.web_url,
      urlToImage: article.multimedia?.[0]?.url ? `https://static01.nyt.com/${article.multimedia[0].url}` : '',
      publishedAt: article.pub_date,
      source: { id: 'nyt', name: 'New York Times' },
      author: article.byline?.original || '',
      content: article.snippet || ''
    })) || [];
  } catch (error) {
    console.error('NYT API fetch error:', error);
    return [];
  }
};

export const useNewsAPI = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchArticles = useCallback(async (query: string, filters?: NewsFilters) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Fetching articles for query:', query);
      console.log('Selected sources:', filters?.sources);
      
      const fetchPromises = [];
      
      // Only fetch from selected sources, or all if none selected
      const selectedSources = filters?.sources || [];
      const shouldFetchAll = selectedSources.length === 0;
      
      if (shouldFetchAll || selectedSources.includes('newsapi')) {
        fetchPromises.push(fetchFromNewsAPI(query));
      }
      if (shouldFetchAll || selectedSources.includes('guardian')) {
        fetchPromises.push(fetchFromGuardian(query));
      }
      if (shouldFetchAll || selectedSources.includes('nyt')) {
        fetchPromises.push(fetchFromNYT(query));
      }

      const results = await Promise.allSettled(fetchPromises);
      const allArticles: Article[] = [];

      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          console.log(`API ${index} articles:`, result.value.length);
          allArticles.push(...result.value);
        } else {
          console.error(`API ${index} failed:`, result.reason);
        }
      });

      // Sort by publication date (newest first)
      allArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
      
      console.log('Total articles fetched:', allArticles.length);
      setArticles(allArticles);

      // Set error only if all APIs failed
      if (allArticles.length === 0) {
        setError('No articles found from selected sources');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search articles');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const getTopHeadlines = useCallback(async (category?: string, sources?: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Use a general query for headlines
      const query = category && category !== 'general' ? category : 'latest news';
      console.log('Fetching top headlines for category:', category);
      
      // Convert sources string to filters format
      const filters: NewsFilters = {
        sources: sources ? sources.split(',') : [],
        dateRange: 'week',
        sortBy: 'publishedAt'
      };
      
      await searchArticles(query, filters);
    } catch (err) {
      console.error('Headlines error:', err);
      setError('Failed to load headlines');
      setArticles([]);
    } finally {
      setLoading(false);
    }
  }, [searchArticles]);

  return {
    articles,
    loading,
    error,
    searchArticles,
    getTopHeadlines
  };
};
