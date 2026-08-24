import type { Metadata } from 'next';
import React from 'react';
import { DATA } from '@/src/constants';
import './global.css';

const siteUrl = new URL('https://xiuyuan18.github.io');

export const metadata: Metadata = {
    metadataBase: siteUrl,
    title: {
        default: `${DATA.profile.name} | Computer Vision Research`,
        template: `%s | ${DATA.profile.name}`,
    },
    description: DATA.profile.shortBio,
    authors: [{ name: DATA.profile.name, url: siteUrl }],
    creator: DATA.profile.name,
    keywords: ['computer vision', 'machine learning', '3D reconstruction', '4D reconstruction'],
    icons: {
        icon: '/assets/ph_icon.svg',
    },
    openGraph: {
        type: 'website',
        url: siteUrl,
        siteName: `${DATA.profile.name} — Academic Homepage`,
        title: `${DATA.profile.name} | Computer Vision Research`,
        description: DATA.profile.shortBio,
        images: [{
            url: '/assets/self_photo.webp',
            width: 512,
            height: 512,
            alt: DATA.profile.name,
        }],
    },
    twitter: {
        card: 'summary',
        title: `${DATA.profile.name} | Computer Vision Research`,
        description: DATA.profile.shortBio,
        images: ['/assets/self_photo.webp'],
    },
};

const themeScript = `
    (() => {
        try {
            const stored = localStorage.getItem('theme');
            const dark = stored === 'dark' || (!stored && matchMedia('(prefers-color-scheme: dark)').matches);
            document.documentElement.classList.toggle('dark', dark);
        } catch (_) {}
    })();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: themeScript }} />
            </head>
            <body>{children}</body>
        </html>
    );
}
