'use client';
import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { DATA } from '@/src/constants';
import { ArrowLeft } from 'lucide-react';

interface BlogPostProps {
    initialContent?: string;
    slug?: string;
}

function getSlug(params: ReturnType<typeof useParams>, propSlug?: string): string {
    if (propSlug) return propSlug;
    const raw = params?.slug;
    if (!raw) return '';
    const rawSlug = Array.isArray(raw) ? raw[0] : raw;
    return decodeURIComponent(rawSlug);
}

const BlogPost: React.FC<BlogPostProps> = ({ initialContent, slug: propSlug }) => {
    const params = useParams();
    const slug = getSlug(params, propSlug);

    const [content, setContent] = useState(initialContent || '');
    const [loading, setLoading] = useState(!initialContent);
    const [error, setError] = useState<string | null>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const post = DATA.blog.find(p => p.slug === slug);
    const isHtml = post?.format === 'html';

    const publicBase = process.env.NEXT_PUBLIC_BASE_PATH || '';
    const baseUrl = publicBase.endsWith('/') ? publicBase : `${publicBase}/`;

    useEffect(() => {
        if (initialContent || content) {
            setLoading(false);
            return;
        }

        if (!post) return;

        if (isHtml) {
            setLoading(false);
            return;
        }

        setLoading(true);
        const filePath = `${baseUrl}assets/posts/${post.slug}.md`;

        fetch(filePath)
            .then(res => {
                if (!res.ok) throw new Error(`Failed to load post: ${res.status} ${res.statusText}`);
                return res.text();
            })
            .then(text => {
                if (text.includes('<div id="root">') && text.includes('<!DOCTYPE html>')) {
                    throw new Error('File not found (received SPA index.html)');
                }
                setContent(text);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError(err instanceof Error ? err.message : 'Failed to load post');
                setLoading(false);
            });
    }, [post, isHtml, baseUrl, initialContent, content]);

    const handleIframeLoad = () => {
        const iframe = iframeRef.current;
        if (!iframe?.contentWindow) return;

        try {
            const doc = iframe.contentWindow.document;
            const style = doc.createElement('style');
            style.textContent = `
                body {
                    font-family: 'Inter', sans-serif;
                    margin: 0;
                    padding: 0;
                    overflow-y: hidden;
                    background-color: transparent;
                }
                .container { width: 100% !important; max-width: 100% !important; padding-left: 0 !important; padding-right: 0 !important; }
                .jp-Notebook { margin: 0 !important; padding: 0 !important; }
                .jp-Cell { padding-left: 0 !important; padding-right: 0 !important; }
            `;
            doc.head.appendChild(style);

            const updateHeight = () => {
                if (iframe.contentWindow) {
                    iframe.style.height = `${iframe.contentWindow.document.documentElement.scrollHeight}px`;
                }
            };

            updateHeight();

            if (typeof ResizeObserver !== 'undefined') {
                const observer = new ResizeObserver(updateHeight);
                observer.observe(doc.body);
            }

            setTimeout(updateHeight, 500);
            setTimeout(updateHeight, 1500);
            setTimeout(updateHeight, 3000);
        } catch (e) {
            console.warn("Could not access iframe content for resizing (likely CORS).");
        }
    };

    if (!post) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-academic-900">Post not found</h2>
                <Link href="/blog" className="text-academic-accent hover:underline mt-4 inline-block">Back to Blog</Link>
            </div>
        );
    }

    return (
        <div className={`animate-fadeIn mx-auto ${isHtml ? 'max-w-5xl w-full' : 'max-w-3xl'}`}>
            <Link href="/blog" className="inline-flex items-center text-academic-500 hover:text-academic-accent transition-colors mb-8">
                <ArrowLeft size={16} className="mr-2" aria-hidden="true" /> Back to Blog
            </Link>

            <header className="mb-10 border-b border-academic-100 pb-8">
                <div className="text-sm font-mono text-academic-400 mb-2">{post.date}</div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-academic-900 mb-4">{post.title}</h1>
                <p className="text-lg text-academic-600 leading-relaxed italic">{post.summary}</p>
            </header>

            <article className={`prose prose-academic max-w-none text-academic-800 ${isHtml ? 'w-full' : ''}`}>
                {loading ? (
                    <div className="space-y-4 animate-pulse">
                        <div className="h-4 bg-academic-100 rounded w-3/4"></div>
                        <div className="h-4 bg-academic-100 rounded w-full"></div>
                        <div className="h-4 bg-academic-100 rounded w-5/6"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-8 text-academic-700">
                        <p className="text-lg font-medium">Failed to load post</p>
                        <p className="text-sm text-academic-500 mt-2">{error}</p>
                    </div>
                ) : isHtml ? (
                    <iframe
                        ref={iframeRef}
                        src={`${baseUrl}assets/posts/${post.slug}.html`}
                        className="w-full border-none overflow-hidden block"
                        style={{ minHeight: '500px' }}
                        title={post.title}
                        onLoad={handleIframeLoad}
                    />
                ) : (
                    <ReactMarkdown
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                        components={{
                            h1: ({ children, ...props }) => <h2 className="text-2xl font-bold mt-8 mb-4 text-academic-900" {...props}>{children}</h2>,
                            h2: ({ children, ...props }) => <h3 className="text-xl font-bold mt-6 mb-3 text-academic-900" {...props}>{children}</h3>,
                            h3: ({ children, ...props }) => <h4 className="text-lg font-bold mt-4 mb-2 text-academic-900" {...props}>{children}</h4>,
                            p: ({ children, ...props }) => <p className="mb-4 text-justify leading-relaxed" {...props}>{children}</p>,
                            ul: ({ children, ...props }) => <ul className="list-disc list-inside mb-4 space-y-1 pl-4" {...props}>{children}</ul>,
                            ol: ({ children, ...props }) => <ol className="list-decimal list-inside mb-4 space-y-1 pl-4" {...props}>{children}</ol>,
                            li: ({ children, ...props }) => <li className="pl-1" {...props}>{children}</li>,
                            a: ({ children, ...props }) => <a className="text-academic-accent hover:underline font-medium" {...props}>{children}</a>,
                            blockquote: ({ children, ...props }) => <blockquote className="border-l-4 border-academic-200 pl-4 italic text-academic-600 my-6" {...props}>{children}</blockquote>,
                            code: ({ className, children, ...props }) => {
                                const inline = !className;
                                if (inline) {
                                    return <code className="bg-academic-100 px-1.5 py-0.5 rounded text-sm font-mono text-academic-800" {...props}>{children}</code>;
                                }
                                return <code className="block bg-academic-900 text-academic-50 p-4 rounded-lg overflow-x-auto text-sm font-mono my-6" {...props}>{children}</code>;
                            },
                            img: ({ children, ...props }) => <img className="rounded-lg shadow-sm my-6 max-w-full h-auto border border-academic-100" {...props} />,
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
