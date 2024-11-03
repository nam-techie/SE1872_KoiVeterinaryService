// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
      extend: {},
  },
  corePlugins: {
      preflight: false, // Vô hiệu hóa preflight để tránh reset mặc định của Tailwind
  },
  plugins: [],
};
