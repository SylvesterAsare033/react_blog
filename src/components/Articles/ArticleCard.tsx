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
    small: 'flex space-x-3 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-200 overflow-hidden',
    medium: 'block bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-200 overflow-hidden',
    large: 'lg:flex lg:space-x-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-200 overflow-hidden'
  };

  const imageClasses = {
    small: 'w-20 h-20 flex-shrink-0 rounded-md',
    medium: 'w-full h-48 rounded-md',
    large: 'lg:w-80 lg:h-48 w-full h-48 lg:flex-shrink-0 rounded-md'
  };

  const contentClasses = {
    small: 'flex-1 min-w-0 p-2',
    medium: 'mt-4 p-4',
    large: 'flex-1 lg:mt-0 mt-4 p-6'
  };

  return (
    <article
      className={cardClasses[size]}
      onClick={() => onClick(article)}
      aria-label={`Read article titled ${article.title}`}
      role="article"
    >
      <div className={`${imageClasses[size]} overflow-hidden`}>
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 rounded-md"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=800';
          }}
        />
      </div>

      <div className={contentClasses[size]}>
        <div className="flex items-center space-x-2 text-xs text-gray-500 mb-3">
          {(() => {
            const categoryColors: Record<string, string> = {
              technology: 'bg-blue-100 text-blue-800',
              business: 'bg-green-100 text-green-800',
              sports: 'bg-red-100 text-red-800',
              entertainment: 'bg-purple-100 text-purple-800',
              science: 'bg-yellow-100 text-yellow-800',
              default: 'bg-gray-100 text-gray-800',
            };
            const categoryKey = article.category.toLowerCase();
            const colorClass = categoryColors[categoryKey] || categoryColors['default'];
            return (
              <span className={`${colorClass} px-3 py-1 rounded-full font-semibold tracking-wide`}>
                {article.category}
              </span>
            );
          })()}
          <span>•</span>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{article.readTime} min read</span>
          </div>
        </div>

        <h3
          className={`font-extrabold text-gray-900 hover:text-blue-600 transition-colors ${
            size === 'large' ? 'text-2xl mb-4' : size === 'medium' ? 'text-xl mb-3' : 'text-base mb-2'
          } line-clamp-2`}
        >
          {article.title}
        </h3>

        <p
          className={`text-gray-700 mb-4 ${
            size === 'large' ? 'text-lg' : 'text-sm'
          } line-clamp-3`}
        >
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>{article.author}</span>
          </div>
          <time>{formatDate(article.publishedAt)}</time>
        </div>
      </div>
    </article>
  );
};
