exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      allMdx {
        nodes {
          frontmatter {
            slug
            type
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panic('failed to create chapter', result.errors);
  }

  const mdxFiles = result.data.allMdx.nodes;

  mdxFiles.forEach(file => {
    if (file.frontmatter.type === 'module') {
      actions.createPage({
        path: `/tezos/academy/${file.frontmatter.slug}`,
        component: require.resolve('./src/templates/overview.js'),
        context: {
          slug: file.frontmatter.slug,
        },
      });
    } else if (file.frontmatter.filterBy === 'lesson-4') {
      actions.createPage({
        path: `/tezos/lesson/${file.frontmatter.slug}`,
        component: require.resolve('./src/templates/chapterWithLiveEditor.js'),
        context: {
          slug: file.frontmatter.slug,
        },
      });
    } else {
      actions.createPage({
        path: `/tezos/lesson/${file.frontmatter.slug}`,
        component: require.resolve('./src/templates/chapter.js'),
        context: {
          slug: file.frontmatter.slug,
        },
      });
    }
  });
};
