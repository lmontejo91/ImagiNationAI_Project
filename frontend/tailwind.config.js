/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    colors: {
      "dark-blue": "#171a28",
      "neon-blue": "#00eafa",
      "neon-pink": "#F371FF",
      "medium-grey": "#3D4154",
      "light-grey": "#D9D9D9",
      white: "#ffffff",
    },
    extend: {
      screens: {
        xs: "480px",
      },
      fontFamily: {
        inter: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        card: "0 0 1px 0 rgba(189,192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.2)",
        cardhover:
          "0 0 1px 0 rgba(189,192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.4)",
      },
    },
  },
  plugins: [],
};
