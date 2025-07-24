import React, { useState } from "react";
import { Search, Menu, X, Settings } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface HeaderProps {
  onSearch: (query: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, theme, toggleTheme }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const currentPath = location.pathname;

  return (
    <header className={`shadow-sm border-b sticky top-0 z-50 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <h1
              className={`text-2xl font-bold cursor-pointer ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}
              onClick={() => navigate("/news")}
            >
              NewsHub
            </h1>
            <nav className="hidden md:flex space-x-4">
              <button
                onClick={() => navigate("/news")}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPath === "/news"
                    ? theme === 'dark' ? "bg-blue-700 text-blue-300" : "bg-blue-100 text-blue-700"
                    : theme === 'dark' ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                News Feed
              </button>
              {currentPath === "/cms" && (
                <button
                  onClick={() => navigate("/cms")}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                    currentPath === "/cms"
                      ? theme === 'dark' ? "bg-blue-700 text-blue-300" : "bg-blue-100 text-blue-700"
                      : theme === 'dark' ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>CMS</span>
                </button>
              )}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden sm:block">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 ${
                    theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            </form>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-md hover:bg-gray-100 ${
                theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={toggleTheme}
              aria-label="Toggle Dark Mode"
              className={`ml-4 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                theme === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className={`md:hidden py-4 border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex flex-col space-y-3">
                <form onSubmit={handleSearch} className="sm:hidden">
                  <div className="relative">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className={`pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full ${
                        theme === 'dark' ? 'border-gray-600 bg-gray-800 text-white placeholder-gray-400' : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                      }`}
                    />
                  </div>
                </form>
                <button
                  onClick={() => {
                    navigate("/news");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors text-left ${
                    theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  News Feed
                </button>
                <button
                  onClick={() => {
                    navigate("/cms");
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors text-left flex items-center space-x-1 ${
                    theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>CMS</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
