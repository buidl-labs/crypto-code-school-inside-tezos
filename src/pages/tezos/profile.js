import React, { useState } from 'react';
import { Link } from 'gatsby';

import NavBar from '../../components/NavBar';
import Footer from 'src/components/Footer';
import Button from 'src/components/Buttons';
import CryptobotCard from '../../components/CryptobotCard';

import model from 'src/images/Col-1.png';

function Profile() {
  const [openTab, setOpenTab] = useState(1);
  return (
    <div className="bg-base-900 font-mulish">
      <NavBar />
      <div className="container px-30 py-12">
        {/*profile header starts */}
        <div className="flex items-center">
          <img
            src={model}
            className="w-32 h-32 rounded-full flex-shrink-0 object-cover object-center mb-0 bg-primary-800"
          />
          <div className="flex-grow flex flex-col pl-6">
            <h3 className="font-mulish font-black text-white text-4xl">
              harshbadhai
            </h3>
            <div className=" font-mulish text-xl text-white pt-3 ">
              <span className="font-regular">Wallet Address:</span>{' '}
              <span className="font-extrabold">
                tz1UP5ZLKud4PMCrwGW1VBjYFvU8QdcPvTQt
              </span>
            </div>
          </div>
        </div>
        {/*profile header ends */}
        {/*tab nav starts */}
        <div className="flex flex-col sm:flex-row mt-12" role="tablist">
          <button
            className={
              ' py-4 px-6 block focus:outline-none font-extrabold text-xl  ' +
              (openTab === 1
                ? ' border-b-2 border-white text-white'
                : ' text-base-200 hover:text-white transition duration-400 ease-in-out')
            }
            onClick={e => {
              e.preventDefault();
              setOpenTab(1);
            }}
            data-toggle="tab"
            href="#link1"
            role="tablist"
          >
            My Cryptobots
          </button>
          <button
            className={
              '  py-4 px-6 block focus:outline-none font-extrabold  text-xl  ' +
              (openTab === 2
                ? ' border-b-2 border-white text-white'
                : 'text-base-200 hover:text-white transition duration-400 ease-in-out')
            }
            onClick={e => {
              e.preventDefault();
              setOpenTab(2);
            }}
            data-toggle="tab"
            href="#link2"
            role="tablist"
          >
            On Sale
          </button>
          <button
            className={
              '  py-4 px-6 block focus:outline-none font-extrabold  text-xl  ' +
              (openTab === 3
                ? ' border-b-2 border-white text-white'
                : 'text-base-200 hover:text-white transition duration-400 ease-in-out')
            }
            onClick={e => {
              e.preventDefault();
              setOpenTab(3);
            }}
            data-toggle="tab"
            href="#link3"
            role="tablist"
          >
            Profile Settings
          </button>
        </div>
        {/*tab nav ends */}
        <div className="relative flex flex-col min-w-0 w-full my-8">
          <div className=" flex-auto">
            <div className="tab-content">
              {/* My Cryptobots starts*/}
              <div className={openTab === 1 ? 'block' : 'hidden'} id="link1">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Link to="/cryptobot">
                    <CryptobotCard />
                  </Link>
                  <Link to="/cryptobot">
                    <CryptobotCard />
                  </Link>
                  <Link to="/cryptobot">
                    <CryptobotCard />
                  </Link>
                </div>
              </div>
               {/* My Cryptobots ends */}
              {/* On Sale starts */}
              <div className={openTab === 2 ? 'block' : 'hidden'} id="link2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Link to="/cryptobot">
                    <CryptobotCard />
                  </Link>
                </div>
              </div>
              {/* On Sale ends */}
              {/* Profile Settings starts */}
              <div className={openTab === 3 ? 'block' : 'hidden'} id="link3">
                <div className="flex-col flex py-3 w-2/5 text-white ">
                  <label className="pb-2 text-gray-700 font-extrabold text-xl ">
                    Email
                  </label>
                  <input
                    type="email"
                    className="text-lg px-6 py-4 rounded bg-base-600 outline-none border-2 border-base-500 h-14 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    placeholder="Your Email Address"
                    value="harsh@buidllabs.io"
                  />
                  <p className="text-base mt-4">
                    *We collect your email to send you product and
                    account-related updates.
                  </p>
                </div>
                <div className="flex-col flex py-3 w-2/5 text-white ">
                  <label className="pb-2 text-gray-700 font-extrabold text-xl ">
                    Nickname
                  </label>
                  <input
                    type="text"
                    className="text-lg px-6 py-4 rounded bg-base-600 outline-none border-2 border-base-500 h-14 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                    placeholder="Nickname (optional)"
                    value="harshbadhai"
                  />
                  <p className="text-base mt-4">
                    *Other Cryptoverse Wars users will identify you with your
                    nickname.
                  </p>
                </div>

                <div className="flex-col flex py-8 w-64">
                  <Button size="lg" type="primary">
                    {' '}
                    Save Changes{' '}
                  </Button>
                </div>
              </div>
              {/* Profile Settings ends */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
