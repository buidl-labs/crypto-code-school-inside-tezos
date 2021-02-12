import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'gatsby';
import { useAsync, useWindowSize } from 'react-use';
import Loader from 'react-loader-spinner';

import NavBar from 'src/components/NavBar';
import Button from 'src/components/Buttons';
import { CONTRACT_ADDRESS } from 'src/defaults';
import { connectToBeacon, Tezos } from 'src/utils/wallet';
import { BeaconContext } from 'src/context/beacon-context';
import {
  convertMutezToXtz,
  getXTZPriceInUSD,
  getXTZPrice,
} from 'src/utils/indexer';
import { InMemorySigner } from '@taquito/signer';
import { estimateNFTMintFee } from 'src/utils/gas_estimates';
import { MdDone } from 'react-icons/md';
import Confetti from 'react-confetti';

import userAtom from 'src/atoms/user-atom';
import isUserAtom from 'src/atoms/is-user-atom';
import { useAtom } from 'jotai';

import { MichelsonMap } from '@taquito/taquito';

const Steppers = ({ number, name, clickEvent, tick = false }) => {
  return (
    <div onClick={clickEvent}>
      <div className="flex items-center text-primary-600 relative">
        {tick ? (
          <div
            style={{
              backgroundColor: 'rgba(52, 211, 153, 0.9)',
            }}
            className="rounded-full h-12 w-12 py-3 inline-flex items-center justify-center text-white"
          >
            <MdDone size={24} />
          </div>
        ) : (
          <div className="rounded-full h-12 w-12 py-3 inline-flex items-center justify-center bg-primary-600 text-white">
            {number}
          </div>
        )}
        <div className="absolute top-0 -ml-10 text-center mt-16 w-32 text-lg font-regular text-white">
          {name}
        </div>
      </div>
    </div>
  );
};

const Heading = ({ heading }) => {
  return (
    <div className="w-full">
      <div className="flex mx-auto justify-center text-white pt-16">
        <h4 className="font-mulish font-extrabold text-xl ">{heading}</h4>
      </div>
    </div>
  );
};

const TransactionContainer = ({ children }) => {
  return (
    <div className="w-full rounded-md bg-base-700 p-12 mt-6">{children}</div>
  );
};

const Cost = ({ type, main, caption }) => {
  return (
    <div className="grid grid-cols-2 gap-4 py-6">
      <div>
        <h5 className="text-base-100 text-lg font-bold font-mulish">{type}</h5>
      </div>
      <div className="grid justify-items-end">
        <h5 className="text-white text-xl font-extrabold font-mulish">
          {main}
        </h5>
        <p className="text-white text-lg font-mulish">{caption}</p>
      </div>
    </div>
  );
};

function Transaction({ location }) {
  let beacon = useContext(BeaconContext);
  const [step, setStep] = useState(1);
  const [opHash, setOpHash] = useState(null);
  const [networkFeeEstimate, setNetworkFeeEstimate] = useState(0);
  //   const xtzPrice = location.state ? location.state.xtzPrice : null;
  const uri = location.state ? location.state.uri : null;
  console.log(location.state);
  const { width, height } = useWindowSize();
  const [xtzPrice, updateXtzPrice] = useState(null);

  const [user, setUser] = useAtom(userAtom);
  const [isUser] = useAtom(isUserAtom);

  useAsync(async () => {
    try {
      const result = await getXTZPrice();
      console.log(result);
      updateXtzPrice(result);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const mintNFT = async () => {
    try {
      await connectToBeacon(beacon);

      const metadata = MichelsonMap.fromLiteral({
        uri: uri,
      });

      const RnId = (deepness = 10) =>
        parseInt(Date.now() + Math.random() * deepness);

      const randomId = RnId();

      const contract = await Tezos.wallet.at(CONTRACT_ADDRESS);

      const op = await contract.methods
        .mint(
          user.xtzAddress,
          Number(1),
          metadata,
          randomId, // DONE: Make the token id increment dynamic
        )
        .send();

      //Go to 2nd Step
      setStep(2);
      setOpHash(op.opHash);
      console.log(`Awaiting for hash to be confirmed...`, op);

      const result = await op.confirmation(1);
      // Go to 3rd Step
      setStep(3);
      console.log('result', result);
    } catch (err) {
      console.log(err);
    }
  };

  useAsync(async () => {
    Tezos.setProvider({
      signer: new InMemorySigner(
        'edskRo7CmqNdMfnEeBCPNevy9jGo2MvwNdomoxVvmwqPJTFtFrubg1spFK1aZdywS8QxkhfnAWpAVVEgCsmkSnWMyNXM1aJ4Ka',
      ),
    });

    //TODO: replace with purchase gas fee estimate
    const x = await estimateNFTMintFee();
    setNetworkFeeEstimate(x);
  }, []);

  return (
    <div className=" bg-base-900 ">
      <NavBar />
      <Confetti width={width} height={height} run={step === 3} />
      <div className="container px-12 mx-auto ">
        <div className="grid grid-cols-2 gap-4 h-screen">
          <div>
            <model-viewer
              style={{ width: '100%', height: '100%' }}
              camera-controls
              alt="3D Cryptobot"
              src={`https://cloudflare-ipfs.com/ipfs/${uri ? uri : ''}`}
            ></model-viewer>
          </div>
          <div className="px-12 pt-4 ">
            <div className="flex items-center">
              <Steppers
                number="1"
                name="Confirm Claim"
                tick={step >= 2}
                clickEvent={e => {
                  e.preventDefault();
                  // setStep(1);
                }}
              />
              <div className="flex-auto border-t-2  border-primary-600"></div>
              <Steppers
                number="2"
                name="Transaction"
                tick={step === 3}
                clickEvent={e => {
                  e.preventDefault();
                  // setStep(2);
                }}
              />
              <div className="flex-auto border-t-2 border-primary-600"></div>
              <Steppers
                number="3"
                name="Finished"
                tick={step === 3}
                clickEvent={e => {
                  e.preventDefault();
                  // setStep(3);
                }}
              />
            </div>
            <div className={step === 1 ? 'block' : 'hidden'}>
              <Heading heading="Confirm your claim" />
              <TransactionContainer>
                <Cost type="Total" main={'Free'} caption={''} />
                <div className="bg-base-600 mt-4 px-8 rounded">
                  {/* <Cost
                    type="Cost"
                    main="FREE"
                    caption="Your first bot is on us!"
                  /> */}
                  {/* <hr className="my-2 bg-base-400 border-2 h-0.5" /> */}
                  {networkFeeEstimate === 0 ? (
                    <Cost type="Network Fee" main={`LOADING...`} caption={``} />
                  ) : (
                    <Cost
                      type="Network Fee"
                      main={`${convertMutezToXtz(networkFeeEstimate)} XTZ`}
                      caption={
                        xtzPrice
                          ? `$ ${getXTZPriceInUSD(
                              xtzPrice.price,
                              networkFeeEstimate,
                            )}`
                          : null
                      }
                    />
                  )}
                </div>
                <div className="grid mx-auto justify-center mt-6">
                  <Button
                    onClick={() => {
                      mintNFT();
                    }}
                    size="lg"
                    type="primary"
                  >
                    Confirm
                  </Button>
                </div>
              </TransactionContainer>
            </div>

            <div className={step === 2 ? 'block' : 'hidden'}>
              <Heading heading="Transaction Operation Started" />
              <TransactionContainer>
                <div className="grid grid-cols mx-auto justify-center mt-6 text-white">
                  <Button
                    onClick={() => {
                      window.open(
                        `https://delphinet.tzkt.io/${opHash ? opHash : ''}`,
                        '_blank',
                      );
                    }}
                    size="lg"
                    type="outline"
                  >
                    <span>
                      The transaction has successfully been broadcasted to the
                      network.
                    </span>
                  </Button>
                </div>
                <div className="grid grid-cols mx-auto justify-center mt-6 text-white">
                  <Loader
                    type="BallTriangle"
                    color="#2563EB"
                    height={80}
                    width={80}
                  />
                </div>
                <h4 className="text-white text-center">
                  Waiting for confirmation
                </h4>
              </TransactionContainer>
            </div>

            <div className={step === 3 ? 'block' : 'hidden'}>
              <Heading heading="Congratulations 🎉" />
              <TransactionContainer>
                <h4 className="text-white text-center text-xl font-extrabold font-mulish">
                  You have acquired your Unique cryptobot
                </h4>
                <h4 className="text-white text-center text-lg font-mulish mt-6">
                  Share your unique cryptobot with your friends and start
                  trading with other on marketplace!
                </h4>
                <h4 className="text-white text-center text-lg font-mulish mt-8">
                  Here’s the link to your unique cryptobot:
                  https://cryptocodeschool.in/mybot-4433
                </h4>

                {/* social icons start */}
                <div className="flex flex-row space-x-6 justify-center mt-4">
                  {/* twitter icon */}
                  <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-primary-600 text-white">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.633 7.99704C19.646 8.17204 19.646 8.34604 19.646 8.52004C19.646 13.845 15.593 19.981 8.186 19.981C5.904 19.981 3.784 19.32 2 18.172C2.324 18.209 2.636 18.222 2.973 18.222C4.856 18.222 6.589 17.586 7.974 16.501C6.203 16.464 4.719 15.304 4.207 13.708C4.456 13.745 4.706 13.77 4.968 13.77C5.329 13.77 5.692 13.72 6.029 13.633C4.182 13.259 2.799 11.638 2.799 9.68004V9.63004C3.336 9.92904 3.959 10.116 4.619 10.141C3.534 9.41904 2.823 8.18404 2.823 6.78704C2.823 6.03904 3.022 5.35304 3.371 4.75504C5.354 7.19804 8.335 8.79504 11.677 8.97004C11.615 8.67004 11.577 8.35904 11.577 8.04704C11.577 5.82704 13.373 4.01904 15.605 4.01904C16.765 4.01904 17.812 4.50504 18.548 5.29104C19.458 5.11604 20.33 4.77904 21.104 4.31804C20.805 5.25304 20.168 6.03904 19.333 6.53804C20.144 6.45004 20.93 6.22604 21.652 5.91404C21.104 6.71204 20.419 7.42304 19.633 7.99704Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  {/* fb icon */}
                  <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-primary-600 text-white ">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.397 20.9969V12.8009H16.162L16.573 9.59191H13.397V7.54791C13.397 6.62191 13.655 5.98791 14.984 5.98791H16.668V3.12691C15.849 3.03891 15.025 2.99691 14.201 2.99991C11.757 2.99991 10.079 4.49191 10.079 7.23091V9.58591H7.33203V12.7949H10.085V20.9969H13.397Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  {/* copy icon */}
                  <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-primary-600 text-white ">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17 7H13V9H17C18.65 9 20 10.35 20 12C20 13.65 18.65 15 17 15H13V17H17C19.76 17 22 14.76 22 12C22 9.24 19.76 7 17 7Z"
                        fill="white"
                      />
                      <path
                        d="M11 15H7C5.35 15 4 13.65 4 12C4 10.35 5.35 9 7 9H11V7H7C4.24 7 2 9.24 2 12C2 14.76 4.24 17 7 17H11V15Z"
                        fill="white"
                      />
                      <path d="M8 11H16V13H8V11Z" fill="white" />
                    </svg>
                  </div>
                </div>
                {/* social icons ends*/}
                <h4 className="text-white text-center text-lg font-mulish mt-6">
                  Earn more super cool cryptobots by completing Modules or
                  exploring Marketplace
                </h4>
                <div className="grid grid-cols-2 gap-4  mx-auto justify-center text-white mt-8">
                  <Link to="/tezos/marketplace">
                    <Button size="lg" type="secondary">
                      Explore Marketplace
                    </Button>
                  </Link>
                  <Link to="/tezos/academy">
                    <Button size="lg" type="primary">
                      Go to Academy
                    </Button>
                  </Link>
                </div>
              </TransactionContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transaction;
