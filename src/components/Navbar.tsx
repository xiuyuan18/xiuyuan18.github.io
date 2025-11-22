
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { DATA } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/', show: true },
    { name: 'Publications', path: '/publications', show: DATA.config.showPublicationsPage },
    { name: 'Teaching', path: '/teaching', show: DATA.config.showTeachingPage },
    { name: 'Blog', path: '/blog', show: DATA.config.showBlogPage },
  ];

  // Filter visible links
  const visibleLinks = navLinks.filter(link => link.show);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-academic-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="shrink-0 flex items-center space-x-2">
              <span className="font-serif font-bold text-xl tracking-tight text-academic-900">
                {DATA.profile.name}
              </span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden sm:ml-6 sm:items-center sm:space-x-8 md:flex">
            {visibleLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-academic-accent border-b-2 border-academic-accent'
                    : 'text-academic-600 hover:text-academic-900 hover:border-b-2 hover:border-academic-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-academic-500 hover:text-academic-900 hover:bg-academic-50 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-academic-100 shadow-lg">
          <div className="pt-2 pb-3 space-y-1">
            {visibleLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-academic-50 border-academic-accent text-academic-accent'
                    : 'border-transparent text-academic-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
