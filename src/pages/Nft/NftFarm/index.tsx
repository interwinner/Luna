import { useState } from 'react';
import { Helmet } from 'react-helmet';

import NftFooter from '../NftFooter';
import NftHeader from '../NftHeader';
import NftFarmBenefits from './NftFarmBenefits';
import NftFarmBonds from './NftFarmBonds';

const NftFarm = () => {
  const [sidebarActive, setSidebar] = useState(false);
  const handleSidebar = (status: any) => {
    setSidebar(status);
  };
  return (
    <>
      <Helmet>
        <title>NFT | Farm</title>
      </Helmet>
      <div className='nftFarmMain'>
        <NftHeader handleSidebar={handleSidebar} />
        <div className='trending'>
          <div className='wrapper'>
            <div className='farmBlockHead'>
              <div className='farmBlockHeadControl'>
                <p className='learnMore'>Learn more about:</p>
                <h2>NFT LP Bonds vs Farming</h2>
                <p>
                  Turn any NFT into a high yield asset backed NFT with true
                  utility &amp; value
                </p>
              </div>
              <div className='videoFarmFeatured'>
                <video poster='/farmFeatured.jpg'></video>
                <img className='videoPlayBtn' src='/videoPlayBtn.svg' alt='' />
              </div>
            </div>
          </div>
        </div>
        <NftFarmBenefits />
        <NftFarmBonds />
        <NftFooter />
      </div>
    </>
  );
};

export default NftFarm;
