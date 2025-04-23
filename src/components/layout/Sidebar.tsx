import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, Percent, LineChart, DollarSign, BarChart3 } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, text, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) => 
      `flex items-center p-3 mb-2 rounded-lg transition-colors duration-200 
      ${isActive 
        ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' 
        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`
    }
  >
    <span className="mr-3">{icon}</span>
    <span className="font-medium">{text}</span>
  </NavLink>
);

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-auto lg:shadow-none pt-20 lg:pt-0 lg:z-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4">
          <button 
            onClick={toggleSidebar} 
            className="absolute top-4 right-4 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 lg:hidden focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5 text-gray-700 dark:text-gray-200" />
          </button>
          
          <nav className="mt-6">
            <h3 className="text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 mb-4 tracking-wider">Calculators</h3>
            <NavItem 
              to="/simple-interest" 
              icon={<Percent className="h-5 w-5" />} 
              text="Simple Interest" 
              onClick={toggleSidebar} 
            />
            <NavItem 
              to="/compound-interest" 
              icon={<LineChart className="h-5 w-5" />} 
              text="Compound Interest" 
              onClick={toggleSidebar} 
            />
            <NavItem 
              to="/npv" 
              icon={<DollarSign className="h-5 w-5" />} 
              text="Net Present Value" 
              onClick={toggleSidebar} 
            />
            <NavItem 
              to="/economic-equivalence" 
              icon={<BarChart3 className="h-5 w-5" />} 
              text="Economic Equivalence" 
              onClick={toggleSidebar} 
            />
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;