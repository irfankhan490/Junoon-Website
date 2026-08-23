/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.25rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1152px',
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FBF4E4',
          deep: '#F3E6C8',
          100: '#FFFCF5',
        },
        espresso: {
          DEFAULT: '#2A1B10',
          soft: '#4A3324',
          light: '#6B4E38',
        },
        gold: {
          DEFAULT: '#F0AE0A',
          deep: '#C6890A',
          light: '#F9D874',
        },
        chili: {
          DEFAULT: '#C11C2C',
          deep: '#95111E',
        },
        leaf: {
          DEFAULT: '#1E6B3D',
          deep: '#134A29',
          light: '#3F9163',
        },
        chai: {
          DEFAULT: '#A8562A',
          deep: '#7C3D1C',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Manrope"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(42, 27, 16, 0.25)',
        soft: '0 4px 18px -6px rgba(42, 27, 16, 0.15)',
        glow: '0 0 0 4px rgba(240, 174, 10, 0.18)',
      },
      borderRadius: {
        arch: '999px 999px 24px 24px',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        steam: {
          '0%, 100%': { transform: 'translateY(0) scaleY(1)', opacity: '0.55' },
          '50%': { transform: 'translateY(-10px) scaleY(1.08)', opacity: '0.9' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        steam: 'steam 3.2s ease-in-out infinite',
        rise: 'rise 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        marquee: 'marquee 22s linear infinite',
      },
    },
  },
  plugins: [],
}
