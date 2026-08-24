import React from 'react';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-academic-900">
            <a
                href="#main-content"
                className="fixed left-4 top-2 z-[100] -translate-y-16 rounded-md bg-academic-900 px-4 py-2 text-white transition-transform focus:translate-y-0 dark:bg-white dark:text-academic-900"
            >
                Skip to content
            </a>
            <Navbar />
            <main id="main-content" tabIndex={-1} className="grow max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                {children}
            </main>
            <Footer />
        </div>
    );
}
