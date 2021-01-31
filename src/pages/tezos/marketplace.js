import React, { useState, useEffect } from 'react';
import { useAsync } from 'react-use';
import {
  fetchAllNfts,
  getXTZPrice,
  getNftInfoByXTZAddress,
} from 'src/utils/indexer';
import Button from 'src/components/Buttons';
import NavBar from 'src/components/NavBar';
import Footer from 'src/components/Footer';
import CryptobotCard from 'src/components/CryptobotCard';
import uniqBy from 'lodash.uniqby';

const Marketplace = () => {
  const [forSale, updateForSale] = useState(true);
  const [notForSale, updateNotForSale] = useState(false);
  const [sortBy, updateSortBy] = useState('offerDate');
  const [nftList, updateNftList] = useState([]);
  const [xtzPrice, updateXtzPrice] = useState(null);

  const allNFTS = useAsync(async () => {
    try {
      const combined = await fetchAllNfts();
      // console.log('combined', combined);

      // Default filter settings
      const x = combined.filter(elm => elm.isForSale === forSale);

      updateNftList(x);
      return combined;
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    //get all the nft tokens
    const all = allNFTS.value ? allNFTS.value : [];

    //filter all the nfts by either for sale or not.
    const filForSale = all.filter(elm => elm.isForSale === forSale);
    const filNotForSale = all.filter(elm => elm.isForSale !== notForSale);

    if (forSale === false && notForSale === false) {
      updateNftList([]);
    } else {
      const combined = uniqBy([...filForSale, ...filNotForSale], 'tokenId');

      let sorted = combined;

      if (sortBy === 'offerDate') {
        sorted = combined.sort(
          (a, b) => parseFloat(a.offerDate) - parseFloat(b.offerDate),
        );
      } else if (sortBy === 'lowestPrice') {
        //ascending order
        sorted = combined.sort(
          (a, b) =>
            parseFloat(a.saleValueInMutez) - parseFloat(b.saleValueInMutez),
        );
      } else if (sortBy === 'highestPrice') {
        //descending order
        sorted = combined.sort(
          (a, b) =>
            parseFloat(b.saleValueInMutez) - parseFloat(a.saleValueInMutez),
        );
      }

      updateNftList(sorted);
    }
  }, [forSale, notForSale, sortBy]);

  useAsync(async () => {
    try {
      const result = await getXTZPrice();
      console.log(result);
      updateXtzPrice(result);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useAsync(async () => {
    const x = await getNftInfoByXTZAddress();
  }, []);

  return (
    <div className="bg-base-900 font-mulish">
      <NavBar />
      <div className="container px-30 py-12 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="text-7xl font-black font-mulish mb-6 text-white">
            Welcome to Marketplace
          </h1>
          <p className="lg:w-2/3 mx-auto text-lg text-white">
            Buy, sell, discover and trade the super cool cryptobots
          </p>
        </div>

        {/* filter & sort start here */}
        <div className="grid grid-cols-3 gap-4 w-full">
          {/* filter starts  here */}
          <div className="col-span-2 text-white ">
            <h5 className="font-mulish font-bold">FILTER BY:</h5>
            <div className="checkboxes mt-3">
              <label className="inline-flex items-center ">
                <input
                  type="checkbox"
                  className="form-checkbox h-6 w-6 text-gray-600 rounded"
                  checked={forSale}
                  onChange={() => updateForSale(val => !val)}
                />
                <span className="ml-2 text-gray-700 font-mulish">for sale</span>
              </label>

              <label className="inline-flex items-center ml-4">
                <input
                  type="checkbox"
                  className="form-checkbox h-6 w-6 text-gray-600 rounded bg-base-900"
                  checked={notForSale}
                  onChange={() => updateNotForSale(val => !val)}
                />
                <span className="ml-2 text-gray-700 font-mulish">
                  not for sale
                </span>
              </label>
            </div>
          </div>
          {/* filter ends  here */}
          {/* sort starts  here */}
          <div className="text-white grid justify-items-end">
            <div>
              <h5 className="font-mulish font-bold">SORT BY:</h5>
              <select
                defaultValue={'offerDate'}
                onChange={e => {
                  updateSortBy(e.target.value);
                }}
                className="mt-3 font-mulish bg-base-900 pb-1 border-b-2 border-white"
              >
                <option value={'offerDate'}>Recently Added</option>
                <option value={'lowestPrice'}>Lowest Price</option>
                <option value={'highestPrice'}>Highest Price</option>
              </select>
            </div>
          </div>
          {/* sort ends  here */}
        </div>
        {/* filter & sort end  here */}

        <hr className="mt-6 mb-8 bg-base-400 border-2 h-0.5" />

        <div>
          {allNFTS.loading ? (
            <div className="text-white font-mulish font-bold">Loading...</div>
          ) : allNFTS.error ? (
            <div>Error: {allNFTS.error.message}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {nftList.length > 0 &&
                nftList.map(el => {
                  return (
                    <div key={el.tokenId}>
                      <CryptobotCard xtzPrice={xtzPrice} bot={el} />
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Marketplace;
