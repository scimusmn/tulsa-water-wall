const path = require('path');
const importAliases = require('./import-aliases');

// Modify the import alias list to match eslint import/resolver format
const aliasObject = importAliases.map(
  (alias) => [alias.alias, path.resolve(__dirname, alias.path)],
);

module.exports = {
  extends: [
    'airbnb',
    'plugin:jsx-a11y/strict',
  ],
  env: {
    browser: true,
  },
  ignorePatterns: [
    'public/*',
    'src/Arduino/arduino-base',
    'postcss.config.js',
    'src/html.js',
  ],
  rules: {
    'import/no-extraneous-dependencies': 'off',
    // The SMM team doesn't write React code in .jsx files exclusively, as is suggested in the
    // Airbnb guide, so override this rule to allow .js files.
    'react/jsx-filename-extension': [
      1,
      {
        extensions: [
          '.js',
          '.jsx',
        ],
      },
    ],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: aliasObject,
        extensions: ['.ts', '.js', '.jsx', '.json'],
      },
    },
  },
};
