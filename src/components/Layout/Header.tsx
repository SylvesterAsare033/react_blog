import React, { useState } from 'react';
import { Search, Menu, X, Settings, PlusCircle } from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string) => void;
  onViewChange: (view: 'news' | 'cms') => void;
  currentView: 'news' | 'cms';
}

export const Header: React.FC<HeaderProps> = ({ onSearch, onViewChange, currentView }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1 
              className="text-2xl font-bold text-blue-600 cursor-pointer"
              onClick={() => onViewChange('news')}
            >
              NewsHub
            </h1>
            <nav className="hidden md:flex space-x-4">
              <button
                onClick={() => onViewChange('news')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'news' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                News Feed
              </button>
              <button
                onClick={() => onViewChange('cms')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                  currentView === 'cms' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>CMS</span>
              </button>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden sm:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
                />
              </div>
            </form>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <form onSubmit={handleSearch} className="sm:hidden">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                  />
                </div>
              </form>
              <button
                onClick={() => onViewChange('news')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors text-left ${
                  currentView === 'news' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600'
                }`}
              >
                News Feed
              </button>
              <button
                onClick={() => onViewChange('cms')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors text-left flex items-center space-x-1 ${
                  currentView === 'cms' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-600'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>CMS</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};