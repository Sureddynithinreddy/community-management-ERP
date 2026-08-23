/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#eef6f3',
          100: '#d5e7e0',
          500: '#3a6657',
          700: '#254238',
          800: '#1e372e',
          900: '#142720',
          950: '#0c1814',
        },
        sage: {
          100: '#e5efec',
          200: '#c8ddd5',
          300: '#a3c3b7',
          400: '#86a79b',
          500: '#698a7f',
        },
        cream: {
          50: '#fcfbfa',
          100: '#f8f5ee',
          200: '#f1ede2',
          300: '#e4ddcc',
        },
        olive: {
          500: '#869c4f',
          600: '#738743',
          700: '#5e7034',
        }
      },
      fontFamily: {
        serif: ['DM Serif Display', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
