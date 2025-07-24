import React from 'react';
import { ArrowLeft, Clock, User, Calendar, Tag, Share2 } from 'lucide-react';
import { Article } from '../../types/Article';

interface ArticleDetailProps {
  article: Article;
  onBack: () => void;
  theme?: 'light' | 'dark';
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, onBack, theme = 'light' }) => {
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
        className={`flex items-center space-x-2 mb-6 transition-colors ${
          theme === 'dark' ? 'text-blue-400 hover:text-blue-600' : 'text-blue-600 hover:text-blue-800'
        }`}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to news</span>
      </button>

      <article className={`rounded-lg shadow-md overflow-hidden border ${
        theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <div className="w-full h-64 md:h-96 overflow-hidden rounded-md">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 md:p-8">
          <div className="flex items-center space-x-4 text-sm mb-4" 
            style={{ color: theme === 'dark' ? '#9CA3AF' : undefined }}>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-semibold tracking-wide">
              {article.category}
            </span>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{article.readTime} min read</span>
            </div>
          </div>

          <h1 className={`text-4xl font-extrabold mb-6 leading-tight ${
            theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
          }`}>
            {article.title}
          </h1>

          <p className={`text-xl mb-8 leading-relaxed ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {article.excerpt}
          </p>

          <div className={`flex flex-wrap items-center gap-4 text-sm mb-8 pb-8 border-b ${
            theme === 'dark' ? 'text-gray-400 border-gray-700' : 'text-gray-500 border-gray-200'
          }`}>
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span className={`font-semibold ${
                theme === 'dark' ? 'text-gray-100' : 'text-gray-900'
              }`}>{article.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <time>{formatDate(article.publishedAt)}</time>
            </div>
            <button
              onClick={handleShare}
              className={`flex items-center space-x-1 transition-colors ${
                theme === 'dark' ? 'text-blue-400 hover:text-blue-600' : 'text-blue-600 hover:text-blue-800'
              }`}
              aria-label="Share article"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>

          <div
            className={`prose prose-lg max-w-none mb-8 ${
              theme === 'dark' ? 'prose-invert text-white' : ''
            }`}
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {article.tags.length > 0 && (
            <div className={`flex items-center space-x-2 pt-8 border-t ${
              theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <Tag className={`w-4 h-4 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-400'
              }`} />
              <span className={`text-sm font-semibold ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>Tags:</span>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                    }`}
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
