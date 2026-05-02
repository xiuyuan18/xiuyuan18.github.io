import React from 'react';

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => (
  <div className="border-b border-academic-100 dark:border-academic-700 pb-4">
    <h1 className="text-3xl font-serif font-bold text-academic-900 dark:text-academic-100">{title}</h1>
  </div>
);

export default PageHeader;
