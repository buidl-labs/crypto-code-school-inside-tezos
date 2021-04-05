import React from 'react';
import model from 'src/images/Col-1.png';
import { Link } from 'gatsby';
import { convertMutezToXtz, getXTZPriceInUSD } from 'src/utils/indexer';

function CryptobotCard({ bot, xtzPrice, owned, slugPath }) {
  return (
    <div className="bg-base-800  font-mulish h-full border-2 border-base-400 rounded-lg overflow-hidden">
      <div>
        <model-viewer
          style={{ width: '100%' }}
          camera-controls
          alt="3D Cryptobot"
          src={`https://cloudflare-ipfs.com/ipfs/${bot.uri}`}
          id="cryptobot"
        >
          <div
            slot="poster"
            className="text-white flex justify-center pt-4 text-center"
          >
            Loading 3D Cryptobot
          </div>
        </model-viewer>
      </div>
      <Link
        to={`/tezos/cryptobot/${bot.tokenId}`}
        state={{ id: bot.tokenId, bot: bot, xtzPrice: xtzPrice, owned: owned }}
      >
        <div className="p-6">
          <h1 className="font-mulish text-2xl font-bold text-white mb-2">
            Cryptobot (#{bot.tokenId})
          </h1>
          {bot.isForSale ? (
            <div>
              <p className="font-mulish text-lg font-bold mb-3 text-white">
                {convertMutezToXtz(bot.saleValueInMutez)} XTZ
                <span>
                  {xtzPrice ? (
                    <span className="text-base-100">
                      {' '}
                      ( $
                      {getXTZPriceInUSD(xtzPrice.price, bot.saleValueInMutez)} )
                    </span>
                  ) : null}
                </span>
              </p>
            </div>
          ) : (
            <p className="font-mulish font-bold mb-3 text-lg text-white">
              Bot not available for sale{' '}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}

export default CryptobotCard;
