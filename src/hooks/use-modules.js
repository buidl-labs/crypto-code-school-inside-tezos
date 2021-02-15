import { useStaticQuery, graphql } from 'gatsby';

const useModules = m => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(filter: { frontmatter: { type: { eq: "module" } } }) {
        edges {
          node {
            id
            frontmatter {
              title
              slug
            }
          }
        }
      }
    }
  `);

  return data.allMdx.edges
    .filter(module => module.node.frontmatter.slug == m)
    .map(module => ({
      module: module.node.frontmatter.slug,
      title: module.node.frontmatter.title,
    }))[0];

  return ['working', 'on', 'it'];
  return data.allMdx.nodes.map(module => ({
    module: module.frontmatter.slug,
    title: module.frontmatter.title,
  }));
};

export default useModules;
