/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      },
      boxShadow: {
        'green-glow': '-5px -5px 105px #64f3d5',
      }
    },
    fontFamily: {
      'workSans': ['"Work Sans"'],
      'body': ['"Open Sans"']
    }
  },
  plugins: [],
}