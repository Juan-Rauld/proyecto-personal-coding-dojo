/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      'teal': {
        '50': '#eefffc',
        '100': '#c5fffa',
        '200': '#8bfff5',
        '300': '#4afef0',
        '400': '#15ece2',
        '500': '#00d0c9',
        '600': '#00a8a5',
        '700': '#008080',
        '800': '#066769',
        '900': '#0a5757',
        '950': '#003235',
      },
    },
  },
  plugins: [],
}

