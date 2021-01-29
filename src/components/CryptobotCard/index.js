import React from 'react';
import model from 'src/images/Col-1.png';
import { Link } from 'gatsby';
import { convertMutezToXtz, getXTZPriceInUSD } from 'src/utils/indexer';

function CryptobotCard({ bot, xtzPrice }) {
  return (
    <div className="bg-base-800  font-mulish h-full border-2 border-base-400 rounded-lg overflow-hidden">
      <div>
        <model-viewer
          style={{ width: '100%' }}
          camera-controls
          alt="3D Cryptobot"
          src={`https://cloudflare-ipfs.com/ipfs/${bot.uri}`}
        ></model-viewer>
      </div>
      <Link
        to={`/tezos/cryptobot`}
        state={{ id: bot.tokenId, bot: bot, xtzPrice: xtzPrice }}
      >
        <div className="p-6">
          <h1 className="font-mulish text-2xl font-bold text-white mb-2">
            3D Cryptobot : (#{bot.tokenId})
          </h1>
          {bot.isForSale ? (
            <div>
              <p className="font-mulish font-bold mb-3 text-white">
                {convertMutezToXtz(bot.saleValueInMutez)} XTZ
                <span>
                  {xtzPrice ? (
                    <span>
                      {' '}
                      (${getXTZPriceInUSD(
                        xtzPrice.price,
                        bot.saleValueInMutez,
                      )}{' '}
                      )
                    </span>
                  ) : null}
                </span>
              </p>
            </div>
          ) : (
            <p className="font-mulish font-bold mb-3 text-white">
              Bot not available for sale{' '}
            </p>
          )}
        </div>
      </Link>
    </div>
  );
}

export default CryptobotCard;
