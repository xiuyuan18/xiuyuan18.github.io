import React from 'react';
import { DATA } from '@/src/constants';
import SiteLayout from '../../(site)/layout';
import BlogPost from '@/src/pages/BlogPost';

export function generateStaticParams() {
    return DATA.blog.map((post) => ({ slug: post.slug }));
}

export default function BlogSlugPage() {
    return (
        <SiteLayout>
            <BlogPost />
        </SiteLayout>
    );
}
