import React, { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-card p-6 transition-all duration-200 animate-fade-in ${className}`}>
      {title && (
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">{title}</h2>
      )}
      {children}
    </div>
  );
};

export default Card;