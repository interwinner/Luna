import React from 'react';

const Sidebar = (props: any) => {
  const state = props.state;
  return (
    <>
     <div className='trendingNewMenu alside'>
              <ul>
                  <li  className='trendingActiveMenu'><a href="/nftExplore"><span><img src='/m1.svg' alt='menu' /><img src='/m1a.svg' alt='menu' /></span> Marketplace</a></li>
                  <li><a href="/launchpad"><span><img src='/m2.svg' alt='menu' /><img src='/m2a.svg' alt='menu' /></span> Launchpad</a></li>
                  <li><a href="/collections"><span><img src='/m3.svg' alt='menu' /><img src='/m3a.svg' alt='menu' /></span> Collections</a></li>
                  <li><a href="/nftFarm"><span><img src='/m5.svg' alt='menu' /><img src='/m5a.svg' alt='menu' /></span> Minting Studio</a></li>
                </ul>
                <ul>
                  <li><a href="/myNft"><span><img src='/m5.svg' alt='menu' /><img src='/m5a.svg' alt='menu' /></span> My NFTs</a></li>
                  <li><a href=""><span><img src='/m8.svg' alt='menu' /><img src='/m8a.svg' alt='menu' /></span> Log Out</a></li>
                </ul>
              </div>
    </>
  );
};
export default Sidebar;
