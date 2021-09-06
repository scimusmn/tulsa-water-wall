//
// Custom webpack config
//
// We separate this file out into its own config so that developers
// can use it in their editor configuration, which can help the editor to resolve
// the import aliases. This config is imported in the parent Gatsby config in gatsby-node.js
//
const path = require('path');
const aliases = require('./import-aliases');

// Modify the import alias list to match webpack config, for import into Gatsby parent config
module.exports = {
  resolve: {
    alias: aliases.reduce((object, item) => {
      const aliasObject = object;
      aliasObject[item.alias] = path.resolve(__dirname, item.path);
      return aliasObject;
    }, {}),
  },
};
