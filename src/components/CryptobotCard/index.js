import React from 'react';
import model from 'src/images/Col-1.png';

function CryptobotCard({ bot }) {

  return (
    <div className="bg-base-800  font-mulish h-full border-2 border-base-400 rounded-lg overflow-hidden">
      <div>
      {/* TODO: convert uri bytes & load custom 3d bots */}
        <model-viewer
          camera-controls
          alt="3D Cryptobot"

          src={bot.uri}
        ></model-viewer>
      </div>
      <div className="p-6">
        <h1 className="font-mulish text-2xl font-bold text-white mb-2">
          3D Cryptobot : (#{bot.tokenId})
        </h1>
        {bot.isForSale ? 
        <div>
        <p className="font-mulish font-bold mb-3 text-white">
          {bot.saleValueInMutez / 1000000} XTZ <span>($9.196)</span>
        </p> 
        </div>
        :
        <p className="font-mulish font-bold mb-3 text-white" >Bot not available for sale </p>
        }
      </div>
    </div>
  );
}

export default CryptobotCard;
