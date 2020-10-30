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
                            <h2>Embark on the journey to become a DApp Superhero!</h2>
                            <p>
                                This course will take you through a journey you'll remember for ages! <br/>
                                From fighting aliens using your <code>Cryptobot</code> to re-building the society that is in shatters. <br/>
                                You're going to do it all, from making a simple smart contract to making your own virtual currency, and taking it a step further by deploying(originating) your currency on contract on the Tezos network!
                                <br/><br/>
                                Start your journey of saving the world while developing your Tezos technical prowess. See you on the other side!
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