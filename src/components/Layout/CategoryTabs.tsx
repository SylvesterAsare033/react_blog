import React, { useEffect } from 'react';
import { Category } from '../../types/Article';
import { useCategories } from '../../hooks/useCategories';

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (categorySlug: string) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  activeCategory,
  onCategoryChange,
}) => {
  const { categories, loading } = useCategories();

  if (loading) {
    return (
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-4">
            <div className="animate-pulse bg-gray-200 h-6 w-16 rounded"></div>
            <div className="animate-pulse bg-gray-200 h-6 w-20 rounded"></div>
            <div className="animate-pulse bg-gray-200 h-6 w-18 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto py-4">
          {categories.map((category) => (
            <button
              key={category.id || category.slug}
              onClick={() => onCategoryChange(category.slug)}
              className={`whitespace-nowrap pb-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeCategory === category.slug
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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