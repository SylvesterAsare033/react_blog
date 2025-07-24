import React, { useEffect } from 'react';
import { Category } from '../../types/Article';
import { useCategories } from '../../hooks/useCategories';

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (categorySlug: string) => void;
  theme: 'light' | 'dark';
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeCategory,
  onCategoryChange,
  theme,
}) => {
  const { categories, loading } = useCategories();

  if (loading) {
    return (
      <div className={theme === 'dark' ? "bg-gray-900 border-gray-700" : "bg-white border-b"}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-4">
            <div className={theme === 'dark' ? "animate-pulse bg-gray-700 h-6 w-16 rounded" : "animate-pulse bg-gray-200 h-6 w-16 rounded"}></div>
            <div className={theme === 'dark' ? "animate-pulse bg-gray-700 h-6 w-20 rounded" : "animate-pulse bg-gray-200 h-6 w-20 rounded"}></div>
            <div className={theme === 'dark' ? "animate-pulse bg-gray-700 h-6 w-18 rounded" : "animate-pulse bg-gray-200 h-6 w-18 rounded"}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={theme === 'dark' ? "bg-gray-900 border-b border-gray-700" : "bg-white border-b"}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto py-4">
          {categories.map((category) => (
            <button
              key={category.id || category.slug}
              onClick={() => onCategoryChange(category.slug)}
              className={`whitespace-nowrap pb-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeCategory === category.slug
                  ? theme === 'dark' ? 'border-blue-500 text-blue-400' : 'border-blue-500 text-blue-600'
                  : theme === 'dark' ? 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
