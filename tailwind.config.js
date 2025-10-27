/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'], // Updated content paths for Astro
  theme: {
    extend: {
      colors: {
        coral: {
          50: '#fff5f3',
          100: '#ffe8e3',
          200: '#ffd5cc',
          300: '#ffb8a9',
          400: '#ff8f75',
          500: '#ff6b47',
          600: '#f04f2e',
          700: '#d63c1f',
          800: '#b5331c',
          900: '#94301d',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in',
        'fade-in-delay': 'fadeIn 1s ease-in 0.2s both',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-up-delay': 'slideUp 0.8s ease-out 0.2s both',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};