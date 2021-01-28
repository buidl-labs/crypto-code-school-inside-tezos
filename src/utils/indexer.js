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
    };
  });

  return filtered;
};

export const convertMutezToXtz = mutez => {
  return mutez / 1000000;
};

export const convertXtzToMutez = xtz => {
  return xtz * 1000000;
};
