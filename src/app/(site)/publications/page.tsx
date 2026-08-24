import type { Metadata } from 'next';
import Publications from '@/src/views/Publications';

export const metadata: Metadata = {
    title: 'Publications',
    description: 'Research publications by Xiuyuan Yu in computer vision, 3D reconstruction, and 4D reconstruction.',
    alternates: { canonical: '/publications' },
};

export default function PublicationsPage() {
    return <Publications />;
}
