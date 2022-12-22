import React, { useEffect, useState } from 'react';
import { useConnectedWallet } from '@terra-money/wallet-provider'
import { MsgExecuteContract } from '@terra-money/terra.js';
import { useTerraWebapp } from 'hooks/context';
import NftFooter from '../Nft/NftFooter';
import NftHeader from '../Nft/NftHeader';
import { Helmet } from 'react-helmet';
import { approve, provide_liquidity, farm_staking } from 'utils/msgGenerator';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/components/pagination/pagination.min.css';
import './farming.scss';
import RewardIcon from '../../assets/icons/rewards.svg'
import UstIcon from '../../assets/icons/ust.svg';
import RewardIconBig from '../../assets/icons/rewardsB.svg'
import UstIconBig from '../../assets/icons/ustB.svg';
import FarmIcon from '../../assets/icons/farmIcon.svg'
import plusIcon from '../../assets/icons/plusIcon.svg';
const InfoIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM9 4C9 4.26522 8.89464 4.51957 8.70711 4.70711C8.51957 4.89464 8.26522 5 8 5C7.73478 5 7.48043 4.89464 7.29289 4.70711C7.10536 4.51957 7 4.26522 7 4C7 3.73478 7.10536 3.48043 7.29289 3.29289C7.48043 3.10536 7.73478 3 8 3C8.26522 3 8.51957 3.10536 8.70711 3.29289C8.89464 3.48043 9 3.73478 9 4ZM7 7C6.73478 7 6.48043 7.10536 6.29289 7.29289C6.10536 7.48043 6 7.73478 6 8C6 8.26522 6.10536 8.51957 6.29289 8.70711C6.48043 8.89464 6.73478 9 7 9V12C7 12.2652 7.10536 12.5196 7.29289 12.7071C7.48043 12.8946 7.73478 13 8 13H9C9.26522 13 9.51957 12.8946 9.70711 12.7071C9.89464 12.5196 10 12.2652 10 12C10 11.7348 9.89464 11.4804 9.70711 11.2929C9.51957 11.1054 9.26522 11 9 11V8C9 7.73478 8.89464 7.48043 8.70711 7.29289C8.51957 7.10536 8.26522 7 8 7H7Z" fill="#E6DBDB" fill-opacity="0.75" />
</svg>


)
const NftWelcome: React.FC = (props: any) => {
  const { connect, balances, pair, pairAddress, uusdPairInfo, tokenPairInfo, address, uLP, farm } = useTerraWebapp();
  const connectedWallet = useConnectedWallet()
  const [sidebarActive, setSidebar] = useState(false);
  const [uusdAmount, setUusdAmount] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [notEnoughBalance, setNotEnoughBalance] = useState(false);
  const handleSidebar = (status: any) => {
    setSidebar(status);
  };
  function handleSearch(e: any) {
    if (e.key === 'Enter' && e.target.value) {
      props.history.push({
        pathname: '/nftExplore',
        state: { search: e.target.value },
      });
    }
  }

  // useEffect(() => {
  //   connect(ConnectType.EXTENSION);
  // }, [connect]);

  const onChangeUusdAmount = (amount: string) => {
    setUusdAmount(amount);
    const _amount = Number(amount);
    const _tokenAmount = pair ? (Number(tokenPairInfo.amount) / Number(uusdPairInfo.amount) * _amount).toFixed(6) : "";
    setTokenAmount(_tokenAmount);
    if ((Number(balances.uusd) < Number(amount) || Number(balances.loop) < Number(_tokenAmount)) && !notEnoughBalance) setNotEnoughBalance(true);
    else if (notEnoughBalance) setNotEnoughBalance(false);
  }
  
  const onChangeTokenAmount = (amount: string) => {
    setTokenAmount(amount);
    const _amount = Number(amount);
    const _uusdAmount = pair? (Number(uusdPairInfo.amount) / Number(tokenPairInfo.amount) * _amount).toFixed(6) : "";
    setUusdAmount(_uusdAmount);
    if ((Number(balances.uusd) < Number(_uusdAmount) || Number(balances.loop) < Number(_amount)) && !notEnoughBalance) setNotEnoughBalance(true);
    else if (notEnoughBalance) setNotEnoughBalance(false);
  }

  const handleFarm = () => {
    const tokenAddress = tokenPairInfo.info.token.contract_addr;
    const msgs: MsgExecuteContract[] = [];
    const expectedULPTokenAmount = (Math.floor((Number(pair.total_share) * Number(uusdAmount) * Math.pow(10, 6) / Number(uusdPairInfo.amount)))).toFixed(0);
    msgs.push(approve(address, tokenAddress, (Number(tokenAmount) * Math.pow(10, 6)).toFixed(0), pairAddress));
    msgs.push(provide_liquidity(address, tokenAddress, (Math.floor(Number(tokenAmount) * Math.pow(10, 6))).toFixed(0), "uusd", (Number(uusdAmount) * Math.pow(10, 6)).toFixed(0), pairAddress));
    msgs.push(farm_staking(address, uLP, expectedULPTokenAmount, farm));
    if (connectedWallet) connectedWallet.post({
      msgs: msgs
    }).then(console.log).catch(console.log)
  }

  return (
    <>
      <Helmet>
        <title>Farming</title>
      </Helmet>
      <div className='nftMain'>
        <NftHeader handleSidebar={handleSidebar} />
        <div className={sidebarActive ? 'sidebarActiveBg' : ''}>
          <div className='bgSet'>
          <div className="container" id='farming-page'>
            <div className="farm-heading">
              <p className="farm-heading-title">Farming</p>
              <p className='farm-head-sub' >Farm your ARTS tokens to support the project and earn dual farming rewards</p>
            </div>

            <div className="farm-row">
              <div className="farm-col-stats">

                <div className="left-divs">
                  <div className="" style={{ display: 'flex' }}>
                    <p className="small-head">APY &nbsp;</p>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM9 4C9 4.26522 8.89464 4.51957 8.70711 4.70711C8.51957 4.89464 8.26522 5 8 5C7.73478 5 7.48043 4.89464 7.29289 4.70711C7.10536 4.51957 7 4.26522 7 4C7 3.73478 7.10536 3.48043 7.29289 3.29289C7.48043 3.10536 7.73478 3 8 3C8.26522 3 8.51957 3.10536 8.70711 3.29289C8.89464 3.48043 9 3.73478 9 4ZM7 7C6.73478 7 6.48043 7.10536 6.29289 7.29289C6.10536 7.48043 6 7.73478 6 8C6 8.26522 6.10536 8.51957 6.29289 8.70711C6.48043 8.89464 6.73478 9 7 9V12C7 12.2652 7.10536 12.5196 7.29289 12.7071C7.48043 12.8946 7.73478 13 8 13H9C9.26522 13 9.51957 12.8946 9.70711 12.7071C9.89464 12.5196 10 12.2652 10 12C10 11.7348 9.89464 11.4804 9.70711 11.2929C9.51957 11.1054 9.26522 11 9 11V8C9 7.73478 8.89464 7.48043 8.70711 7.29289C8.51957 7.10536 8.26522 7 8 7H7Z" fill="#E6DBDB" fill-opacity="0.75" />
                    </svg>

                  </div>
                  <p className="figure nomargin">0.00%</p>
                </div>

                <div className="left-divs">
                  <p className="small-head" >total rewards</p>
                  <div className="stats-row first" >

                    <img src={RewardIconBig} />
                    <div className="texts">
                      <p className="figure">2,66.<span>19623</span></p>
                      <span className="sub">ARTS</span>
                    </div>
                  </div>
                  <div className="stats-row" >
                    <img src={UstIconBig} />
                    <div className="texts">
                      <p className="figure">89.<span>29863</span></p>
                      <span className="sub">LOOP</span>
                    </div>
                  </div>
                </div>

                <div className="left-divs">
                  <div className="stats-row">
                    <p className="small-head">total value &nbsp;</p>
                    <InfoIcon />
                  </div>
                  <div className="stats-row">
                    {/* <img src='../../assets/icons/ust' /> */}
                    <img src={UstIconBig} />

                    <div className="texts">

                      <p className='figure'>8,500.<span>0324</span></p >
                      <span className="sub">UST</span>
                    </div>
                  </div>
                </div>

                <div className="">

                </div>
              </div>

              <div className="tab-wrapper">
                {/* tabs
                  <div className="tab"> */}



                <div className='form-tabs'>
                  <button className=' active-button button'>
                    Farm
                  </button>
                  <button className='button'>
                    UnFarm
                  </button>
                  <button className='button'>
                    Stats
                  </button>
                </div>




                <div className="tab-content-wrapper">
                  <div className="tab-content" id="">

                    <div className="">
                      <div className="tab-content-row">
                        <div className="farm-form-text">
                          Balance
                        </div>
                        <div className="farm-form-text">
                          <span className="farm-form-text">{balances.uusd || "0.00"} </span>
                          <span className="farm-form-text">UST</span>
                          <span className="seperator"> |</span>
                          <span className="colored"><a href="">Add Balance</a></span>
                        </div>
                      </div>
                      <div className="input-box">
                        <span ><img src={UstIcon} /><span>UST</span></span>
                        <input type="text" placeholder='0.00' value={uusdAmount} onChange={e => onChangeUusdAmount(e.target.value)} disabled={pair === undefined} />
                        <button onClick={() => onChangeUusdAmount((Number(balances.uusd) - 0.5).toString())}>max</button>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '24px', }}>
                      <div className="round-button">
                        <img src={plusIcon} />
                      </div>

                    </div>

                    <div className="input-box-2">
                      <span ><img src={RewardIcon} /><span>ARTS</span></span>
                      <input type="text" placeholder='0.00' value={tokenAmount} onChange={e => onChangeTokenAmount(e.target.value)} disabled={pair === undefined} />
                      <button onClick={() => onChangeTokenAmount(balances.loop)}>max</button>
                    </div>

                    <div >
                      <button className="farm-button" onClick={handleFarm} disabled={notEnoughBalance}>
                        <img src={FarmIcon} /> Farm
                      </button>

                      <p className="farm-form-text">Estimated Reward: <span className="white">UST/month </span></p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
            </div>
          </div>
        </div>
        <NftFooter />
      </div>
    </>
  );
};

export default NftWelcome;
