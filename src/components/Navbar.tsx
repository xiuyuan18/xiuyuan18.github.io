'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { DATA } from '@/src/constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const toggleDark = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  const navLinks = [
    { name: 'Home', path: '/', show: true },
    { name: 'Publications', path: '/publications', show: DATA.config.showPublicationsPage },
    { name: 'Teaching', path: '/teaching', show: DATA.config.showTeachingPage },
    { name: 'Blog', path: '/blog', show: DATA.config.showBlogPage },
  ];

  const visibleLinks = navLinks.filter(link => link.show);

  const isActive = (path: string) => path === '/' ? pathname === '/' : pathname === path || pathname.startsWith(`${path}/`);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-academic-800/80 backdrop-blur-md border-b border-academic-100 dark:border-academic-700" aria-label="Main navigation">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="shrink-0 flex items-center space-x-2">
              <span className="font-serif font-bold text-xl tracking-tight text-academic-900 dark:text-academic-100">
                {DATA.profile.name}
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:ml-6 sm:items-center sm:space-x-8 md:flex">
            {visibleLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                aria-current={isActive(link.path) ? 'page' : undefined}
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors duration-200 ${isActive(link.path)
                  ? 'text-academic-accent border-b-2 border-academic-accent'
                  : 'text-academic-600 dark:text-academic-400 hover:text-academic-900 dark:hover:text-academic-100 hover:border-b-2 hover:border-academic-300 dark:hover:border-academic-600'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={toggleDark}
              aria-label="Toggle color theme"
              className="p-2 rounded-md text-academic-500 dark:text-academic-400 hover:text-academic-900 dark:hover:text-academic-100 hover:bg-academic-50 dark:hover:bg-academic-700 transition-colors"
            >
              <Sun size={18} className="hidden dark:block" aria-hidden="true" />
              <Moon size={18} className="block dark:hidden" aria-hidden="true" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleDark}
              aria-label="Toggle color theme"
              className="p-2 rounded-md text-academic-500 dark:text-academic-400 hover:text-academic-900 dark:hover:text-academic-100 hover:bg-academic-50 dark:hover:bg-academic-700 transition-colors mr-1"
            >
              <Sun size={18} className="hidden dark:block" aria-hidden="true" />
              <Moon size={18} className="block dark:hidden" aria-hidden="true" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
              className="inline-flex items-center justify-center p-2 rounded-md text-academic-500 dark:text-academic-400 hover:text-academic-900 dark:hover:text-academic-100 hover:bg-academic-50 dark:hover:bg-academic-700"
            >
              {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden bg-white dark:bg-academic-800 border-b border-academic-100 dark:border-academic-700 shadow-lg dark:shadow-black/20">
          <div className="pt-2 pb-3 space-y-1">
            {visibleLinks.map((link) => (
              <Link
                key={link.name}
                href={link.path}
                aria-current={isActive(link.path) ? 'page' : undefined}
                onClick={() => setIsOpen(false)}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${isActive(link.path)
                  ? 'bg-academic-50 dark:bg-academic-700 border-academic-accent text-academic-accent'
                  : 'border-transparent text-academic-600 dark:text-academic-400 hover:bg-gray-50 dark:hover:bg-academic-700 hover:border-gray-300 dark:hover:border-academic-600 hover:text-gray-800 dark:hover:text-academic-100'
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
