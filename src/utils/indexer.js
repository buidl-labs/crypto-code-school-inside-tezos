import { APP_NAME, INDEXER_NETWORK, CONTRACT_ADDRESS } from 'src/defaults';
import { bytes2Char } from '@taquito/tzip16';

function sanitizeJsonUri(origin) {
  if (origin.startsWith('ipfs://')) {
    return `https://ipfs.io/ipfs/${origin.substring(7)}/`;
  }

  return null;
}
export function sanitizeIpfsLink(origin) {
  if (origin.startsWith('ipfs://')) {
    return origin.substring(7);
  }

  return null;
}

export const getAllNFTsMetadata = async () => {
  try {
    const response = await fetch(
      `https://api.better-call.dev/v1/contract/${INDEXER_NETWORK}/${CONTRACT_ADDRESS}/storage`,
    );

    const result = await response.json();
    const tokens = result[0].children.find(
      elm => elm.name === 'token_metadata',
    );

    const tokensMetataData = await fetch(
      `https://api.better-call.dev/v1/bigmap/${INDEXER_NETWORK}/${tokens.value}`,
    );
    const tokensMetataDataJSON = await tokensMetataData.json();
    // console.log('tokenMetadata', tokensMetataDataJSON);
    const num_keys = tokensMetataDataJSON.active_keys;
    const all_tokens = [];
    let tk;

    for (let i = 0; i < parseInt(num_keys / 10) + 1; i++) {
      tk = await fetch(
        `https://api.better-call.dev/v1/bigmap/${INDEXER_NETWORK}/${
          tokens.value
        }/keys?offset=${10 * i}`,
      );
      all_tokens.push(...(await tk.json()));
      console.log('all_tokens', all_tokens.length);
      if (all_tokens.length == num_keys) break;
    }

    if (typeof all_tokens === 'undefined' || all_tokens.length <= 0) {
      console.log('returning empty');
      return [];
    }

    const grabContent = elm => {
      console.log('elm', elm.data.value.children[1].children[0].value);
      return fetch(
        sanitizeJsonUri(elm.data.value.children[1].children[0].value),
      )
        .then(res => res.json())
        .then(obj => {
          const cryptobot = {
            tokenId: elm.data.key.value,
            uri: sanitizeIpfsLink(obj.artifactUri),
            timestamp: elm.data.timestamp,
            imageURI: sanitizeIpfsLink(obj.displayUri),
          };
          console.log('cryptobot', cryptobot);
          return cryptobot;
        });
    };

    console.log('all_tokensx', all_tokens);

    const filtered = Promise.all(all_tokens.map(grabContent));
    console.log('filtered allTokens', await filtered);
    return filtered;
  } catch (err) {
    console.log(err);
  }
};

export const nftOnOffer = async () => {
  const response = await fetch(
    `https://api.better-call.dev/v1/contract/${INDEXER_NETWORK}/${CONTRACT_ADDRESS}/storage`,
  );
  const result = await response.json();
  const tokens = result[0].children.find(elm => elm.name === 'offer');
  // console.log('fetching offer metadata');
  const offerMetadata = await fetch(
    `https://api.better-call.dev/v1/bigmap/${INDEXER_NETWORK}/${tokens.value}`,
  );
  const offerMetadataJSON = await offerMetadata.json();
  const num_keys = offerMetadataJSON.active_keys;

  const all_offers = [];
  let tk;
  for (let i = 0; i < parseInt(num_keys / 10) + 1; i++) {
    tk = await fetch(
      `https://api.better-call.dev/v1/bigmap/${INDEXER_NETWORK}/${
        tokens.value
      }/keys?offset=${10 * i}`,
    );
    all_offers.push(...(await tk.json()));

    if (all_offers.length == num_keys) break;
  }

  if (typeof all_offers === 'undefined' || all_offers.length <= 0) {
    return [];
  }

  const nullValuesRemoved = all_offers.filter(elm => elm.data.value != null);

  const filtered = nullValuesRemoved.map(elm => ({
    tokenId: elm.data.key.value,
    isForSale: true,
    saleValueInMutez: elm.data.value.children[0].value,
    seller: elm.data.value.children[1].value,
    timestamp: elm.data.timestamp,
  }));

  return filtered;
};

export const fetchAllNfts = async () => {
  console.log('fetching all nfts');
  try {
    const allTokens = await getAllNFTsMetadata();
    const tokensOnOffer = await nftOnOffer();
    const tokenHolders = await getAllTokenHolders();
    // return allTokens;
    // console.log('allTokens', allTokens);

    const combined = allTokens.map(elm => {
      const token = tokensOnOffer.find(
        element => element.tokenId == elm.tokenId,
      );

      const holder = tokenHolders.find(
        element => element.tokenId == elm.tokenId,
      );

      return {
        tokenId: elm.tokenId,
        uri: elm.uri,
        mintDate: elm.timestamp,
        isForSale: token ? token.isForSale : false,
        saleValueInMutez: token ? token.saleValueInMutez : null,
        seller: token ? token.seller : null,
        offerDate: token ? token.timestamp : null,
        owner: holder ? holder.address : null,
      };
    });
    console.log('returning combined');
    return combined;
  } catch (e) {
    console.log(e);
  }
};

export const fetchOneNFT = async token_id => {
  try {
    const allTokens = await getAllNFTsMetadata();
    const tokensOnOffer = await nftOnOffer();
    const tokenHolders = await getAllTokenHolders();

    const token = allTokens.find(bot => bot.tokenId == token_id);
    const sale = tokensOnOffer.find(element => element.tokenId == token_id);
    const holder = tokenHolders.find(element => element.tokenId == token_id);
    // console.log('from indexer', token);

    return {
      tokenId: token.tokenId,
      uri: token.uri,
      mintDate: token.timestamp,
      isForSale: sale ? sale.isForSale : false,
      saleValueInMutez: sale ? sale.saleValueInMutez : null,
      seller: sale ? sale.seller : null,
      offerDate: sale ? sale.timestamp : null,
      owner: holder ? holder.address : null,
      holderAddress: holder ? holder.address : null,
    };
  } catch (e) {
    console.log(e);
  }
};

export const convertMutezToXtz = mutez => {
  return parseFloat(mutez) / 1000000;
};

export const convertXtzToMutez = xtz => {
  return parseFloat(xtz) * 1000000;
};

export const getXTZPrice = async () => {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=tezos',
    );
    const data = await response.json();
    const xtzPrice = data[0].current_price;
    return {
      currency: 'XTZ',
      price: parseFloat(parseFloat(xtzPrice).toFixed(2)),
    };
  } catch (error) {
    console.log(error);
  }
};

export const getXTZPriceInUSD = (usd, mutez) => {
  return parseFloat(convertMutezToXtz(mutez) * usd).toFixed(2);
};

// export const getAllNFTHoldersInfo = () => {};

export const getNftInfoByXTZAddress = async (address = '') => {
  try {
    const allTokens = await getAllNFTsMetadata();
    const tokensOnOffer = await nftOnOffer();

    const response = await fetch(
      `https://api.better-call.dev/v1/contract/${INDEXER_NETWORK}/${CONTRACT_ADDRESS}/storage`,
    );
    const result = await response.json();
    const tokens = result[0].children.find(elm => elm.name === 'ledger');

    let ledger = [];
    let tk;
    let offset = 0;
    while (true) {
      tk = await fetch(
        `https://api.better-call.dev/v1/bigmap/${INDEXER_NETWORK}/${tokens.value}/keys?q=${address}&offset=${offset}`,
      );
      const res = await tk.json();

      if (res.length === 0) {
        break;
      }

      ledger.push(...res);
      offset += 10;
    }

    const owners = ledger.filter(elm => elm.data.value.value !== '0');

    const tokenHolder = owners.map(elm => ({
      address: elm.data.key.children[0].value,
      tokenId: elm.data.key.children[1].value,
    }));
    // console.log('holder', tokenHolder);
    if (tokenHolder.length <= 0) {
      return [];
    }

    const filtered = tokenHolder.map(elm => {
      const nft = allTokens.find(element => element.tokenId == elm.tokenId);
      const offer = tokensOnOffer.find(
        element => element.tokenId == elm.tokenId,
      );

      return {
        address: elm.address,
        tokenId: elm.tokenId,
        uri: nft.uri,
        isForSale: offer ? offer.isForSale : false,
        saleValueInMutez: offer ? offer.saleValueInMutez : null,
        seller: offer ? offer.seller : null,
        offerDate: offer ? offer.timestamp : null,
        owner: elm.address,
      };
    });
    return filtered;
  } catch (err) {
    console.log(err);
  }
};

const getAllTokenHolders = async () => {
  try {
    const response = await fetch(
      `https://api.better-call.dev/v1/contract/${INDEXER_NETWORK}/${CONTRACT_ADDRESS}/storage`,
    );
    const result = await response.json();
    const tokens = result[0].children.find(elm => elm.name === 'ledger');

    const ledgerMetadata = await fetch(
      `https://api.better-call.dev/v1/bigmap/${INDEXER_NETWORK}/${tokens.value}`,
    );
    const ledgerMetadataJSON = await ledgerMetadata.json();
    const num_keys = ledgerMetadataJSON.active_keys;
    const all_holders = [];
    let tk;
    for (let i = 0; i < parseInt(num_keys / 10) + 1; i++) {
      tk = await fetch(
        `https://api.better-call.dev/v1/bigmap/${INDEXER_NETWORK}/${
          tokens.value
        }/keys?offset=${10 * i}`,
      );
      all_holders.push(...(await tk.json()));

      if (all_holders.length == num_keys) break;
    }

    const owners = all_holders.filter(elm => elm.data.value.value !== '0');

    const allTokenHolders = owners.map(elm => {
      return {
        address: elm.data.key.children[0].value,
        tokenId: elm.data.key.children[1].value,
      };
    });

    return allTokenHolders;
  } catch (error) {
    console.log(error);
  }
};

export const getAllTokensCount = async () => {
  const response = await fetch(
    `https://api.better-call.dev/v1/contract/${INDEXER_NETWORK}/${CONTRACT_ADDRESS}/storage`,
  );

  const result = await response.json();

  const getAllTokenObject = result[0].children.find(
    elm => elm.name === 'all_tokens',
  );

  return getAllTokenObject.children.length;
};
