import fs from 'node:fs';
import path from 'node:path';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DATA } from '@/src/constants';
import BlogPostView from '@/src/views/BlogPost';

export const dynamicParams = false;

interface PageProps {
    params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
    return DATA.blog.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const post = DATA.blog.find((candidate) => candidate.slug === decodedSlug);

    if (!DATA.config.showBlogPage || !post) {
        return { robots: { index: false, follow: false } };
    }

    return {
        title: post.title,
        description: post.summary,
        alternates: { canonical: `/blog/${encodeURIComponent(post.slug)}` },
        openGraph: {
            type: 'article',
            title: post.title,
            description: post.summary,
            url: `/blog/${encodeURIComponent(post.slug)}`,
        },
    };
}

export default async function BlogSlugPage({ params }: PageProps) {
    if (!DATA.config.showBlogPage) notFound();

    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);
    const post = DATA.blog.find((candidate) => candidate.slug === decodedSlug);
    if (!post) notFound();

    const extension = post.format === 'html' ? 'html' : 'md';
    const filePath = path.join(process.cwd(), 'public', 'assets', 'posts', `${post.slug}.${extension}`);

    if (!fs.existsSync(filePath)) {
        throw new Error(`Blog asset not found: ${filePath}`);
    }

    const content = extension === 'md' ? fs.readFileSync(filePath, 'utf8') : undefined;
    return <BlogPostView post={post} content={content} />;
}
