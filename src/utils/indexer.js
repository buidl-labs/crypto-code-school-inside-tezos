import { APP_NAME, NETWORK, CONTRACT_ADDRESS } from 'src/defaults';

export const getAllNFTsMetadata = async () => {
  const response = await fetch(
    `https://api.better-call.dev/v1/contract/${NETWORK}/${CONTRACT_ADDRESS}/storage`,
  );
  const result = await response.json();
  const tokens = result.children.find(elm => elm.name === 'tokens');
  const tk = await fetch(
    `https://api.better-call.dev/v1/bigmap/${NETWORK}/${tokens.value}/keys`,
  );
  const all_tokens = await tk.json();

  if (typeof all_tokens === 'undefined' || all_tokens.length <= 0) {
    return [];
  }

  const filtered = all_tokens.map(elm => {
    return {
      tokenId: elm.data.key.value,
      symbol: elm.data.value.children[0].children[0].value,
      uri: elm.data.value.children[0].children[1].value,
      timestamp: elm.data.timestamp,
    };
  });

  return filtered;
};

export const nftOnOffer = async () => {
  const response = await fetch(
    `https://api.better-call.dev/v1/contract/${NETWORK}/${CONTRACT_ADDRESS}/storage`,
  );
  const result = await response.json();
  const tokens = result.children.find(elm => elm.name === 'offer');
  const tk = await fetch(
    `https://api.better-call.dev/v1/bigmap/${NETWORK}/${tokens.value}/keys`,
  );
  const offers = await tk.json();

  if (typeof offers === 'undefined' || offers.length <= 0) {
    return [];
  }

  const filtered = offers.map(elm => {
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

    return combined;
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
      'https://api.nomics.com/v1/prices?key=2334c1509d5ddcd761a14745349f7551',
    );
    const data = await response.json();
    const xtzPrice = data.find(el => el.currency === 'XTZ');
    return {
      currency: xtzPrice.currency,
      price: parseFloat(parseFloat(xtzPrice.price).toFixed(2)),
    };
  } catch (error) {
    console.log(error);
  }
};

export const getXTZPriceInUSD = (usd, mutez) => {
  return parseFloat(convertMutezToXtz(mutez) * usd).toFixed(2);
};
