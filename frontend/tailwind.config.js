/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          bg: '#FFFFFF',
          surface: '#F8F9FA',
          primary: '#A8D8FF',
          secondary: '#FFB3D9',
          tertiary: '#B4F8C8',
          text: '#1F2937',
          'text-secondary': '#6B7280',
        },
        dark: {
          bg: '#1A1A2E',
          surface: '#16213E',
          primary: '#0F4C75',
          secondary: '#E94560',
          tertiary: '#3FC1C9',
          text: '#F5F5F5',
          'text-secondary': '#BBBBBB',
        }
      },
      fontFamily: {
        pixel: ['VT323', 'monospace'],
        retro: ['"Press Start 2P"', 'cursive'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        'retro': '4px 4px 0px rgba(0,0,0,1)',
        'retro-lg': '8px 8px 0px rgba(0,0,0,1)',
      },
      borderWidth: {
        '3': '3px',
      }
    },
  },
  plugins: [],
}

