'use client';

import { useCallback, useEffect, useRef } from 'react';

interface HtmlPostFrameProps {
    slug: string;
    title: string;
}

export default function HtmlPostFrame({ slug, title }: HtmlPostFrameProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const observerRef = useRef<ResizeObserver | null>(null);
    const timersRef = useRef<number[]>([]);

    const cleanup = useCallback(() => {
        observerRef.current?.disconnect();
        observerRef.current = null;
        timersRef.current.forEach((timer) => window.clearTimeout(timer));
        timersRef.current = [];
    }, []);

    useEffect(() => cleanup, [cleanup]);

    const handleLoad = () => {
        cleanup();
        const iframe = iframeRef.current;
        if (!iframe?.contentWindow) return;

        try {
            const doc = iframe.contentWindow.document;
            if (!doc.getElementById('academic-site-iframe-styles')) {
                const style = doc.createElement('style');
                style.id = 'academic-site-iframe-styles';
                style.textContent = `
                    body { font-family: 'Inter', sans-serif; margin: 0; padding: 0; overflow-y: hidden; background: transparent; }
                    .container { width: 100% !important; max-width: 100% !important; padding-inline: 0 !important; }
                    .jp-Notebook { margin: 0 !important; padding: 0 !important; }
                    .jp-Cell { padding-inline: 0 !important; }
                `;
                doc.head.appendChild(style);
            }

            const updateHeight = () => {
                iframe.style.height = `${doc.documentElement.scrollHeight}px`;
            };

            updateHeight();
            if (typeof ResizeObserver !== 'undefined') {
                observerRef.current = new ResizeObserver(updateHeight);
                observerRef.current.observe(doc.body);
            }
            timersRef.current = [500, 1500, 3000].map((delay) => window.setTimeout(updateHeight, delay));
        } catch {
            iframe.style.height = '70vh';
        }
    };

    const publicBase = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
    const baseUrl = publicBase.endsWith('/') ? publicBase : `${publicBase}/`;

    return (
        <iframe
            ref={iframeRef}
            src={`${baseUrl}assets/posts/${encodeURIComponent(slug)}.html`}
            className="block min-h-[500px] w-full border-0"
            title={title}
            onLoad={handleLoad}
        />
    );
}
