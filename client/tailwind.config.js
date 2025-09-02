// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
   
  },
  variants: {
    extend: {
      backgroundColor: ["hover"],
    },
  },
  plugins: [],
};
