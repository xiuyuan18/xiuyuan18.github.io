
import type { SiteData } from './types';

// =============================================================================
// CONFIGURATION: EDIT THIS FILE TO CUSTOMIZE YOUR WEBSITE
// =============================================================================

export const DATA: SiteData = {
  config: {
    showPublicationsPage: true, // Set to false to hide "Publications" link in navbar
    showTeachingPage: false,     // Set to false to hide "Teaching" link in navbar
    showBlogPage: false,        // Set to true to show "Blog" link in navbar
  },
  profile: {
    name: "Xiuyuan Yu",
    publicationName: "Xiuyuan Yu", // This name is used to boldface the author in the publication list
    title: "Undergraduate Student",
    affiliation: "The Chinese University of Hong Kong",
    email: "xyyu@link.cuhk.edu.hk",
    location: "Hong Kong, China",
    image: "/assets/self_photo.webp", // Replace with your photo
    cv: "/assets/cv.pdf", // Place your cv.pdf in the assets folder
    shortBio: "I am interested in spatial intelligence and 3D/4D world representations, particularly in learning structured representations that unify geometry, appearance, and dynamics from visual observations, and connecting them with multimodal reasoning.",
    longBio: `I am an undergraduate student in the ELITE Stream of the Artificial Intelligence: Systems and Technologies program at The Chinese University of Hong Kong (CUHK). I am interested in spatial intelligence, 3D/4D vision, and representation learning. In particular, I am interested in how structured representations of the visual world can emerge from observations and capture geometry, appearance, and dynamics, and how such representations can bridge visual understanding with language-based reasoning and planning.`,
    socials: [
      { label: "Google Scholar", url: "https://scholar.google.com/citations?user=4H2KSRAAAAAJ&hl=en", icon: "scholar" },
      { label: "GitHub", url: "https://github.com/xiuyuan18", icon: "github" },
      { label: "ORCID", url: "https://orcid.org/0009-0003-6903-3310", icon: "orcid" },
    ],
    education: [
      { degree: "B.Eng. in Artificial Intelligence: System & Tech.", institution: "The Chinese University of Hong Kong", year: "2023-Present" }
    ]
  },
  news: [
    { id: "n1", date: "Jun 2026", content: "Applying for Graduate School." },
  ],
  publications: [
    {
      id: "p1",
      title: "4DSloMo: 4D Reconstruction for High Speed Scene with Asynchronous Capture",
      authors: ["Yutian Chen", "Shi Guo", "Tianshuo Yang", "Lihe Ding", "Xiuyuan Yu", "Jinwei Gu", "Tianfan Xue"],
      venue: "ACM SIGGRAPH Asia",
      year: 2025,
      highlight: true,
      abstract: "Our method can reconstruct high speed and complex 4D motion with high quality.",
      tags: ["Computer Vision", "4D Reconstruction"],
      teaser: "/assets/4DSloMo.mp4", // Use a local path like '/assets/teaser1.jpg' or a video '/assets/teaser1.mp4'
      links: [
        { label: "PDF", url: "https://arxiv.org/pdf/2507.05163" },
        { label: "Code", url: "https://github.com/OpenImagingLab/4DSloMo" },
        { label: "Website", url: "https://openimaginglab.github.io/4DSloMo" }
      ]
    },
  ],
  teaching: [],
  awards: [
    { id: "a1", title: "Silver Award for Outstanding Academic Performance", awarder: "Department", date: "2025, 2026" },
    { id: "a2", title: "Dean's List", awarder: "Faculty of Engineering", date: "2024, 2025" },
    { id: "a3", title: "ELITE Stream Scholarship", awarder: "Faculty of Engineering", date: "2024, 2025" },
    { id: "a4", title: "Honors at Entrance", awarder: "University", date: "2023" },
  ],
  blog: [
    {
      id: "b1",
      title: "Note on Logistic Linear Classification",
      date: "Oct 2025",
      summary: "A concise summary of logistic linear classification, including its mathematical formulation and usage in different scenarios.",
      slug: "Logistic_Linear_Classification"
    },
    {
      id: "b2",
      title: "Notes on Power Series",
      date: "July 2024",
      summary: "A computational notebook exploring power-series expansions and a fifth-order approximation of the solution.",
      slug: "power_series",
      format: "html",
    }
  ]
};
