/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Kita tambahkan warna gelap khas Figma nanti di sini
        dark: "#0a0a0a",
      },
    },
  },
  plugins: [],
};
