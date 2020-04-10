import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';

/**
 * In this functional component a <BackgroundImage />  is compared to an <Img />.
 * @param className   string    className(s) from styled-components.
 * @param children    nodes     Child-components from index.js
 * @return {*}
 * @constructor
 */
const HomepageHeroImage = ({ className, children }) => {
  const { desktop } = useStaticQuery(
    graphql`
      query {
        desktop: file(relativePath: { eq: "landing_background.jpg" }) {
          childImageSharp {
            fluid(quality: 100, maxWidth: 4160) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `,
  );

  const imageData = desktop.childImageSharp.fluid;
  return (
    <BackgroundImage
      Tag="section"
      className={className}
      // To style via external CSS see layout.css last examples:
      // className="test"
      fluid={imageData}
      // Title get's passed to both container and noscriptImg.
      title="gbitest"
      id="gbitest"
      role="img"
      aria-label="gbitest"
    >
      {children}
    </BackgroundImage>
  );
};

export default HomepageHeroImage;
