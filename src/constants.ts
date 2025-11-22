
import { SiteData } from './types';

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
    email: "1155211255@link.cuhk.edu.hk",
    location: "Hong Kong, China",
    image: "/assets/cropped_circle_image.png", // Replace with your photo
    cv: "/assets/cv.pdf", // Place your cv.pdf in the assets folder
    shortBio: "I am interested in machine learning, computer vision, and AI safety. My research focuses on making deep learning models more robust and interpretable.",
    longBio: `
      I am an Assistant Professor in the Department of Computer Science at the University of Technology & Science. 
      Previously, I was a Postdoctoral Researcher at the AI Institute. I received my Ph.D. from Ivy University, advised by Prof. Alan Turing.
      
      My research lies at the intersection of Computer Vision and Machine Learning. I am particularly interested in self-supervised learning, 
      generative models, and their applications in robotics.
    `,
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
    { id: "n1", date: "Nov 2025", content: "Applying for Graduate School." },
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
  teaching: [
    {
      id: "t1",
      course: "CS101: Intro to Machine Learning",
      role: "Instructor",
      institution: "Univ. Tech & Science",
      period: "Fall 2024",
      description: "Undergraduate level introduction to ML concepts."
    },
    {
      id: "t2",
      course: "CS231n: Convolutional Neural Networks",
      role: "Guest Lecturer",
      institution: "Ivy University",
      period: "Spring 2023"
    }
  ],
  awards: [
    { id: "a1", title: "Silver Award for Outstanding Academic Performance", awarder: "Department", date: "2025" },
    { id: "a2", title: "Dean's List", awarder: "Faculty of Engineering", date: "2024, 2025" },
    { id: "a3", title: "ELITE Stream Scholarship", awarder: "Faculty of Engineering", date: "2024, 2025" },
    { id: "a4", title: "Honors at Entrance", awarder: "University", date: "2023" },
  ],
  blog: [
    {
      id: "b1",
      title: "Thoughts on Large Language Models",
      date: "Oct 2024",
      summary: "Reflecting on the recent advancements in LLMs and their impact on academic research.",
      slug: "thoughts-on-llms"
    },
    {
      id: "b2",
      title: "How to Write a Rebuttal",
      date: "July 2024",
      summary: "A guide for PhD students on navigating the conference rebuttal process effectively.",
      slug: "how-to-write-rebuttal"
    }
  ]
};