import { useState, useEffect, useCallback } from 'react';
import { Article } from '../types/Article';
import { apiService } from '../services/api';

interface UseArticlesOptions {
  category?: string;
  status?: string;
  search?: string;
  featured?: boolean;
}

export const useArticles = (options: UseArticlesOptions = {}) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await apiService.getArticles(options);
      setArticles(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch articles');
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  }, [options.category, options.status, options.search, options.featured]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const createArticle = async (articleData: Omit<Article, 'id'>) => {
    try {
      const newArticle = await apiService.createArticle(articleData);
      setArticles(prev => [newArticle, ...prev]);
      return newArticle;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create article');
      throw err;
    }
  };

  const updateArticle = async (id: string, articleData: Omit<Article, 'id'>) => {
    try {
      const updatedArticle = await apiService.updateArticle(id, articleData);
      setArticles(prev => prev.map(article => 
        article.id === id ? updatedArticle : article
      ));
      return updatedArticle;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update article');
      throw err;
    }
  };

  const deleteArticle = async (id: string) => {
    try {
      await apiService.deleteArticle(id);
      setArticles(prev => prev.filter(article => article.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete article');
      throw err;
    }
  };

  return {
    articles,
    loading,
    error,
    refetch: fetchArticles,
    createArticle,
    updateArticle,
    deleteArticle
  };
};