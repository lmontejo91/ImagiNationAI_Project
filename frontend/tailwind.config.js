/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    colors: {
      "dark-blue": "#171a28",
      "neon-blue": "#00eafa",
      "light-blue": "#AFFAFF",
      "neon-pink": "#F371FF",
      "light-pink": "#f7b9ff",
      "medium-grey": "#3D4154",
      "light-grey": "#D9D9D9",
      "medium-green": "#86efac",
      "light-green": "#f0fdf4",
      "medium-red": "#dc2626",
      "light-red": "#fee2e2",
      "red": "#FF0000",
      white: "#ffffff",
      muted: "#A0AEC0",
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
      height: {
        128: "32rem",
      },
      width: {
        128: "30rem",
      },
    },
  },
  plugins: [],
};
