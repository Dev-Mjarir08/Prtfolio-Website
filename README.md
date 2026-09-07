# Jarir Multani — Portfolio Website

> **High-performance, cinematic developer portfolio engineered with React 18, Vite, Tailwind CSS, GSAP ScrollTrigger, Lenis Smooth Scroll, and WebGL fluid dynamics.**

[![Vite](https://img.shields.io/badge/Vite-5.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?logo=greensock&logoColor=white)](https://greensock.com/)
[![EmailJS](https://img.shields.io/badge/EmailJS-Browser-FF6B6B)](https://www.emailjs.com/)

---

## 🌟 Highlights & Architecture

- **Cinematic Entrance Loader**: Bespoke Orbitron typographic intro reveal that seamlessly transitions to the main landing view.
- **WebGL Fluid Splash Dynamics**: Interactive multi-threaded fluid physics canvas with customizable curl, dissipation, and color shaders.
- **GSAP & Lenis Smooth Scroll**: High-precision frame-synchronized smooth scrolling paired with responsive ScrollTrigger reveals and parallax transitions.
- **Enterprise Project Showcase**: Interactive project cards featuring system architecture previews, Mongoose schema aggregation highlights, role-based access control (RBAC) matrices, and modal deep-dives.
- **Direct EmailJS Dispatch**: Asynchronous client-side contact form with validation, status indicators, and fallback REST delivery.
- **Accessible & Responsive**: Fully responsive layout with keyboard navigation support and `prefers-reduced-motion` compliance.

---

## 🛠️ Tech Stack

| Domain | Technologies |
| :--- | :--- |
| **Frontend Framework** | [React 18](https://react.dev/), [Vite](https://vitejs.dev/) |
| **Styling & Design System** | [Tailwind CSS](https://tailwindcss.com/), PostCSS, Autoprefixer |
| **Motion & Physics** | [GSAP](https://greensock.com/), [ScrollTrigger](https://greensock.com/scrolltrigger/), [Lenis](https://github.com/darkroomengineering/lenis) |
| **Fluid Simulation** | Custom WebGL Shader Canvas Pipeline (`SplashCursor.jsx`) |
| **Icons & Typography** | [Lucide React](https://lucide.dev/), Google Fonts (Orbitron, Inter, Syne, Space Grotesk, Space Mono) |
| **Communication** | [@emailjs/browser](https://www.emailjs.com/) |

---

## 📁 Project Structure

```text
Prtfolio-Website/
├── public/
│   ├── assets/
│   │   └── image.png          # Favicon & Brand Icon
│   └── fonts/
│       └── StreetCred.otf     # Local Display Typeface
├── src/
│   ├── components/
│   │   ├── IntroLoader.jsx    # Cinematic initial brand intro sequence
│   │   ├── MagneticButton.jsx # Physics-based cursor attraction buttons
│   │   ├── Navbar.jsx         # Fixed glass navigation with active section tracker
│   │   ├── ProjectModal.jsx   # Detailed architecture & tech deep-dive modal
│   │   └── SplashCursor.jsx   # Interactive WebGL fluid simulation canvas
│   ├── data/
│   │   └── portfolioData.js   # Centralized data model (projects, skills, career)
│   ├── hooks/
│   │   ├── useLenis.js        # Lenis smooth scroll + GSAP ticker synchronization
│   │   └── useMagnetic.js     # Magnetic hover physics hook
│   ├── sections/
│   │   ├── About.jsx          # Philosophy & core capabilities with word reveal
│   │   ├── Contact.jsx        # Contact form with EmailJS integration
│   │   ├── Education.jsx      # Academics & certifications breakdown
│   │   ├── Experience.jsx     # Career timeline & leadership achievements
│   │   ├── Footer.jsx         # Links, copyright, and scroll-to-top trigger
│   │   ├── Hero.jsx           # Editorial headline, coordinates, and CTAs
│   │   ├── Projects.jsx       # Selected enterprise systems & preview scenes
│   │   └── TechStack.jsx      # Categorized competencies directory
│   ├── services/
│   │   └── emailService.js    # EmailJS dispatch service with REST fallback
│   ├── App.jsx                # Root layout, smooth scroll, & section orchestration
│   ├── index.css              # Custom base styles, dark scrollbars, & utilities
│   └── main.jsx               # React DOM entrypoint
├── .env.example               # Environment variables template
├── index.html                 # HTML shell with Google Fonts & SEO meta tags
├── tailwind.config.js         # Custom palette, typography, and easing curves
├── vercel.json                # Vercel deployment & rewrite configuration
└── vite.config.js             # Vite bundler configuration
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Dev-Mjarir08/Prtfolio-Website.git
   cd Prtfolio-Website
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```
   Add your [EmailJS](https://www.emailjs.com/) credentials in `.env`:
   ```env
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   ```

4. Start local development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📦 Scripts

- `npm run dev` — Start the Vite development server with HMR on port 3000.
- `npm run build` — Compile and bundle production-ready assets to `dist/`.
- `npm run preview` — Locally preview the production build.

---

## 🚢 Deployment

The project is pre-configured for one-click deployment on [Vercel](https://vercel.com/):
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- Client-side routing is handled via `vercel.json` rewrites.

---

## 👤 Author

**Jarir Multani**
- **Role**: Full Stack Developer
- **Location**: Surat, Gujarat, India
- **Portfolio**: [jarirmultani.vercel.app](https://jarirmultani.vercel.app)
- **LinkedIn**: [linkedin.com/in/jarir-multani](https://linkedin.com/in/jarir-multani)
- **GitHub**: [@Dev-Mjarir08](https://github.com/Dev-Mjarir08)