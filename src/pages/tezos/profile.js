import React, { useState, useEffect } from 'react';
import { Link, navigate } from 'gatsby';

import NavBar from '../../components/NavBar';
import Footer from 'src/components/Footer';
import Button from 'src/components/Buttons';
import { useAsync } from 'react-use';
import Loader from 'react-loader-spinner';
import CryptobotCard from 'src/components/CryptobotCard';

import userAtom from 'src/atoms/user-atom';
import isUserAtom from 'src/atoms/is-user-atom';
import { useAtom } from 'jotai';

import { getXTZPrice, getNftInfoByXTZAddress } from 'src/utils/indexer';

import model from 'src/images/Col-1.png';
import add_img from 'src/images/Add.png';

const Empty = () => {
  return (
    <div
      className={`px-12 py-4 rounded-lg relative flex flex-col items-center shadow-lg text-center`}
      style={{ maxWidth: '40vw' }}
    >
      <img className={`m-0 w-auto`} src={add_img} />
      <h4 className={`text-2xl font-extrabold`}>No Cryptobots found</h4>
      <p className={`mt-2 text-lg`}>
        Claim your own cryptobot in academy or try to browse something for you
        on our marketplace
      </p>
      <div className="grid md:grid-cols-2 grid-cols-1 space-x-4  mx-auto justify-center mt-4">
        <Link to="/tezos/marketplace">
          <Button size="lg" type="secondary">
          Browse Marketplace
          </Button>
        </Link>
        <Link to="/tezos/academy">
          <Button size="lg" type="primary">
          Go to Academy
          </Button>
        </Link>
      </div>
    </div>
  );
};

function Profile() {
  const [openTab, setOpenTab] = useState(1);
  const [xtzPrice, updateXtzPrice] = useState(null);
  const [user, setUser] = useAtom(userAtom);
  const [isUser] = useAtom(isUserAtom);

  useEffect(() => {
    // console.log(user, isUser);
    if (!isUser) {
      const url =
        typeof window !== 'undefined' ? window.location.pathname : '/tezos';
      navigate('/auth', { state: { pathname: url } });
    }
  }, []);

  useAsync(async () => {
    try {
      const result = await getXTZPrice();
      console.log(result);
      updateXtzPrice(result);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const ownedBots = useAsync(async () => {
    if (!user) return;
    try {
      return await getNftInfoByXTZAddress(user.xtzAddress);
    } catch (err) {
      console.log(err);
    }
  }, [user]);

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
              {user ? user.name : ''}
            </h3>
            <div className=" font-mulish text-xl text-white pt-3 ">
              <span className="font-regular">Wallet Address:</span>{' '}
              <span className="font-extrabold">
                {user ? user.xtzAddress : ''}
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
            Profile Details
          </button>
        </div>
        {/*tab nav ends */}
        <div className="relative flex flex-col min-w-0 w-full my-8">
          <div className=" flex-auto">
            <div className="tab-content">
              {/* My Cryptobots starts*/}
              <div className={openTab === 1 ? 'block' : 'hidden'} id="link1">
                <div>
                  {ownedBots.loading ? (
                    <div className="flex justify-center w-full">
                      <Loader
                        type="BallTriangle"
                        color="#2563EB"
                        height={80}
                        width={80}
                      />
                    </div>
                  ) : ownedBots.error ? (
                    <div>Error: {ownedBots.error.message}</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {ownedBots.value.length > 0 ? (
                        ownedBots.value.map(el => {
                          return (
                            <div key={el.tokenId}>
                              <CryptobotCard
                                owned={true}
                                xtzPrice={xtzPrice}
                                bot={el}
                              />
                            </div>
                          );
                        })
                      ) : (
                        <div className="col-span-3 flex items-center justify-center font-mulish text-white">
                          <Empty />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {/* My Cryptobots ends */}
              {/* On Sale starts */}
              <div className={openTab === 2 ? 'block' : 'hidden'} id="link2">
                <div>
                  {ownedBots.loading ? (
                    <div className="flex justify-center w-full">
                      <Loader
                        type="BallTriangle"
                        color="#2563EB"
                        height={80}
                        width={80}
                      />
                    </div>
                  ) : ownedBots.error ? (
                    <div>Error: {ownedBots.error.message}</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {ownedBots.value.filter(el => el.isForSale === true)
                        .length > 0 ? (
                        ownedBots.value
                          .filter(el => el.isForSale === true)
                          .map(el => {
                            return (
                              <div key={el.tokenId}>
                                <CryptobotCard
                                  owned={true}
                                  xtzPrice={xtzPrice}
                                  bot={el}
                                />
                              </div>
                            );
                          })
                      ) : (
                        <div className="col-span-3 flex items-center justify-center font-mulish text-white">
                          <Empty />
                        </div>
                      )}
                    </div>
                  )}
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
                    value={user ? user.email : ''}
                    disabled
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
                    value={user ? user.name : ''}
                    disabled
                  />
                  <p className="text-base mt-4">
                    *Other Cryptoverse Wars users will identify you with your
                    nickname.
                  </p>
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
