
import React from 'react';
import { Link } from 'react-router-dom';
import { DATA } from '../constants';
import { Mail, MapPin, Link as LinkIcon, ChevronRight, FileText, Award } from 'lucide-react';

const Home: React.FC = () => {
  // Simple Icons SVGs
  const iconMap: Record<string, React.ReactNode> = {
    github: (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
        <title>GitHub</title>
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
    scholar: (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
        <title>Google Scholar</title>
        <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z" />
      </svg>
    ),
    orcid: (
      <svg role="img" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
        <title>ORCID</title>
        <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM4.5 19h-2.5V7h2.5v12zm-1.25-13.36c-.714 0-1.25-.536-1.25-1.25s.536-1.25 1.25-1.25 1.25.536 1.25 1.25-.536 1.25-1.25 1.25zm13.415 9.625c-.335.938-1.022 1.613-2.063 2.025-1.04.413-2.25.613-3.625.613h-4.475V7h4.475c1.375 0 2.585.2 3.625.613 1.04.413 1.728 1.088 2.063 2.025.336.938.504 2.075.504 3.413 0 1.338-.168 2.475-.504 3.413zm-2.063-6.3c-.25-.75-.78-1.3-1.588-1.65-.807-.35-1.87-.525-3.188-.525h-1.925v8.35h1.925c1.318 0 2.38-.175 3.188-.525.808-.35 1.338-.9 1.588-1.65.25-.75.375-1.625.375-2.625 0-1-.125-1.875-.375-2.625z" />
      </svg>
    ),
  };

  return (
    <div className="space-y-16 animate-fadeIn">
      {/* Profile Section */}
      <section className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
        <div className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0 relative">
          <img
            src={DATA.profile.image}
            alt={DATA.profile.name}
            className="w-full h-full object-cover rounded-full shadow-md border-4 border-white ring-1 ring-academic-100"
          />
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-academic-900 mb-2">
              {DATA.profile.name}
            </h1>
            <p className="text-lg md:text-xl text-academic-600 font-medium">
              {DATA.profile.title}
            </p>
            <p className="text-academic-500 flex items-center gap-2 mt-1">
              <span className="font-semibold">{DATA.profile.affiliation}</span>
            </p>
          </div>

          <div className="flex flex-col space-y-1 text-academic-600 text-sm">
             <div className="flex items-center gap-2 hover:text-academic-accent transition-colors w-fit">
                <Mail size={16} />
                <a href={`mailto:${DATA.profile.email}`}>{DATA.profile.email}</a>
             </div>
             <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>{DATA.profile.location}</span>
             </div>
          </div>

          <div className="flex items-center gap-3 pt-2 flex-wrap">
            {DATA.profile.socials.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-academic-50 text-academic-600 rounded-full hover:bg-academic-100 hover:text-academic-900 transition-all"
                title={link.label}
              >
                {link.icon && iconMap[link.icon] ? iconMap[link.icon] : <LinkIcon size={16}/>}
              </a>
            ))}
            
            {/* CV Button */}
            {DATA.profile.cv && (
               <a 
                  href={DATA.profile.cv} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-academic-800 text-white text-sm font-medium rounded-full hover:bg-academic-700 transition-colors ml-2 shadow-sm"
               >
                 <FileText size={14} />
                 <span>CV</span>
               </a>
            )}
          </div>

          <div className="prose prose-academic text-academic-700 leading-relaxed max-w-none pt-4">
             <p>{DATA.profile.longBio}</p>
          </div>
        </div>
      </section>

      <hr className="border-academic-100" />

      {/* News Section */}
      <section>
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl font-serif font-bold text-academic-800">News</h2>
        </div>
        <div className="space-y-4">
          {DATA.news.slice(0, 3).map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row gap-2 sm:gap-6">
              <span className="text-sm font-bold text-academic-400 font-mono whitespace-nowrap w-24 shrink-0">
                {item.date}
              </span>
              <div className="text-academic-700" dangerouslySetInnerHTML={{ __html: item.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            </div>
          ))}
        </div>
      </section>

      <hr className="border-academic-100" />

      {/* Selected Publications */}
      <section>
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="text-2xl font-serif font-bold text-academic-800">Selected Publications</h2>
          {DATA.config.showPublicationsPage && (
            <Link to="/publications" className="text-sm font-medium text-academic-accent hover:text-academic-800 flex items-center gap-1">
              View All <ChevronRight size={14} />
            </Link>
          )}
        </div>
        
        <div className="space-y-8">
          {DATA.publications.filter(p => p.highlight).map((pub) => (
            <div key={pub.id} className="flex flex-col md:flex-row gap-6 group">
              
              {/* Teaser Section */}
              {pub.teaser && (
                <div className="w-full md:w-48 shrink-0">
                  {pub.teaser.endsWith('.mp4') || pub.teaser.endsWith('.webm') ? (
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
                  )}
                </div>
              )}

              <div className="flex-1 flex flex-col space-y-2">
                <h3 className="text-lg font-bold text-academic-900 group-hover:text-academic-accent transition-colors">
                  {pub.title}
                </h3>
                <div className="text-academic-700">
                  {pub.authors.map((author, idx) => (
                    <span key={idx} className={author === DATA.profile.name ? "font-bold text-academic-900" : ""}>
                      {author}{idx < pub.authors.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-sm italic text-academic-500">
                  <span>{pub.venue} {pub.year}</span>
                </div>
                {pub.links && (
                  <div className="flex gap-3 pt-1">
                    {pub.links.map((link, i) => (
                      <a 
                        key={i} 
                        href={link.url}
                        className="text-xs font-medium px-2 py-1 rounded border border-academic-200 hover:bg-academic-50 hover:border-academic-300 transition-colors text-academic-600 uppercase tracking-wider"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="border-academic-100" />

      {/* Honors and Awards */}
      <section>
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl font-serif font-bold text-academic-800">Honors & Awards</h2>
        </div>
        <div className="space-y-4">
          {DATA.awards.map((award) => (
            <div key={award.id} className="flex items-start gap-4 group">
               <div className="p-2 bg-academic-50 rounded-full text-academic-500 group-hover:bg-academic-100 group-hover:text-academic-700 transition-colors">
                  <Award size={18} />
               </div>
               <div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                     <span className="font-bold text-academic-900">{award.title}</span>
                     <span className="hidden sm:inline text-academic-300">&mdash;</span>
                     <span className="text-academic-600">{award.awarder}</span>
                  </div>
                  <div className="text-sm text-academic-400 mt-1 font-medium">{award.date}</div>
               </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
