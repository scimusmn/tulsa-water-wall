module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      white: {
        DEFAULT: 'var(--white)',
      },
      blue: {
        light: 'var(--blue-light)',
        DEFAULT: 'var(--blue)',
      },
      yellow: {
        DEFAULT: 'var(--yellow)',
      },
    },
    variants: {},
    plugins: [],
  },
};