import { CONTRACT_ADDRESS } from 'src/defaults';
import { Tezos } from 'src/utils/wallet';

export const estimateWithdrawalGasFee = async bot => {
  try {
    const contract = await Tezos.wallet.at(CONTRACT_ADDRESS);

    const op = await contract.methods
      .bot_no_longer_for_sale(Number(bot.tokenId))
      .toTransferParams({});

    const est = await Tezos.estimate.transfer(op);

    return est.suggestedFeeMutez;
  } catch (err) {
    console.log('err', err);
  }
};

export const estimateBotPutOnSaleGasFee = async bot => {
  try {
    const contract = await Tezos.wallet.at(CONTRACT_ADDRESS);

    const op = await contract.methods
      .offer_bot_for_sale(1000, Number(bot.tokenId))
      .toTransferParams({});

    const est = await Tezos.estimate.transfer(op);

    return est.suggestedFeeMutez;
  } catch (err) {
    console.log('err', err);
  }
};
