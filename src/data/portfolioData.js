export const personalInfo = {
  name: "Jarir Multani",
  brand: "JARIR®",
  role: "Full Stack Developer",
  location: "SURAT, GUJARAT — INDIA",
  locationShort: "Surat, Gujarat",
  coordinates: "21.1702° N, 72.8311° E",
  status: "AVAILABLE FOR OPPORTUNITIES",
  email: "multanijarir08@gmail.com",
  portfolio: "https://jarirmultani.vercel.app",
  portfolioDisplay: "jarirmultani.vercel.app",
  linkedin: "https://linkedin.com/in/jarir-multani",
  linkedinDisplay: "linkedin.com/in/jarir-multani",
  github: "https://github.com/Dev-Mjarir08",
  githubDisplay: "github.com/Dev-Mjarir08",
  positioning: "Full Stack Developer with hands-on experience in building responsive, scalable web applications and ERP solutions using the MERN stack.",
  aboutStatement: "Full Stack Developer focused on building scalable web applications, ERP solutions, and reliable software systems."
};

export const navLinks = [
  { label: "WORK", href: "#work" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "ABOUT", href: "#about" },
  { label: "SKILLS", href: "#skills" },
  { label: "CONTACT", href: "#contact" }
];

export const coreStrengths = [
  {
    title: "MERN Stack Architecture",
    description: "Developing robust, end-to-end full-stack architectures connecting React interfaces with Node.js/Express APIs and MongoDB backends."
  },
  {
    title: "RESTful APIs & Security",
    description: "Engineering secure endpoints with role-based access control (RBAC), JWT middleware, sanitized data validation, and error handling."
  },
  {
    title: "Database Design & Indexing",
    description: "Designing schema models with Mongoose ODM, optimizing complex aggregation pipelines, indexing keys, and ensuring data integrity."
  },
  {
    title: "ERP & Business Systems",
    description: "Translating complex multi-departmental workflows into automated data pipelines, reporting engines, and streamlined transactional logic."
  },
  {
    title: "Team Leadership & Git",
    description: "Leading development teams, orchestrating branch strategies, conducting code reviews, and maintaining clear communication."
  },
  {
    title: "Clean & Scalable Code",
    description: "Prioritizing modular component architecture, reusable utility layers, separation of concerns, and clean documentation."
  }
];

export const projects = [
  {
    id: "project-02",
    number: "02",
    title: "ENTERPRISE ERP SYSTEM SOLUTION",
    isHero: true,
    badges: ["TEAM LEAD", "ERP SYSTEM"],
    category: "Full Stack / Enterprise Architecture",
    technologies: ["MERN Stack", "REST APIs", "MongoDB", "Express.js", "React.js", "Node.js"],
    displayTags: ["MERN STACK", "REST APIS", "ERP ARCHITECTURE", "TEAM LEAD", "DATABASE DESIGN"],
    description: "Centralized ERP platform handling operational workflows, reporting, and data pipelines.",
    extendedDescription: "Implemented secure RESTful endpoints and optimized multi-table data transactions for seamless business operations. Architected as a multi-department hub providing inventory tracking, administrative workflows, and real-time operational data pipelines.",
    highlights: [
      "Led team to build end-to-end enterprise ERP architecture",
      "Optimized complex data aggregation pipelines in MongoDB",
      "Engineered secure role-based RESTful API endpoints",
      "Streamlined cross-department reporting and operational workflows"
    ],
    github: "https://github.com/Dev-Mjarir08/project-Amdox",
    liveDemo: "https://project-amdox.vercel.app",
    colorScheme: "from-sky-900/40 via-neutral-900 to-black",
    accentColor: "#38BDF8"
  },
  {
    id: "project-01",
    number: "01",
    title: "EMPLOYEE MANAGEMENT SYSTEM",
    isHero: false,
    badges: ["RBAC", "SYSTEM PLATFORM"],
    category: "Full Stack Application",
    technologies: ["Node.js", "Express.js", "MongoDB", "React", "Bootstrap", "JWT"],
    displayTags: ["RBAC", "JWT", "MONGODB", "REST API", "CLOUDINARY"],
    description: "Administrative management platform featuring role-based access control, task assignments, and JWT middleware.",
    extendedDescription: "Built optimized MongoDB schemas with Mongoose ODM and integrated Multer/Cloudinary for avatar file handling. Features hierarchical permissions, secure session token handling, task delegation queues, and detailed staff performance logs.",
    highlights: [
      "Role-Based Access Control (RBAC) with granular permissions",
      "Secure JWT authentication & token authorization middleware",
      "Optimized Mongoose database schemas and indexing",
      "Integrated Multer and Cloudinary for cloud asset handling"
    ],
    github: "https://github.com/Dev-Mjarir08/emsPRO",
    liveDemo: "https://emspro-yn0t.onrender.com",
    colorScheme: "from-indigo-950/40 via-neutral-900 to-black",
    accentColor: "#818CF8"
  },
  {
    id: "project-03",
    number: "03",
    title: "E-COMMERCE PLATFORM",
    isHero: false,
    badges: ["STATE MANAGEMENT", "FULL STACK"],
    category: "Full Stack Commerce",
    technologies: ["React.js", "Redux Toolkit", "Node.js", "Express.js", "MongoDB"],
    displayTags: ["REACT", "REDUX", "NODE", "EXPRESS", "MONGODB"],
    description: "End-to-end shopping experience featuring centralized cart state via Redux Toolkit, search filtering, and order management.",
    extendedDescription: "Engineered scalable catalog indexing with dynamic multi-parameter filtering, persistent client cart syncing via Redux Toolkit, authenticated order submission pipelines, and administrative product inventory dashboards.",
    highlights: [
      "Centralized state management with Redux Toolkit",
      "Dynamic search filtering and catalog query optimization",
      "Full order management and tracking workflow",
      "RESTful API backend powered by Express and MongoDB"
    ],
    github: "https://github.com/Dev-Mjarir08/react-PR-13",
    liveDemo: "https://react-pr-13-frontend.vercel.app",
    colorScheme: "from-emerald-950/30 via-neutral-900 to-black",
    accentColor: "#34D399"
  },
  {
    id: "project-04",
    number: "04",
    title: "DEVELOPER PORTFOLIO",
    isHero: false,
    badges: ["CINEMATIC UI", "GSAP & LENIS"],
    category: "Creative Engineering",
    technologies: ["React.js", "Tailwind CSS", "GSAP", "EmailJS", "Vite"],
    displayTags: ["REACT", "GSAP", "TAILWIND", "EMAILJS", "VITE"],
    description: "High-performance personal showcase with interactive GSAP animations, Tailwind CSS, and EmailJS integration.",
    extendedDescription: "Crafted as an editorial cinematic experience leveraging GSAP ScrollTrigger timelines, Lenis smooth scrolling, bespoke cursor interaction, responsive layouts, and seamless asynchronous email dispatching.",
    highlights: [
      "Synchronized GSAP ScrollTrigger & Lenis smooth scrolling",
      "Clean dark editorial design system built with Tailwind CSS",
      "Interactive physics-based hover states and magnetic cursor",
      "Production-ready EmailJS integration and accessible semantics"
    ],
    github: "https://github.com/Dev-Mjarir08/Prtfolio-Website",
    liveDemo: "https://jarirmultani.vercel.app",
    colorScheme: "from-neutral-800/40 via-neutral-900 to-black",
    accentColor: "#E2E8F0"
  }
];

export const experiences = [
  {
    id: "exp-01",
    index: "01",
    role: "WEB DEVELOPER",
    company: "Zaalima Development Pvt. Ltd.",
    period: "September 2026 — Present",
    type: "Current Role",
    location: "Surat, Gujarat",
    description: "Architect and develop full-stack web solutions and modular frontend components using React.js and modern JavaScript. Collaborate on product features, code quality, and maintainable application workflows across cross-functional teams.",
    points: [
      "Architect and engineer full-stack web solutions using React.js and modern ES6+ JavaScript",
      "Design modular, reusable UI components emphasizing performance and maintainability",
      "Collaborate cross-functionally on product features, architecture decisions, and code reviews",
      "Enforce clean coding standards, Git branch discipline, and structured API integration"
    ]
  },
  {
    id: "exp-02",
    index: "02",
    role: "WEB DEVELOPMENT INTERN — MERN STACK",
    company: "Amdox Technologies",
    period: "June 2026 — September 2026",
    type: "Internship & Leadership",
    location: "Surat, Gujarat",
    highlightBadge: "TEAM LEADERSHIP + BACKEND DEVELOPMENT",
    description: "Led a team to develop an enterprise ERP System, ensuring effective communication, managing API integrations, and structuring MongoDB databases.",
    points: [
      "Led developer team through the architecture and delivery of an Enterprise ERP System",
      "Structured MongoDB database models and optimized data aggregation schemas",
      "Engineered secure REST API integrations connecting disparate business modules",
      "Utilized Git/GitHub for version control, code merging, and task coordination"
    ]
  },
  {
    id: "exp-03",
    index: "03",
    role: "WEB DEVELOPMENT INTERN",
    company: "Hex Softwares Pvt. Ltd.",
    period: "June 2026 — July 2026",
    type: "Virtual Internship",
    location: "Remote",
    description: "Completed a virtual internship delivering responsive web applications, clean UI interfaces, and backend logic.",
    points: [
      "Delivered responsive web interfaces adhering to modern UI/UX design standards",
      "Built and tested modular backend logic and API endpoints",
      "Ensured cross-browser compatibility and optimized page load performance"
    ]
  }
];

export const techStack = [
  {
    category: "FRONTEND",
    number: "01",
    description: "Building responsive, component-driven client applications with modern state management.",
    skills: [
      { name: "React.js", level: "Primary" },
      { name: "Redux Toolkit", level: "State" },
      { name: "React Router", level: "Routing" },
      { name: "Context API", level: "State" },
      { name: "Tailwind CSS", level: "Styling" },
      { name: "Bootstrap", level: "UI" },
      { name: "GSAP", level: "Animation" }
    ]
  },
  {
    category: "BACKEND",
    number: "02",
    description: "Engineering scalable RESTful architectures, security middleware, and file pipelines.",
    skills: [
      { name: "Node.js", level: "Runtime" },
      { name: "Express.js", level: "Framework" },
      { name: "REST APIs", level: "Architecture" },
      { name: "JWT", level: "Security" },
      { name: "Multer", level: "Uploads" },
      { name: "Cloudinary", level: "Cloud Media" },
      { name: "Error Handling", level: "Robustness" }
    ]
  },
  {
    category: "DATABASE",
    number: "03",
    description: "Structuring schemas, indexing collections, and optimizing data aggregation queries.",
    skills: [
      { name: "MongoDB", level: "NoSQL DB" },
      { name: "Mongoose", level: "ODM" },
      { name: "Database Design", level: "Modeling" },
      { name: "CRUD Operations", level: "Core" },
      { name: "Indexing", level: "Performance" }
    ]
  },
  {
    category: "TOOLS & DEV",
    number: "04",
    description: "Modern development workflows, version control, build tools, and API inspection.",
    skills: [
      { name: "Git", level: "VCS" },
      { name: "GitHub", level: "Collaboration" },
      { name: "Postman", level: "API Testing" },
      { name: "VS Code", level: "IDE" },
      { name: "Vite", level: "Bundler" },
      { name: "npm", level: "Package Mgr" },
      { name: "Axios", level: "HTTP Client" },
      { name: "EmailJS", level: "Messaging" }
    ]
  },
  {
    category: "LANGUAGES",
    number: "05",
    description: "Core programming fundamentals, object-oriented concepts, and modern web standards.",
    skills: [
      { name: "JavaScript ES6+", level: "Primary" },
      { name: "HTML5", level: "Semantic" },
      { name: "CSS3", level: "Modern CSS" },
      { name: "C", level: "Systems" },
      { name: "C++", level: "OOP / DSA" }
    ]
  }
];

export const skillsEditorial = [
  {
    number: "01",
    category: "FRONTEND",
    tags: ["REACT", "JAVASCRIPT", "TAILWIND", "GSAP"],
    summary: "Component-driven user interfaces, state management, and modern interactions."
  },
  {
    number: "02",
    category: "BACKEND",
    tags: ["NODE", "EXPRESS", "REST API", "JWT"],
    summary: "High-throughput server runtimes, authenticated endpoints, and robust business logic."
  },
  {
    number: "03",
    category: "DATABASE",
    tags: ["MONGODB", "MONGOOSE"],
    summary: "Schema design, aggregation pipelines, query indexing, and data modeling."
  },
  {
    number: "04",
    category: "ENGINEERING",
    tags: ["GIT", "GITHUB", "RBAC", "ERP ARCHITECTURE"],
    summary: "Version control workflows, access control matrices, and multi-tier system designs."
  }
];

export const education = [
  {
    institution: "RED & WHITE SKILL EDUCATION OFFICIAL",
    program: "Full Stack Web Development Program",
    period: "2024 — 2026",
    type: "Professional Certification",
    details: "Comprehensive training in MERN stack development, software engineering principles, database architecture, and full lifecycle web development."
  },
  {
    institution: "ARTS, COMMERCE AND SCIENCE COLLEGE, NAVAPUR",
    program: "Higher Secondary Diploma — Science",
    period: "June 2022 — April 2024",
    type: "Higher Secondary",
    details: "Focus in Science and Mathematics, building strong analytical thinking, logic structuring, and computing fundamentals."
  }
];

export const certifications = [
  {
    title: "Web Development Internship Certificate",
    issuer: "Amdox Technologies",
    date: "September 2026",
    badge: "MERN Stack ERP"
  },
  {
    title: "Web Development Internship Certificate",
    issuer: "HexSoftwares",
    date: "July 2026",
    badge: "Web Applications"
  },
  {
    title: "HTML & CSS Crash Course Certificate",
    issuer: "Scrimba via Coursera",
    date: "May 2025",
    badge: "Frontend Foundations"
  },
  {
    title: "Future Forward 2026 & TechWar 2024",
    issuer: "Red & White Multimedia Education",
    date: "2024 — 2026",
    badge: "Technical Hackathon & Excellence"
  }
];
