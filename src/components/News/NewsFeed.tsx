import React, { useEffect, useState } from "react";
import axios from "axios";
import { Article } from "../../types/Article";
import { ArticleCard } from "../Articles/ArticleCard";
// import { Spinner } from "../Spinner";

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
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/articles");
        setArticles(res.data);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const filteredArticles = articles.filter((article) => {
    const matchesCategory =
      activeCategory === "all" ||
      article.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Separate picksForYou articles
  const picksForYouArticles = filteredArticles.filter(article => article.picksForYou);

  // Filter out picksForYou articles from other arrays
  const nonPicksArticles = filteredArticles.filter(article => !article.picksForYou);

  const firstFeatured = nonPicksArticles[0];
  const otherFeatured = nonPicksArticles.slice(1, 4);
  const regularArticles = nonPicksArticles.slice(4);

  if (loading) {
    // return (
    //   // <div className="flex justify-center items-center py-20">
    //   //   <Spinner />
    //   // </div>
    // );
  }

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
          <h2 className="text-xl font-semibold text-gray-900">Picks for you</h2>
          {picksForYouArticles.map((article) => (
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
};
