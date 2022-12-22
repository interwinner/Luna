import React, { useEffect, useState } from 'react';
import { useTerraWebapp } from 'hooks/context';
import NftFooter from '../NftFooter';
import NftPromotedSection from './NftPromotedSection';
import NftHeader from '../NftHeader';
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

const NftWelcome: React.FC = (props: any) => {
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
    <div className='nftMain'>
      <NftHeader handleSidebar={handleSidebar} />
      <div className={sidebarActive ? 'sidebarActiveBg' : ''}>
        {/* Banner Section */}
        <div className='discoverBanner'>
          <div className='bannerText'>
            <div className='wrapper'>
              <div className='lunaBanner'>
                <div className='lunaBannerLeft'>
<h6>Discover <br></br>Amazing <br></br><b>Artists </b></h6>
<p>Hidden deep inside the mathematical intricacies of imaginary numbers are fractals of stunning beauty.
LunArt pushes the boundaries of what 
can be done with these numbers.</p>
<a href="/artist">Discover Artists <img src='/lunartImages/rightArrow.svg' alt="images"/></a>
                </div>
                <div className='lunaBannerMiddle'>
                  <img src='/lunartImages/graphic.png' alt="image"/>
                </div>
                <div className='lunaBannerRight'>
                  <ul>
                    <li>Artists<b>1,854</b></li>
                    <li>Arts<b>1.8M+</b></li>
                    <li>Total Value<b>27.8M</b></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='specialGrdnt'>
        <NftPromotedSection />
        {/* Categories Section */}
          <div className='specialBurn'>
            <div className='wrapper'>
            <div className='specialBurnInner'>
            <img src='/lunartImages/specialBurnBg.svg' alt=""/>
            <div className='specialBurnHub'>
            <span><img src='/lunartImages/specialBurn.png' alt=""/></span>
            <section>
            <h6>Special Burn!</h6>
            <p>In order to celebrate our launch, we are realeasing a special edition LunArt ARTS burn NFT! Secure your Below:</p>
            <a href="/burn">Learn more <img src='/lunartImages/arrowRightBlack.svg'/></a>
            </section>
            <span><img src='/lunartImages/specialBurnZigZag.png' alt=""/></span>
            </div>
            </div>
            </div>
          </div>
          </div>
          <div className='leaderBoard'>
            <div className='wrapper'>
            <div className='leaderBoardInner'>
            <div className='leaderBoardHeader'>
              <span><img src='/lunartImages/trophyArtist.png' alt=""/></span>
              <h6>Artist Leaderboard<b>Ranking of artist based on followers and likes</b></h6>
            </div>
            <div className='rankingLeaderboard'>
              <section><a className='rankActive'>Weekly</a><a>All Time</a><a>Moving Up</a><p>Last Updated: <b>1 min ago</b></p></section>
              <div className='leaderTable'>
              <table>
                <tr>
                  <th>RANK</th>
                  <th>Artist</th>
                  <th>Genere</th>
                  <th>Likes</th>
                  <th>Followers</th>
                  <th>Lunart Superlikes</th>
                </tr>
              <tr>
                <td><img src='/lunartImages/1.png'/></td>
                <td><b><a><img src="lunartImages/profile1.png"/> Ralph Edwards <span><img className='artistLink' src="lunartImages/arrowDigonal.png"/></span></a></b></td>
                <td><a>Painter <span><span><img className='artistLink' src="lunartImages/arrowDigonal.png"/></span></span></a></td>
                <td>13671</td>
                <td>653518</td>
                <td>6065</td>
                </tr>  
                <tr>
                <td><img src='/lunartImages/2.png'/></td>
                <td><b><a><img src="lunartImages/profile1.png"/> Ralph Edwards <span><span><img className='artistLink' src="lunartImages/arrowDigonal.png"/></span></span></a></b></td>
                <td><a>Painter <span><span><img className='artistLink' src="lunartImages/arrowDigonal.png"/></span></span></a></td>
                <td>13671</td>
                <td>653518</td>
                <td>6065</td>
                </tr>  
                <tr>
                <td><img src='/lunartImages/3.png'/></td>
                <td><b><a><img src="lunartImages/profile1.png"/> Ralph Edwards <span><span><img className='artistLink' src="lunartImages/arrowDigonal.png"/></span></span></a></b></td>
                <td><a>Painter <span><span><img className='artistLink' src="lunartImages/arrowDigonal.png"/></span></span></a></td>
                <td>13671</td>
                <td>653518</td>
                <td>6065</td>
                </tr>  
                <tr>
                <td>4</td>
                <td><b><a><img src="lunartImages/profile1.png"/> Ralph Edwards <span><span><img className='artistLink' src="lunartImages/arrowDigonal.png"/></span></span></a></b></td>
                <td><a>Painter <span><span><img className='artistLink' src="lunartImages/arrowDigonal.png"/></span></span></a></td>
                <td>13671</td>
                <td>653518</td>
                <td>6065</td>
                </tr>  
                <tr>
                <td>5</td>
                <td><b><a><img src="lunartImages/profile1.png"/> Ralph Edwards <span><span><img className='artistLink' src="lunartImages/arrowDigonal.png"/></span></span></a></b></td>
                <td><a>Painter <span><span><img className='artistLink' src="lunartImages/arrowDigonal.png"/></span></span></a></td>
                <td>13671</td>
                <td>653518</td>
                <td>6065</td>
                </tr>  
                <tr>
                <td>6</td>
                <td><b><a><img src="lunartImages/profile1.png"/> Ralph Edwards <span><span><img className='artistLink' src="lunartImages/arrowDigonal.png"/></span></span></a></b></td>
                <td><a>Painter <span><span><img className='artistLink' src="lunartImages/arrowDigonal.png"/></span></span></a></td>
                <td>13671</td>
                <td>653518</td>
                <td>6065</td>
                </tr>  
                <tr>
                <td>7</td>
                <td><b><a><img src="lunartImages/profile1.png"/> Ralph Edwards <span><span><img className='artistLink' src="lunartImages/arrowDigonal.png"/></span></span></a></b></td>
                <td><a>Painter <span><span><img className='artistLink' src="lunartImages/arrowDigonal.png"/></span></span></a></td>
                <td>13671</td>
                <td>653518</td>
                <td>6065</td>
                </tr>  
                <tr>
                <td>8</td>
                <td><b><a><img src="lunartImages/profile1.png"/> Ralph Edwards <span><span><img className='artistLink' src="lunartImages/arrowDigonal.png"/></span></span></a></b></td>
                <td><a>Painter <span><span><img className='artistLink' src="lunartImages/arrowDigonal.png"/></span></span></a></td>
                <td>13671</td>
                <td>653518</td>
                <td>6065</td>
                </tr>  
                <tr>
                <td>9</td>
                <td><b><a><img src="lunartImages/profile1.png"/> Ralph Edwards <span><span><img className='artistLink' src="lunartImages/arrowDigonal.png"/></span></span></a></b></td>
                <td><a>Painter <span><span><img className='artistLink' src="lunartImages/arrowDigonal.png"/></span></span></a></td>
                <td>13671</td>
                <td>653518</td>
                <td>6065</td>
                </tr>  
                <tr>
                <td>10</td>
                <td><b><a><img src="lunartImages/profile1.png"/> Ralph Edwards <span><span><img className='artistLink' src="lunartImages/arrowDigonal.png"/></span></span></a></b></td>
                <td><a>Painter <span><span><img className='artistLink' src="lunartImages/arrowDigonal.png"/></span></span></a></td>
                <td>13671</td>
                <td>653518</td>
                <td>6065</td>
                </tr>  
              </table>
              <div className='viewMoreArt'>
                <a>View more <span><img src='/lunartImages/rightArrow.svg' alt=""/></span></a>
              </div>
              </div>
            </div>
              </div>
              </div>
              </div> 
        <NftFooter />
      </div>
    </div>
  );
};

export default NftWelcome;
