/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      },
      colors: {
        ink: '#020611',
        navy: '#061225',
        cyan: '#46f4ff',
        electric: '#4d7cff',
        violet: '#8f5bff',
        mint: '#8dffdf'
      },
      boxShadow: {
        glow: '0 0 48px rgba(70, 244, 255, 0.28)',
        violet: '0 0 64px rgba(143, 91, 255, 0.26)'
      },
      animation: {
        orbit: 'orbit 18s linear infinite',
        pulseGlow: 'pulseGlow 4s ease-in-out infinite',
        drift: 'drift 12s ease-in-out infinite',
        shimmer: 'shimmer 8s linear infinite'
      },
      keyframes: {
        orbit: {
          to: { transform: 'rotate(360deg)' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.65, filter: 'drop-shadow(0 0 12px rgba(70,244,255,.35))' },
          '50%': { opacity: 1, filter: 'drop-shadow(0 0 26px rgba(143,91,255,.5))' }
        },
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(14px, -20px, 0)' }
        },
        shimmer: {
          to: { backgroundPosition: '200% center' }
        }
      }
    }
  },
  plugins: []
};
