export default {
  content: ['./frontend/index.html', './frontend/src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#122033',
        sand: '#f4efe8',
        clay: '#d9b38c',
        moss: '#6d8b74',
        coral: '#c76d5a',
      },
      boxShadow: {
        soft: '0 16px 45px rgba(18, 32, 51, 0.12)',
      },
      backgroundImage: {
        'paper-grid':
          'linear-gradient(rgba(18,32,51,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(18,32,51,0.04) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};