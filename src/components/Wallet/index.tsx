import React, { useState } from 'react';
import { useTerraWebapp } from 'hooks/context';
import { terraAddress } from 'core/utils';
import { SupportedCoins, SupportedTokens } from 'core/constants';
import { useWallet } from "@terra-money/wallet-provider"

type WalletProps = {
  onConnect: () => void;
  onDisconnect: () => void;
};

const useCopyAddress = (address: string) => {
  const [copied, setCopied] = useState(false)
  const reset = () => setCopied(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 1000)
    } catch (error) {
      console.error(error)
    }
  }

  return { copy, copied, reset }
}


const Wallet: React.FC<WalletProps> = ({ onConnect, onDisconnect }) => {
  const { isConnected, address, balances } = useTerraWebapp();
  const [toggleDisconnect, setToggleDisconnect] = useState(false);
  const [nftToggleCurrency, setNftToogleCurrency] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('uusd');
  const [selectedCurrencyLabel, setSelectedCurrencyLabel] = useState('UST');
  const { copy, copied, reset } = useCopyAddress(address);
  const { network: extNetwork } = useWallet();

  const finder = (address: string, path: string = "account") => `"https://finder.terra.money"/${extNetwork.chainID}/${path}/${address}`

  return (
    <div className='loginStyleHeader'>
      {/* {isConnected && (
        <div className='handleDivide currency'>
          <button
            onClick={() => {
              setNftToogleCurrency(!nftToggleCurrency);
            }}
            className='loginDetails'
          >
            {selectedCurrencyLabel}{' '}
            <img src='/polygonDropArrowBlue.png' alt=''></img>
          </button>
          <span
            className={nftToggleCurrency ? 'showNftDropdown' : 'hideContent'}
          >
            <ul>
              {Object.keys(SupportedCoins).map(item => (
                <li
                  key={item}
                  onClick={() => {
                    setSelectedCurrency(
                      SupportedCoins[item as keyof typeof SupportedCoins]
                    );
                    setSelectedCurrencyLabel(item);
                    setNftToogleCurrency(false);
                  }}
                >
                  <a href='#'>{item}</a>
                </li>
              ))}
              {Object.keys(SupportedTokens).map(item => (
                <li
                  key={item}
                  onClick={() => {
                    setSelectedCurrency(
                      SupportedTokens[item as keyof typeof SupportedTokens]
                    );
                    setSelectedCurrencyLabel(item);
                    setNftToogleCurrency(false);
                  }}
                >
                  <a href='#'>{item}</a>
                </li>
              ))}
            </ul>
          </span>
        </div>
      )} */}

      {!isConnected && (
        <div className='handleDivide'>
         
          <button className='ConnectWallet' onClick={onConnect}>
            <img src="/lunartImages/plug.svg" alt=""/>Connect Wallet
          </button>
        </div>
      )}
      {/* {isConnected && (
        <div className='handleDivide'>
          <button className='ConnectWallet' onClick={onDisconnect}>
            Disconnect Wallet
          </button>
        </div>
      )} */}

      {isConnected && (
        <>
          <div className='handleDivide'>
            <button className='loginDetails' onClick={ () => setToggleDisconnect(!toggleDisconnect) }>
              {address ? terraAddress(address) : ''} | {balances ? balances[selectedCurrency] : '-'}
            </button>
            <div className={toggleDisconnect ? 'headerDisconnect showContent' : 'headerDisconnect '}>
            <section>
              <div className='headerDisconnectTop'>
                {address ? 
                  <span><img src='/wallet.png' alt="wallet"/> {terraAddress(address)}</span> : 
                  <span><img src='/wallet.png' alt="wallet"/></span>
                }
                <button onClick={onDisconnect}>Disconnect Wallet</button>
              </div>
              <div className='headerDisconnectBottom'>
                <a onClick={copy}><img src='/cpy.png' alt=""/> Copy Address</a>
                <a href={finder(address)} target="_blank"><img src='/lnk.png' alt=""/> View on Terra Finder</a>
              </div>
              <button>SEND</button>
            </section>
            </div><div className='handleDivide currency'>
          <button
            onClick={() => {
              setNftToogleCurrency(!nftToggleCurrency);
            }}
            className='loginDetails'
          >
            {selectedCurrencyLabel}{' '}
            <img src='/polygonDropArrowBlue.png' alt=''></img>
          </button>
       
          <span
            className={nftToggleCurrency ? 'showNftDropdown' : 'hideContent'}
          >
            <ul>
              {Object.keys(SupportedCoins).map(item => (
                <li
                  key={item}
                  onClick={() => {
                    setSelectedCurrency(
                      SupportedCoins[item as keyof typeof SupportedCoins]
                    );
                    setSelectedCurrencyLabel(item);
                    setNftToogleCurrency(false);
                  }}
                >
                  <a href='#'>{item}</a>
                </li>
              ))}
              {Object.keys(SupportedTokens).map(item => (
                <li
                  key={item}
                  onClick={() => {
                    setSelectedCurrency(
                      SupportedTokens[item as keyof typeof SupportedTokens]
                    );
                    setSelectedCurrencyLabel(item);
                    setNftToogleCurrency(false);
                  }}
                >
                  <a href='#'>{item}</a>
                </li>
              ))}
            </ul>
          </span>
        </div>
          </div>

          <div className='handleDivide'>
            <button className='shadebtn'>My NFTs</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Wallet;
