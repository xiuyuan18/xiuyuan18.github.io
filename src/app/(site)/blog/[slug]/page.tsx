import fs from 'fs';
import path from 'path';
import { DATA } from '@/src/constants';
import BlogPost from '@/src/views/BlogPost';

export function generateStaticParams() {
    return DATA.blog.map((post) => ({ slug: post.slug }));
}

export default async function BlogSlugPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);

    // Validate slug is a known post to prevent path traversal
    const post = DATA.blog.find(p => p.slug === decodedSlug);
    if (!post) {
        return <BlogPost slug={decodedSlug} />;
    }

    const filePath = path.join(process.cwd(), 'public', 'assets', 'posts', `${decodedSlug}.md`);
    let content = '';
    if (fs.existsSync(filePath)) {
        content = fs.readFileSync(filePath, 'utf8');
    } else {
        console.warn(`Markdown file not found: ${filePath}`);
    }

    return <BlogPost initialContent={content} slug={decodedSlug} />;
}
