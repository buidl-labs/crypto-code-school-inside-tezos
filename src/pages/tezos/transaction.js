import React, { useState, useContext, useEffect, createRef } from 'react';
import { Link, navigate } from 'gatsby';
import { useAsync, useWindowSize } from 'react-use';
import Loader from 'react-loader-spinner';
import Popper from 'popper.js';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import SEO from 'src/components/Seo';

import NavBar from 'src/components/NavBar';
import Button from 'src/components/Buttons';
import { CONTRACT_ADDRESS } from 'src/defaults';
import { connectToBeacon, Tezos } from 'src/utils/wallet';
import { BeaconContext } from 'src/context/beacon-context';
import { convertMutezToXtz, getXTZPriceInUSD } from 'src/utils/indexer';
import { MdDone } from 'react-icons/md';
import Confetti from 'react-confetti';
import Clipboard from 'react-clipboard.js';
import ErrorBot from 'src/images/error.png';
import userAtom from 'src/atoms/user-atom';
import isUserAtom from 'src/atoms/is-user-atom';
import { useAtom } from 'jotai';
import { isMobile, isTablet } from 'react-device-detect';
import { estimateBotPurchaseGasFee } from 'src/utils/gas_estimates';

const Steppers = ({ number, name, clickEvent, step, tick = false }) => {
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
          <div
            className={`rounded-full h-12 w-12 py-3 inline-flex items-center justify-center ${
              number == step ? 'bg-primary-600' : 'bg-base-600'
            } text-white`}
          >
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

const Tooltip = () => {
  const [tooltipShow, setTooltipShow] = useState(false);
  const btnRef = createRef();
  const tooltipRef = createRef();
  const openLeftTooltip = () => {
    new Popper(btnRef.current, tooltipRef.current, {
      placement: 'top',
    });
    setTooltipShow(true);
  };
  const closeLeftTooltip = () => {
    setTooltipShow(false);
  };
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full text-center">
          <button
            className={
              'text-white  text-sm  outline-none focus:outline-none mr-1 mb-1'
            }
            type="button"
            style={{ transition: 'all .15s ease' }}
            onMouseEnter={openLeftTooltip}
            onMouseLeave={closeLeftTooltip}
            ref={btnRef}
          >
            <InfoOutlinedIcon />
          </button>
          <div
            className={
              (tooltipShow ? '' : 'hidden ') +
              'bg-primary-600 border-0 mb-3 block z-50 leading-normal text-sm max-w-xs text-left no-underline break-words rounded-lg'
            }
            ref={tooltipRef}
          >
            <div className="text-white p-3 font-mulish">
              Network fee is what you offer to pay the validators ( responsible
              for verifying transactions on the tezos blockchain ) in a tiny
              measurement of XTZ for each operation to execute the smart
              contract.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const Cost = ({ type, main, caption, tooltip }) => {
  return (
    <div className="grid grid-cols-2 gap-4 py-6">
      <div>
        <div className="inline-flex space-x-1">
          <h5 className="text-base-100 text-lg font-bold font-mulish text-left">
            {type}{' '}
          </h5>{' '}
          <span>{tooltip ? <Tooltip /> : ''}</span>
        </div>
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
  const xtzPrice = location.state ? location.state.xtzPrice : null;
  const bot = location.state ? location.state.bot : false;
  console.log('cryptobot object :', bot);
  const [copyLink, setCopyLink] = useState(false);
  const { width, height } = useWindowSize();
  const [user, setUser] = useAtom(userAtom);

  const [claimButtonDisabled, setClaimButtonDisabledStatus] = useState(true);

  //redirect to home if in mobile/tablet
  useEffect(() => {
    if (isMobile || isTablet) {
      navigate('/tezos');
    }
  });

  const ErrorModal = () => {
    return (
      <div
        className={`bg-base-700 px-12 py-8 rounded-lg relative flex flex-col items-center shadow-lg text-center text-white`}
        style={{ maxWidth: '40vw' }}
      >
        <img src={ErrorBot} />
        <div className={`mt-6`}>
          <h4 className={`text-2xl font-extrabold`}>Cryptobot not Found</h4>
          <p className={`mt-6 text-lg`}>
            We couldn’t find the cryptobot you were trying to buy. Explore
            marketplace to buy more cryptobots or build your own in Academy.
          </p>
        </div>
        <div className={`flex items-center flex-col w-full mb-2`}>
          <Link
            to={'/tezos/marketplace'}
            className={`w-full bg-primary-600 hover:bg-primary-700 text-white font-bold rounded focus:outline-none mt-8 py-3 px-9 text-xl`}
          >
            Explore Marketplace
          </Link>
          <Link
            to={'/tezos/academy'}
            className={`w-full border-2 border-primary-600 hover:border-primary-700 text-white font-bold rounded focus:outline-none mt-4 py-3 px-9 text-xl`}
          >
            Go to Academy
          </Link>
        </div>
      </div>
    );
  };

  const buyCryptobot = async (mutez, tokenId) => {
    try {
      await connectToBeacon(beacon);

      const contract = await Tezos.wallet.at(CONTRACT_ADDRESS);

      const sendArgs = { amount: mutez, mutez: true };

      const op = await contract.methods
        .purchase_bot_at_sale_price(Number(tokenId))
        .send(sendArgs);
      setClaimButtonDisabledStatus(false);
      //Go to 2nd Step
      setStep(2);
      setOpHash(op.opHash);

      const result = await op.confirmation(1);
      // Go to 3rd Step
      setStep(3);
    } catch (err) {
      if (err?.message?.includes('ABORTED'))
        setClaimButtonDisabledStatus(false);
      console.log(err);
    }
  };

  const getUserBalance = useAsync(async () => {
    if (!user) return;

    try {
      const balance = await Tezos.tz.getBalance(user.xtzAddress);
      const xtz = balance / 1000000;
      if (xtz > convertMutezToXtz(bot.saleValueInMutez) + 0.5) {
        setClaimButtonDisabledStatus(false);
      }
      return xtz;
    } catch (err) {
      console.log(JSON.stringify(error));
    }
  }, [user]);

  // const estimatedTotalCost = useAsync(async () => {
  //   try {
  //     return await estimateBotPurchaseGasFee(bot);
  //   } catch (err) {
  //     console.log('err', err);
  //   }
  // }, []);

  return (
    <div className=" bg-base-900 ">
      <SEO title={`Buy the Cryptobot | Cryptoverse Wars`} />
      <NavBar />
      <Confetti width={width} height={height} run={step === 3} />
      <div className="container px-12 mx-auto ">
        <div className="grid grid-cols-2 gap-4 h-screen">
          <div>
            <model-viewer
              style={{ width: '100%', height: '100%' }}
              camera-controls
              alt="3D Cryptobot"
              src={`https://cloudflare-ipfs.com/ipfs/${bot ? bot.uri : ''}`}
            ></model-viewer>
          </div>
          <div className="px-12 pt-4 ">
            <div className="flex items-center">
              <Steppers
                number="1"
                name="Confirm Claim"
                tick={step >= 2}
                step={step}
                clickEvent={e => {
                  e.preventDefault();
                  // setStep(1);
                }}
              />
              <div
                className={`flex-auto border-t-2 ${
                  step >= 2 ? 'border-primary-600' : 'border-base-600'
                }`}
              ></div>
              <Steppers
                number="2"
                name="Transaction"
                tick={step === 3}
                step={step}
                clickEvent={e => {
                  e.preventDefault();
                  // setStep(2);
                }}
              />
              <div
                className={`flex-auto border-t-2 ${
                  step == 3 ? 'border-primary-600' : 'border-base-600'
                }`}
              ></div>
              <Steppers
                number="3"
                name="Finished"
                tick={step === 3}
                step={step}
                clickEvent={e => {
                  e.preventDefault();
                  // setStep(3);
                }}
              />
            </div>
            <div className={step === 1 ? 'block' : 'hidden'}>
              <Heading heading="Confirm your claim" />
              <TransactionContainer>
                <Cost
                  type="Cryptobot Cost"
                  main={
                    bot
                      ? bot.saleValueInMutez
                        ? `${convertMutezToXtz(bot.saleValueInMutez)} XTZ`
                        : null
                      : null
                  }
                  caption={
                    xtzPrice && bot && bot.saleValueInMutez
                      ? `$
                        ${getXTZPriceInUSD(
                          xtzPrice.price,
                          bot.saleValueInMutez,
                        )}`
                      : null
                  }
                />
                {/* <div className="bg-base-600 mt-4 px-8 rounded">
                  {estimatedTotalCost.loading ? (
                    <Cost
                      type="Estimated Network Fee"
                      main={`LOADING...`}
                      caption={``}
                      tooltip
                    />
                  ) : estimatedTotalCost.error ? (
                    <div className="text-error-500 text-center">
                      Error calculating estimated gas fee
                    </div>
                  ) : (
                    <div>
                      <Cost
                        type="Estimated Network Fee"
                        main={`${convertMutezToXtz(
                          estimatedTotalCost.value,
                        )} XTZ`}
                        caption={
                          xtzPrice
                            ? `$ ${getXTZPriceInUSD(
                                xtzPrice.price,
                                Number(estimatedTotalCost.value),
                              )}`
                            : null
                        }
                        tooltip
                      />
                    </div>
                  )}
                </div> */}
                <div>
                  {getUserBalance.loading ? null : getUserBalance.error ? (
                    <div className="text-error-500 text-center">
                      Please login in to continue.
                    </div>
                  ) : (
                    <div>
                      {getUserBalance.value === 0 ? (
                        <div
                          className="mt-3 py-3 px-5 mb-4  text-white text-sm rounded border border-error-600 bg-opacity-25 bg-error-500"
                          role="alert"
                        >
                          Your account is empty.{' '}
                          <strong>
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href="https://www.notion.so/Guide-to-getting-XTZ-57aeea1b7a1947ef9ffc195189f4a0ff"
                              className="underline"
                            >
                              How to obtain XTZ tokens?
                            </a>
                          </strong>
                        </div>
                      ) : getUserBalance.value <
                        convertMutezToXtz(bot.saleValueInMutez) + 0.5 ? (
                        <div
                          className="mt-3 py-3 px-5 mb-4  text-white text-sm rounded border border-error-600 bg-opacity-25 bg-error-500"
                          role="alert"
                        >
                          Insufficient balance. You need additional of{' '}
                          {(
                            convertMutezToXtz(bot.saleValueInMutez) -
                            getUserBalance.value +
                            0.5
                          ).toFixed(2)}{' '}
                          XTZ balance to proceed further.{' '}
                          <strong>
                            <a
                              target="_blank"
                              rel="noopener noreferrer"
                              href="https://www.notion.so/Guide-to-getting-XTZ-57aeea1b7a1947ef9ffc195189f4a0ff"
                              className="underline"
                            >
                              How to obtain XTZ tokens?
                            </a>
                          </strong>
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
                <div className="grid mx-auto justify-center mt-6">
                  <Button
                    onClick={() => {
                      if (claimButtonDisabled) return;
                      setClaimButtonDisabledStatus(true);
                      buyCryptobot(bot.saleValueInMutez, bot.tokenId);
                    }}
                    size="lg"
                    type="primary"
                    disabled={claimButtonDisabled}
                  >
                    {claimButtonDisabled ? (
                      getUserBalance.value > 0.5 ? (
                        <Loader
                          type="ThreeDots"
                          color="#BFDBFE"
                          height={28}
                          // width={80}
                        />
                      ) : (
                        'Confirm'
                      )
                    ) : (
                      `Confirm`
                    )}
                  </Button>
                </div>
              </TransactionContainer>
            </div>

            <div className={step === 2 ? 'block' : 'hidden'}>
              <Heading heading="Transaction Operation Started" />
              <TransactionContainer>
                <div className="grid grid-cols mx-auto justify-center mt-6 text-white mb-2">
                  <Loader
                    type="BallTriangle"
                    color="#2563EB"
                    height={80}
                    width={80}
                  />
                </div>
                <h4 className="text-white text-center text-base mb-4">
                  It can take a few seconds, the transaction has successfully
                  been broadcasted to the network.
                </h4>
                <div className="grid grid-cols mx-auto justify-center mt-6 text-white">
                  <Button
                    onClick={() => {
                      window.open(
                        `https://mainnet.tzkt.io/${opHash ? opHash : ''}`,
                        '_blank',
                      );
                    }}
                    size="lg"
                    type="outline"
                  >
                    <span>Show Status in Tezos Blockchain</span>
                  </Button>
                </div>
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
                <div className="text-white text-center text-lg font-mulish mt-8 break-all">
                  <p>Here’s the link to your unique cryptobot:</p>
                  <a
                    href={`https://cryptocodeschool.in/tezos/cryptobot/${bot.tokenId}`}
                    className="text-primary-400 underline break-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {' '}
                    https://cryptocodeschool.in/tezos/cryptobot/{bot.tokenId}
                  </a>
                </div>

                {/* social icons start */}
                <div className="flex flex-row space-x-6 justify-center mt-4">
                  {/* twitter icon */}
                  {/* twitter icon */}
                  <a
                    href={`https://twitter.com/intent/tweet?text=Take a look at my Cryptobot-${bot.tokenId}, a super cool one-of-a-kind collectible, you can collect and build on Cryptoverse Wars. Create your own Cryptobot army today!  https://cryptocodeschool.in/tezos/cryptobot/${bot.tokenId}&related=twitter%3ABUIDLabs&via=buidllabs&hashtags=NFTs`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-primary-600 text-white focus:outline-none"
                  >
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
                  </a>

                  {/* copy icon */}
                  <button
                    className={
                      'w-12 h-12 inline-flex items-center justify-center rounded-full text-white focus:outline-none  ' +
                      (copyLink == 1 ? 'bg-success-600' : 'bg-primary-600')
                    }
                  >
                    <Clipboard
                      data-clipboard-text={`https://cryptocodeschool.in/tezos/cryptobot/${bot.tokenId}`}
                      onClick={() => {
                        setCopyLink(true);
                      }}
                    >
                      {copyLink ? (
                        <div className="focus:outline-none text-white">
                          <MdDone />
                        </div>
                      ) : (
                        <div className="focus:outline-none">
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
                      )}
                    </Clipboard>
                  </button>
                </div>
                {/* social icons ends*/}
                <h4 className="text-white text-center text-lg font-mulish mt-6">
                  Earn more super cool cryptobots by completing Modules or
                  exploring Marketplace
                </h4>
                <div className="grid md:grid-cols-2 grid-cols-1 space-x-4  mx-auto justify-center text-white mt-8">
                  <Link to="/tezos/marketplace">
                    <Button size="lg" type="secondary">
                      Go to Marketplace
                    </Button>
                  </Link>
                  <Link to="/tezos/academy">
                    <Button size="lg" type="primary">
                      Start Learning
                    </Button>
                  </Link>
                </div>
              </TransactionContainer>
            </div>
          </div>
        </div>
      </div>

      {!bot && (
        <div className="bg-base-700 bg-opacity-75 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <ErrorModal />
        </div>
      )}
    </div>
  );
}

export default Transaction;
