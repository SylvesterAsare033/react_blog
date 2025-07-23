import React, { useMemo } from "react";
import { ArticleCard } from "../Articles/ArticleCard";
import { Article } from "../../types/Article";
import { useArticles } from "../../hooks/useArticles";

interface NewsFeedProps {
  onArticleClick: (article: Article) => void;
  searchQuery: string;
  activeCategory: string;
}

export const NewsFeed: React.FC<NewsFeedProps> = ({
  onArticleClick,
  searchQuery,
  activeCategory,
}) => {
  const { articles, loading, error } = useArticles({
    category: activeCategory !== "all" ? activeCategory : undefined,
    search: searchQuery || undefined,
    status: "published",
  });

  const filteredArticles = useMemo(() => articles, [articles]);

  const featuredArticles = useMemo(
    () => filteredArticles.filter((article) => article.featured),
    [filteredArticles]
  );

  const regularArticles = useMemo(
    () => filteredArticles.filter((article) => !article.featured),
    [filteredArticles]
  );

  const firstFeatured = featuredArticles[0];
  const otherFeatured = featuredArticles.slice(1);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Top Stories */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Top stories</h2>
            {firstFeatured && (
              <ArticleCard
                article={firstFeatured}
                onClick={onArticleClick}
                size="headline"
              />
            )}
            <div className="space-y-4">
              {(otherFeatured.length > 0
                ? otherFeatured
                : regularArticles.slice(0, 3)
              ).map((article) => (
                <ArticleCard
                  key={article._id || article.id}
                  article={article}
                  onClick={onArticleClick}
                  size="small"
                />
              ))}
            </div>
            <div>
              <button className="mt-4 text-blue-600 hover:underline text-sm font-medium">
                See all articles and perspectives
              </button>
            </div>
          </div>

          {/* Right Column: Picks for You */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Picks for you
            </h2>
            {regularArticles.slice(3, 8).map((article) => (
              <ArticleCard
                key={article._id || article.id}
                article={article}
                onClick={onArticleClick}
                size="compact"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h3 className="text-lg font-medium text-red-600 mb-2">
          Error loading articles
        </h3>
        <p className="text-gray-500">{error}</p>
      </div>
    );
  }

  if (filteredArticles.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No articles found
        </h3>
        <p className="text-gray-500">
          {searchQuery
            ? `No articles match your search for "${searchQuery}"`
            : `No articles found in ${activeCategory} category`}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Featured Stories */}
      {featuredArticles.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Featured Stories
          </h2>
          <div className="space-y-6">
            {featuredArticles.map((article) => (
              <ArticleCard
                key={article._id || article.id}
                article={article}
                onClick={onArticleClick}
                size="headline"
              />
            ))}
          </div>
        </div>
      )}

      {/* Latest News */}
      {regularArticles.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map((article) => (
              <ArticleCard
                key={article._id || article.id}
                article={article}
                onClick={onArticleClick}
                size="medium"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
