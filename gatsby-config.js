const siteUrl =
  process.env.URL || process.env.DEPLOY_URL || `https://cryptocodeschool.in/`;

module.exports = {
  siteMetadata: {
    title: `Crypto Code School`,
    author: `Buidl Labs`,
    description: `Interactive Code School for onboarding newcomers to the Tezos Ecosystem using smartpy`,
    siteUrl,
    social: {
      twitter: `BuidlLabs`,
    },
  },
  plugins: [
    `gatsby-plugin-netlify`,
    `gatsby-plugin-portal`,
    `gatsby-plugin-emotion`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
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
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Roboto`,
            subsets: [`latin`],
            variants: [`400`, `500`, `700`],
          },
          {
            family: `Inconsolata`,
            subsets: [`latin`],
            variants: [`400`, `700`],
          },
          {
            family: `Open Sans`,
            variants: [`400`, `700`],
          },
          {
            family: `Sigmar One`,
            subsets: [`latin`],
          },
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
        apiKey: '9f25945960748d67e7f7cf101ece3422',
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
      resolve: `gatsby-plugin-metomic`,
      options: {
        clientId: 'prj:328a9ae4-b11d-4e2f-a5e3-4525fd629176',
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
