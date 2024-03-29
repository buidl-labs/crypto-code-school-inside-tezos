import React, { useEffect, useMemo } from 'react';
import { graphql, Link, navigate } from 'gatsby';
import Layout from 'src/components/Layout/layout';
import SEO from 'src/components/Seo';
import Footer from 'src/components/Footer';
import DoneIcon from '@material-ui/icons/Done';
import useChapters from 'src/hooks/use-chapters';
import { trackEventWithProperties } from 'src/utils/analytics';
import { isMobile, isTablet } from 'react-device-detect';

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
          {i}
        </div>
      )}

      <div
        className={`grid grid-cols-2 w-full bg-base-800 border border-base-400 rounded-xl`}
      >
        <div className={`block my-0 mx-auto`}>
          <img
            src={m.frontmatter.img.childImageSharp.fluid.src}
            className="object-cover object-center min-h-25rem"
          />
        </div>
        <div className={`my-auto`}>
          <h2 className={`font-black text-5xl my-1`}>{m.frontmatter.title}</h2>
          <p
            className={`text-lg pr-9 mt-6`}
            dangerouslySetInnerHTML={{ __html: m.frontmatter.description }}
          />
          {p > 0 && (
            <h3 className={`text-success-500 text-3xl mt-4 font-black`}>
              {p}% complete
            </h3>
          )}
          <button
            onClick={() => {
              trackEventWithProperties('click academy view module button', {
                slug: m.frontmatter.slug,
              });
              navigate(`/tezos/academy/${m.frontmatter.slug}`);
            }}
            className={`bg-primary-600 mt-4 inline-block py-3 px-9 font-bold text-2xl rounded hover:no-underline`}
          >
            {p === 100 ? 'Revisit' : p > 0 ? 'Continue' : 'Start'} Module
          </button>
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
          img {
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid
              }
            }
          }
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
  const linkClasses = useMemo(() => `text-primary-300`, []);
  const progress = useMemo(() => {
    let p =
      typeof window != 'undefined' &&
      JSON.parse(localStorage.getItem('progress') || '{}');
    return p;
  }, []);

  //redirect to home if in mobile/tablet
  useEffect(() => {
    if (isMobile || isTablet) {
      navigate('/tezos');
    }
  });

  return (
    <Layout>
      <SEO
        title="Academy"
        description="5 fun courses to take you from zero-to-hero in blockchain development with SmartPy"
      />
      <main className={`px-30 py-12 bg-base-900 text-white`}>
        <div
          className={`text-center my-0 mx-auto`}
          style={{ maxWidth: '60vw' }}
        >
          <h1 className={`text-6xl font-black heading-glow`}>
            Welcome to Academy
          </h1>
          <div className={`mt-6 text-2xl`}>
            <p>Get started on your journey of becoming a blockchain pro 🤘</p>
            <p className={`mt-2`}>
              Learn how to code{' '}
              <Link
                to="/tezos/academy/module-0/chapter-05"
                className={linkClasses}
              >
                decentralized apps
              </Link>{' '}
              on the{' '}
              <a
                href="https://tezos.com/"
                target="_blank"
                className={linkClasses}
              >
                Tezos blockchain
              </a>{' '}
              using{' '}
              <a
                href="https://smartpy.io/"
                target="_blank"
                className={linkClasses}
              >
                SmartPy
              </a>{' '}
              and how to interact with{' '}
              <Link
                to="/tezos/academy/module-0/chapter-04"
                className={linkClasses}
              >
                smart contracts
              </Link>{' '}
              using the{' '}
              <a
                href="https://tezostaquito.io/"
                target="_blank"
                className={linkClasses}
              >
                Taquito
              </a>{' '}
              javascript library.
            </p>
            <p className={`mt-4`}>
              You’ll build your Cryptobot, fight aliens, create your currency,
              and so much more exciting stuff ✨
            </p>
            <p className={`mt-2`}>
              I know, it can sound like too much. But don't worry, we'll take
              you through this step-by-step ❤️
            </p>
          </div>
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
