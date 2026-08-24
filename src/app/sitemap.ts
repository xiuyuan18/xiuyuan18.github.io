import type { MetadataRoute } from 'next';
import { DATA } from '@/src/constants';

const SITE_URL = 'https://xiuyuan18.github.io';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
    const entries: MetadataRoute.Sitemap = [
        { url: SITE_URL, changeFrequency: 'monthly', priority: 1 },
    ];

    if (DATA.config.showPublicationsPage) {
        entries.push({ url: `${SITE_URL}/publications`, changeFrequency: 'monthly', priority: 0.8 });
    }

    if (DATA.config.showTeachingPage) {
        entries.push({ url: `${SITE_URL}/teaching`, changeFrequency: 'yearly', priority: 0.5 });
    }

    if (DATA.config.showBlogPage) {
        entries.push({ url: `${SITE_URL}/blog`, changeFrequency: 'monthly', priority: 0.7 });
        entries.push(...DATA.blog.map((post) => ({
            url: `${SITE_URL}/blog/${encodeURIComponent(post.slug)}`,
            changeFrequency: 'yearly' as const,
            priority: 0.6,
        })));
    }

    return entries;
}
