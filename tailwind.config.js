// tailwind.config.js

module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        Familjen: ["Familjen Grotesk", "sans-serif"],
      },
      colors: {
        green: {
          500: '#10B981',
        },
      },
    },
  },
  plugins: [],
};
