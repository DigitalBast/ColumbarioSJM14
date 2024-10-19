/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sienna: '#ebe5da', // Define the custom color here
      },
    },
  },
  plugins: [],
};
