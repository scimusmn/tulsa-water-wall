const webpackConfig = require('./gatsby-webpack-config');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig(webpackConfig);
};
