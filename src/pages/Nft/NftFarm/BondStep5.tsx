import React from 'react';

const BondStep5 = (props: any) => {
  return (
    <>
      <div className='mintBondContain noneDsiplay'>
        <div className='mintBondHoldLeft'>
          <div className='trendingInfo'>
            <ul className='trendingInfoGrid'>
              {props.postsToShow.length > 0 &&
                props.postsToShow.map((postObj: any, index: any) => (
                  <li key={index}>
                    <div className='imageHolder'>
                      <img src={'/' + postObj.img} alt={postObj.img} />
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <div className='ustMint'>
            <h3>
              <img src='/fav.png' alt='' /> LOOP-UST LP NFT
            </h3>
          </div>
        </div>

        <div className='mintBondHoldRight'>
          <div className='ustMint'>
            <h3>
              <img src='/fav.png' alt='' /> LOOP-UST LP NFT
            </h3>
          </div>
          <ul className='payout'>
            <li>
              <p className='head'>
                APR <img src='/iconsInfo.svg' alt='' />
              </p>
              <p>
                <span className='complete'>208.07</span> %
              </p>
            </li>
            <li>
              <p className='head'>Next Payout</p>
              <p>
                <span className='complete'>100</span> LOOP
              </p>
            </li>
            <li>
              <p className='head'>LP Value</p>
              <p>
                <span>500</span> UST
              </p>
            </li>
            <li>
              <p className='head'>Days Left</p>
              <p>
                <span>78</span>
              </p>
            </li>
            <li>
              <p className='head'>Days Staked</p>
              <p>
                <span>12</span>
              </p>
            </li>
            <li>
              <p className='head'>All Rewards</p>
              <p>
                <span>550</span> LOOP
              </p>
            </li>
            <li>
              <p className='head'>Percent left</p>
              <p>
                <span>100</span> %
              </p>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default BondStep5;
