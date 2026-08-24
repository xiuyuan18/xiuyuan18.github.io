import type { Metadata } from 'next';
import Home from '@/src/views/Home';

export const metadata: Metadata = {
    alternates: { canonical: '/' },
};

export default function Page() {
    return <Home />;
}
