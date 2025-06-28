
import React from 'react';
import { ArticleCard } from './ArticleCard';
import { Article } from '@/types/news';


interface ArticleGridProps {
  articles: Article[];
  isPersonalized?: boolean;
}

export const ArticleGrid: React.FC<ArticleGridProps> = ({ articles, isPersonalized = false }) => {
  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-2">No articles found</div>
        <p className="text-gray-400">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-auto custom-scrollbar" style={{height: 'calc(100vh - 445px)'}}>
      {articles.map((article, index) => (
        <ArticleCard key={`${article.url}-${index}`} article={article} />
      ))}
    </div>
  );
};
