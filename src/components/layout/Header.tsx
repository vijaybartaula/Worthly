
import React from 'react';
import { Link } from 'react-router-dom';
import { MenuIcon, Calculator, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={toggleSidebar}
            className="mr-4 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 lg:hidden"
            aria-label="Toggle navigation"
          >
            <MenuIcon className="h-6 w-6 text-gray-700 dark:text-gray-200" />
          </button>
          <Link to="/" className="flex items-center group">
            <Calculator className="h-7 w-7 text-primary-600 dark:text-primary-400 mr-2 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-200" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors duration-200">
              Worthly
            </span>
          </Link>
        </div>
        <div className="flex items-center">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5 text-gray-700" />
            ) : (
              <Sun className="h-5 w-5 text-gray-200" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;