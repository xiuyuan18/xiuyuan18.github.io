import React from 'react';
import Link from 'next/link';
import { DATA } from '@/src/constants';
import PageHeader from '@/src/components/PageHeader';

const Blog: React.FC = () => {
  return (
    <div className="space-y-12 animate-fadeIn">
      <PageHeader title="Blog" />

      <div className="space-y-8">
        {DATA.blog.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="block group cursor-pointer">
            <div className="flex flex-col gap-2">
              <span className="text-sm font-mono text-academic-400">{post.date}</span>
              <h2 className="text-xl font-bold text-academic-900 group-hover:text-academic-accent transition-colors">
                {post.title}
              </h2>
              <p className="text-academic-600 leading-relaxed">
                {post.summary}
              </p>
              <div className="pt-2">
                <span className="text-sm font-medium text-academic-accent group-hover:underline">Read more &rarr;</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {DATA.blog.length === 0 && (
        <div className="text-center text-academic-500 py-12">
          <p>No blog posts yet.</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
