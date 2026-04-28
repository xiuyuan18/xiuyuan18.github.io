import React from 'react';

export const GitHubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <title>GitHub</title>
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

export const ScholarIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <title>Google Scholar</title>
    <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z" />
  </svg>
);

export const OrcidIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg role="img" viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <title>ORCID</title>
    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM4.5 19h-2.5V7h2.5v12zm-1.25-13.36c-.714 0-1.25-.536-1.25-1.25s.536-1.25 1.25-1.25 1.25.536 1.25 1.25-.536 1.25-1.25 1.25zm13.415 9.625c-.335.938-1.022 1.613-2.063 2.025-1.04.413-2.25.613-3.625.613h-4.475V7h4.475c1.375 0 2.585.2 3.625.613 1.04.413 1.728 1.088 2.063 2.025.336.938.504 2.075.504 3.413 0 1.338-.168 2.475-.504 3.413zm-2.063-6.3c-.25-.75-.78-1.3-1.588-1.65-.807-.35-1.87-.525-3.188-.525h-1.925v8.35h1.925c1.318 0 2.38-.175 3.188-.525.808-.35 1.338-.9 1.588-1.65.25-.75.375-1.625.375-2.625 0-1-.125-1.875-.375-2.625z" />
  </svg>
);

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  github: GitHubIcon,
  scholar: ScholarIcon,
  orcid: OrcidIcon,
};

export function getIconComponent(iconName?: string): React.FC<{ className?: string }> | null {
  if (!iconName) return null;
  return iconMap[iconName] ?? null;
}
