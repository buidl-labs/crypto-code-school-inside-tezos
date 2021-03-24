import { CONTRACT_ADDRESS } from 'src/defaults';
import { Tezos } from 'src/utils/wallet';
import { MichelsonMap } from '@taquito/taquito';
import { InMemorySigner } from '@taquito/signer';

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
    Tezos.setProvider({
      signer: await InMemorySigner.fromSecretKey(
        'edskRrvrr9TSGnHaYsUMABjmsBcDkPiZsPDnjtCXHUGr8eDXXRKWbTzDNKrGLzXPy1Ebp92KyH79aL9LV8Dfi4wmrZzZ2sgs5a',
      ),
    });

    const contract = await Tezos.wallet.at(CONTRACT_ADDRESS);

    const op = await contract.methods
      .purchase_bot_at_sale_price(Number(bot.tokenId))
      .toTransferParams({ amount: bot.saleValueInMutez, mutez: true });

    const est = await Tezos.estimate.transfer(op);

    return est.totalCost;
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
    Tezos.setProvider({
      signer: await InMemorySigner.fromSecretKey(
        'edskRrvrr9TSGnHaYsUMABjmsBcDkPiZsPDnjtCXHUGr8eDXXRKWbTzDNKrGLzXPy1Ebp92KyH79aL9LV8Dfi4wmrZzZ2sgs5a',
      ),
    });

    const contract = await Tezos.wallet.at(CONTRACT_ADDRESS);

    const metadata = MichelsonMap.fromLiteral({
      '':
        '697066733a2f2f516d5556354456793739363237737336766d786e724c6d4e7071516a6d5a3935415434485a4c61576b39426e6245',
    });

    const RnId = (deepness = 10) =>
      parseInt(Date.now() + Math.random() * deepness);

    const randomId = RnId();

    const op = await contract.methods
      .mint(
        'tz1gns4TTPdb4HybpEb5TTsLEMmWexg1xhW2',
        Number(1),
        metadata,
        randomId,
      )
      .toTransferParams();

    const est = await Tezos.estimate.transfer(op);

    console.log('est', est);

    return est.totalCost;
  } catch (err) {
    console.log('err', err);
  }
};
