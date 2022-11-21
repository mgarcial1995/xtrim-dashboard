/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        first: "#2F22BA",
        second: "#421D99",
        third: "#151055",
        extra: "#A423A4",
        extralight: "#FF086C",
        hover: "#6948B6",
        color: "#FF1D76",
        textnavbar: "#A096DB",
        graysel:"#f7f7f7",
      }
    },
  },
  plugins: [],
}
