module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        Spinner:'spinnerSpin 1.2s ease-in-out infinite alternate',
        fadeIn: 'fadeIn ease forwards 1s',
      },
      keyframes: {
        spinnerSpin : {
          '0%' : {'strokeDashoffset': '90'},
          '100%' : {'strokeDashoffset': '280'}
        },
        fadeIn : {
          '0%' : {'opacity': '0'},
          '100%' : {'opacity': '0.5'}
        }
      }
    },
  },
  plugins: [],
}
