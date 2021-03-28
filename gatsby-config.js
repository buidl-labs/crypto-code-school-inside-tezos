const path = require('path');
const siteUrl =
  process.env.URL || process.env.DEPLOY_URL || `https://cryptocodeschool.in/`;

module.exports = {
  siteMetadata: {
    title: `Cryptoverse Wars`,
    author: `BUIDL Labs`,
    description: `An interactive Code School to build DApps on Tezos using SmartPy`,
    siteUrl,
    social: {
      twitter: `BUIDLabs`,
    },
  },
  plugins: [
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-portal`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-postcss`,

    {
      resolve: 'gatsby-plugin-react-svg',
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `lessons`,
        path: `lessons`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Crypto Code School`,
        short_name: `CSS`,
        start_url: `/`,
        background_color: `#162F30`,
        theme_color: `#162F30`,
        display: `minimal-ui`,
        icon: `src/assets/theme.svg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Mulish\:400,700,800,900`,
          `Ubuntu Mono\:400, 700`,
          `Roboto\:400,500,700`,
          `Inconsolata\:400,700`,
          'Open Sans:400,700',
          `Sigmar One`,
          `Inter\:400,500,700`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-python',
            },
          },
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-webpack-bundle-analyzer',
      options: {
        production: true,
        disable: !process.env.ANALYZE_BUNDLE_SIZE,
        generateStatsFile: true,
        analyzerMode: 'static',
      },
    },
    {
      resolve: `gatsby-plugin-typescript`,
    },
    {
      resolve: `gatsby-plugin-amplitude-analytics`,
      options: {
        // API key for your Amplitude Project (required)
        //TODO: BEFORE merging it in master, resolve whether to use beta-or main-master api key
        //cryptoverse-wars beta amplitude tracking api key
        apiKey: 'b8c4bfb895ccfd2479ce7fd4507b1256',
        // Puts tracking script in the head instead of the body (optional)
        head: true,
        // Prevents loading Amplitude and logging events if visitors have "Do Not Track" enabled (optional)
        respectDNT: true,
        // Avoids sending pageview hits from custom paths (optional)
        exclude: ['/preview/**', '/do-not-track/me/too/'],
        // Override the default event types (optional)
        eventTypes: {
          outboundLinkClick: 'OUTBOUND_LINK_CLICK',
          pageView: 'PAGE_VIEW',
        },
        // Amplitude JS SDK configuration options (optional)
        amplitudeConfig: {
          saveEvents: true,
          includeUtm: true,
          includeReferrer: true,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-root-import',
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
    // {
    //   resolve: "@sentry/gatsby",
    //   options: {
    //     dsn: "https://d2e5097585b0401aab888bfa8a8570ac@o551788.ingest.sentry.io/5675666",
    //     sampleRate: 0.7,
    //     denyUrls: ["localhost:8000"]
    //   },
    // },
  ],
};
