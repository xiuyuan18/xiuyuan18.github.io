import React from 'react';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />
            <main className="grow max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
                {children}
            </main>
            <Footer />
        </div>
    );
}

