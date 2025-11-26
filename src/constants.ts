
import { SiteData } from './types';

// =============================================================================
// CONFIGURATION: EDIT THIS FILE TO CUSTOMIZE YOUR WEBSITE
// =============================================================================

export const DATA: SiteData = {
  config: {
    showPublicationsPage: true, // Set to false to hide "Publications" link in navbar
    showTeachingPage: false,     // Set to false to hide "Teaching" link in navbar
    showBlogPage: true,        // Set to true to show "Blog" link in navbar
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
    shortBio: "I am interested in machine learning, computer vision. My research focuses on improving the quality of dynamic scene recontruction.",
    longBio: `I am an undergraduate student in the ELITE Stream of the Artificial Intelligence: Systems and Technologies program at The Chinese University of Hong Kong (CUHK). My academic interests lie at the intersection of computer vision and deep learning, with a particular focus on 3D reconstruction, computer vision, and neural rendering techniques such as NeRF and 3D Gaussian Splatting.
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
      title: "Note on Logistic Linear Classification",
      date: "Oct 2025",
      summary: "A concise summary of logistic linear classification, including its mathematical formulation and usage in different scenarios.",
      slug: "Logistic Linear Classification"
    },
    // {
    //   id: "b2",
    //   title: "How to Write a Rebuttal",
    //   date: "July 2024",
    //   summary: "A guide for PhD students on navigating the conference rebuttal process effectively.",
    //   slug: "how-to-write-rebuttal"
    // }
  ]
};