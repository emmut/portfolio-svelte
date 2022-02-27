module.exports = {
  content: ['./src/**/*.{svelte,ts}', 'src/app.html'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            a: {
              fontWeight: 'bold',
            },
            '--tw-prose-quote-borders': theme('colors.pink[600]'),
            '--tw-prose-invert-body': theme('colors.neutral[200]'),
            '--tw-prose-invert-headings': theme('colors.neutral[200]'),
            '--tw-prose-invert-bold': theme('colors.neutral[200]'),
            '--tw-prose-invert-quotes': theme('colors.neutral[200]'),
            '--tw-prose-invert-quote-borders': theme('colors.green[500]'),
            '--tw-prose-invert-code': theme('colors.neutral[200]'),
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
