import React from 'react';
import Layout from '../components/Layout/layout';
import { Link } from 'gatsby';
import Logo from '../images/theme-logo.svg';
import Grass from '../images/complete-grass.svg';
import LearningInterface from '../images/learning-interface.svg';
import Plants from '../images/plants.svg';
import Start from '../images/start-button.svg';
import Cloud1 from '../images/cloud1.svg'
import Cloud2 from '../images/cloud2.svg'

import './styles/indexStyled.css';

const IndexPage = () => {
  return (
    <Layout>
      <div className='GridContainer'>
        <div className='Header'>
          <img className="cloud" src={Cloud1} alt="logo" style={{ paddingLeft: '50px',paddingBottom: '50px'}}/>
          <img src={Logo} alt="logo" style={{ marginRight: 'auto', marginLeft: 'auto', maxWidth: '100%', height: 'auto', position: 'relative'}} />
          <img className="cloud" src={Cloud2} alt="logo" style={{ paddingRight: '50px',marginLeft: '-50px', paddingTop: '50px'}}/>
        </div>

        <div className='FlexContainer'>

          <div className='Content'>
            <div className='Text' style={{textAlign: 'center'}}>
              <h1>
                Learn to build smart contracts on tezos with SmartPy
            </h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            </div>
          </div>

          <img src={Grass} alt="grass" style={{ width: '100vw', height: 'auto', maxWidth: '100%' }} />

          <div>

            <div style={{ background: "linear-gradient(180deg, #1C423C 0%, #366961 100%)", paddingBottom: '50px'}}>
              <div className='Details'>
                <div className='School'>
                  <div>
                    <img src={LearningInterface} alt="learning-interface" style={{ width: '100%', height: 'auto' }} />
                  </div>
                  <div className='DetailsText' style={{textAlign: 'center'}}>
                    <h1>
                      The Interavtive School to master SmartPy
                  </h1>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
                  </div>
                </div>
                <div className='Character'>
                  <div className='DetailsText' style={{textAlign: 'center'}}>
                    <h1>
                      Evolve your plant to fight against zombie apocalypse
                      </h1>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                  </div>
                  <div>
                    <img src={Plants} alt="plants" style={{ width: '100%', height: 'auto' }} />
                  </div>
                </div>
              </div>
              <div className='Forward' style={{ textAlign:'center'}}>
                <Link to={'/lessons'} style={{marginRight: 'auto', marginLeft: 'auto', maxWidth: '100%', height: 'auto'}}>
                  <img src={Start} alt="start" style={{ marginRight: 'auto', marginLeft: 'auto', height: 'auto' }} />
                </Link>
              </div>
            </div>

          </div>
        </div>
        <div className='Footer' style={{width: '100%', background: '#1A2A28', height:'200px'}}>
          {/* <img src={FooterImage} alt="footer" style={{ width: '100vm', height: 'auto' }} /> */}

        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
