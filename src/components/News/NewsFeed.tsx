import React, { useMemo, useEffect } from 'react';
import { ArticleCard } from '../Articles/ArticleCard';
import { Article } from '../../types/Article';
import { useArticles } from '../../hooks/useArticles';

interface NewsFeedProps {
  onArticleClick: (article: Article) => void;
  searchQuery: string;
  activeCategory: string;
}

export const NewsFeed: React.FC<NewsFeedProps> = ({ 
  onArticleClick, 
  searchQuery,
  activeCategory 
}) => {
  const { articles, loading, error } = useArticles({
    category: activeCategory !== 'all' ? activeCategory : undefined,
    search: searchQuery || undefined,
    status: 'published'
  });

  const filteredArticles = useMemo(() => {
    return articles;
  }, [articles]);

  const featuredArticles = useMemo(() => {
    return filteredArticles.filter(article => article.featured);
  }, [filteredArticles]);

  const regularArticles = useMemo(() => {
    return filteredArticles.filter(article => !article.featured);
  }, [filteredArticles]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h3 className="text-lg font-medium text-red-600 mb-2">Error loading articles</h3>
          <p className="text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  if (filteredArticles.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
          <p className="text-gray-500">
            {searchQuery 
              ? `No articles match your search for "${searchQuery}"` 
              : `No articles found in ${activeCategory} category`}
          </p>
        </div>
      </div>
    );
  }


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Stories</h2>
          <div className="space-y-6">
            {featuredArticles.map((article) => (
              <ArticleCard
                key={article._id || article.id}
                article={article}
                onClick={onArticleClick}
                size="large"
              />
            ))}
          </div>
        </div>
      )}

      {/* Articles Grid */}
      {regularArticles.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map((article) => (
              <ArticleCard
                key={article._id || article.id}
                article={article}
                onClick={onArticleClick}
                size="medium"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};