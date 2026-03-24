/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: { 
        neon: '#00f3ff',
        accentSecondary: '#bd00ff'
      },
      fontFamily: { 
        mono: ['"Share Tech Mono"', 'monospace'], 
        display: ['"Rajdhani"', 'sans-serif'], 
        orbitron: ['"Orbitron"', 'sans-serif'] 
      }
    },
  },
  plugins: [],
}
