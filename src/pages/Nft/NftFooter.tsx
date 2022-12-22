import React from 'react';

const NftFooter = () => {
  return (
    <>
      <div id='footerId' className='footer'>
        <div className='wrapper'>
          <div className='footerInner'>
            <div className='footerPrimary'>
              <a className='footerLogo' href='/'>
                <img src='/lunartImages/lunartLogo.svg' alt='' />
              </a>
              {/* <h3>World's First NFT Fixed Yield Bond Marketplace</h3> */}
              <p>Hidden deep inside the mathematical intricacies of imaginary numbers
are fractals of stunning beauty.
LunArt pushes the boundaries of what can be done with these numbers.</p>
              <ul>
                <li>
                  <a target="_blank" href=''>
                    <img src='/na.svg' alt='social' />
                  </a>
                </li>
                <li>
                <a target="_blank" href=''>
                    <img src='/Ni.svg' alt='social' />
                  </a>
                </li>
                <li>
                <a target="_blank" href=''>
                    <img src='/nc.svg' alt='social' />
                  </a>
                </li>
               
              </ul>
            </div>
            <div className='footerSecondary'>
              <div className='footerSecondary1'>
                <ul>
                  <li>About</li>
                  <li><a href="">LunArt NFT</a></li>
                  <li><a href="">Investors</a></li>
                  <li><a href="">FAQs</a></li>
                  <li><a href="">Terms of  services</a></li>
                </ul>
              </div>
              <div className='footerSecondary1'>
                <ul>
                  <li>Partnership</li>
                  <li><a href="">Angel Protocol</a></li>
                  <li><a href="">LOOP Finance</a></li>
                  <li><a href="">Levana Protocol</a></li>
                  <li><a href="">Astroverse NFT</a></li>
                </ul>
              </div>
              <div className='footerSecondary1'>
                <ul>
                  <li>Marketplace</li>
                  <li><a href="">Knowhere</a></li>
                  <li><a href="">RandomEarth</a></li>
                </ul>
              </div>
            </div>
          </div>
          <span>Copyright © LunArt 2021</span>
        </div>
      </div>
    </>
  );
};

export default NftFooter;
