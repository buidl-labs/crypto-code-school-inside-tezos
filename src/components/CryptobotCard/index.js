import React from 'react';
import model from 'src/images/Col-1.png';

function CryptobotCard({ cryptobotid, price, name }) {
  return (
    <div className="bg-base-800  font-mulish h-full border-2 border-base-400 rounded-lg overflow-hidden">
      <img
        className="lg:h-64 w-full object-cover"
        src={model}
        alt="cryptobot"
      />
      <div className="p-6">
        <h1 className="font-mulish text-2xl font-bold text-white mb-2">
          Cryptobot #1
        </h1>
        <p className="font-mulish font-bold mb-3 text-white">
          4 XTZ <span>($9.196)</span>
        </p>
      </div>
    </div>
  );
}

export default CryptobotCard;
