exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    query {
      allMdx {
        nodes {
          frontmatter {
            slug
            type
            filterBy
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
    console.log(file.frontmatter.filterBy);
    if (file.frontmatter.type === 'module') {
      actions.createPage({
        path: `/tezos/academy/${file.frontmatter.slug}`,
        component: require.resolve('./src/templates/overview.js'),
        context: {
          slug: file.frontmatter.slug,
        },
      });
    } else if (file.frontmatter.filterBy === 'module-04') {
      console.log('Creating file for taquito');
      actions.createPage({
        path: `/tezos/academy/${file.frontmatter.filterBy}/${file.frontmatter.slug}`,
        component: require.resolve('./src/templates/chapterWithLiveEditor.js'),
        context: {
          slug: file.frontmatter.slug,
          module: file.frontmatter.filterBy,
        },
      });
    } else {
      actions.createPage({
        path: `/tezos/academy/${file.frontmatter.filterBy}/${file.frontmatter.slug}`,
        component: require.resolve('./src/templates/chapter-new.js'),
        context: {
          slug: file.frontmatter.slug,
          module: file.frontmatter.filterBy,
        },
      });
    }
  });
};
