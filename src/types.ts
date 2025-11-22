export interface Link {
  label: string;
  url: string;
  icon?: string; // Simple string identifier for icons
}

export interface Profile {
  name: string;
  publicationName?: string; // The name used in publication author lists (e.g., "Jane Doe" vs "Dr. Jane Doe")
  title: string;
  affiliation: string;
  email: string;
  image: string;
  shortBio: string;
  longBio: string;
  location: string;
  cv?: string; // Path to CV file
  socials: Link[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
}

export interface NewsItem {
  id: string;
  date: string;
  content: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  abstract?: string;
  tags?: string[];
  links?: Link[]; // PDF, Code, Video, etc.
  highlight?: boolean;
  teaser?: string; // Path to image or video
}

export interface TeachingItem {
  id: string;
  course: string;
  role: string;
  period: string;
  institution: string;
  description?: string;
}

export interface AwardItem {
  id: string;
  title: string;
  awarder: string;
  date: string; // e.g., "2023" or "Nov 2023"
  description?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  summary: string;
  content?: string; // Markdown content could go here
  slug: string;
}

export interface SiteConfig {
  showPublicationsPage: boolean;
  showTeachingPage: boolean;
  showBlogPage: boolean; // New config to toggle blog
}

export interface SiteData {
  config: SiteConfig;
  profile: Profile;
  news: NewsItem[];
  publications: Publication[];
  teaching: TeachingItem[];
  awards: AwardItem[]; // New awards data
  blog: BlogPost[];    // New blog data
}