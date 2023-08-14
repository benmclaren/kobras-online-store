/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ 
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        fluid: "repeat(auto-fit, minmax(15rem,1fr))",
      },
      fontFamily: {
        lobster: ['var(--font-lobster)'],
        roboto: ['var(--font-roboto)'],
      },
      colors: {
        'color-secondary': '#FDE155',
        'color-primary': '#080060'
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["synthwave", "cyberpunk"],
  },
}

