import React, { useState, useEffect } from 'react';
import { Link } from 'gatsby';
import { APP_NAME, NETWORK, CONTRACT_ADDRESS } from 'src/defaults';
import { useAsync } from 'react-use';
import { getAllNFTsMetadata, nftOnOffer } from 'src/utils/indexer';
import Button from '../../components/Buttons';
import NavBar from '../../components/NavBar';
import Footer from 'src/components/Footer';
import CryptobotCard from '../../components/CryptobotCard';
import sortBy from 'lodash.sortby';
import filter from 'lodash.filter';
import uniqBy from 'lodash.uniqby';

/**
 * Filters an array of objects using custom predicates.
 *
 * @param  {Array}  array: the array to filter
 * @param  {Object} filters: an object with the filter criteria
 * @return {Array}
 */
function filterArray(array, filters) {
  const filterKeys = Object.keys(filters);
  return array.filter(item => {
    // validates all filter criteria
    return filterKeys.every(key => {
      // ignores non-function predicates
      if (typeof filters[key] !== 'function') return true;
      return filters[key](item[key]);
    });
  });
}

const Marketplace = () => {
  const [forSale, updateForSale] = useState(true);
  const [notForSale, updateNotForSale] = useState(false);
  const [nftList, updateNftList] = useState([]);

  const allNFTS = useAsync(async () => {
    try {
      const allTokens = await getAllNFTsMetadata();
      const tokensOnOffer = await nftOnOffer();
      console.log(allTokens);
      console.log(tokensOnOffer);

      const combined = allTokens.map(elm => {
        const token = tokensOnOffer.find(
          element => element.tokenId == elm.tokenId,
        );

        return {
          tokenId: elm.tokenId,
          uri: elm.uri,
          symbol: elm.symbol,
          mintDate: elm.timestamp,
          isForSale: token ? token.isForSale : false,
          saleValueInMutez: token ? token.saleValueInMutez : null,
          seller: token ? token.seller : null,
          offerDate: token ? token.timestamp : null,
        };
      });

      console.log('combined', combined);
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

    //if forSale & notForSale false return empty array
    if (forSale === false && notForSale === false) {
      updateNftList([]);
    } else {
      //else return filtered array
      const combined = uniqBy([...filForSale, ...filNotForSale], 'tokenId');
      updateNftList(combined);
    }
  }, [forSale, notForSale]);

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
              <select className="mt-3 font-mulish bg-base-900 pb-1 border-b-2 border-white">
                <option selected>Recently Added</option>
                <option>Lowest Price</option>
                <option>Highest Price</option>
              </select>
            </div>
          </div>
          {/* sort ends  here */}
        </div>
        {/* filter & sort end  here */}

        <hr className="mt-6 mb-8 bg-base-400 border-2 h-0.5" />

        <div>
          {allNFTS.loading ? (
            <div>Loading...</div>
          ) : allNFTS.error ? (
            <div>Error: {allNFTS.error.message}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {nftList.length > 0 &&
                nftList.map(el => {
                  return (
                    <div>
                      <CryptobotCard bot={el} />
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
