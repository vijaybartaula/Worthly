import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 transition-colors duration-200">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-gray-600 dark:text-gray-400 mb-4 md:mb-0 text-center md:text-left">
          © {currentYear} Worthly. All rights reserved.
        </p>
        <div className="flex space-x-6">
          <a 
            href="#" 
            className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
          >
            Privacy Policy
          </a>
          <a 
            href="#" 
            className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
          >
            Terms of Service
          </a>
         <a 
            href="https://github.com/bijaybartaula" 
            target="_blank" 
            className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;