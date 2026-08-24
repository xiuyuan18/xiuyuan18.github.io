import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DATA } from '@/src/constants';
import Teaching from '@/src/views/Teaching';

export const metadata: Metadata = {
    title: 'Teaching',
    description: 'Teaching activities by Xiuyuan Yu.',
    alternates: { canonical: '/teaching' },
};

export default function TeachingPage() {
    if (!DATA.config.showTeachingPage) notFound();
    return <Teaching />;
}
