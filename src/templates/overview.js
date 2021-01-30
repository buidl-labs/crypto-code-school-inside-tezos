import React, { useState, useEffect } from 'react';
import Layout from 'src/components/Layout/layout';
import useChapters from 'src/hooks/use-chapters';
import { Link, graphql } from 'gatsby';
import { trackEvent } from 'src/utils/analytics';
import Footer from 'src/components/Footer';
import SEO from 'src/components/Seo';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DoneIcon from '@material-ui/icons/Done';

const MDXParagraph = props => <p className={`text-2xl pt-6`} {...props} />;

const ChapterRow = ({ chapter, num }) => (
  <li>
    <Link
      to="#"
      className={`flex justify-between items-center hover:no-underline`}
    >
      <div className={`flex items-center`}>
        <div
          className={`bg-base-400 text-base-700 rounded-full h-12 w-12 flex items-center justify-center`}
        >
          <DoneIcon />
        </div>
        <p className={`text-2xl ml-4`}>
          Chapter {num}: {chapter.title}
        </p>
      </div>
      <span>
        <ChevronRightIcon />
      </span>
    </Link>
  </li>
);
export const query = graphql`
  query($slug: String!) {
    mdx(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        slug
        next
        title
      }
      body
    }
  }
`;

function LessonsOverview({ data: { mdx: module } }) {
  const chapters = useChapters(module.frontmatter.slug);
  const [chapterList, updateChapterList] = useState(chapters);
  const [continuationLink, setContinuationLink] = useState('#');
  const [chapterZeroCompleted, setZeroChapterCompleted] = useState(() => {
    let result = false;
    const isChapterZeroCompleted =
      typeof window != 'undefined' && localStorage.getItem('chapter-0');
    if (isChapterZeroCompleted !== null) {
      result = isChapterZeroCompleted;
    }

    return result;
  });

  //   useEffect(() => {
  //     //get the previous stored if available otherwise create a new one
  //     let list = [];
  //     const listJSON =
  //       typeof window != 'undefined' &&
  //       localStorage.getItem(module.frontmatter.filterBy);
  //     if (listJSON !== null) {
  //       list = JSON.parse(listJSON);
  //       //handle backward compatibility by removing chapters where current key isn't available
  //       list = list.filter(chapter => chapter && chapter.current);
  //       typeof window != 'undefined' &&
  //         localStorage.setItem(module.frontmatter.filterBy, JSON.stringify(list));
  //     }

  //     if (!chapterZeroCompleted && module.frontmatter.slug === 'module-01') {
  //       // console.log('storyline');
  //       setContinuationLink('/tezos/storyline');
  //       return;
  //     }
  //     //Go to next chapter route link from last successfully completed chapter
  //     // if no chapter completed --> show first-chapter
  //     // console.log('list', list);
  //     if (list.length === 0) {
  //       setContinuationLink(module.frontmatter.next);
  //     } else if (list.length > 0) {
  //       const chapterSlug =
  //         chapters[list[list.length - 1].current] &&
  //         chapters[list[list.length - 1].current].slug;
  //       if (!chapterSlug) {
  //         if (module.frontmatter.slug === 'module-01') {
  //           // if last chapter of module-01 completed --> show the game next.
  //           setContinuationLink('/tezos/game');
  //         } else {
  //           // TODO: Figure out what the continuation link at the end has to be for rest of the modules
  //           setContinuationLink('#');
  //         }
  //       } else {
  //         // if 1st chapter completed show --> next chapter i.e 2nd chapter and so on
  //         setContinuationLink(`/tezos/lesson/${chapterSlug}`);
  //       }
  //     }
  //   }, []);

  useEffect(() => {
    trackEvent('Chapters-Overview-View');
  }, []);

  // useEffect(() => {
  //   //get the previous stored if available otherwise create a new one
  //   let list = [];
  //   const listJSON =
  //     typeof window != 'undefined' &&
  //     localStorage.getItem(module.frontmatter.filterBy);
  //   if (listJSON !== null) {
  //     list = JSON.parse(listJSON);
  //   }
  //   const newChapterList = chapters.map(chapter => {
  //     const chapterAlreadyExists = list.some(savedChapter => {
  //       return savedChapter.chapterSlug === chapter.slug;
  //     });
  //     return {
  //       title: chapter.title,
  //       chapter: chapter.chapter,
  //       slug: chapter.slug,
  //       excerpt: chapter.excerpt,
  //       completed: chapterAlreadyExists,
  //       editor: chapter.editor,
  //     };
  //   });

  //   updateChapterList(newChapterList);
  // }, []);

  // useEffect(() => {
  //   SyncSavedUserProgressWithLatestUpdates();
  // }, []);

  // const SyncSavedUserProgressWithLatestUpdates = () => {
  //   let list = [];
  //   const listJSON =
  //     typeof window != 'undefined' &&
  //     localStorage.getItem(module.frontmatter.filterBy);
  //   if (listJSON !== null) {
  //     list = JSON.parse(listJSON);
  //   }
  //   if (list.length > 0) {
  //     const updateList = list.filter(currentSavedChapter => {
  //       const result = chapterList.find(ch => {
  //         return ch.editor.answer === currentSavedChapter.code;
  //       });
  //       return result;
  //     });
  //     // console.log('updateList', updateList);
  //     //update stored user progress lesson chapters
  //     //sync it according to latest content
  //     localStorage.setItem(
  //       module.frontmatter.filterBy,
  //       JSON.stringify(updateList),
  //     );
  //   }
  // };

  return (
    <Layout>
      <SEO title="Chapters Overview" />
      <div></div>
      <main className={`bg-base-900 pb-24`}>
        <header className={`px-30 pt-6 text-white`}>
          <Link
            to="/tezos/academy"
            className={`inline-flex items-center text-lg text-base-50 hover:no-underline`}
          >
            <ChevronLeftIcon className={`h-6 w-6 mr-3`} />
            Back to Modules
          </Link>
          <article className={`pt-6 text-center`}>
            <h1 className={`text-6xl font-black`}>
              {module.frontmatter.title}
            </h1>
            <div
              className={`mt-8 bg-base-800 border border-base-400 rounded-2xl px-14 py-12 mx-26`}
            >
              <h2 className={`text-5xl font-black`}>Mission Brief</h2>
              <MDXProvider components={{ p: MDXParagraph }}>
                <MDXRenderer>{module.body}</MDXRenderer>
              </MDXProvider>
            </div>
          </article>
        </header>
        <main
          className={`mt-24 mr-36 grid text-white`}
          style={{ gridTemplateColumns: '1fr 2fr' }}
        >
          <div className={`bg-base-700 rounded-tr-2xl rounded-br-2xl`}></div>
          <div className={`pl-6 py-8`}>
            <h3 className={`text-4xl font-black`}>Chapters</h3>
            <ul className={`mt-8 space-y-6`}>
              {chapterList.map((c, i) => (
                <ChapterRow chapter={c} key={c.slug} num={i} />
              ))}
            </ul>
          </div>
        </main>
        {/* <pre className={`text-base-50`}>
          {JSON.stringify(
            chapterList.map(c => c.chapter),
            null,
            4,
          )}
        </pre> */}
      </main>
      <Footer />
    </Layout>
  );
}

export default LessonsOverview;
