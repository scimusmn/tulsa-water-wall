const webpackConfig = require('./gatsby-webpack-config');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig(webpackConfig);
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions;

  //
  // Render "/app/*" pages on the client only, so that we can use the WebSocket Browser API
  //
  // page.matchPath is a special key that's used for matching pages only on the client.
  if (page.path.match(/^\/app/)) {
    // eslint-disable-next-line no-param-reassign
    page.matchPath = '/app/*';

    // Update the page.
    createPage(page);
  }
};
