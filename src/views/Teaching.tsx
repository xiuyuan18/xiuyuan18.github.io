import React from 'react';
import { DATA } from '@/src/constants';
import { BookOpen } from 'lucide-react';
import PageHeader from '@/src/components/PageHeader';

const Teaching: React.FC = () => {
  return (
    <div className="space-y-12 animate-fadeIn">
      <PageHeader title="Teaching" />

      <div className="grid gap-6">
        {DATA.teaching.map((item) => (
          <div key={item.id} className="bg-white dark:bg-academic-800 border border-academic-200 dark:border-academic-600 rounded-lg p-6 hover:shadow-md dark:shadow-black/20 transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-academic-50 dark:bg-academic-700 rounded-full text-academic-600 dark:text-academic-400">
                <BookOpen size={24} />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-academic-900 dark:text-academic-100">{item.course}</h3>
                <div className="flex flex-wrap gap-y-1 gap-x-4 text-sm text-academic-500 dark:text-academic-400 font-medium uppercase tracking-wide">
                  <span>{item.institution}</span>
                  <span>&bull;</span>
                  <span>{item.period}</span>
                  <span>&bull;</span>
                  <span className="text-academic-accent dark:text-blue-400">{item.role}</span>
                </div>
                {item.description && (
                  <p className="text-academic-600 dark:text-academic-300 pt-2 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Teaching;
