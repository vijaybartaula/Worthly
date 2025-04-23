import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import { Calculator, LineChart, DollarSign, BarChart3, ArrowRight, Percent } from 'lucide-react';

const FeatureCard: React.FC<{
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
}> = ({ title, description, icon, link }) => (
  <Card className="h-full hover:shadow-lg transition-shadow duration-200">
    <div className="flex flex-col h-full">
      <div className="mb-4 rounded-full bg-primary-100 dark:bg-primary-900 p-3 w-12 h-12 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">{description}</p>
      <Link 
        to={link}
        className="flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors duration-200"
      >
        Try now
        <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  </Card>
);

const HomePage: React.FC = () => {
  return (
    <div className="animate-fade-in mt-7">
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl p-8 mb-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-slide-up">
            The Future of Financial Insight and Decision-Making
          </h1>
          <p className="text-lg mb-8 opacity-90 animate-slide-up" style={{ animationDelay: '100ms' }}>
            Worthly helps you understand the true value of your financial decisions, 
            simplifying complex calculations and empowering you to make smarter, 
            more informed choices with confidence.
          </p>
          <div className="flex flex-wrap gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Link 
              to="/simple-interest" 
              className="bg-white text-primary-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors duration-200"
            >
              Get Started
            </Link>
            <Link 
              to="/compound-interest" 
              className="bg-transparent border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors duration-200"
            >
              Explore Features
            </Link>
          </div>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Key Features</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <FeatureCard 
          title="Simple Interest"
          description="Calculate Simple Interest (SI) and visualize how your investments grow linearly over time."
          icon={<Percent className="h-6 w-6 text-primary-600 dark:text-primary-400" />}
          link="/simple-interest"
        />
        <FeatureCard 
          title="Compound Interest"
          description="Compute Compound Interest (CI) with different compounding frequencies and see the power of compounding."
          icon={<LineChart className="h-6 w-6 text-primary-600 dark:text-primary-400" />}
          link="/compound-interest"
        />
        <FeatureCard 
          title="Net Present Value"
          description="Evaluate investments by calculating Net Present Value (NPV) and analyzing discounted cash flows."
          icon={<DollarSign className="h-6 w-6 text-primary-600 dark:text-primary-400" />}
          link="/npv"
        />
        <FeatureCard 
          title="Economic Equivalence"
          description="Convert between Present Worth, Future Worth, and Annual Worth to compare financial options."
          icon={<BarChart3 className="h-6 w-6 text-primary-600 dark:text-primary-400" />}
          link="/economic-equivalence"
        />
      </div>
      
      <Card>
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Why Choose Worthly?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">User-Friendly Design</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Designed with simplicity in mind, Worthly is intuitive for beginners and financial professionals alike.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Data-Driven Insights</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Gain valuable insights into your financial future, guiding you toward better, more profitable decisions.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Future-Proof & Scalable</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Built with cutting-edge technologies, designed to evolve as new financial tools and technologies emerge.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HomePage;