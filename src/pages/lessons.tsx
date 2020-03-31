import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { navigate } from 'gatsby';
import Layout from '../components/Layout/layout';
import ContentMenuSlider from '../templates/components/MenuSlider/index';
import useChapters from '../hooks/use-chapters';
import { Link } from 'gatsby';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import ChaptersHeading from '../images/chapter-heading.svg';
import ThemeLogo from '../images/theme-logo.svg';
import Seed from '../images/content-seed.svg';
import Forward from '../images/forward-circle.svg';
import Backward from '../images/backward-circle.svg';
import Complete from '../images/complete.svg';
import Incomplete from '../images/incomplete.svg';

import {
  PrevLink,
  NextLink,
} from '../templates/components/ChapterFooter/styled';

import {
  ChapterLink
} from '../templates/components/MenuSlider/styled';

import './styles/styled.css';

const ChapterView = () => {
  const chapters = useChapters();
  return (
    <Layout>
      <div>
        {/* <div>
          <Link to={'/'}>
            <img className="previous" src={Backward} alt="NEXT" style={{ maxWidth: '25px', maxHeight: '25px' }} />
          </Link>
          <PrevLink to={`/`}>
            <FaChevronLeft />
            <span>Back</span>
          </PrevLink>
          <NextLink to={'/lessons'}>
            <span>Finish</span> <FaChevronRight />
          </NextLink>
        </div> */}
        <div className="rows">

          <div className="row" style={{ color: 'white' }}>
            <img src={ThemeLogo} alt="THEME" style={{ maxHeight: '280px', maxWidth: '500px' }} />
          </div>

          <div className="row" style={{ paddingRight: '100px', paddingLeft: '100px'}}>
            {/* content */}

            <div className="col" style={{ color: 'white', width: '50%', textAlign: 'center', marginTop:'100px' }}>

              <div className="detail" style={{ background: 'rgb(0,0,0,0.1)', padding: '20px', borderRadius: '20px' }}>

                <div className="divPrevious">
                  <Link to={'/'}>
                    <img className="previous" src={Backward} alt="NEXT"/>
                  </Link>
                </div>

                <div className="content" style={{ padding: '-5px 5px 5px 5px', marginTop: '-20px' }}>
                  <img src={Seed} alt="SEED"/>
                  <div style={{ marginTop: '20px', fontSize:'30px', lineHeight:"175%"}}>/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laboe et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae*/</div>
                </div>
              </div>
            </div>

            <div className="col" style={{ width: '50%' }}>
              <div className="chapters" style={{padding: "25px", borderRadius: '20px' }}>

                <div className="imageLink">
                  <img src={ChaptersHeading} alt="CHAPTERS"/>
                  <Link to={'/lesson/chapter-01'}>
                    <img className="next" src={Forward} alt="NEXT" />
                  </Link>
                </div>

                <div>
                  {/* style={{marginTop:'40px'}}> */}
                  {chapters.map(chapter => {
                    return (
                      <div style={{ maxHeight: '100%', margin: '10px', textAlign: 'left', textColor: "white" }}>
                        <Link
                          partiallyActive={true}
                          activeStyle={{ background: '#18B77E' }}
                          to={`/lesson/${chapter.slug}`} style={{ display: 'block', color: "white", textDecoration: 'none', fontSize:"28px", lineHeight:'33px', margin:'20px', marginTop:'30px'}}
                        >
                          {chapter.chapter}: {chapter.title}
                        </Link>
                        <span style={{width:'25%'}}></span>
                        {
                          false ? ( <img src={Complete} alt="Complete" style={{paddingLeft: "25px"}}/>
                          ) :
                          (
                            <img src={Incomplete} alt="Incomplete" style={{paddingLeft: "25px"}}/>
                          )
                        }

                        <hr style={{ margin: '10px', color:"rgba(255, 255, 255, 0.05);"}} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </Layout>

    // <Layout>
    //   <div>
    //     {/* <div>
    //       <Link to={'/'}>
    //         <img className="previous" src={Backward} alt="NEXT" style={{ maxWidth: '25px', maxHeight: '25px' }} />
    //       </Link>
    //       <PrevLink to={`/`}>
    //         <FaChevronLeft />
    //         <span>Back</span>
    //       </PrevLink>
    //       <NextLink to={'/lessons'}>
    //         <span>Finish</span> <FaChevronRight />
    //       </NextLink>
    //     </div> */}

    //     <div className="" style={{ paddingRight: '100px', paddingLeft: '100px', paddingTop: '10px' }}>
    //       {/* content */}

    //       <div className="col" style={{ color: 'white', width: '50%', padding: "20px"}}>

    //         <div className="row" style={{ color: 'white'}}>
    //           <img src={ThemeLogo} alt="THEME" style={{ maxHeight: '280px', maxWidth: '500px'}} />
    //         </div>
    //         <div className="row" style={{ color: 'white', textAlign: 'center' }}>

    //           <div className="detail" style={{ background: 'rgb(0,0,0,0.1)', padding: '20px', borderRadius: '20px' }}>

    //             <div className="divPrevious">
    //               <Link to={'/'}>
    //                 <img className="previous" src={Backward} alt="NEXT" style={{ maxWidth: '25px', maxHeight: '25px' }} />
    //               </Link>
    //             </div>

    //             <div className="content" style={{ padding: '-5px 5px 5px 5px', marginLeft:'-20px'}}>
    //               <img src={Seed} alt="SEED" style={{ maxHeight: '100px', maxWidth: '100px' }} />
    //               <div style={{ marginTop: '20px' }}>/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laboe et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae*/</div>
    //             </div>
    //           </div>
    //         </div>

    //       </div>

    //       <div className="col" style={{ width: '50%', padding: "20px"}}>
    //         <div className="chapters" style={{ background: 'rgb(0,0,0,0.1)', padding: "15px", borderRadius: '20px' }}>

    //           <div className="imageLink">
    //             <img src={ChaptersHeading} alt="CHAPTERS" style={{ maxHeight: '50px', maxWidth: '150px' }} />
    //             <Link to={'/lesson/chapter-01'}>
    //               <img className="next" src={Forward} alt="NEXT" style={{ maxWidth: '25px', maxHeight: '25px' }} />
    //             </Link>
    //           </div>

    //           <div>
    //             {/* style={{marginTop:'40px'}}> */}
    //             {chapters.map(chapter => {
    //               return (
    //                 <div style={{ maxHeight: '100%', margin: '20px', textAlign: 'left', textColor: "white" }}>
    //                   <Link
    //                     partiallyActive={true}
    //                     activeStyle={{ background: '#18B77E' }}
    //                     to={`/lesson/${chapter.slug}`} style={{ display: 'block', color: "white", textDecoration: 'none' }}
    //                   >
    //                     {chapter.chapter}: {chapter.title}
    //                   </Link>
    //                   {/* <hr style={{ margin: '10px' }} /> */}
    //                 </div>
    //               );
    //             })}
    //           </div>
    //         </div>
    //       </div>

    //     </div>

    //   </div>
    // </Layout>

  );
};

export default ChapterView;
