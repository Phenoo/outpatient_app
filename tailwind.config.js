/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      body: ['"General Sans"'],
    },
    extend: {
      colors: {
        primary: '#7761FF',
      },
    },
  },
  plugins: [],
};

// module.exports = {
//   - content: [],
//   + content: ["./App.{js,jsx,ts,tsx}", "./<custom directory>/**/*.{js,jsx,ts,tsx}"],
//     theme: {
//       extend: {},
//     },
//     plugins: [],
//   }
