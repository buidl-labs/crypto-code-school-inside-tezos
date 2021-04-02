import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';

function SEO({ description, lang, image, meta, keywords, title, pathname }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={data => {
        const metaDescription =
          description || data.site.siteMetadata.description;
        const metaImage =
          image && image.src
            ? `${data.site.siteMetadata.siteUrl}${image.src}`
            : null;
        console.log('metaImage', metaImage);
        const metaUrl = `${data.site.siteMetadata.siteUrl}${pathname}`;
        return (
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            titleTemplate={`%s | ${data.site.siteMetadata.title}`}
          >
            <title>{title}</title>
            <meta name="description" content={metaDescription} />
            <meta
              name="google-site-verification"
              content="0l33QQ_a2I1oSyXr4TaAyRsKpKMdE3jimfhRNU9EgnA"
            />
            <meta name="image" content={image} />
            <link rel="canonical" href={metaUrl} />
            {/* OpenGraph tags */}
            <meta property="og:url" content={metaUrl} />
            <meta property="og:title" content={title} />
            <meta property="og:type" content="website" />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={image} />
            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta
              name="twitter:creator"
              content={`@${data.site.siteMetadata.social.twitter}`}
            />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />{' '}
          </Helmet>
        );
      }}
    />
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
  pathname: ``,
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  image: PropTypes.object,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  pathname: PropTypes.string,
  title: PropTypes.string.isRequired,
};

export default SEO;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        siteUrl
        description
        author
        social {
          twitter
        }
      }
    }
  }
`;
