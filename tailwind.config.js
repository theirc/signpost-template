/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        themeGrayText: '#707070',
      },
      backgroundColor: {
        themeGrayBackground: '#FAFAFA',
      },
      fontFamily: {
        noto: ['Noto Sans'],
      },
    },
  },
  plugins: [],
};
