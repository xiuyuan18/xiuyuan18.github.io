import React from 'react';
import { DATA } from '../constants';
import { BookOpen } from 'lucide-react';

const Teaching: React.FC = () => {
  return (
    <div className="space-y-12 animate-fadeIn">
      <div className="border-b border-academic-100 pb-4">
        <h1 className="text-3xl font-serif font-bold text-academic-900">Teaching</h1>
      </div>

      <div className="grid gap-6">
        {DATA.teaching.map((item) => (
          <div key={item.id} className="bg-white border border-academic-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-academic-50 rounded-full text-academic-600">
                <BookOpen size={24} />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-academic-900">{item.course}</h3>
                <div className="flex flex-wrap gap-y-1 gap-x-4 text-sm text-academic-500 font-medium uppercase tracking-wide">
                  <span>{item.institution}</span>
                  <span>&bull;</span>
                  <span>{item.period}</span>
                  <span>&bull;</span>
                  <span className="text-academic-accent">{item.role}</span>
                </div>
                {item.description && (
                  <p className="text-academic-600 pt-2 leading-relaxed">
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