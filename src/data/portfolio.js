import {
  FiCode,
  FiCpu,
  FiDatabase,
  FiGlobe,
  FiLayers,
  FiZap,
  FiActivity,
  FiShield,
  FiSmartphone,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiExternalLink
} from 'react-icons/fi';
import {
  SiReact,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiGit,
  SiNextdotjs
} from 'react-icons/si';

export const profile = {
  name: 'Jarir',
  role: 'Full Stack Developer',
  typed: ['React interfaces', 'Node APIs', 'MongoDB systems', 'deployment-ready products'],
  email: 'multanijarir08@gmail.com',
  location: 'Building from anywhere',
  socials: [
    { label: 'GitHub', href: 'https://github.com/Dev-Mjarir08', icon: FiGithub },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jarir-multani-3b7483369/', icon: FiLinkedin },
    { label: 'Email', href: 'multanijarir08@gmail.com', icon: FiMail }
  ]
};

export const branches = [
  { label: 'Frontend Development', icon: FiCode, angle: -28 },
  { label: 'Backend Development', icon: FiCpu, angle: 28 },
  { label: 'Database', icon: FiDatabase, angle: -48 },
  { label: 'Deployment', icon: FiGlobe, angle: 48 },
  { label: 'UI/UX', icon: FiLayers, angle: 0 }
];

export const roots = [
  {
    title: 'Experience',
    copy: 'Shipping polished interfaces, API flows, and data layers with production sensibility.'
  },
  {
    title: 'Passion',
    copy: 'Turning useful ideas into expressive web experiences that feel fast and memorable.'
  },
  {
    title: 'Problem Solving',
    copy: 'Reducing complex requirements into clean systems, readable code, and resilient UX.'
  },
  {
    title: 'Learning',
    copy: 'Growing through new tools, better architecture, and sharper product judgment.'
  },
  {
    title: 'Creativity',
    copy: 'Blending engineering discipline with motion, depth, and elegant interaction design.'
  }
];

export const skills = [
  {
    name: 'React',
    icon: SiReact,
    category: 'Frontend',
    detail: 'Reusable component systems, stateful interfaces, animation-aware layouts.'
  },
  {
    name: 'JavaScript',
    icon: SiJavascript,
    category: 'Core',
    detail: 'Modern ES modules, async workflows, browser APIs, and clean interaction logic.'
  },
  {
    name: 'Node.js',
    icon: SiNodedotjs,
    category: 'Backend',
    detail: 'API services, middleware, file flows, authentication-ready architecture.'
  },
  {
    name: 'Express.js',
    icon: SiExpress,
    category: 'Backend',
    detail: 'REST routes, validation, error handling, and service composition.'
  },
  {
    name: 'MongoDB',
    icon: SiMongodb,
    category: 'Database',
    detail: 'Flexible schemas, data modeling, indexing, and CRUD workflows.'
  },
  {
    name: 'Tailwind CSS',
    icon: SiTailwindcss,
    category: 'Design',
    detail: 'Responsive systems, design tokens, and high-polish UI surfaces.'
  },
  {
    name: 'Git',
    icon: SiGit,
    category: 'Workflow',
    detail: 'Branching, reviews, version history, and collaborative release flow.'
  },
  {
    name: 'REST APIs',
    icon: FiActivity,
    category: 'Integration',
    detail: 'Predictable endpoints, request lifecycles, and frontend-backend contracts.'
  },
  {
    name: 'Next.js',
    icon: SiNextdotjs,
    category: 'Full Stack',
    detail: 'SEO-ready pages, server rendering patterns, and deployment-minded routing.'
  }
];

export const experiences = [
  {
    year: '2022',
    title: 'Frontend Foundation',
    text: 'Built responsive interfaces and learned to make layouts feel intentional on every screen.'
  },
  {
    year: '2023',
    title: 'Backend Systems',
    text: 'Connected Node.js services, REST APIs, and MongoDB collections into complete workflows.'
  },
  {
    year: '2024',
    title: 'Full Stack Products',
    text: 'Combined product thinking, component architecture, and deployment-ready delivery.'
  },
  {
    year: '2025+',
    title: 'Premium Web Experiences',
    text: 'Focused on immersive visuals, performance, accessibility, and memorable interaction design.'
  }
];

export const projects = [
  {
    title: 'Nebula Commerce',
    tagline: 'A fast storefront experience with animated product discovery.',
    stack: ['React', 'Node.js', 'MongoDB', 'Stripe-ready'],
    impact: 'Reduced friction with a focused checkout path and responsive product flows.',
    live: 'https://example.com',
    github: 'https://github.com/',
    icon: FiZap
  },
  {
    title: 'PulseOps Dashboard',
    tagline: 'Operational analytics with clean data views and live status signals.',
    stack: ['React', 'Express', 'REST APIs', 'Charts'],
    impact: 'Turned scattered business metrics into one dense, readable control surface.',
    live: 'https://example.com',
    github: 'https://github.com/',
    icon: FiActivity
  },
  {
    title: 'Auth Garden',
    tagline: 'Secure user journeys with validation, persistence, and role-aware routes.',
    stack: ['Node.js', 'JWT', 'MongoDB', 'React Router'],
    impact: 'Created a reusable authentication backbone for product experiments.',
    live: 'https://example.com',
    github: 'https://github.com/',
    icon: FiShield
  },
  {
    title: 'Lumen Landing',
    tagline: 'High-converting responsive launch page with rich motion and SEO basics.',
    stack: ['React', 'Tailwind', 'GSAP', 'Vercel'],
    impact: 'Balanced brand atmosphere with measurable speed and mobile usability.',
    live: 'https://example.com',
    github: 'https://github.com/',
    icon: FiExternalLink
  }
];

export const services = [
  {
    title: 'Frontend Development',
    icon: FiCode,
    text: 'Interactive React interfaces with motion, accessibility, and responsive polish.'
  },
  {
    title: 'Full Stack Development',
    icon: FiCpu,
    text: 'End-to-end product flows across UI, APIs, data, auth, and deployment.'
  },
  {
    title: 'Responsive Design',
    icon: FiSmartphone,
    text: 'Mobile-first layouts that stay clear, tactile, and fast on every viewport.'
  },
  {
    title: 'API Integration',
    icon: FiGlobe,
    text: 'Clean connections to third-party services, dashboards, and custom backends.'
  },
  {
    title: 'Website Optimization',
    icon: FiZap,
    text: 'Performance passes, animation tuning, SEO foundations, and deployment readiness.'
  }
];

export const testimonials = [
  {
    name: 'Amina R.',
    role: 'Founder',
    quote: 'Jarir translated a rough product idea into a smooth launch experience with rare attention to detail.'
  },
  {
    name: 'Devon K.',
    role: 'Product Lead',
    quote: 'The interface felt premium, but the real win was how clear and maintainable the implementation stayed.'
  },
  {
    name: 'Sofia M.',
    role: 'Design Partner',
    quote: 'Motion, layout, and engineering all worked together. Nothing felt bolted on.'
  }
];

export const achievements = [
  { value: 24, suffix: '+', label: 'Interfaces shipped' },
  { value: 18, suffix: '+', label: 'API flows built' },
  { value: 95, suffix: '+', label: 'Performance target' },
  { value: 9, suffix: '', label: 'Core technologies' }
];
