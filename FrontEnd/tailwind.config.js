/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/components/*.jsx",
  ],
  theme: {
    extend: {},
  },
  plugins: ['@tailwindcss/aspect-ratio',
    '@tailwindcss/forms'
  ],
}