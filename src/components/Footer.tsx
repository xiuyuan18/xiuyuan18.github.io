import React from 'react';
import { DATA } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white mt-12 py-8 border-t border-academic-100">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-academic-500 text-sm">
          &copy; {new Date().getFullYear()} {DATA.profile.name}. Generated with the assistance of Gemini.
        </p>
        <p className="text-xs text-academic-400 mt-2">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;