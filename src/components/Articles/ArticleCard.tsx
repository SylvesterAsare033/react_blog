import React from 'react';
import { Clock, User } from 'lucide-react';
import { Article } from '../../types/Article';

interface ArticleCardProps {
  article: Article;
  onClick: (article: Article) => void;
  size?: 'small' | 'medium' | 'large';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  onClick, 
  size = 'medium' 
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const cardClasses = {
    small: 'flex space-x-3',
    medium: 'block',
    large: 'lg:flex lg:space-x-6'
  };

  const imageClasses = {
    small: 'w-20 h-20 flex-shrink-0',
    medium: 'w-full h-48',
    large: 'lg:w-80 lg:h-48 w-full h-48 lg:flex-shrink-0'
  };

  const contentClasses = {
    small: 'flex-1 min-w-0',
    medium: 'mt-4',
    large: 'flex-1 lg:mt-0 mt-4'
  };

  return (
    <article 
      className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer border border-gray-100 overflow-hidden group ${cardClasses[size]}`}
      onClick={() => onClick(article)}
    >
      <div className={`${imageClasses[size]} overflow-hidden`}>
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=800';
          }}
        />
      </div>
      
      <div className={`p-4 ${contentClasses[size]}`}>
        <div className="flex items-center space-x-2 text-xs text-gray-500 mb-2">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
            {article.category}
          </span>
          <span>•</span>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{article.readTime} min read</span>
          </div>
        </div>
        
        <h3 className={`font-bold text-gray-900 group-hover:text-blue-600 transition-colors ${
          size === 'large' ? 'text-xl mb-3' : size === 'medium' ? 'text-lg mb-2' : 'text-sm mb-1'
        } line-clamp-2`}>
          {article.title}
        </h3>
        
        <p className={`text-gray-600 mb-3 ${
          size === 'large' ? 'text-base' : 'text-sm'
        } line-clamp-2`}>
          {article.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <User className="w-3 h-3" />
            <span>{article.author}</span>
          </div>
          <time>{formatDate(article.publishedAt)}</time>
        </div>
      </div>
    </article>
  );
};