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
      resolve: 'gatsby-plugin-purgecss',
      options: {
        printRejected: false, // Print removed selectors and processed file names
        develop: true, // Enable while using `gatsby develop`
        tailwind: true, // Enable tailwindcss support
        // ignore: ['/ignored.css', 'prismjs/', 'docsearch.js/'], // Ignore files/folders
        // purgeOnly : ['components/', '/main.css', 'bootstrap/'], // Purge only these files/folders
        purgeCSSOptions: {
          // https://purgecss.com/configuration.html#options
          // safelist: ['safelist'], // Don't remove this selector
        },
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
