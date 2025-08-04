/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}", // Scan all React component files
    ],
    theme: {
      extend: {
        fontFamily: {
          poppins: ["Poppins", "sans-serif"], // Optional custom font
        },
        colors: {
          primary: "#3b82f6", // Tailwind blue-500
          success: "#22c55e",
          warning: "#facc15",
          danger: "#ef4444",
        },
      },
    },
    plugins: [
      require("@tailwindcss/forms"), // Better form styling
    ],
  };
  