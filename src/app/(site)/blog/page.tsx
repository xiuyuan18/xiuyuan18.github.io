import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DATA } from '@/src/constants';
import Blog from '@/src/views/Blog';

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Technical notes by Xiuyuan Yu on machine learning, mathematics, and computer vision.',
    alternates: { canonical: '/blog' },
};

export default function BlogPage() {
    if (!DATA.config.showBlogPage) notFound();
    return <Blog />;
}
