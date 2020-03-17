import { useStaticQuery, graphql } from 'gatsby';

const useChapters = () => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(sort: { fields: frontmatter___slug, order: ASC }) {
        nodes {
          frontmatter {
            title
            slug
          }
          excerpt
        }
      }
    }
  `);
  return data.allMdx.nodes.map(chapter => ({
    title: chapter.frontmatter.title,
    slug: chapter.frontmatter.slug,
    excerpt: chapter.excerpt,
  }));
};

export default useChapters;
