/** @type {import('prettier').Config} */
module.exports = {
  singleQuote: true,
  trailingComma: 'es5',
  printWidth: 100,
  plugins: [require('prettier-plugin-svelte'), require('prettier-plugin-tailwindcss')],
  overrides: [
    {
      files: '*.svelte',
      options: { parser: 'svelte' },
    },
  ],
};
