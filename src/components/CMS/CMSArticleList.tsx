import React from 'react';
import { Edit, Trash2, Eye, Calendar, User } from 'lucide-react';
import { Article } from '../../types/Article';

interface CMSArticleListProps {
  articles: Article[];
  onEdit: (article: Article) => void;
  onDelete: (articleId: string) => void;
  onView: (article: Article) => void;
  theme?: 'light' | 'dark';
}

export const CMSArticleList: React.FC<CMSArticleListProps> = ({
  articles,
  onEdit,
  onDelete,
  onView,
  theme = 'light',
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const sortedArticles = [...articles].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="space-y-4">
      {sortedArticles.map((article) => (
        <div
          key={article._id || article.id}
          className={`${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-100 hover:bg-gray-700' : 'bg-white border-gray-200 text-gray-900 hover:bg-blue-50'} rounded-lg shadow-sm border p-6 transition-colors`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-3 mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  article.status === 'published' 
                    ? (theme === 'dark' ? 'bg-green-700 text-green-300' : 'bg-green-100 text-green-800') 
                    : (theme === 'dark' ? 'bg-yellow-700 text-yellow-300' : 'bg-yellow-100 text-yellow-800')
                }`}>
                  {article.status}
                </span>
                <span className={`${theme === 'dark' ? 'bg-blue-700 text-blue-300' : 'bg-blue-100 text-blue-800'} px-2 py-1 rounded-full text-xs font-medium`}>
                  {article.category}
                </span>
              </div>
              
              <h3 className={`${theme === 'dark' ? 'text-gray-100' : 'text-gray-900'} text-lg font-semibold mb-2 line-clamp-1`}>
                {article.title}
              </h3>
              
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-3 line-clamp-2`}>
                {article.excerpt}
              </p>
              
              <div className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} flex items-center space-x-4 text-sm`}>
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(article.publishedAt)}</span>
                </div>
                <span>{article.readTime} min read</span>
              </div>
              
              {article.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`${theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'} px-2 py-1 rounded text-xs`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            <div className="ml-4 flex items-center space-x-2">
              <button
                onClick={() => onView(article)}
                className={`${theme === 'dark' ? 'text-gray-300 hover:text-blue-400 hover:bg-blue-900' : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'} p-2 rounded-md transition-colors`}
                title="View article"
              >
                <Eye className="w-4 h-4" />
              </button>
              <button
                onClick={() => onEdit(article)}
                className={`${theme === 'dark' ? 'text-gray-300 hover:text-blue-400 hover:bg-blue-900' : 'text-gray-500 hover:text-blue-600 hover:bg-blue-50'} p-2 rounded-md transition-colors`}
                title="Edit article"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(article._id || article.id!)}
                className={`${theme === 'dark' ? 'text-gray-300 hover:text-red-400 hover:bg-red-900' : 'text-gray-500 hover:text-red-600 hover:bg-red-50'} p-2 rounded-md transition-colors`}
                title="Delete article"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
      
      {sortedArticles.length === 0 && (
        <div className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-900'} text-center py-12`}>
          <h3 className="text-lg font-medium mb-2">No articles yet</h3>
          <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Create your first article to get started.</p>
        </div>
      )}
    </div>
  );
};
