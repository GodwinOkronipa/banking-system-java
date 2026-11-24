/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F2EFFC',
          500: '#6C4FF8',
          600: '#5A3DE0'
        },
        canvas: '#F4F5F7',
        ink: '#17181C',
        muted: '#667085',
        line: '#EAECF0'
      },
      borderRadius: {
        card: '12px',
        control: '8px'
      },
      boxShadow: {
        card: '0 1px 2px rgba(16, 24, 40, 0.04)',
        modal: '0 16px 40px rgba(16, 24, 40, 0.16)'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      }
    }
  },
  plugins: []
};
