import { APP_NAME, INDEXER_NETWORK, CONTRACT_ADDRESS } from 'src/defaults';

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
  const response = await fetch(
    `https://api.better-call.dev/v1/contract/${INDEXER_NETWORK}/${CONTRACT_ADDRESS}/storage`,
  );
  const result = await response.json();
  const tokens = result.children.find(elm => elm.name === 'tokens');

  const tokensMetataData = await fetch(
    `https://api.better-call.dev/v1/bigmap/${INDEXER_NETWORK}/${tokens.value}`,
  );
  const tokensMetataDataJSON = await tokensMetataData.json();

  const tk = await fetch(
    `https://api.better-call.dev/v1/bigmap/${INDEXER_NETWORK}/${tokens.value}/keys?size=${tokensMetataDataJSON.active_keys}`,
  );
  const all_tokens = await tk.json();
  // console.log('all_tokensxxx', all_tokens);

  if (typeof all_tokens === 'undefined' || all_tokens.length <= 0) {
    return [];
  }

  const grabContent = elm =>
    fetch(sanitizeJsonUri(elm.data.value.children[0].value))
      .then(res => res.json())
      .then(obj => {
        return {
          tokenId: elm.data.key.value,
          uri: sanitizeIpfsLink(obj.artifactUri),
          timestamp: elm.data.timestamp,
        };
      });

  const filtered = await Promise.all(all_tokens.map(grabContent));

  return filtered;
};

export const nftOnOffer = async () => {
  const response = await fetch(
    `https://api.better-call.dev/v1/contract/${INDEXER_NETWORK}/${CONTRACT_ADDRESS}/storage`,
  );
  const result = await response.json();
  const tokens = result.children.find(elm => elm.name === 'offer');

  const offerMetadata = await fetch(
    `https://api.better-call.dev/v1/bigmap/${INDEXER_NETWORK}/${tokens.value}`,
  );
  const offerMetadataJSON = await offerMetadata.json();

  const tk = await fetch(
    `https://api.better-call.dev/v1/bigmap/${INDEXER_NETWORK}/${tokens.value}/keys?size=${offerMetadataJSON.active_keys}`,
  );
  const offers = await tk.json();

  if (typeof offers === 'undefined' || offers.length <= 0) {
    return [];
  }

  const nullValuesRemoved = offers.filter(elm => elm.data.value != null);

  const filtered = nullValuesRemoved.map(elm => {
    return {
      tokenId: elm.data.key.value,
      isForSale: elm.data.value.children[0].value,
      saleValueInMutez: elm.data.value.children[1].value,
      seller: elm.data.value.children[2].value,
      timestamp: elm.data.timestamp,
    };
  });

  return filtered;
};

export const fetchAllNfts = async () => {
  try {
    const allTokens = await getAllNFTsMetadata();
    const tokensOnOffer = await nftOnOffer();
    const tokenHolders = await getAllTokenHolders();

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

export const getAllNFTHoldersInfo = () => {};

export const getNftInfoByXTZAddress = async (address = '') => {
  const allTokens = await getAllNFTsMetadata();
  const tokensOnOffer = await nftOnOffer();

  const response = await fetch(
    `https://api.better-call.dev/v1/contract/${INDEXER_NETWORK}/${CONTRACT_ADDRESS}/storage`,
  );
  const result = await response.json();
  const tokens = result.children.find(elm => elm.name === 'ledger');

  const ledgerMetadata = await fetch(
    `https://api.better-call.dev/v1/bigmap/${INDEXER_NETWORK}/${tokens.value}`,
  );
  const ledgerMetadataJSON = await ledgerMetadata.json();

  const tk = await fetch(
    `https://api.better-call.dev/v1/bigmap/${INDEXER_NETWORK}/${tokens.value}/keys?size=${ledgerMetadataJSON.active_keys}`,
  );

  const ledger = await tk.json();

  const owners = ledger.filter(elm => elm.data.value.value !== '0');

  const allTokenHolders = owners.map(elm => {
    return {
      address: elm.data.key.children[0].value,
      tokenId: elm.data.key.children[1].value,
    };
  });

  const tokenHolderUser = allTokenHolders.filter(el => el.address === address);

  if (tokenHolderUser.length <= 0) {
    return [];
  }

  const filtered = tokenHolderUser.map(elm => {
    const nft = allTokens.find(element => element.tokenId == elm.tokenId);

    const offer = tokensOnOffer.find(element => element.tokenId == elm.tokenId);

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

  // console.log(filtered);
  return filtered;
};

const getAllTokenHolders = async () => {
  try {
    const response = await fetch(
      `https://api.better-call.dev/v1/contract/${INDEXER_NETWORK}/${CONTRACT_ADDRESS}/storage`,
    );
    const result = await response.json();
    const tokens = result.children.find(elm => elm.name === 'ledger');

    const ledgerMetadata = await fetch(
      `https://api.better-call.dev/v1/bigmap/${INDEXER_NETWORK}/${tokens.value}`,
    );
    const ledgerMetadataJSON = await ledgerMetadata.json();

    const tk = await fetch(
      `https://api.better-call.dev/v1/bigmap/${INDEXER_NETWORK}/${tokens.value}/keys?size=${ledgerMetadataJSON.active_keys}`,
    );

    const ledger = await tk.json();

    const owners = ledger.filter(elm => elm.data.value.value !== '0');

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
