import React from 'react';
import Link from 'next/link';
import { DATA } from '@/src/constants';
import { Mail, MapPin, Link as LinkIcon, ChevronRight, FileText, Award, GraduationCap } from 'lucide-react';
import MediaTeaser from '../components/MediaTeaser';
import { isAuthorMe, resolvePublicationTeaser } from '@/src/lib/utils';
import { getIconComponent } from '@/src/components/icons';

const Home: React.FC = () => {

  return (
    <div className="space-y-16 animate-fadeIn">
      {/* Profile Section */}
      <section className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
        <div className="w-32 h-32 md:w-48 md:h-48 shrink-0 relative">
          <img
            src={DATA.profile.image}
            alt={DATA.profile.name}
            className="w-full h-full object-cover rounded-full shadow-md border-4 border-white ring-1 ring-academic-100"
          />
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-academic-900 dark:text-academic-100 mb-2">
              {DATA.profile.name}
            </h1>
            <p className="text-lg md:text-xl text-academic-600 dark:text-academic-400 font-medium">
              {DATA.profile.title}
            </p>
            <p className="text-academic-500 dark:text-academic-400 flex items-center gap-2 mt-1">
              <span className="font-semibold">{DATA.profile.affiliation}</span>
            </p>
          </div>

          <div className="flex flex-col space-y-1 text-academic-600 dark:text-academic-400 text-sm">
            <div className="flex items-center gap-2 hover:text-academic-accent dark:hover:text-blue-400 transition-colors w-fit">
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
                className="p-2 bg-academic-50 dark:bg-academic-700 text-academic-600 dark:text-academic-400 rounded-full hover:bg-academic-100 dark:hover:bg-academic-600 hover:text-academic-900 dark:hover:text-academic-100 transition-all"
                title={link.label}
              >
                {(() => { const Icon = getIconComponent(link.icon); return Icon ? <Icon /> : <LinkIcon size={16} />; })()}
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

          <div className="prose prose-academic dark:text-academic-300 leading-relaxed max-w-none pt-4">
            <p>{DATA.profile.longBio}</p>
          </div>

          {/* Education Section */}
          <div className="pt-6">
            <h2 className="text-xl font-serif font-bold text-academic-900 dark:text-academic-100 mb-4 flex items-center gap-2">
              <GraduationCap size={20} className="text-academic-400 dark:text-academic-500" />
              Education
            </h2>
            <div className="space-y-3">
              {DATA.profile.education.map((edu, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <div>
                    <div className="font-bold text-academic-900 dark:text-academic-100">{edu.institution}</div>
                    <div className="text-academic-700 dark:text-academic-300">{edu.degree}</div>
                  </div>
                  <div className="text-academic-500 dark:text-academic-400 font-mono text-sm mt-1 sm:mt-0">{edu.year}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <hr className="border-academic-100 dark:border-academic-700" />

      {/* News Section */}
      <section>
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl font-serif font-bold text-academic-800 dark:text-academic-100">News</h2>
        </div>
        <div className="space-y-4">
          {DATA.news.slice(0, 3).map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row gap-2 sm:gap-6">
              <span className="text-sm font-bold text-academic-400 dark:text-academic-500 font-mono whitespace-nowrap w-24 shrink-0">
                {item.date}
              </span>
              <div className="text-academic-700 dark:text-academic-300" dangerouslySetInnerHTML={{ __html: item.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            </div>
          ))}
        </div>
      </section>

      <hr className="border-academic-100 dark:border-academic-700" />

      {/* Selected Publications */}
      <section>
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="text-2xl font-serif font-bold text-academic-800 dark:text-academic-100">Selected Publications</h2>
          {DATA.config.showPublicationsPage && (
            <Link href="/publications" className="text-sm font-medium text-academic-accent dark:text-blue-400 hover:text-academic-800 dark:hover:text-academic-200 flex items-center gap-1">
              View All <ChevronRight size={14} />
            </Link>
          )}
        </div>

        <div className="space-y-8">
          {DATA.publications.filter(p => p.highlight).map((pub) => {
            const teaser = resolvePublicationTeaser(pub);
            return (
            <div key={pub.id} className="flex flex-col md:flex-row gap-6 group">

              <MediaTeaser
                className="w-full md:w-48 shrink-0 h-32"
                videoSrc={teaser.videoSrc}
                imageSrc={teaser.imageSrc}
                alt={`${pub.title} teaser`}
              />

              <div className="flex-1 flex flex-col space-y-2">
                <h3 className="text-lg font-bold text-academic-900 dark:text-academic-100 group-hover:text-academic-accent dark:group-hover:text-blue-400 transition-colors">
                  {pub.title}
                </h3>
                <div className="text-academic-700 dark:text-academic-300">
                  {pub.authors.map((author, idx) => (
                    <span key={idx} className={isAuthorMe(author) ? "font-bold text-academic-900 dark:text-academic-100" : ""}>
                      {author}{idx < pub.authors.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3 text-sm italic text-academic-500 dark:text-academic-400">
                  <span>{pub.venue} {pub.year}</span>
                </div>
                {pub.links && (
                  <div className="flex gap-3 pt-1">
                    {pub.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        className="text-xs font-medium px-2 py-1 rounded border border-academic-200 dark:border-academic-600 hover:bg-academic-50 dark:hover:bg-academic-700 hover:border-academic-300 dark:hover:border-academic-500 transition-colors text-academic-600 dark:text-academic-400 uppercase tracking-wider"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
          })}
        </div>
      </section>

      <hr className="border-academic-100 dark:border-academic-700" />

      {/* Honors and Awards */}
      <section>
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl font-serif font-bold text-academic-800 dark:text-academic-100">Honors & Awards</h2>
        </div>
        <div className="space-y-4">
          {DATA.awards.map((award) => (
            <div key={award.id} className="flex items-start gap-4 group">
              <div className="p-2 bg-academic-50 dark:bg-academic-700 rounded-full text-academic-500 dark:text-academic-400 group-hover:bg-academic-100 dark:group-hover:bg-academic-600 group-hover:text-academic-700 dark:group-hover:text-academic-200 transition-colors">
                <Award size={18} />
              </div>
              <div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                  <span className="font-bold text-academic-900 dark:text-academic-100">{award.title}</span>
                  <span className="hidden sm:inline text-academic-300 dark:text-academic-600">&mdash;</span>
                  <span className="text-academic-600 dark:text-academic-400">{award.awarder}</span>
                </div>
                <div className="text-sm text-academic-400 dark:text-academic-500 mt-1 font-medium">{award.date}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
