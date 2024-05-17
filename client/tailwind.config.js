/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#1f2f53",
          "secondary": "#386858",
          "accent": "#748565",
          "neutral": "#d1d5db",
          "base-100": "#ffffff",
          "info": "#4f46e5",
          "success": "#22c55e",
          "warning": "#CD541D",
          "error": "#922636",
        },
      },
    ],
  },
  plugins: [
    require('daisyui'),
  ],
};
