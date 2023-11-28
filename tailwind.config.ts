import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: 'class', // or 'media' or 'class'
  variants: {
    extend: {
      backgroundColor: ['dark', 'dark-hover', 'dark-group-hover', 'dark-even', 'dark-odd'],
      textColor: ['dark', 'dark-hover', 'dark-active'],
      borderColor: ['dark', 'dark-focus', 'dark-focus-within'],
      divideColor: ['dark'],
      boxShadow: ['dark', 'dark-hover', 'dark-focus', 'dark-active', 'dark-group-hover', 'dark-sm', 'dark-md', 'dark-lg', 'dark-xl', 'dark-2xl'],
      placeholderColor: ['dark', 'dark-focus', 'dark-active', 'dark-placeholder'],
      ringColor: ['dark', 'dark-focus', 'dark-active', 'dark-placeholder'],
      ringOffsetColor: ['dark', 'dark-focus', 'dark-active', 'dark-placeholder'],
      ringOffsetWidth: ['dark', 'dark-focus', 'dark-active', 'dark-placeholder'],
      ringWidth: ['dark', 'dark-focus', 'dark-active', 'dark-placeholder'],
      stroke: ['dark', 'dark-active', 'dark-placeholder'],
    },
  },
} satisfies Config;
