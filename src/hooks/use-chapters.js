import { useStaticQuery, graphql } from 'gatsby';

const useChapters = (module) => {
  const data = useStaticQuery(graphql`
    query {
      allMdx(sort: { fields: frontmatter___slug, order: ASC }, filter: {frontmatter: {type: {ne: "module"}}}) {
        nodes {
          frontmatter {
            title
            slug
            chapter
            filterBy
            editor {
              answer
              showEditor
              language
              startingCode
            }
          }
          excerpt
        }
      }
    }
  `);
  return data.allMdx.nodes.filter(chapter => {
    return chapter.frontmatter.filterBy === module;
  })
  .map(chapter => ({
    title: chapter.frontmatter.title,
    chapter: chapter.frontmatter.chapter,
    slug: chapter.frontmatter.slug,
    excerpt: chapter.excerpt,
    editor: {
      answer: chapter.frontmatter.editor.answer,
      showEditor: chapter.frontmatter.editor.showEditor,
      language: chapter.frontmatter.editor.language,
      startingCode: chapter.frontmatter.editor.startingCode,
    },
  }));
};

export default useChapters;
