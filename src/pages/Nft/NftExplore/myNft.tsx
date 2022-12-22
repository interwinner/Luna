import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import NftHeader from '../NftHeader';
import NftFooter from '../NftFooter';

const MyNft = () => {
  const [sidebarActive, setSidebar] = useState(false);
  const [toggleContract, setToggleContract] = useState(true);

  const handleSidebar = (status: any) => {
    setSidebar(status);
  };

  return (
    <>
      <Helmet>
        <title>MyNft</title>
      </Helmet>
      <div className='nftexploreMain'>
        <NftHeader handleSidebar={handleSidebar} />
        {
          <div className='mfnftMain'>
            <div className='mynft'>
              <div className='wrapper'>
<div className='mynftInner'>
<h3>My NFTs</h3>
<section>
<div className='mynftLeft'>
    <h6>Statistics</h6>
    <ul>
        <li>
            <a href="">
                <span>
                <b>Total Staked <img src='info.png' alt=""/></b>
                <p>4,899.10 <i>UST</i></p>
                </span>
                <img src='m1.png' alt=""/>
            </a>
        </li>
        <li>
            <a href="">
                <span>
                <b>Average APY <img src='info.png' alt=""/></b>
                <p>207.07 <i>%</i></p>
                </span>
                <img src='m2.png' alt=""/>
            </a>
        </li>
        <li>
            <a href="">
                <span>
                <b>Profit <img src='info.png' alt=""/></b>
                <p>5,000 <i>UST</i></p>
                </span>
                <img src='m3.png' alt=""/>
            </a>
        </li>
        <li>
            <a href="">
                <span>
                <b>Staking Ratio <img src='info.png' alt=""/></b>
                <p>50 <i>%</i></p>
                </span>
                <img src='m4.png' alt=""/>
            </a>
        </li>
    </ul>
</div>
<div className='mynftRight'>
  <h6>NFT eligible for staking</h6>
<div className='nftRightChild'>
        <span>
        <img src="nftImage.png" alt=""/>
        </span>
        <div className='mynftHub'>
        <div className='mynftHubHedare'>
        <label><img src="fav.png" alt=""/> LOOP-aUST LP NFT</label>
        <div className='nftButtons'>
        <button><img src="unstake.png" alt=""/> UNSTAKE</button>
        <button><img src="sell.png" alt=""/> SELL</button>
        </div>
        </div>

        <div className='nftData'>
        <label>
        <b>APR <img src='info.png' alt=""/></b>
        <p className='nftGreen'>208.07 <i>%</i></p>
        </label>
        <label>
        <b>Next Payout</b>
        <p className='nftGreen'>100 <i>LOOP</i></p>
        </label>
        <label>
        <b>LP Value</b>
        <p>500 <i>UST</i></p>
        </label>
        <label>
        <b>Days Left</b>
        <p>78</p>
        </label>
        <label>
        <b>Days Staked </b>
        <p>12</p>
        </label>
        <label>
        <b>All Rewards <img src='info.png' alt=""/></b>
        <p>550 <i>LOOP</i></p>
        </label>
        <label>
        <b>Total Locked</b>
        <p>100 <i>LP</i></p>
        </label>
        <label>
        <b>Percent left</b>
        <p>85 <i>%</i></p>
        </label>
        </div>
        </div>
</div>
<div className='nftRightChild'>
        <span>
        <img src="nftImage.png" alt=""/>
        </span>
        <div className='mynftHub'>
        <div className='mynftHubHedare'>
        <label><img src="fav.png" alt=""/> LOOP-aUST LP NFT</label>
        <div className='nftButtons'>
        <button className='stakeNft'><img src="stake.png" alt=""/> STAKE</button>
        <button><img src="sell.png" alt=""/> SELL</button>
        </div>
        </div>

        <div className='nftData'>
        <label>
        <b>APR <img src='info.png' alt=""/></b>
        <p className='nftSky'>208.07 <i>%</i></p>
        </label>
        <label>
        <b>Next Payout</b>
        <p  className='nftSky'>100 <i>LOOP</i></p>
        </label>
        <label>
        <b>LP Value</b>
        <p>500 <i>UST</i></p>
        </label>
        <label>
        <b>Days Left</b>
        <p>78</p>
        </label>
        <label>
        <b>Days Staked </b>
        <p>12</p>
        </label>
        <label>
        <b>All Rewards <img src='info.png' alt=""/></b>
        <p>550 <i>LOOP</i></p>
        </label>
        <label>
        <b>Total Locked</b>
        <p>100 <i>LP</i></p>
        </label>
        <label>
        <b>Percent left</b>
        <p>85 <i>%</i></p>
        </label>
        </div>
        </div>
</div>

<div className='nftRightChild'>
        <span>
        <img src="nftImage.png" alt=""/>
        </span>
        <div className='mynftHub'>
        <div className='mynftHubHedare'>
        <label><img src="fav.png" alt=""/> LOOP-aUST LP NFT</label>
        <div className='nftButtons'>
        <button className='stakeNft'><img src="stake.png" alt=""/> STAKE</button>
        <button><img src="sell.png" alt=""/> SELL</button>
        </div>
        </div>

        <div className='nftData'>
        <label>
        <b>APR <img src='info.png' alt=""/></b>
        <p className='nftSky'>208.07 <i>%</i></p>
        </label>
        <label>
        <b>Next Payout</b>
        <p  className='nftSky'>100 <i>LOOP</i></p>
        </label>
        <label>
        <b>LP Value</b>
        <p>500 <i>UST</i></p>
        </label>
        <label>
        <b>Days Left</b>
        <p>78</p>
        </label>
        <label>
        <b>Days Staked </b>
        <p>12</p>
        </label>
        <label>
        <b>All Rewards <img src='info.png' alt=""/></b>
        <p>550 <i>LOOP</i></p>
        </label>
        <label>
        <b>Total Locked</b>
        <p>100 <i>LP</i></p>
        </label>
        <label>
        <b>Percent left</b>
        <p>85 <i>%</i></p>
        </label>
        </div>
        </div>
</div>
</div>
</section>
  </div>
  <div className='graphingNft'>
<img src='graph.png' alt=""/>
  </div>

  <div className='otherNft'>
<h6>Other NFTs from your collection</h6>
<ul>
  <li>
    <a href="">
      <div className='nfImageHolder'>
      <img src='trendingPost16.png' alt=""/></div>
      <span>
        <label><b>LOOP-LOOPR LP</b> <p>Price: <i>5000</i> &nbsp;UST</p></label><label className='belowLabel'><p>Bucksta LP Lock</p></label></span>
      </a>
  </li>

  <li>
    <a href="">
      <div className='nfImageHolder'>
      <img src='trendingPost16.png' alt=""/></div>
      <span>
        <label><b>LOOP-LOOPR LP</b> <p>Price: <i>5000</i> &nbsp;UST</p></label><label className='belowLabel'><p>Bucksta LP Lock</p></label></span>
      </a>
  </li>

  <li>
    <a href="">
      <div className='nfImageHolder'>
      <img src='trendingPost16.png' alt=""/></div>
      <span>
        <label><b>LOOP-LOOPR LP</b> <p>Price: <i>5000</i> &nbsp;UST</p></label><label className='belowLabel'><p>Bucksta LP Lock</p></label></span>
      </a>
  </li>

  <li>
    <a href="">
      <div className='nfImageHolder'>
      <img src='trendingPost16.png' alt=""/></div>
      <span>
        <label><b>LOOP-LOOPR LP</b> <p>Price: <i>5000</i> &nbsp;UST</p></label><label className='belowLabel'><p>Bucksta LP Lock</p></label></span>
      </a>
  </li>

  <li>
    <a href="">
      <div className='nfImageHolder'>
      <img src='trendingPost16.png' alt=""/></div>
      <span>
        <label><b>LOOP-LOOPR LP</b> <p>Price: <i>5000</i> &nbsp;UST</p></label><label className='belowLabel'><p>Bucksta LP Lock</p></label></span>
      </a>
  </li>

  <li>
    <a href="">
      <div className='nfImageHolder'>
      <img src='trendingPost16.png' alt=""/></div>
      <span>
        <label><b>LOOP-LOOPR LP</b> <p>Price: <i>5000</i> &nbsp;UST</p></label><label className='belowLabel'><p>Bucksta LP Lock</p></label></span>
      </a>
  </li>
</ul>
    </div>
              </div>
            </div>
          </div>
        }
      </div>
      <NftFooter />
    </>
  );
};

export default MyNft;
