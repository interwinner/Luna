import React, { useState } from 'react';
import './burn.scss';
import { useTerraWebapp } from 'hooks/context';
import NftFooter from '../Nft/NftFooter';
// import NftPromotedSection from '../Nft/NftExplore';
// import NftTrending from '../NftTrending';
import NftHeader from '../Nft/NftHeader';
import SwiperCore, {
  Navigation,
  Scrollbar,
  Pagination,
  Autoplay,
} from 'swiper';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/components/pagination/pagination.min.css';
import FireIcon from '../../assets/icons/fire.svg'
import FireImage from '../../assets/images/fire.png'
import RewardIcon from '../../assets/icons/rewards.svg'
import UstIcon from '../../assets/icons/Ust-bg.svg'
import DiscountIcon from '../../assets/icons/discount.svg'

const SpecialBurnPage: React.FC = (props: any) => {
  const { connect, balances } = useTerraWebapp();
  const [sidebarActive, setSidebar] = useState(false);
  SwiperCore.use([Navigation, Scrollbar, Pagination, Autoplay]);
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

  return (
    <>
      <div className='nftMain'>
        <NftHeader handleSidebar={handleSidebar} />
        <div className="BurnContainer" id='burnPage'>
          <div>
            <img src={FireIcon}  alt="icons"/>
          </div>
          <div className="">
            <p className='heading-title'>Special Burn!</p>
            <p className='heading-sub'>In order to celebrate our launch, we are realeasing a special edition <br /> LunArt ARTS burn NFT! Secure your Below:</p>
          </div>


          <div className="burnCard">
            <div className="burnImage">
              <img src={FireImage} alt="icons"/>
              <div className='imageTag'>
                <p>
                  <img src={RewardIcon} alt="icons"/>
                  6166</p>
              </div>
            </div>



            <div className="burnDetail">
              <div className="Head">
                <p className="title">Wild Light Burning</p>
                <p className="offer"><img src={DiscountIcon} alt="icons"/>First 1,000 get discount</p>
              </div>
              <div className="horizontalRule" >
                <span>&nbsp;</span>
              </div>

              <ul className="lightburnDetails">
                <li className="firstChild">
                  <span className="property">Minted </span>
                  <span className="value">500<span>/3,000</span> </span>

                </li>
                <li> 
                  <span className="property">face value </span>
                  <span className="value">$111 </span>

                </li>
                <li>
                  <span className="property">UST Yield </span>
                  <span className="value"> <img src={UstIcon} alt="icons"/>$17 </span>

                </li>
                <li>
                  <span className="property">ARTS Yield </span>
                  <span className="value"><img className="borderedIcon" src={RewardIcon} alt="icons"/>666 </span>

                </li>

                <li>
                  <span className="property">Price </span>
                  <span className="value"><span className="striked">6166</span><img className="borderedIcon"  src={RewardIcon} alt="icons"/>5800 </span>

                </li>
              </ul>

              <hr />
              <div className="buttonRow">
                <div className="Quantity">
                  <button>-</button>
                  <input type="text" placeholder='0'/>
                  <button>+</button>
                </div>
                <button className="MintButton">Mint Now</button>
              </div>
            </div>



          </div>

        </div>
        <NftFooter />
      </div>
    </>
  )
}



export default SpecialBurnPage;