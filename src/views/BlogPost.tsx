import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { ArrowLeft } from 'lucide-react';
import HtmlPostFrame from '@/src/components/HtmlPostFrame';
import type { BlogPost as BlogPostData } from '@/src/types';

/* eslint-disable @next/next/no-img-element -- Markdown images have author-defined URLs and dimensions. */

interface BlogPostProps {
    post: BlogPostData;
    content?: string;
}

export default function BlogPost({ post, content = '' }: BlogPostProps) {
    const isHtml = post.format === 'html';

    return (
        <div className={`animate-fadeIn mx-auto ${isHtml ? 'max-w-5xl w-full' : 'max-w-3xl'}`}>
            <Link href="/blog" className="inline-flex items-center text-academic-500 dark:text-academic-400 hover:text-academic-accent dark:hover:text-blue-400 transition-colors mb-8">
                <ArrowLeft size={16} className="mr-2" aria-hidden="true" /> Back to Blog
            </Link>

            <header className="mb-10 border-b border-academic-100 dark:border-academic-700 pb-8">
                <div className="text-sm font-mono text-academic-400 dark:text-academic-500 mb-2">{post.date}</div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-academic-900 dark:text-academic-100 mb-4">{post.title}</h1>
                <p className="text-lg text-academic-600 dark:text-academic-300 leading-relaxed italic">{post.summary}</p>
            </header>

            <article className={`prose prose-academic max-w-none text-academic-800 dark:text-academic-200 ${isHtml ? 'w-full' : ''}`}>
                {isHtml ? (
                    <HtmlPostFrame slug={post.slug} title={post.title} />
                ) : (
                    <ReactMarkdown
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                        components={{
                            h1: ({ children, ...props }) => <h2 className="text-2xl font-bold mt-8 mb-4 text-academic-900 dark:text-academic-100" {...props}>{children}</h2>,
                            h2: ({ children, ...props }) => <h3 className="text-xl font-bold mt-6 mb-3 text-academic-900 dark:text-academic-100" {...props}>{children}</h3>,
                            h3: ({ children, ...props }) => <h4 className="text-lg font-bold mt-4 mb-2 text-academic-900 dark:text-academic-100" {...props}>{children}</h4>,
                            p: ({ children, ...props }) => <p className="mb-4 text-justify leading-relaxed" {...props}>{children}</p>,
                            ul: ({ children, ...props }) => <ul className="list-disc list-inside mb-4 space-y-1 pl-4" {...props}>{children}</ul>,
                            ol: ({ children, ...props }) => <ol className="list-decimal list-inside mb-4 space-y-1 pl-4" {...props}>{children}</ol>,
                            li: ({ children, ...props }) => <li className="pl-1" {...props}>{children}</li>,
                            a: ({ children, ...props }) => <a className="text-academic-accent dark:text-blue-400 hover:underline font-medium" {...props}>{children}</a>,
                            blockquote: ({ children, ...props }) => <blockquote className="border-l-4 border-academic-200 dark:border-academic-600 pl-4 italic text-academic-600 dark:text-academic-400 my-6" {...props}>{children}</blockquote>,
                            pre: ({ children, ...props }) => <pre className="bg-academic-900 dark:bg-black text-academic-50 p-4 rounded-lg overflow-x-auto text-sm font-mono my-6" {...props}>{children}</pre>,
                            code: ({ className, children, ...props }) => className ? (
                                <code className={className} {...props}>{children}</code>
                            ) : (
                                <code className="bg-academic-100 dark:bg-academic-700 px-1.5 py-0.5 rounded text-sm font-mono text-academic-800 dark:text-academic-200" {...props}>{children}</code>
                            ),
                            img: ({ alt, ...props }) => <img alt={alt ?? ''} className="rounded-lg shadow-sm my-6 max-w-full h-auto border border-academic-100 dark:border-academic-700" loading="lazy" {...props} />,
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                )}
            </article>
        </div>
    );
}
