import React from 'react';
import { ArrowLeft, Clock, User, Calendar, Tag, Share2 } from 'lucide-react';
import { Article } from '../../types/Article';

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, onBack }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      });
    } else {
      alert('Sharing is not supported in this browser.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={onBack}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to news</span>
      </button>

      <article className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        <div className="w-full h-64 md:h-96 overflow-hidden rounded-md">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold tracking-wide">
              {article.category}
            </span>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{article.readTime} min read</span>
            </div>
          </div>

          <h1 className="text-4xl font-extrabold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span className="font-semibold text-gray-900">{article.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <time>{formatDate(article.publishedAt)}</time>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition-colors"
              aria-label="Share article"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>

          <div
            className="prose prose-lg max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {article.tags.length > 0 && (
            <div className="flex items-center space-x-2 pt-8 border-t border-gray-200">
              <Tag className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-semibold text-gray-700">Tags:</span>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};
