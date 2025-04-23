import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import SimpleInterestPage from './pages/SimpleInterestPage';
import CompoundInterestPage from './pages/CompoundInterestPage';
import NPVPage from './pages/NPVPage';
import EconomicEquivalencePage from './pages/EconomicEquivalencePage';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <Header toggleSidebar={toggleSidebar} />
          <div className="flex flex-1">
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
            <main className="flex-1 p-4 md:p-6 lg:p-8 pt-20 transition-all duration-200">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/simple-interest" element={<SimpleInterestPage />} />
                <Route path="/compound-interest" element={<CompoundInterestPage />} />
                <Route path="/npv" element={<NPVPage />} />
                <Route path="/economic-equivalence" element={<EconomicEquivalencePage />} />
              </Routes>
            </main>
          </div>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;