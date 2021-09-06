//
// Import aliases
//
// Define an alias, using the @ symbol as a prefix.
// The @ symbol is just a local team preference, and doesn't
// have any technical significance. These aliases are imported
// by our webpack configurations and eslint settings, so that
// those systems can resolve these aliases.
//
module.exports = [
  { alias: '@components', path: './src/components' },
  { alias: '@styles', path: './src/styles' },
];
