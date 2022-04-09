const defaultTheme = require("tailwindcss/defaultTheme");
const windmill = require("@windmill/react-ui/config");

const config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Rampart: ["Raleway", "sans-serif"],
      },
    },
  },
  plugins: [],
};

module.exports = {
  ...windmill(config),
  ...config,
};
