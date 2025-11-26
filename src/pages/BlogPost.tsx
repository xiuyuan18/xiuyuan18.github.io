"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { DATA } from '../constants';
import { ArrowLeft } from 'lucide-react';

interface BlogPostProps {
    initialContent?: string;
    slug?: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ initialContent, slug: propSlug }) => {
    const params = useParams();

    // Prioritize propSlug, then decoded param slug
    const slug = propSlug || decodeURIComponent(
        (Array.isArray((params as any)?.slug)
            ? (params as any).slug[0]
            : (params as any)?.slug ?? '')
    );

    const [content, setContent] = useState(initialContent || '');
    const [loading, setLoading] = useState(!initialContent);

    const post = DATA.blog.find(p => p.slug === slug);

    useEffect(() => {
        // If content is already available (passed from server), skip fetch
        if (initialContent || content) {
            setLoading(false);
            return;
        }

        if (!post) return;

        const filePath = `/assets/posts/${post.slug}.md`;

        fetch(filePath)
            .then(res => {
                if (!res.ok) throw new Error(`Failed to load post`);
                return res.text();
            })
            .then(text => {
                // Check for HTML response (404 page)
                if (text.trim().startsWith('<')) {
                    throw new Error('Invalid content');
                }
                setContent(text);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [post, initialContent, content]); // Added content to deps to prevent re-fetching

    if (!post) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-academic-900">Post not found</h2>
                <Link href="/blog" className="text-academic-accent hover:underline mt-4 inline-block">Back to Blog</Link>
            </div>
        );
    }

    return (
        <div className="animate-fadeIn max-w-3xl mx-auto">
            <Link href="/blog" className="inline-flex items-center text-academic-500 hover:text-academic-accent transition-colors mb-8">
                <ArrowLeft size={16} className="mr-2" /> Back to Blog
            </Link>

            <header className="mb-10 border-b border-academic-100 pb-8">
                <div className="text-sm font-mono text-academic-400 mb-2">{post.date}</div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-academic-900 mb-4">{post.title}</h1>
                <p className="text-lg text-academic-600 leading-relaxed italic">{post.summary}</p>
            </header>

            <article className="prose prose-academic max-w-none text-academic-800">
                {loading ? (
                    <div className="space-y-4 animate-pulse">
                        <div className="h-4 bg-academic-100 rounded w-3/4"></div>
                        <div className="h-4 bg-academic-100 rounded w-full"></div>
                        <div className="h-4 bg-academic-100 rounded w-5/6"></div>
                    </div>
                ) : (
                    <ReactMarkdown
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                        components={{
                            h1: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-8 mb-4 text-academic-900" {...props} />,
                            h2: ({ node, ...props }) => <h3 className="text-xl font-bold mt-6 mb-3 text-academic-900" {...props} />,
                            h3: ({ node, ...props }) => <h4 className="text-lg font-bold mt-4 mb-2 text-academic-900" {...props} />,
                            p: ({ node, ...props }) => <p className="mb-4 leading-relaxed" {...props} />,
                            ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 space-y-1 pl-4" {...props} />,
                            ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 space-y-1 pl-4" {...props} />,
                            li: ({ node, ...props }) => <li className="pl-1" {...props} />,
                            a: ({ node, ...props }) => <a className="text-academic-accent hover:underline font-medium" {...props} />,
                            blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-academic-200 pl-4 italic text-academic-600 my-6" {...props} />,
                            code: ({ node, ...props }) => {
                                // @ts-ignore
                                const { inline, className, children } = props;
                                if (inline) {
                                    return <code className="bg-academic-100 px-1.5 py-0.5 rounded text-sm font-mono text-academic-800" {...props} />;
                                }
                                return <code className="block bg-academic-900 text-academic-50 p-4 rounded-lg overflow-x-auto text-sm font-mono my-6" {...props} />;
                            },
                            img: ({ node, ...props }) => <img className="rounded-lg shadow-sm my-6 max-w-full h-auto border border-academic-100" {...props} />,
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                )}
            </article>
        </div>
    );
};

export default BlogPost;
