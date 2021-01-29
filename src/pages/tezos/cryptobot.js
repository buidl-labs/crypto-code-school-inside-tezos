import React from 'react';
import { Link } from 'gatsby';

import NavBar from 'src/components/NavBar';
import Button from 'src/components/Buttons';
import { convertMutezToXtz, getXTZPriceInUSD } from 'src/utils/indexer';
import model from 'src/images/Col-1.png';

function Cryptobot({ location }) {
  console.log('location');
  const xtzPrice = location.state ? location.state.xtzPrice : null;
  const bot = location.state
    ? location.state.bot
    : {
        tokenId: '',
        uri: '',
        symbol: '',
        mintDate: '',
        isForSale: '',
        saleValueInMutez: '',
        seller: '',
        offerDate: '',
      };
  return (
    <div className="h-screen w-screen fixed bg-base-900 ">
      <NavBar />
      <div className="container px-12 py-12 mx-auto">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <model-viewer
              style={{ width: '100%', height: '100%' }}
              camera-controls
              alt="3D Cryptobot"
              src={`https://cloudflare-ipfs.com/ipfs/${bot.uri}`}
            ></model-viewer>
          </div>

          <div className="px-12 pt-9">
            <div>
              {/* name and social icons start */}
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <h2 className="text-5xl font-mulish font-black text-white">
                    Cryptobot (#{bot.tokenId})
                  </h2>
                </div>
                {/* social icons start */}
                <div className="grid grid-cols-3 gap-2">
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
              </div>
              {/* name and social icons ends */}
              {/* price starts */}
              <div className="mt-3">
                <h4 className="text-2xl font-mulish font-bold">
                  <span className="text-white">
                    {bot.saleValueInMutez ? (
                      <span>{convertMutezToXtz(bot.saleValueInMutez)} XTZ</span>
                    ) : null}
                  </span>{' '}
                  <span className="text-base-200">
                    {xtzPrice && bot.saleValueInMutez ? (
                      <span>
                        {' '}
                        ($
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
                <div className="mt-6">
                  <Link to="\profile" className="inline-flex items-center">
                    <img
                      src={model}
                      className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center mb-0 bg-primary-800"
                    />
                    <span className="flex-grow flex flex-col pl-4">
                      <span className="font-mulish font-regular text-base-200 text-lg">
                        Owner
                      </span>
                      <span className=" font-mulish font-extrabold text-lg text-white ">
                        {bot.seller}
                      </span>
                    </span>
                  </Link>
                </div>
                {/* owner ends */}

                {/* date starts */}
                <div className="mt-6">
                  <a className="inline-flex items-center">
                    <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-primary-600 text-white ">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M19 3H20C21.1 3 22 3.9 22 5V21C22 22.1 21.1 23 20 23H4C2.9 23 2 22.1 2 21V5C2 3.9 2.9 3 4 3H5V1H7V3H17V1H19V3ZM4 21H20V8H4V21Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <span className="flex-grow flex flex-col pl-4">
                      <span className="font-mulish font-regular text-base-200 text-lg">
                        Date Owned
                      </span>
                      <span className=" font-mulish font-extrabold text-lg text-white ">
                        12 Dec 2021
                      </span>
                    </span>
                  </a>
                </div>
                {/* date ends */}
              </div>
            </div>
            <div className="bottom-0 w-full bg-base-900">
              <div className="flex mx-auto justify-center py-9">
                {bot.isForSale ? (
                  <Button size="lg" type="primary">
                    Buy Now
                  </Button>
                ) : (
                  <div className="font-mulish font-bold mb-3 text-white">
                    Bot not available for sale{' '}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cryptobot;
