/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: "#0D0D0D",
        "surface-elevated": "#141414",
        "surface-card": "#121212",
        "surface-border": "#1F1F1F",
        "surface-border-light": "rgba(255, 255, 255, 0.1)",
        "brand-text": "#F5F5F5",
        "brand-muted": "#999999",
        "brand-dim": "#666666",
        accent: {
          DEFAULT: "#38BDF8", // Cyan / ice blue
          indigo: "#6366F1",
          emerald: "#10B981",
          gold: "#E2B857"
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        streetcred: ['"Street Cred"', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        heading: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      letterSpacing: {
        widest: '0.25em',
        mega: '0.35em',
      },
      transitionTimingFunction: {
        'cinematic': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
      }
    },
  },
  plugins: [],
}
