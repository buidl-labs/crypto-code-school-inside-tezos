import React, {
  useMemo,
  useState,
  useEffect,
  useContext,
  createRef,
} from 'react';
import { Link, navigate } from 'gatsby';
import { useAsync } from 'react-use';
import {
  fetchOneNFT,
  convertMutezToXtz,
  convertXtzToMutez,
  getXTZPriceInUSD,
  getXTZPrice,
} from 'src/utils/indexer';
import Loader from 'react-loader-spinner';
import { BeaconContext } from 'src/context/beacon-context';
import { CONTRACT_ADDRESS } from 'src/defaults';
import { connectToBeacon, Tezos } from 'src/utils/wallet';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

import Clipboard from 'react-clipboard.js';

import { MdClose, MdDone, MdFullscreen } from 'react-icons/md';
import userAtom from 'src/atoms/user-atom';
import isUserAtom from 'src/atoms/is-user-atom';
import { useAtom } from 'jotai';
import Popper from 'popper.js';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import NavBar from 'src/components/NavBar';
import Button from 'src/components/Buttons';
import model from 'src/images/Col-1.png';
import ErrorBot from 'src/images/error.png';
import Theme from 'src/assets/theme.svg';
import { isMobile, isTablet } from 'react-device-detect';
import SEO from 'src/components/Seo';

function BotView({ location }) {
  let beacon = useContext(BeaconContext);
  const [user] = useAtom(userAtom);
  const [isUser] = useAtom(isUserAtom);
  const [xtzPrice, setXtzPrice] = useState(0);
  const [bot, setBot] = useState({});
  const [owned, setOwned] = useState(false);

  const [opHash, setOpHash] = useState(null);
  const [networkFeeEstimate, setNetworkFeeEstimate] = useState(0);
  const [withdrawNowStep, updateWithdrawNowStep] = useState(0);

  const [onSaleError, setOnSaleError] = useState('');
  const [salePrice, setSalePrice] = useState();
  const [sellNowStep, updateSellNowStep] = useState(0);

  const [claimButtonDisabled, setClaimButtonDisabledStatus] = useState(true);

  const [copyLink, setCopyLink] = useState(false);
  const handle = useFullScreenHandle();

  //redirect to home if in mobile/tablet
  // useEffect(() => {
  //   if (isMobile || isTablet) {
  //     navigate('/tezos');
  //   }
  // });

  const tokenId = useMemo(() => {
    const pathArr =
      typeof window !== 'undefined' && location.pathname.split('/');
    return pathArr[pathArr.length - 1];
  }, [location.pathname, typeof window]);

  const NFT = useAsync(async () => {
    if (!tokenId) return;
    const nft = await fetchOneNFT(tokenId);
    console.log('🔥', nft);
    return nft;
  }, [tokenId, typeof window]);

  useEffect(() => {
    const { value: bot } = NFT;
    if (!NFT.loading) {
      if (isUser) {
        console.log('owner 🔥', bot.holderAddress);
        console.log('isOwned 🔥', user.xtzAddress == bot.holderAddress);
        if (user.xtzAddress == bot.holderAddress) setOwned(true);
      }
      setBot(bot);
      console.log(bot);
      console.log('loaded 🔥');
    }
  }, [NFT.loading]);

  useEffect(() => {
    if (user?.xtzAddress) setOwned(bot?.holderAddress == user?.xtzAddress);
  }, [user.xtzAddress]);

  useEffect(() => {
    console.log('owned 🔥', owned);
  }, [owned]);

  // useEffect(() => {
  //   if (!isUser) {
  //     const url =
  //       typeof window !== 'undefined' ? window.location.pathname : '/tezos';
  //     navigate('/auth', { state: { pathname: url } });
  //   }
  // }, []);

  useAsync(async () => {
    try {
      const result = await getXTZPrice();
      setXtzPrice(result);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getUserBalance = useAsync(async () => {
    if (!isUser) return;

    try {
      const balance = await Tezos.tz.getBalance(user.xtzAddress);
      const xtz = balance / 1000000;
      if (xtz > 0.5) {
        console.log('🔥', 'enabling claim button');
        setClaimButtonDisabledStatus(false);
      }
      return xtz;
    } catch (err) {
      console.log(JSON.stringify(error));
    }
  }, [isUser]);

  const withdrawBotFromSale = async tokenId => {
    await connectToBeacon(beacon);

    try {
      const contract = await Tezos.wallet.at(CONTRACT_ADDRESS);

      const op = await contract.methods
        .withdraw_bot_from_sale(Number(tokenId))
        .send();
      setClaimButtonDisabledStatus(false);
      setOpHash(op.opHash);
      updateWithdrawNowStep(2);
      const result = await op.confirmation(1);
      updateWithdrawNowStep(3);
    } catch (err) {
      if (err?.message?.includes('ABORTED'))
        setClaimButtonDisabledStatus(false);
      console.log(err);
    }
  };

  const putBotOnSale = async (tokenId, saleValue) => {
    await connectToBeacon(beacon);

    try {
      const contract = await Tezos.wallet.at(CONTRACT_ADDRESS);

      const op = await contract.methods
        .offer_bot_for_sale(saleValue, Number(tokenId))
        .send();
      setClaimButtonDisabledStatus(false);
      console.log(`Awaiting for ${op.opHash} to be confirmed...`);
      setOpHash(op.opHash);
      updateSellNowStep(2);
      const result = await op.confirmation(1);
      updateSellNowStep(3);
      console.log('result', result);
    } catch (err) {
      if (err?.message?.includes('ABORTED'))
        setClaimButtonDisabledStatus(false);
      console.log(err);
    }
  };

  function WithdrawalPopup() {
    return (
      <BaseModal>
        <div
          onClick={() => updateWithdrawNowStep(0)}
          className="h-12 w-12 rounded-full bg-base-500 p-1 absolute right-8 top-6 cursor-pointer flex items-center justify-center"
        >
          <MdClose size="24px" />
        </div>
        <ModalTextSection>
          <ModalHeading>
            Are you sure to withdraw cryptobot from sale ?
          </ModalHeading>
          <div>
            {getUserBalance.loading ? null : getUserBalance.error ? (
              <div className="text-error-500">
                Error: {getUserBalance.error.message}
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
                        href="https://www.notion.so/Guide-to-getting-XTZ-57aeea1b7a1947ef9ffc195189f4a0ff"
                        className="underline"
                      >
                        How to obtain XTZ tokens ?
                      </a>
                    </strong>
                  </div>
                ) : getUserBalance.value < 0.5 ? (
                  <div
                    className="mt-3 py-3 px-5 mb-4  text-white text-sm rounded border border-error-600 bg-opacity-25 bg-error-500"
                    role="alert"
                  >
                    Insufficient balance. You need additional of 0.5 XTZ balance
                    to proceed further.{' '}
                    <strong>
                      <a
                        target="_blank"
                        href="https://www.notion.so/Guide-to-getting-XTZ-57aeea1b7a1947ef9ffc195189f4a0ff"
                        className="underline"
                      >
                        How to obtain XTZ tokens ?
                      </a>
                    </strong>
                  </div>
                ) : null}
              </div>
            )}
          </div>
          <div>
            <Button
              size="lg"
              type="primary"
              disabled={claimButtonDisabled}
              style={{ width: '100%', marginBottom: '1rem' }}
              onClick={() => {
                if (claimButtonDisabled) return;
                withdrawBotFromSale(bot.tokenId);
                setClaimButtonDisabledStatus(true);
              }}
            >
              {claimButtonDisabled ? (
                <div className={`flex justify-center align-center`}>
                  {getUserBalance.value > 0.5 ? (
                    <Loader type="ThreeDots" color="#BFDBFE" height={28} />
                  ) : (
                    'Yes'
                  )}
                </div>
              ) : (
                `Yes`
              )}
            </Button>
            <Button
              size="lg"
              type="outline"
              disabled={false}
              style={{ width: '100%', marginBottom: '1rem' }}
              onClick={() => updateWithdrawNowStep(0)}
            >
              No
            </Button>
          </div>
        </ModalTextSection>
      </BaseModal>
    );
  }

  function PutBotOnSaleModel() {
    return (
      <BaseModal>
        <div
          onClick={() => updateSellNowStep(0)}
          className="h-12 w-12 rounded-full bg-base-500 p-1 absolute right-8 top-6 cursor-pointer flex items-center justify-center"
        >
          <MdClose size="24px" />
        </div>
        <ModalTextSection>
          <ModalHeading>Sell Cryptobot (#{bot.tokenId})</ModalHeading>
          <ModalTextSection>
            Other Cryptoverse wars users will be able to buy your cryptobot from
            marketplace
          </ModalTextSection>
          <form
            className={`mt-8 space-y-4 flex flex-col justify-center w-full`}
          >
            <InputContainer>
              <div className="grid grid-cols-2 gap-4 py-6">
                <div>
                  <div className="inline-flex space-x-2">
                    <h5 className="text-base-100 text-lg font-bold font-mulish justify-center">
                      Enter Price
                    </h5>{' '}
                  </div>
                  <p>
                    {' '}
                    {onSaleError === 'INSUFFICIENT_AMOUNT' && (
                      <ErrorMessage>
                        Please make sure price is more than 0 XTZ
                      </ErrorMessage>
                    )}
                  </p>
                </div>
                <div className="grid justify-items-end">
                  <div className="inline-flex text-white text-xl font-extrabold font-mulish">
                    <input
                      className={`px-6 py-2.5 w-full text-lg border-b-1 bg-base-700 rounded border focus:outline-none text-right ${
                        onSaleError === 'INSUFFICIENT_AMOUNT'
                          ? 'border-error-400'
                          : 'border-base-500'
                      }`}
                      placeholder={'0'}
                      autoFocus
                      type="number"
                      min="0"
                      value={salePrice}
                      onChange={e => {
                        setSalePrice(Math.abs(e.target.value));
                        const x = Math.abs(e.target.value);
                        if (!x || x === 0) {
                          setOnSaleError('INSUFFICIENT_AMOUNT');
                        } else {
                          setOnSaleError('');
                        }
                      }}
                    />

                    <div className="flex -mr-px">
                      <span className="flex items-center leading-normal px-3 whitespace-no-wrap text-white">
                        XTZ
                      </span>
                    </div>
                  </div>
                  <p className="text-white text-lg font-mulish mt-2 text-right">
                    {' '}
                    <div style={{ color: 'cornflowerblue' }}>
                      {salePrice &&
                        xtzPrice &&
                        `$ ${getXTZPriceInUSD(
                          xtzPrice.price,
                          convertXtzToMutez(salePrice),
                        )}`}
                    </div>
                  </p>
                </div>
              </div>
            </InputContainer>
          </form>
          <div>
            {getUserBalance.loading ? null : getUserBalance.error ? (
              <div className="text-error-500">
                Error: {getUserBalance.error.message}
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
                        href="https://www.notion.so/Guide-to-getting-XTZ-57aeea1b7a1947ef9ffc195189f4a0ff"
                        className="underline"
                      >
                        How to obtain XTZ tokens ?
                      </a>
                    </strong>
                  </div>
                ) : getUserBalance.value < 0.5 ? (
                  <div
                    className="mt-3 py-3 px-5 mb-4  text-white text-sm rounded border border-error-600 bg-opacity-25 bg-error-500"
                    role="alert"
                  >
                    Insufficient balance. You need additional of 0.5 XTZ balance
                    to proceed further.{' '}
                    <strong>
                      <a
                        target="_blank"
                        href="https://www.notion.so/Guide-to-getting-XTZ-57aeea1b7a1947ef9ffc195189f4a0ff"
                        className="underline"
                      >
                        How to obtain XTZ tokens ?
                      </a>
                    </strong>
                  </div>
                ) : null}
              </div>
            )}
          </div>
          <div>
            <Button
              size="lg"
              type="primary"
              style={{ width: '100%', marginBottom: '1rem' }}
              disabled={claimButtonDisabled}
              onClick={() => {
                if (claimButtonDisabled) return;
                if (!salePrice || salePrice === 0) {
                  setOnSaleError('INSUFFICIENT_AMOUNT');
                } else {
                  putBotOnSale(bot.tokenId, convertXtzToMutez(salePrice));
                  setClaimButtonDisabledStatus(true);
                }
              }}
            >
              {claimButtonDisabled ? (
                <div className={`flex justify-center align-center`}>
                  {getUserBalance.value > 0.5 ? (
                    <Loader type="ThreeDots" color="#BFDBFE" height={28} />
                  ) : (
                    'Yes'
                  )}
                </div>
              ) : (
                `Continue`
              )}
            </Button>
          </div>
        </ModalTextSection>
      </BaseModal>
    );
  }

  return (
    <div className="xl:h-screen xl:w-screen xl:fixed bg-base-900">
      <SEO
        title={`Cryptobot`}
        description={`Take a look at this awesome Cryptobot NFT ⚡️`}
      />
      {withdrawNowStep === 1 && (
        <div
          className={`bg-base-900 min-h-screen text-white flex items-center justify-center `}
        >
          <WithdrawalPopup />
        </div>
      )}
      {withdrawNowStep === 2 && (
        <div
          className={`bg-base-900 min-h-screen text-white flex items-center justify-center`}
        >
          {ConfirmationModel(opHash)}
        </div>
      )}
      {withdrawNowStep === 3 && (
        <div
          className={`bg-base-900 min-h-screen text-white flex items-center justify-center`}
        >
          {GoBackModel(bot, true)}
        </div>
      )}

      {sellNowStep === 1 && (
        <div
          className={`bg-base-900 min-h-screen text-white flex items-center justify-center`}
        >
          <PutBotOnSaleModel />
        </div>
      )}
      {sellNowStep === 2 && (
        <div
          className={`bg-base-900 min-h-screen text-white flex items-center justify-center`}
        >
          {ConfirmationModel(opHash)}
        </div>
      )}
      {sellNowStep === 3 && (
        <div
          className={`bg-base-900 min-h-screen text-white flex items-center justify-center`}
        >
          {GoBackModel(bot, false)}
        </div>
      )}
      {NFT.loading ? (
        <div className={`flex items-center justify-center h-screen`}>
          <Loader type="BallTriangle" color="#2563EB" height={80} width={80} />
        </div>
      ) : NFT?.value ? (
        <>
          {isMobile || isTablet ? (
            <div className="py-6 flex justify-center items-center bg-base-900">
              <Link to="/tezos">
                <Theme className={`h-18 w-auto`} />
              </Link>
            </div>
          ) : (
            <NavBar />
          )}
          <div className="container px-4 lg:px-12 lg:py-12 mx-auto">
            <div className="grid grid-rows-2 xl:grid-cols-2 gap-4">
              <div>
                <model-viewer
                  style={{ width: '100%', height: '100%' }}
                  camera-controls
                  alt="3D Cryptobot"
                  src={`https://cloudflare-ipfs.com/ipfs/${bot ? bot.uri : ''}`}
                  auto-rotate
                  rotation-per-second="15deg"
                  id="cryptobot"
                >
                  <div
                    slot="poster"
                    className="text-white flex justify-center pt-6 text-center"
                  >
                    Please Wait... <br />
                    Loading 3D Cryptobot
                  </div>
                  <button
                    onClick={handle.enter}
                    className="text-white absolute right-8 top-6 focus:outline-none"
                  >
                    <MdFullscreen size="24" />
                  </button>
                </model-viewer>
                <FullScreen handle={handle}>
                  <model-viewer
                    style={{ width: '100%', height: '100%' }}
                    camera-controls
                    alt="3D Cryptobot"
                    src={`https://cloudflare-ipfs.com/ipfs/${
                      bot ? bot.uri : ''
                    }`}
                    auto-rotate
                    rotation-per-second="15deg"
                    id="cryptobot"
                  >
                    <div
                      slot="poster"
                      className="text-white flex justify-center pt-6 text-center"
                    >
                      Please Wait... <br />
                      Loading 3D Cryptobot
                    </div>
                    <button
                      onClick={handle.exit}
                      className="text-white absolute right-8 top-6 focus:outline-none"
                    >
                      <MdClose size="36" />
                    </button>
                  </model-viewer>
                </FullScreen>
              </div>

              <div className="lg:px-12 lg:pt-9">
                <div>
                  {/* name and social icons start */}
                  <div className="grid grid-cols-3 gap-2 xl:gap-4">
                    <div className="col-span-2">
                      <h2 className="text-3xl xl:text-5xl font-mulish font-black text-white">
                        Cryptobot{' '}
                        <span className="text-2xl lg:text-3xl">
                          (#{bot ? bot.tokenId : ''}){console.log(bot)}
                        </span>
                      </h2>
                    </div>
                    {/* social icons start */}
                    <div className="grid grid-cols-2 gap-1 justify-end grid-flow-col auto-cols-max">
                      {/* twitter icon */}
                      <a
                        href={`https://twitter.com/intent/tweet?text=Take a look at Cryptobot-${bot.tokenId}, a super cool one-of-a-kind collectible, you can collect and build on Cryptoverse Wars. Create your own Cryptobot army today!  https://nextjs-sharable-harsh242.vercel.app/cryptobot/${bot.tokenId}&related=twitter%3ABUIDLabs&via=buidllabs&hashtags=NFTs`}
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
                          data-clipboard-text={`https://nextjs-sharable-harsh242.vercel.app/cryptobot/${bot.tokenId}`}
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
                  </div>
                  {/* name and social icons ends */}
                  {/* price starts */}
                  <div className="mt-3">
                    <h4 className="text-2xl font-mulish font-bold">
                      <span className="text-white">
                        {bot ? (
                          bot.saleValueInMutez ? (
                            <span>
                              {convertMutezToXtz(bot.saleValueInMutez)} XTZ
                            </span>
                          ) : null
                        ) : null}
                      </span>{' '}
                      <span className="text-base-200">
                        {xtzPrice && bot && bot.saleValueInMutez ? (
                          <span>
                            {' '}
                            ( $
                            {getXTZPriceInUSD(
                              xtzPrice.price,
                              bot.saleValueInMutez,
                            )}{' '}
                            )
                          </span>
                        ) : null}
                      </span>
                    </h4>
                  </div>
                  {/* price ends */}
                  {/* info tab starts */}
                  <div>
                    <div className="w-24 border-b-2 border-white ">
                      <h4 className="font-mulish font-extrabold text-xl text-white text-center  mx-4 mt-6 mb-1">
                        Info
                      </h4>
                    </div>
                    {/* info tab ends */}

                    {/* owner starts */}
                    <div className="mt-6 inline-flex items-center">
                      <img
                        src={model}
                        className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center mb-0 bg-primary-800"
                      />
                      <span className="flex-grow flex flex-col pl-4">
                        <span className="font-mulish font-regular text-base-200 text-lg">
                          Owner
                        </span>
                        <span className=" font-mulish font-extrabold text-lg text-white break-all ">
                          {bot ? bot.holderAddress : ''}
                        </span>
                      </span>
                    </div>
                    {/* owner ends */}
                    <div className="mt-12" />
                  </div>
                </div>
                <div className="bottom-0 w-full bg-base-900">
                  <div className="flex mx-auto justify-center py-9">
                    {bot ? (
                      isUser ? (
                        owned ? (
                          bot.isForSale ? (
                            <Button
                              onClick={() => updateWithdrawNowStep(1)}
                              size="lg"
                              type="primary"
                            >
                              Withdraw from sale
                            </Button>
                          ) : (
                            <Button
                              onClick={() => {
                                updateSellNowStep(1);
                              }}
                              size="lg"
                              type="primary"
                            >
                              Sell Now
                            </Button>
                          )
                        ) : bot.isForSale ? (
                          <Link
                            to={'/tezos/transaction'}
                            state={{
                              id: bot.tokenId,
                              bot: bot,
                              xtzPrice: xtzPrice,
                              action: 'purchaseBotAtSaleValue',
                            }}
                          >
                            <Button
                              // onClick={() =>
                              //     buyCryptobot(bot.saleValueInMutez, bot.tokenId)
                              // }
                              size="lg"
                              type="primary"
                            >
                              Buy Now
                            </Button>
                          </Link>
                        ) : (
                          <div className="font-mulish font-bold mb-3 text-white text-xl">
                            Bot not available for sale{' '}
                          </div>
                        )
                      ) : bot.isForSale ? (
                        <div className="font-mulish font-bold mb-3 text-white text-xl">
                          Sign in to buy this Cryptobot
                        </div>
                      ) : (
                        <div className="font-mulish font-bold mb-3 text-white text-xl">
                          This bot is not available for sale.
                        </div>
                      )
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {isMobile || isTablet ? (
            <div className="py-6 flex justify-center items-center bg-base-900">
              <Link to="/tezos">
                <Theme className={`h-18 w-auto`} />
              </Link>
            </div>
          ) : (
            <NavBar />
          )}
          <main
            className={`flex h-full w-full items-center justify-center bg-base-900 text-white`}
            style={{
              minHeight: `calc(100vh - 5rem)`,
            }}
          >
            <div
              className={`flex justify-start items-center flex-col pb-12 max-w-6xl px-4 -mt-16`}
            >
              <img src={ErrorBot} className={`h-64 w-64`} />
              <h3 className={`font-black text-3xl lg:text-4xl mt-4`}>Oops!</h3>
              <p className={`text-center text-xl lg:text-2xl mt-4`}>
                This cryptobot does not exists. <br /> Try exploring on
                Marketplace or build your own while learning in Academy
              </p>
              <div className={`mt-6 gap-4 grid grid-rows-2 lg:grid-cols-2`}>
                <Link
                  to="/tezos/marketplace"
                  className={`bg-base-500 px-9 py-3 text-lg lg:text-xl text-center font-bold rounded`}
                >
                  Explore Marketplace
                </Link>
                <Link
                  to="/tezos/academy"
                  className={`bg-primary-600 px-9 py-3 text-lg lg:text-xl text-center font-bold rounded`}
                >
                  Go to Academy
                </Link>
              </div>
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default BotView;

function BaseModal({ children, img_src }) {
  return (
    <div
      className={`bg-base-700 px-12 py-16 rounded-lg relative flex flex-col items-center shadow-lg text-center`}
      style={{ maxWidth: '40vw' }}
    >
      {img_src && <img className={`m-0 w-auto`} src={img_src}></img>}
      {children}
    </div>
  );
}

function ModalHeading({ children }) {
  return <h4 className={`text-2xl font-extrabold mb-2`}>{children}</h4>;
}

function ModalTextSection({ children }) {
  return <div className={`mt-6`}>{children}</div>;
}

function ErrorMessage({ children }) {
  return <span className={`text-sm text-error-400 mt-2`}>{children}</span>;
}

function InputContainer({ children }) {
  return (
    <div className={`flex justify-start flex-col text-left`}>{children}</div>
  );
}

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

const TransactionContainer = ({ children }) => {
  return (
    <div className="w-full rounded-md bg-base-600 p-4 my-3">{children}</div>
  );
};

function ConfirmationModel(opHash) {
  return (
    <BaseModal>
      <div className="grid grid-cols mx-auto justify-center mt-6 mb-4 text-white">
        <Loader type="BallTriangle" color="#2563EB" height={80} width={80} />
      </div>
      <h4 className="text-white text-center text-base mb-4">
        It can take a few seconds, the transaction has successfully been
        broadcasted to the network.
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
    </BaseModal>
  );
}

const GoBackModel = (bot, botWithdrawn = true) => {
  return (
    <BaseModal>
      <ModalTextSection>
        <ModalHeading>
          3D Cryptobot (#{bot.tokenId}){' '}
          {botWithdrawn ? 'withdrawn from sale.' : 'up on sale.'}
        </ModalHeading>
        <Button
          size="lg"
          type="primary"
          disabled={false}
          style={{ width: '100%', marginBottom: '1rem', marginTop: '1rem' }}
          onClick={() => {
            navigate('/tezos/profile');
          }}
        >
          Go back
        </Button>
      </ModalTextSection>
    </BaseModal>
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
