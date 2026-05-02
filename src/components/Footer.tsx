import React from 'react';
import { DATA } from '@/src/constants';

const buildDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' });

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-academic-900 mt-12 py-8 border-t border-academic-100 dark:border-academic-700">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-1">
        <p className="text-academic-500 dark:text-academic-400 text-sm">
          &copy; {new Date().getFullYear()} {DATA.profile.name}
        </p>
        <p className="text-academic-400 dark:text-academic-500 text-xs">
          Last updated: {buildDate}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
