import React from 'react';
import fs from 'fs';
import path from 'path';
import { DATA } from '@/src/constants';
import SiteLayout from '../../(site)/layout';
import BlogPost from '@/src/pages/BlogPost';

export function generateStaticParams() {
    return DATA.blog.map((post) => ({ slug: post.slug }));
}

// Async is required in Next.js 15 because params is a Promise
export default async function BlogSlugPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);

    // Construct path to markdown file
    const filePath = path.join(process.cwd(), 'public', 'assets', 'posts', `${decodedSlug}.md`);

    let content = '';
    // Check if file exists to prevent build errors, but log if missing
    if (fs.existsSync(filePath)) {
        content = fs.readFileSync(filePath, 'utf8');
    } else {
        console.warn(`Markdown file not found: ${filePath}`);
    }

    return (
        <SiteLayout>
            <BlogPost initialContent={content} slug={decodedSlug} />
        </SiteLayout>
    );
}
