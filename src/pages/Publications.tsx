
import React from 'react';
import { DATA } from '../constants';

const Publications: React.FC = () => {
  // Group by year
  const pubsByYear = DATA.publications.reduce((acc, pub) => {
    const year = pub.year;
    if (!acc[year]) acc[year] = [];
    acc[year].push(pub);
    return acc;
  }, {} as Record<number, typeof DATA.publications>);

  const years = Object.keys(pubsByYear).map(Number).sort((a, b) => b - a);

  // Helper to determine if the author is the profile owner
  const isAuthorMe = (author: string) => {
    return author === DATA.profile.name || author === DATA.profile.publicationName;
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      <div className="border-b border-academic-100 pb-4">
        <h1 className="text-3xl font-serif font-bold text-academic-900">All Publications</h1>
      </div>

      <div className="space-y-12">
        {years.map((year) => (
          <section key={year} className="relative">
            <h2 className="text-8xl font-bold text-academic-100 absolute -top-10 -left-4 -z-10 opacity-50 select-none">
              {year}
            </h2>
            <div className="space-y-8 pt-4">
              {pubsByYear[year].map((pub) => (
                <div key={pub.id} className="flex flex-col md:flex-row gap-6 items-start">
                  
                   {/* Teaser Section */}
                  <div className="w-full md:w-48 shrink-0">
                    {pub.teaser ? (
                       pub.teaser.endsWith('.mp4') || pub.teaser.endsWith('.webm') ? (
                        <video 
                          src={pub.teaser} 
                          autoPlay 
                          muted 
                          loop 
                          playsInline
                          className="w-full h-32 object-cover rounded-lg border border-academic-100 shadow-sm"
                        />
                      ) : (
                        <img 
                          src={pub.teaser} 
                          alt={`${pub.title} teaser`} 
                          className="w-full h-32 object-cover rounded-lg border border-academic-100 shadow-sm"
                        />
                      )
                    ) : (
                      // Fallback for layout alignment if no teaser exists, or remove if preferred
                      <div className="w-full h-32 bg-academic-50 rounded-lg border border-academic-100 flex items-center justify-center text-academic-300 text-xs">
                        <span className="inline-block px-2 py-1 bg-white rounded border border-academic-100">{pub.venue}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 space-y-2">
                    <h3 className="text-lg font-bold text-academic-900">
                      {pub.title}
                    </h3>
                    <div className="text-academic-700 text-sm">
                      {pub.authors.map((author, idx) => (
                        <span key={idx} className={isAuthorMe(author) ? "font-bold text-academic-900 border-b border-academic-300" : ""}>
                          {author}{idx < pub.authors.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </div>
                    <div className="text-sm font-semibold text-academic-500">
                      {pub.venue}
                    </div>
                    {pub.abstract && (
                      <p className="text-sm text-academic-500 leading-relaxed">
                        {pub.abstract}
                      </p>
                    )}
                    <div className="flex gap-3 pt-1">
                      {pub.links?.map((link, i) => (
                         <a 
                            key={i} 
                            href={link.url}
                            className="text-xs font-bold text-academic-accent hover:text-academic-800 hover:underline"
                          >
                            [{link.label}]
                          </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Publications;