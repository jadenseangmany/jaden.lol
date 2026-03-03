/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-violet': '#0E1440',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        fadeInUp: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        fadeInDelay: 'fadeIn 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s forwards',
        fadeInUpDelay: 'fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards',
        glow: 'glow 6s infinite ease-in-out',
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}