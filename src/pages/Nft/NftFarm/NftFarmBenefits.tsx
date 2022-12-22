import { useState } from 'react';

const benefits = [
  {
    title: 'Increased APR',
    description:
      'Earn the highest yield possible',
    image: 'b1.png',
  },
  {
    title: 'Easily Tradable',
    description:
      'Your farm position is now easily tradable',
    image: 'b2.png',
  },
  {
    title: 'Guaranteed Yield',
    description:
      'Lock in the yield, know what you will receive daily and for how many days',
    image: 'b3.png',
  },
  {
    title: 'Easily Customisable',
    description:
      'Go through the 5 steps below to mint your LP NFT now!',
    image: 'b4.png',
  },
];
const NftFarmBenefits = () => {
  const [nftBenefits] = useState(benefits);
  return (
    <div className='nftBenefitsHold trending'>
      <div className='wrapper'>
        <div className='nftBenefits'>
          <h2>Benefits of NFT LP Bonds</h2>
          <div className='nftBenefitBlockHold'>
            {nftBenefits.length > 0 &&
              nftBenefits.map((item, index) => (
                <div key={index} className='nftBenefitBlock'>
                  <div className='nftBenefitImage'><img src={item.image}/></div>
                  <div className='nftBenefitContent'>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default NftFarmBenefits;
