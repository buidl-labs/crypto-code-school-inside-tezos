import React, { useState, useEffect, useMemo } from 'react';
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

const ChapterRow = ({ chapter, done }) => (
  <li>
    <Link
      to={`/tezos/academy/${chapter.module}/${chapter.slug}`}
      className={`flex justify-between items-center hover:no-underline`}
    >
      <div className={`flex items-center`}>
        <div
          className={`${
            done
              ? 'bg-success-200 text-success-600'
              : 'bg-base-400 text-base-700'
          } rounded-full h-12 w-12 flex items-center justify-center flex-shrink-0`}
        >
          <DoneIcon />
        </div>
        <p className={`text-2xl ml-4`}>
          {chapter.chapter}: {chapter.title}
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
        img {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      body
    }
  }
`;

function LessonsOverview({ data: { mdx: module } }) {
  const chapters = useChapters(module.frontmatter.slug);
  const [chapterList, updateChapterList] = useState(chapters);
  const progress = useMemo(() => {
    let p =
      typeof window != 'undefined' &&
      JSON.parse(localStorage.getItem('progress') || '{}');
    if (p[module.frontmatter.slug])
      return Object.keys(p[module.frontmatter.slug]);
    return [];
  }, [module.frontmatter.slug]);

  useEffect(() => {
    trackEvent('Chapters-Overview-View');
  }, []);

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
          style={{ gridTemplateColumns: '2fr 3fr' }}
        >
          <div
            className={`bg-base-700 rounded-tr-2xl rounded-br-2xl h-full w-full`}
          >
            {' '}
            <img src={module.frontmatter.img.childImageSharp.fluid.src} className="object-cover object-center" />
          </div>
          <div className={`pl-6 py-8`}>
            <h3 className={`text-4xl font-black`}>Chapters</h3>
            <ul className={`mt-8 space-y-6`}>
              {chapterList.map(c => (
                <ChapterRow
                  chapter={c}
                  key={c.slug}
                  done={progress.includes(c.slug)}
                />
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
