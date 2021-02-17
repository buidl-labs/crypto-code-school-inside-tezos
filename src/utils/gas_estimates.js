import { CONTRACT_ADDRESS } from 'src/defaults';
import { Tezos } from 'src/utils/wallet';
import { MichelsonMap } from '@taquito/taquito';

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

export const estimateBotPurchaseGasFee = async bot => {
  try {
    const contract = await Tezos.wallet.at(CONTRACT_ADDRESS);

    const op = await contract.methods
      .purchase_bot_at_sale_price(Number(bot.tokenId))
      .toTransferParams({ amount: bot.saleValueInMutez, mutez: true });

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

export const estimateNFTMintFee = async () => {
  try {
    const contract = await Tezos.wallet.at(CONTRACT_ADDRESS);

    const metadata = MichelsonMap.fromLiteral({
      uri: 'QmWR8FzC8ZvSQDP4fJxvArNaYf2LU79CVa4JtiW56qoM7d',
    });

    const RnId = (deepness = 10) =>
      parseInt(Date.now() + Math.random() * deepness);

    const randomId = RnId();

    const op = await contract.methods
      .mint(
        'tz1iLVzBpCNTGz6tCBK2KHaQ8o44mmhLTBio',
        Number(1),
        metadata,
        randomId, // DONE: Make the token id increment dynamic
      )
      .toTransferParams({});

    const est = await Tezos.estimate.transfer(op);

    console.log('est', est);

    return est.suggestedFeeMutez;
  } catch (err) {
    console.log('err', err);
  }
};
