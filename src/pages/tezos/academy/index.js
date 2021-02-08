import React, { useEffect, useMemo } from 'react';
import { graphql, Link } from 'gatsby';
import Layout from 'src/components/Layout/layout';
import SEO from 'src/components/Seo';
import Footer from 'src/components/Footer';
import Cryptobot from 'src/images/cryptobot-yellow.png';
import DoneIcon from '@material-ui/icons/Done';
import useChapters from 'src/hooks/use-chapters';

const CourseCard = ({ m, i, progress }) => {
  const chapters = useChapters(m.frontmatter.slug);

  const p = useMemo(
    () => Math.round((Object.keys(progress).length / chapters.length) * 100),
    [],
  );
  console.log('🔥', p);
  return (
    <article className={`flex`}>
      {p === 100 ? (
        <div
          className={`h-12 w-12 relative z-10 rounded-full bg-success-200 text-success-600 flex items-center justify-center text-2xl mr-14 flex-none`}
        >
          <DoneIcon />
        </div>
      ) : (
        <div
          className={`h-12 w-12 relative z-10 rounded-full ${
            p > 0 ? 'bg-primary-600' : 'bg-base-400'
          } text-white flex items-center justify-center text-2xl mr-14 flex-none`}
        >
          {i + 1}
        </div>
      )}

      <div
        className={`grid grid-cols-2 w-full bg-base-800 border border-base-400 rounded-xl`}
      >
        <div>
          <img src={Cryptobot} className={`block my-0 mx-auto`} />
        </div>
        <div className={`my-auto`}>
          <h2 className={`font-black text-5xl`}>{m.frontmatter.title}</h2>
          <p className={`text-lg pr-9`}>{m.frontmatter.description}</p>
          {p > 0 && (
            <h3 className={`text-success-500 text-3xl mt-4 font-black`}>
              {p}% complete
            </h3>
          )}
          <Link
            to={`/tezos/academy/${m.frontmatter.slug}`}
            className={`bg-primary-600 mt-4 inline-block py-3 px-9 font-bold text-2xl rounded hover:no-underline`}
          >
            {p === 100 ? 'Revisit' : p > 0 ? 'Continue' : 'Start'} Module
          </Link>
        </div>
      </div>
    </article>
  );
};

export const query = graphql`
  {
    allMdx(
      filter: { frontmatter: { type: { eq: "module" } } }
      sort: { order: ASC, fields: frontmatter___slug }
    ) {
      nodes {
        frontmatter {
          title
          slug
          description
        }
      }
    }
  }
`;

const CurriculumOverview = ({
  data: {
    allMdx: { nodes: modules },
  },
}) => {
  const progress = useMemo(() => {
    let p =
      window != 'undefined' &&
      JSON.parse(localStorage.getItem('progress') || '{}');
    return p;
  }, []);

  return (
    <Layout>
      <SEO title="Chapters Overview" />
      <main className={`px-30 py-12 bg-base-900 text-white`}>
        <div
          className={`text-center my-0 mx-auto`}
          style={{ maxWidth: '60vw' }}
        >
          <h1 className={`text-6xl font-black`}>Welcome to Academy</h1>
          <p className={`mt-6 text-2xl`}>
            Get started on your journey of becoming a blockchain pro. Learn how
            to code decentralized apps on the Tezos blockchain using SmartPy and
            how to interact with smart contracts using the Taquito javascript
            library.
            <p className={`mt-4`}>
              You’ll build your own Cryptobot, fight aliens, create your own
              currency, and so much more exciting stuff ✨
            </p>
          </p>
        </div>
        <ul className={`my-12 space-y-12 relative`}>
          {modules.map((m, i) => (
            <CourseCard
              m={m}
              i={i}
              key={i}
              progress={
                progress[m.frontmatter.slug] ? progress[m.frontmatter.slug] : {}
              }
            />
          ))}
          <div
            className={`absolute left-0 bottom-0 h-full w-4 bg-base-700 rounded-full ml-4 z-0`}
          ></div>
        </ul>
      </main>
      <Footer />
    </Layout>
  );
};

export default CurriculumOverview;
