/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        github: {
          blue: '#0366d6',
          darkBlue: '#0256b3',
          gray: '#586069',
          lightGray: '#f6f8fa',
          border: '#e1e4e8',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'],
      },
      boxShadow: {
        'github': '0 4px 20px rgba(0, 0, 0, 0.1)',
        'github-hover': '0 6px 25px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        'github': '12px',
      }
    },
  },
  plugins: [],
} 