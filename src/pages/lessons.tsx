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
import Line from '../images/line.svg';

import { useMediaQuery } from 'react-responsive';

import {
  PrevLink,
  NextLink,
} from '../templates/components/ChapterFooter/styled';

import {
  ChapterLink
} from '../templates/components/MenuSlider/styled';

import {
  PrevButton,
  Rows,
  Row1,
  Row2,
  Col1,
  Description,
  Col2,
  Chapters,
  ChapterHead,
  ChaptersList
} from './styles/styled';

import './styles/styled.css';

const ChapterView = () => {
  const chapters = useChapters();
  return (
    <Layout>
      <div>

        <PrevButton>
          <PrevLink to={`/`}>
            <FaChevronLeft />
            <span>Back</span>
          </PrevLink>
        </PrevButton>

        <Rows>

          <Row1>
            <img src={ThemeLogo} alt="THEME" style={{height: 'auto'}} />
          </Row1>

          <Row2>

            <Col1>

              <Description>

                <div className="content" style={{ padding: '-5px 5px 5px 5px' }}>
                  <img src={Seed} alt="SEED" style={{height: 'auto'}}/>
                  <div style={{ marginTop: '20px', lineHeight: "150%" }}>/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut laboe et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae*/</div>
                </div>
              </Description>

            </Col1>
            <Col2>
              <Chapters>

                <ChapterHead>
                  <img src={ChaptersHeading} alt="CHAPTERS" style={{height: 'auto'}} />
                  <Link to={'/lesson/chapter-01'}>
                    <img className="next" src={Forward} alt="NEXT" style={{height: 'auto'}} />
                  </Link>
                </ChapterHead>

                <div>
                  {chapters.map(chapter => {
                    return (

                      <ChaptersList>
                        <Link
                          partiallyActive={true}
                          activeStyle={{ background: '#18B77E' }}
                          to={`/lesson/${chapter.slug}`} style={{ display: 'block', color: "white", textDecoration: 'none', fontSize: "25px", lineHeight: '33px', margin: '20px', marginTop: '30px' }}
                        >
                          {chapter.chapter}: {chapter.title}
                        </Link>
                        <span style={{ width: '25%' }}></span>
                        {
                          true ? (<img src={Complete} alt="Complete" style={{ paddingLeft: "25px", maxWidth:'100%', height:'auto' }} />
                          ) :
                            (
                              <img src={Incomplete} alt="Incomplete" style={{ paddingLeft: "25px", maxWidth:'100%', height:'auto' }} />
                            )
                        }
                        <img src={Line} alt="Line" style={{marginTop: '20px', width:'100%', height:'auto'}}/>

                        {/* <hr style={{ margin: '10px', height:'3px', background: "rgba(255, 255, 255, 0.01);" }} /> */}
                      </ChaptersList>

                    );
                  })}
                </div>

              </Chapters>
            </Col2>
          </Row2>
        </Rows>

      </div>
    </Layout>

  );
};

export default ChapterView;
