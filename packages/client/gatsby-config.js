require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    author: '@scimusmn',
    description: 'Science Museum of Minnesota exhibit template',
    title: 'app-template',
  },
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-eslint',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Tulsa Water Wall - Drawing',
        short_name: 'Water Wall',
        start_url: '/',
        background_color: '#004a87',
        theme_color: '#00a9e0',
        display: 'standalone',
        icon: 'src/images/icon.png',
      },
    },
  ],
};
