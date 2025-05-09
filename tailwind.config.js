/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        naruto: ['Naruto', 'sans-serif'],
      },
      colors: {
        // Naruto color scheme
        naruto: {
          orange: {
            light: '#FFA41B',
            DEFAULT: '#FF8C00',
            dark: '#EB6100',
          },
          yellow: {
            light: '#FFE194',
            DEFAULT: '#FFCD29',
            dark: '#FFC107',
          },
          black: {
            light: '#2D2D2D',
            DEFAULT: '#1A1A1A',
            dark: '#101010',
          },
          red: {
            light: '#FF5757',
            DEFAULT: '#FF2E2E',
            dark: '#D10000',
          },
          leaf: {
            light: '#4CAF50',
            DEFAULT: '#2E7D32',
            dark: '#1B5E20',
          },
          blue: {
            light: '#42A5F5',
            DEFAULT: '#1976D2',
            dark: '#0D47A1',
          },
        },
      },
      backgroundImage: {
        'naruto-pattern':
          "url('https://images.pexels.com/photos/8480620/pexels-photo-8480620.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        'chakra-particles':
          "url('https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
        'spin-slow': 'spin 3s linear infinite',
        'glow-blue': 'glow-blue 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(255, 140, 0, 0.5)' },
          '100%': {
            boxShadow:
              '0 0 20px rgba(255, 140, 0, 0.8), 0 0 30px rgba(255, 140, 0, 0.6)',
          },
        },
        'glow-blue': {
          '0%': {
            boxShadow: '0 0 5px rgba(25, 118, 210, 0.4)',
          },
          '100%': {
            boxShadow:
              '0 0 10px rgba(25, 118, 210, 0.6), 0 0 20px rgba(25, 118, 210, 0.5), 0 0 30px rgba(25, 118, 210, 0.4)',
          },
        },
      },
    },
  },
  plugins: [],
};
