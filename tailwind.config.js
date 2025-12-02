/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000', // Preto absoluto
        surface: '#0a0a0a', // Quase preto
        surfaceHighlight: '#171717', // Cinza muito escuro
        primary: '#dc2626', // Vermelho Sangue (Red-600)
        secondary: '#991b1b', // Vermelho Escuro (Red-800)
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'], // Fonte mono para estética de "Sistema"
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}