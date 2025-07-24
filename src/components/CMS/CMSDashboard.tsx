import React, { useState, useEffect } from 'react';
import { PlusCircle, Filter, Search } from 'lucide-react';
import { Article } from '../../types/Article';
import { CMSArticleList } from './CMSArticleList';
import { ArticleForm } from './ArticleForm';
import { useArticles } from '../../hooks/useArticles';

interface CMSDashboardProps {
  onViewArticle: (article: Article) => void;
  theme: 'light' | 'dark';
}

export const CMSDashboard: React.FC<CMSDashboardProps> = ({
  onViewArticle,
  theme,
}) => {
  const [view, setView] = React.useState<'list' | 'create' | 'edit'>('list');
  const [editingArticle, setEditingArticle] = React.useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<'all' | 'published' | 'draft'>('all');

  const {
    articles,
    loading,
    error,
    createArticle,
    updateArticle,
    deleteArticle
  } = useArticles({
    search: searchQuery || undefined,
    status: statusFilter !== 'all' ? statusFilter : undefined
  });

  const filteredArticles = articles.filter(article => {
    const matchesSearch = searchQuery === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || article.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (article: Article) => {
    setEditingArticle(article);
    setView('edit');
  };

  const handleSave = (articleData: Omit<Article, 'id'>) => {
    if (view === 'create') {
      createArticle(articleData);
    } else if (view === 'edit' && editingArticle) {
      updateArticle(editingArticle._id || editingArticle.id!, articleData);
    }
    setView('list');
    setEditingArticle(null);
  };

  const handleCancel = () => {
    setView('list');
    setEditingArticle(null);
  };

  const handleDelete = (articleId: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      deleteArticle(articleId);
    }
  };

  const stats = {
    total: articles.length,
    published: articles.filter(a => a.status === 'published').length,
    drafts: articles.filter(a => a.status === 'draft').length
  };

  if (view === 'create' || view === 'edit') {
    return (
      <ArticleForm
        article={editingArticle || undefined}
        onSave={handleSave}
        onCancel={handleCancel}
        theme={theme}
      />
    );
  }

  return (
    <div className={theme === 'dark' ? "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-900 text-gray-100" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white text-gray-900"}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className={theme === 'dark' ? "text-3xl font-bold text-gray-100" : "text-3xl font-bold text-gray-900"}>Content Management</h1>
            <p className={theme === 'dark' ? "text-gray-400 mt-1" : "text-gray-600 mt-1"}>Manage your articles and content</p>
          </div>
          <button
            onClick={() => setView('create')}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <PlusCircle className="w-5 h-5" />
            <span>New Article</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className={theme === 'dark' ? "bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700" : "bg-white p-6 rounded-lg shadow-sm border border-gray-200"}>
            <h3 className={theme === 'dark' ? "text-lg font-semibold text-gray-100" : "text-lg font-semibold text-gray-900"}>Total Articles</h3>
            <p className={theme === 'dark' ? "text-3xl font-bold text-blue-400 mt-2" : "text-3xl font-bold text-blue-600 mt-2"}>{stats.total}</p>
          </div>
          <div className={theme === 'dark' ? "bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700" : "bg-white p-6 rounded-lg shadow-sm border border-gray-200"}>
            <h3 className={theme === 'dark' ? "text-lg font-semibold text-gray-100" : "text-lg font-semibold text-gray-900"}>Published</h3>
            <p className={theme === 'dark' ? "text-3xl font-bold text-green-400 mt-2" : "text-3xl font-bold text-green-600 mt-2"}>{stats.published}</p>
          </div>
          <div className={theme === 'dark' ? "bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-700" : "bg-white p-6 rounded-lg shadow-sm border border-gray-200"}>
            <h3 className={theme === 'dark' ? "text-lg font-semibold text-gray-100" : "text-lg font-semibold text-gray-900"}>Drafts</h3>
            <p className={theme === 'dark' ? "text-3xl font-bold text-yellow-400 mt-2" : "text-3xl font-bold text-yellow-600 mt-2"}>{stats.drafts}</p>
          </div>
        </div>

        {/* Filters */}
        <div className={theme === 'dark' ? "flex flex-col sm:flex-row gap-4 bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-700" : "flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200"}>
          <div className="flex-1">
            <div className="relative">
              <Search className={theme === 'dark' ? "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" : "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={theme === 'dark' ? "pl-10 pr-4 py-2 border border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full bg-gray-900 text-gray-100" : "pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Filter className={theme === 'dark' ? "w-4 h-4 text-gray-400" : "w-4 h-4 text-gray-400"} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as 'all' | 'published' | 'draft')}
              className={theme === 'dark' ? "border border-gray-600 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-900 text-gray-100" : "border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"}
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      {loading && (
        <div className={theme === 'dark' ? "text-center py-8 text-gray-100" : "text-center py-8"}>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className={theme === 'dark' ? "mt-2 text-gray-300" : "mt-2 text-gray-500"}>Loading articles...</p>
        </div>
      )}

      {error && (
        <div className={theme === 'dark' ? "bg-red-700 border border-red-600 rounded-md p-4 mb-6" : "bg-red-50 border border-red-200 rounded-md p-4 mb-6"}>
          <p className={theme === 'dark' ? "text-red-300" : "text-red-600"}>Error: {error}</p>
        </div>
      )}

      {/* Articles List */}
      {!loading && <CMSArticleList
        articles={filteredArticles}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={onViewArticle}
        theme={theme}
      />}
    </div>
  );
}
