/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
        "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
    daisyui: {
    themes: ["coffee"],
  },
  plugins: [
     require('daisyui')
  ],
}

