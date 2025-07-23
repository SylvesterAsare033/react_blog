import React, { useState, useEffect } from 'react';
import { Header } from './components/Layout/Header';
import { CategoryTabs } from './components/Layout/CategoryTabs';
import { NewsFeed } from './components/News/NewsFeed';
import { ArticleDetail } from './components/Articles/ArticleDetail';
import { CMSDashboard } from './components/CMS/CMSDashboard';
import { Article } from './types/Article';

function App() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [currentView, setCurrentView] = useState<'news' | 'cms'>('news');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
  };

  const handleBackToNews = () => {
    setSelectedArticle(null);
  };

  const handleViewChange = (view: 'news' | 'cms') => {
    setCurrentView(view);
    setSelectedArticle(null);
    setSearchQuery('');
    setActiveCategory('all');
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveCategory('all');
  };

  const handleCategoryChange = (categorySlug: string) => {
    setActiveCategory(categorySlug);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onSearch={handleSearch}
        onViewChange={handleViewChange}
        currentView={currentView}
      />
      
      {currentView === 'news' && (
        <>
          {!selectedArticle && (
            <CategoryTabs
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />
          )}
          
          {selectedArticle ? (
            <ArticleDetail
              article={selectedArticle}
              onBack={handleBackToNews}
            />
          ) : (
            <NewsFeed
              onArticleClick={handleArticleClick}
              searchQuery={searchQuery}
              activeCategory={activeCategory}
            />
          )}
        </>
      )}

      {currentView === 'cms' && (
        <CMSDashboard
          onViewArticle={handleArticleClick}
        />
      )}
    </div>
  );
}

export default App;