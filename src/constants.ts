
import { SiteData } from './types';

// =============================================================================
// CONFIGURATION: EDIT THIS FILE TO CUSTOMIZE YOUR WEBSITE
// =============================================================================

export const DATA: SiteData = {
  config: {
    showPublicationsPage: true, // Set to false to hide "Publications" link in navbar
    showTeachingPage: true,     // Set to false to hide "Teaching" link in navbar
    showBlogPage: false,        // Set to true to show "Blog" link in navbar
  },
  profile: {
    name: "Dr. Jane Doe",
    title: "Assistant Professor of Computer Science",
    affiliation: "University of Technology & Science",
    email: "jane.doe@univ.edu",
    location: "San Francisco, CA",
    image: "https://picsum.photos/400/400", // Replace with your photo
    cv: "/assets/cv.pdf", // Place your cv.pdf in the assets folder
    shortBio: "I am interested in machine learning, computer vision, and AI safety. My research focuses on making deep learning models more robust and interpretable.",
    longBio: `
      I am an Assistant Professor in the Department of Computer Science at the University of Technology & Science. 
      Previously, I was a Postdoctoral Researcher at the AI Institute. I received my Ph.D. from Ivy University, advised by Prof. Alan Turing.
      
      My research lies at the intersection of Computer Vision and Machine Learning. I am particularly interested in self-supervised learning, 
      generative models, and their applications in robotics.
    `,
    socials: [
      { label: "Google Scholar", url: "#", icon: "scholar" },
      { label: "GitHub", url: "https://github.com", icon: "github" },
      { label: "ORCID", url: "https://orcid.org", icon: "orcid" },
    ],
    education: [
      { degree: "Ph.D. in Computer Science", institution: "Ivy University", year: "2020" },
      { degree: "B.S. in Mathematics", institution: "State College", year: "2015" }
    ]
  },
  news: [
    { id: "n1", date: "Sep 2024", content: "Our paper on **Robust Vision** was accepted to **NeurIPS 2024**!" },
    { id: "n2", date: "Aug 2024", content: "I will be serving as an Area Chair for CVPR 2025." },
    { id: "n3", date: "June 2024", content: "Received the Best Paper Award at the ICML Workshop on Generative AI." },
    { id: "n4", date: "Jan 2024", content: "Started my new position as Assistant Professor at UTS." },
  ],
  publications: [
    {
      id: "p1",
      title: "Deep Learning for Robust Object Detection in Chaos",
      authors: ["Jane Doe", "John Smith", "Alice Johnson"],
      venue: "NeurIPS 2024",
      year: 2024,
      highlight: true,
      abstract: "We propose a novel architecture that improves object detection performance in highly chaotic environments by 25%.",
      tags: ["Computer Vision", "Robustness"],
      teaser: "https://picsum.photos/seed/p1/200/150", // Use a local path like '/assets/teaser1.jpg' or a video '/assets/teaser1.mp4'
      links: [
        { label: "PDF", url: "#" },
        { label: "Code", url: "#" }
      ]
    },
    {
      id: "p2",
      title: "Generative Adversarial Networks for Medical Imaging",
      authors: ["Bob Williams", "Jane Doe"],
      venue: "ICCV 2023",
      year: 2023,
      highlight: true,
      abstract: "A comprehensive study on the efficacy of GANs for synthetic data generation in MRI scans.",
      tags: ["Generative AI", "Healthcare"],
      teaser: "https://picsum.photos/seed/p2/200/150",
      links: [
        { label: "PDF", url: "#" },
        { label: "Project Page", url: "#" }
      ]
    },
    {
      id: "p3",
      title: "Self-Supervised Learning on the Edge",
      authors: ["Jane Doe", "Charlie Brown"],
      venue: "ECCV 2022",
      year: 2022,
      highlight: false,
      abstract: "Optimizing SSL algorithms for low-power edge devices.",
      tags: ["Edge Computing", "SSL"],
      links: [
        { label: "PDF", url: "#" }
      ]
    },
    {
      id: "p4",
      title: "A Survey of Visual Transformers",
      authors: ["Alice Johnson", "Jane Doe", "Eve Davis"],
      venue: "IEEE TPAMI",
      year: 2021,
      highlight: false,
      abstract: "A comprehensive survey outlining the history and future of ViTs.",
      tags: ["Transformers", "Survey"],
      teaser: "https://picsum.photos/seed/p4/200/150",
      links: [
        { label: "PDF", url: "#" }
      ]
    }
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
    { id: "a1", title: "Best Paper Award", awarder: "ICML Workshop on Generative AI", date: "2024" },
    { id: "a2", title: "NSF Graduate Research Fellowship", awarder: "National Science Foundation", date: "2018-2021" },
    { id: "a3", title: "Outstanding Reviewer", awarder: "CVPR", date: "2023" }
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
