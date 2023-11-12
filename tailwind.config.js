/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#0d253f",
        "secondary-color": "#01b4e4",
        "tertiary-color": "#90cea1",
      },
    },
  },
  plugins: [],
};
