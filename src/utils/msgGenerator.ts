import { MsgExecuteContract, Coins, Coin } from "@terra-money/terra.js"

const isNative = (token?: string) =>
    (token && (token.toLowerCase().startsWith("u") || token.toLowerCase().startsWith("ibc") || ['luna','UST'].includes(token.toLowerCase())))

// export default () => {
//     const sender = useAddress()
  
//     return (
//       contract: string,
//       msg: object,
//       coin?: { denom: string; amount: string },
//       coin2?: { denom: string; amount: string },
//     ) =>
//     {
//       const coin1data = coin ? [Coin.fromData(coin)] : [];
//       const coin2data = coin2 ? [Coin.fromData(coin2)] : [];
  
//       return new MsgExecuteContract(
//         sender,
//         contract,
//         msg,
//         new Coins([...coin1data, ...coin2data ])
//       )
//     }
//   }

export const approve = (sender: string, token: string, amount: string, contract: string) => {
    const msg = {
        increase_allowance: {
            amount: amount,
            spender: contract,
        },
    }
    return new MsgExecuteContract(sender, token, msg);
}

export const provide_liquidity = (sender: string, token1: string, amount1: string, token2: string, amount2: string, pair: string) => {
    const token1Info = isNative(token1)
        ? { native_token: { denom: token1 } }
        : { token: { contract_addr: token1 } }

    const token2Info = isNative(token2)
        ? { native_token: { denom: token2 } }
        : { token: { contract_addr: token2 } }
    const msg = {
        provide_liquidity: {
            assets: [
                {
                    amount: amount1,
                    info: token1Info
                },
                {
                    amount: amount2,
                    info: token2Info
                }
            ]
        }
    }
    let coins = new Coins();
    if (isNative(token1)) coins = coins.add(new Coin(token1, amount1));
    if (isNative(token2)) coins = coins.add(new Coin(token2, amount2));
    return new MsgExecuteContract(
        sender, 
        pair, 
        msg, 
        coins
    )
}

export const farm_staking = (sender: string, lpToken: string, amount: string, farm: string) => {
    const msg = {
        send: {
            contract: farm,
            amount,
            msg: "eyJzdGFrZSI6e319", //{stake:{}}
          },
    }
    return new MsgExecuteContract(
        sender,
        lpToken,
        msg
    )
}

export const swap = (sender: string, token1: string, amount1: string, token2: string, amount2: string, pair: string) => {
    const token1Info = isNative(token1)
        ? { native_token: { denom: token1 } }
        : { token: { contract_addr: token1 } }

    const token2Info = isNative(token2)
        ? { native_token: { denom: token2 } }
        : { token: { contract_addr: token2 } }

    const belief_price = (Number(amount1) / Number(amount2)).toString();
    const msg = {
        swap: {
          to: null,
          max_spread: "0.01",
          offer_asset: {
            info: token1Info,
            amount: amount1
          },
          belief_price: belief_price
        }
    }
    let coins = new Coins();
    if (isNative(token1)) coins = coins.add(new Coin(token1, amount1));
    return new MsgExecuteContract(
        sender, 
        pair, 
        msg, 
        coins
    )
}