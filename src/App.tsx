import React, { useState, useEffect } from 'react';
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
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedPrefs = window.localStorage.getItem('theme');
      if (typeof storedPrefs === 'string') {
        return storedPrefs as 'light' | 'dark';
      }
      const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
      if (userMedia.matches) {
        return 'dark';
      }
    }
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header 
          onSearch={handleSearch}
          theme={theme}
          toggleTheme={toggleTheme}
        />

        <Routes>
          <Route path="/" element={<Navigate to="/news" replace />} />
          <Route path="/news" element={
            <>
              {!selectedArticle && (
                <CategoryTabs
                  activeCategory={activeCategory}
                  onCategoryChange={handleCategoryChange}
                  theme={theme}
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
                  theme={theme}
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
