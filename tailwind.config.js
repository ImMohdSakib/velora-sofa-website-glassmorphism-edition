/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        velora: {
          bg: "#07111F",
          bg2: "#0B1728",
          gold: "#D4B78F",
          gold2: "#E8D5B5",
          glass: "rgba(255,255,255,0.06)",
          border: "rgba(255,255,255,0.12)"
        }
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "serif"],
        sans: ["'Outfit'", "sans-serif"]
      },
      backdropBlur: { xs: "2px" }
    }
  },
  plugins: []
}
