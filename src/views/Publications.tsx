import React from 'react';
import { DATA } from '@/src/constants';
import MediaTeaser from '../components/MediaTeaser';
import PageHeader from '@/src/components/PageHeader';
import { isAuthorMe, resolvePublicationTeaser } from '@/src/lib/utils';

const Publications: React.FC = () => {
  const pubsByYear = DATA.publications.reduce((acc, pub) => {
    const year = pub.year;
    if (!acc[year]) acc[year] = [];
    acc[year].push(pub);
    return acc;
  }, {} as Record<number, typeof DATA.publications>);

  const years = Object.keys(pubsByYear).map(Number).sort((a, b) => b - a);

  return (
    <div className="space-y-12 animate-fadeIn">
      <PageHeader title="All Publications" />

      <div className="space-y-12">
        {years.map((year) => (
          <section key={year} className="relative">
            <h2 className="text-8xl font-bold text-academic-100 dark:text-academic-700/50 absolute -top-10 -left-4 -z-10 opacity-50 select-none">
              {year}
            </h2>
            <div className="space-y-8 pt-4">
              {pubsByYear[year].map((pub) => {
                const teaser = resolvePublicationTeaser(pub);
                return (
                <div key={pub.id} className="flex flex-col md:flex-row gap-6 items-start">

                  <MediaTeaser
                    className="w-full md:w-48 shrink-0 h-32"
                    videoSrc={teaser.videoSrc}
                    imageSrc={teaser.imageSrc}
                    alt={`${pub.title} teaser`}
                  />

                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-bold text-academic-900 dark:text-academic-100">
                      {pub.title}
                    </h3>
                    <div className="text-academic-700 dark:text-academic-300 text-sm">
                      {pub.authors.map((author, idx) => (
                        <span key={idx} className={isAuthorMe(author) ? "font-bold text-academic-900 dark:text-academic-100 border-b border-academic-300 dark:border-academic-600" : ""}>
                          {author}{idx < pub.authors.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm font-semibold text-academic-500 dark:text-academic-400">
                      {pub.venue}
                    </div>
                    {pub.abstract && (
                      <p className="text-sm text-academic-500 dark:text-academic-400 leading-relaxed">
                        {pub.abstract}
                      </p>
                    )}
                    <div className="flex gap-3 pt-1">
                      {pub.links?.map((link, i) => (
                        <a
                          key={i}
                          href={link.url}
                          className="text-xs font-bold text-academic-accent dark:text-blue-400 hover:text-academic-800 dark:hover:text-academic-200 hover:underline"
                        >
                          [{link.label}]
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Publications;
