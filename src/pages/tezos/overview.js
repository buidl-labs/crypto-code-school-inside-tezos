import React, {useEffect} from "react";
import { graphql } from "gatsby";
import Layout from 'src/components/Layout/layout';
import SEO from 'src/components/Seo';
import StyledLink from 'src/components/StyledLink';
import {
    Container,
    ThemeContainer,
    StartLink,
    ParentOverviewContainer,
    MainOverviewWrapper,
    GeneralOverview,
    ModuleOverview,
    ModuleBox,
    ModuleLink
} from 'src/PagesStyle/OverviewPage/styled';
import BackLink from 'src/components/BackLink';
import Footer from 'src/components/Footer';
import Theme from 'src/assets/theme.svg';
import { IoIosArrowDropright } from "react-icons/io";


export const query = graphql`
  {
    allMdx(filter: {frontmatter: {type: {eq: "module"}}}, sort: {order: ASC, fields: frontmatter___slug}) {
      nodes {
        frontmatter {
          title
          slug
        }
      }
    }
  }`;

const CurriculumOverview = ({data: {allMdx: {nodes: modules}}}) => {

    return(
        <Layout
            background={`radial-gradient(
        144.9% 144.89% at 53.86% -49.56%,
        #09272E 43.89%,
        #1F476B 100%
      )
      no-repeat center center fixed`}
        >
            <SEO title="Chapters Overview" />
            <Container>
                <div>
                    <BackLink to="/tezos" />
                </div>
                <ThemeContainer>
                    <Theme />
                </ThemeContainer>
                <ParentOverviewContainer>
                    <h1>Curriculum</h1>
                    <MainOverviewWrapper>
                        <GeneralOverview>
                            {/* General Overview */}
                            <h2>General Overview</h2>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eget sapien elit. Nunc sodales mauris gravida sem tempus lobortis. Nullam justo nibh, iaculis at efficitur in, mattis eu ex. Proin vitae odio et nunc eleifend pretium placerat et arcu. Fusce ullamcorper at diam vitae convallis. Proin luctus libero eget sollicitudin interdum. Sed augue tellus, efficitur a consectetur id, iaculis at risus. Fusce eu pharetra erat, sit amet cursus sapien. Vivamus congue, tortor id laoreet consectetur, enim justo elementum tellus, sed efficitur nunc dolor et urna.
                            </p>
                            <StyledLink to= "/tezos/overview/module-01">
                                Let's roll!
                            </StyledLink>
                        </GeneralOverview>
                        <ModuleOverview>
                            {
                                modules.map(module => (
                                    <ModuleBox>
                                        <h2>{module.frontmatter.title}</h2>
                                        <ModuleLink to={`/tezos/overview/${module.frontmatter.slug}`}>
                                            <IoIosArrowDropright />
                                        </ModuleLink>
                                    </ModuleBox>
                                ))
                            }
                        </ModuleOverview>
                    </MainOverviewWrapper>
                </ParentOverviewContainer>

            </Container>
            <Footer />
        </Layout>
    )
}

export default CurriculumOverview;