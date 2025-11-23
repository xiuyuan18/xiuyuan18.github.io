import React, { useEffect, useRef, useState } from 'react';

interface Props {
  videoSrc?: string;
  imageSrc?: string;
  alt: string;
  className?: string;
  ariaLabel?: string;
}

function getExt(url?: string) {
  if (!url) return '';
  const q = url.split('?')[0];
  const parts = q.split('.');
  return parts.length > 1 ? parts.pop()!.toLowerCase() : '';
}

function supportsVideoType(ext: string) {
  if (typeof document === 'undefined') return false;
  const v = document.createElement('video');
  if (!v || !v.canPlayType) return false;
  if (ext === 'mp4') return v.canPlayType('video/mp4') !== '';
  if (ext === 'webm') return v.canPlayType('video/webm') !== '';
  if (ext === 'ogg' || ext === 'ogv') return v.canPlayType('video/ogg') !== '';
  return false;
}

const MediaTeaser: React.FC<Props> = ({ videoSrc, imageSrc, alt, className, ariaLabel }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'video' | 'image' | 'placeholder'>('idle');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (status !== 'idle') return;
    const el = containerRef.current;
    if (!el) return;
    const doSelect = () => {
      setStatus('loading');
      const ext = getExt(videoSrc);
      const canPlay = videoSrc && supportsVideoType(ext);
      if (canPlay) {
        setStatus('video');
      } else if (imageSrc) {
        setStatus('image');
      } else {
        setStatus('placeholder');
      }
    };
    if (typeof window === 'undefined' || !("IntersectionObserver" in window)) {
      doSelect();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          observer.disconnect();
          doSelect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [videoSrc, imageSrc, status]);

  useEffect(() => {
    if (status !== 'video') return;
    const v = videoRef.current;
    if (!v) return;
    const playPromise = v.play();
    if (playPromise && typeof playPromise.then === 'function') {
      playPromise.catch(() => {
        if (imageSrc) setStatus('image');
        else setStatus('placeholder');
      });
    }
  }, [status, imageSrc]);

  return (
    <div ref={containerRef} className={className} aria-label={ariaLabel || alt} suppressHydrationWarning>
      {status === 'idle' || status === 'loading' ? (
        <div className="w-full h-full bg-academic-100 animate-pulse rounded-lg border border-academic-100" />
      ) : status === 'video' && videoSrc ? (
        <video
          ref={videoRef}
          src={videoSrc}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          poster={imageSrc}
          aria-label={alt}
          className="w-full h-full object-cover rounded-lg border border-academic-100 shadow-sm"
          onError={() => {
            if (imageSrc) setStatus('image');
            else setStatus('placeholder');
          }}
        />
      ) : status === 'image' && imageSrc ? (
        <img
          src={imageSrc}
          alt={alt}
          loading="lazy"
          className="w-full h-full object-cover rounded-lg border border-academic-100 shadow-sm"
          onError={() => setStatus('placeholder')}
        />
      ) : (
        <div
          className="w-full h-full bg-academic-50 rounded-lg border border-academic-100 flex items-center justify-center text-academic-400 text-xs"
          role="img"
          aria-label={`Missing teaser: ${alt}`}
        >
          <span>Media unavailable</span>
        </div>
      )}
    </div>
  );
};

export default MediaTeaser;