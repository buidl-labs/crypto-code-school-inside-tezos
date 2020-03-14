exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      allMdx {
        nodes {
          frontmatter {
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic('failed to create chapter', result.errors);
  }

  const chapters = result.data.allMdx.nodes;

  chapters.forEach(chapter => {
    actions.createPage({
      path: `/lesson/${chapter.frontmatter.slug}`,
      component: require.resolve('./src/templates/chapter.js'),
      context: {
        slug: chapter.frontmatter.slug,
      },
    });
  });
};
