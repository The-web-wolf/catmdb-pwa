require('dotenv').config({
  path: `.env`,
})
module.exports = {
  siteMetadata: {
    title: `CATMDB`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-transformer-remark`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `CATMDB`,
        short_name: `CATMDB`,
        start_url: `/`,
        lang: `en`,
        description: `Cryto ATM Database`,
        background_color: `#ffffff`,
        theme_color: `#ffffff`,
        display: `standalone`,
        icon: `src/assets/brand.webp`,
        orientation: `portrait`,
        cache_busting_mode: `none`,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        workboxConfig: {
          globPatterns: [`**/icons*`],
        },
      },
    },
  ],
}
