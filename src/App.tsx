import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Layout/Header';
import { CategoryTabs } from './components/Layout/CategoryTabs';
import { NewsFeed } from './components/News/NewsFeed';
import { ArticleDetail } from './components/Articles/ArticleDetail';
import { CMSDashboard } from './components/CMS/CMSDashboard';
import { Article } from './types/Article';

function App() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const handleArticleClick = (article: Article) => {
    setSelectedArticle(article);
  };

  const handleBackToNews = () => {
    setSelectedArticle(null);
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
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header 
          onSearch={handleSearch}
        />

        <Routes>
          <Route path="/" element={<Navigate to="/news" replace />} />
          <Route path="/news" element={
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
          } />
          <Route path="/cms" element={
            <CMSDashboard
              onViewArticle={handleArticleClick}
            />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
