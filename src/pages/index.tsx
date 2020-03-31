import React from 'react';
import Layout from '../components/Layout/layout';
import { navigate } from 'gatsby';
import Grass from '../images/grass.svg';
const IndexPage = () => {
  return (
    <Layout>
      {/* <div>
        <div className="container">
          <div className="header">

          </div>

          <div className="main" style={{ color:"white", background: 'rgb(0,0,0,0.1)', padding: '20px', borderRadius: '20px' }}>
            <h1>Learn to code Blockchain apps in Smartpy</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          </div>


          <div className="footer"> */}
          <button
            onClick={() => {
              navigate('/lessons');
              // navigate('/lesson/chapter-01');
            }}
          >
            Goto Chapters
      </button>
          {/* <img src={Grass} alt="grass" />

          </div>
          
          
        </div> */}
      {/* </div> */}
    </Layout>
  );
};

export default IndexPage;
