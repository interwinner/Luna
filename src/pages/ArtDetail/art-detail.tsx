import { useState } from 'react';
import NftFooter from '../Nft/NftFooter';
import NftHeader from '../Nft/NftHeader';
import SwiperCore, {
  Navigation,
  Scrollbar,
  Pagination,
  Autoplay,
} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/components/pagination/pagination.min.css';

const ArtDetail = (props: any) => {
  SwiperCore.use([Navigation, Scrollbar, Pagination, Autoplay]);
  const [sidebarActive, setSidebar] = useState(false);
  const handleSidebar = (status: any) => {
    setSidebar(status);
  };

  function handleSearch(e: any) {
    if (e.key === 'Enter' && e.target.value)
      props.history.push({
        pathname: '/nftExplore',
        state: { search: e.target.value },
      });
  }
  const [creations, setCreations] = useState(true);
  const [creationsOne, setCreationOne] = useState(false);
  const [myStyleRL, setmyStyleRL] = useState({display: "block"});
  const [myStyleAG, setmyStyleAG] = useState({display: "none"});
  function topCreations(x:any){
    
    if(x == 1){
     
      setCreations(true);
      setCreationOne(false);
      setmyStyleRL({display: "block"});
      setmyStyleAG({display: "none"});
      
    } else{
     
      setCreations(false);
      setCreationOne(true);
      setmyStyleRL({display: "none"});
      setmyStyleAG({display: "block"});
    } 
   
  }

  return (
    <div className='nftMain'>
      <NftHeader handleSidebar={handleSidebar} />
      <div className='topCreationDetails artDetailset'>
      <div className='wrapper'>
<div className='headerBack'><a href="/artist-detail">Back</a></div>
<div className='topCreationDetailsHub baseline'>
  <div className='topCreationLeft'>
  <div className='topCreationLeftNames'>
      <h6>Pink Zombie From Future</h6>
</div>
<div className='topCreationLeftFollowers'>
<ul>
  <li><a href="/artist-detail">
  <span className='artImage'><img src='/lunartImages/topartist.png' alt="images"/></span>
    <h6>Digital Artist<p>Venom Jones</p></h6>
  </a></li>
  <li>
  <button className='activeTopResult'><img src='/lunartImages/NotLiked.svg' alt="images"/><img src='/lunartImages/Liked.svg' alt="images"/></button>
    <h6>Likes<p>3,517</p></h6>
  </li>
  <li>
  <button><img src='/lunartImages/NotSuperliked.svg' alt="images"/><img src='/lunartImages/SuperLiked.svg' alt="images"/></button>
    <h6>Super-Likes<p>2,000</p></h6>
  </li>
</ul>
<p>Jacob Jones Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles living on the Ethereum blockchain. Your Bored Ape doubles as your Yacht Club membership card, and grants access to members-only benefits, the first of which is access to THE BATHROOM, a collaborative graffiti board. Future areas and perks can be unlocked by the community through roadmap activation. Visit www.BoredApeYachtClub.com for more details.</p>
</div>
<ul>
    <li>
        <label>Color</label> Purple, Pink
    </li>
    <li>
        <label>Sample</label> Text
    </li>
    <li>
        <label>Dummy Info</label> Text
    </li>
    <li>
        <label>Sample Info</label> Text with Text
    </li>
</ul>
  </div>
  <div className='topCreationRight'>
    <span><img src="/lunartImages/p5.png" alt=""/></span>
    <button>
    <img src="/lunartImages/lock.png" alt="images"/>Unlockable 8k File
    </button>
  </div>
</div>
        </div>
      </div>
      <div className='launchpadArtistsInner artDetailset'>
          <div className='wrapper'>
            <h2><b>More from </b>
            <span>Collection</span><a href="/artist">View Full Collection</a></h2>
            <div className='tagsProducts'>
              <ul className='gallerySet'>
              <Swiper
        slidesPerView="auto"
        spaceBetween={20}
        loopedSlides={1}
        navigation
        loop
        autoplay={{ delay: 7000 }}
        className='feedSwiper'
        slideToClickedSlide
                    >
                        <SwiperSlide>
                <li>
                <a href="/collection-detail">
                  <div className='tagsProductsHeader'>
                    <h5>Pink Evening Sunset<b>Digital Art</b></h5>
                    <span><img src="/lunartImages/terra-luna.png" alt=""/> 80</span>
                  </div>
                  <div className='tagsImage'>
                    <img src="/lunartImages/imgSet.png" alt=""/>
                  </div>
                  <div className='tagsFooter'>
                    <ul>
                      <li><img src='/lunartImages/tagsFrvt.png' alt=""/> 770 <b>Likes</b></li>
                      <li><img src='/lunartImages/tagsuperLikes.png' alt=""/> 10 <b>Super-Likes</b></li>
                      <li className='tagsTimer'><img src='/lunartImages/tagsTimer.png' alt=""/> 09:17:03</li>
                    </ul>
                  </div>
                  </a>
                </li>
                </SwiperSlide>

                <SwiperSlide>
                <li>
                <a href="/collection-detail">
                  <div className='tagsProductsHeader'>
                    <h5>Pink Evening Sunset<b>Digital Art</b></h5>
                    <span><img src="/lunartImages/terra-luna.png" alt=""/> 80</span>
                  </div>
                  <div className='tagsImage'>
                    <img src="/lunartImages/imgSet.png" alt=""/>
                  </div>
                  <div className='tagsFooter'>
                    <ul>
                      <li><img src='/lunartImages/tagsFrvt.png' alt=""/> 770 <b>Likes</b></li>
                      <li><img src='/lunartImages/tagsuperLikes.png' alt=""/> 10 <b>Super-Likes</b></li>
                      <li className='tagsTimer'><img src='/lunartImages/tagsTimer.png' alt=""/> 09:17:03</li>
                    </ul>
                  </div>
                  </a>
                </li>
                </SwiperSlide>

                <SwiperSlide>
                <li>
                <a href="/collection-detail">
                  <div className='tagsProductsHeader'>
                    <h5>Pink Evening Sunset<b>Digital Art</b></h5>
                    <span><img src="/lunartImages/terra-luna.png" alt=""/> 80</span>
                  </div>
                  <div className='tagsImage'>
                    <img src="/lunartImages/imgSet.png" alt=""/>
                  </div>
                  <div className='tagsFooter'>
                    <ul>
                      <li><img src='/lunartImages/tagsFrvt.png' alt=""/> 770 <b>Likes</b></li>
                      <li><img src='/lunartImages/tagsuperLikes.png' alt=""/> 10 <b>Super-Likes</b></li>
                      <li className='tagsTimer'><img src='/lunartImages/tagsTimer.png' alt=""/> 09:17:03</li>
                    </ul>
                  </div>
                  </a>
                </li>
                </SwiperSlide>

                <SwiperSlide>
                <li>
                <a href="/collection-detail">
                  <div className='tagsProductsHeader'>
                    <h5>Pink Evening Sunset<b>Digital Art</b></h5>
                    <span><img src="/lunartImages/terra-luna.png" alt=""/> 80</span>
                  </div>
                  <div className='tagsImage'>
                    <img src="/lunartImages/imgSet.png" alt=""/>
                  </div>
                  <div className='tagsFooter'>
                    <ul>
                      <li><img src='/lunartImages/tagsFrvt.png' alt=""/> 770 <b>Likes</b></li>
                      <li><img src='/lunartImages/tagsuperLikes.png' alt=""/> 10 <b>Super-Likes</b></li>
                      <li className='tagsTimer'><img src='/lunartImages/tagsTimer.png' alt=""/> 09:17:03</li>
                    </ul>
                  </div>
                  </a>
                </li>
                </SwiperSlide>

                <SwiperSlide>
                <li>
                <a href="/collection-detail">
                  <div className='tagsProductsHeader'>
                    <h5>Pink Evening Sunset<b>Digital Art</b></h5>
                    <span><img src="/lunartImages/terra-luna.png" alt=""/> 80</span>
                  </div>
                  <div className='tagsImage'>
                    <img src="/lunartImages/imgSet.png" alt=""/>
                  </div>
                  <div className='tagsFooter'>
                    <ul>
                      <li><img src='/lunartImages/tagsFrvt.png' alt=""/> 770 <b>Likes</b></li>
                      <li><img src='/lunartImages/tagsuperLikes.png' alt=""/> 10 <b>Super-Likes</b></li>
                      <li className='tagsTimer'><img src='/lunartImages/tagsTimer.png' alt=""/> 09:17:03</li>
                    </ul>
                  </div>
                  </a>
                </li>
                </SwiperSlide>
                </Swiper>
                </ul>
                </div>
            
            </div>
            </div>
            <div className='launchpadArtistsInner artDetailset similarArts'>
          <div className='wrapper'>
            <h2><span>Similar Arts</span></h2>
            <div className='tagsProducts'>
              <ul className='gallerySet'>
              <Swiper
        slidesPerView="auto"
        spaceBetween={20}
        loopedSlides={1}
        navigation
        loop
        autoplay={{ delay: 7000 }}
        className='feedSwiper'
        slideToClickedSlide
                    >
                        <SwiperSlide>
                <li>
                <a href="/collection-detail">
                  <div className='tagsProductsHeader'>
                    <h5>Pink Evening Sunset<b>Digital Art</b></h5>
                    <span><img src="/lunartImages/terra-luna.png" alt=""/> 80</span>
                  </div>
                  <div className='tagsImage'>
                    <img src="/lunartImages/imgSet.png" alt=""/>
                  </div>
                  <div className='tagsFooter'>
                    <ul>
                      <li><img src='/lunartImages/tagsFrvt.png' alt=""/> 770 <b>Likes</b></li>
                      <li><img src='/lunartImages/tagsuperLikes.png' alt=""/> 10 <b>Super-Likes</b></li>
                      <li className='tagsTimer'><img src='/lunartImages/tagsTimer.png' alt=""/> 09:17:03</li>
                    </ul>
                  </div>
                  </a>
                </li>
                </SwiperSlide>

                <SwiperSlide>
                <li>
                <a href="/collection-detail">
                  <div className='tagsProductsHeader'>
                    <h5>Pink Evening Sunset<b>Digital Art</b></h5>
                    <span><img src="/lunartImages/terra-luna.png" alt=""/> 80</span>
                  </div>
                  <div className='tagsImage'>
                    <img src="/lunartImages/imgSet.png" alt=""/>
                  </div>
                  <div className='tagsFooter'>
                    <ul>
                      <li><img src='/lunartImages/tagsFrvt.png' alt=""/> 770 <b>Likes</b></li>
                      <li><img src='/lunartImages/tagsuperLikes.png' alt=""/> 10 <b>Super-Likes</b></li>
                      <li className='tagsTimer'><img src='/lunartImages/tagsTimer.png' alt=""/> 09:17:03</li>
                    </ul>
                  </div>
                  </a>
                </li>
                </SwiperSlide>

                <SwiperSlide>
                <li>
                <a href="/collection-detail">
                  <div className='tagsProductsHeader'>
                    <h5>Pink Evening Sunset<b>Digital Art</b></h5>
                    <span><img src="/lunartImages/terra-luna.png" alt=""/> 80</span>
                  </div>
                  <div className='tagsImage'>
                    <img src="/lunartImages/imgSet.png" alt=""/>
                  </div>
                  <div className='tagsFooter'>
                    <ul>
                      <li><img src='/lunartImages/tagsFrvt.png' alt=""/> 770 <b>Likes</b></li>
                      <li><img src='/lunartImages/tagsuperLikes.png' alt=""/> 10 <b>Super-Likes</b></li>
                      <li className='tagsTimer'><img src='/lunartImages/tagsTimer.png' alt=""/> 09:17:03</li>
                    </ul>
                  </div>
                  </a>
                </li>
                </SwiperSlide>

                <SwiperSlide>
                <li>
                <a href="/collection-detail">
                  <div className='tagsProductsHeader'>
                    <h5>Pink Evening Sunset<b>Digital Art</b></h5>
                    <span><img src="/lunartImages/terra-luna.png" alt=""/> 80</span>
                  </div>
                  <div className='tagsImage'>
                    <img src="/lunartImages/imgSet.png" alt=""/>
                  </div>
                  <div className='tagsFooter'>
                    <ul>
                      <li><img src='/lunartImages/tagsFrvt.png' alt=""/> 770 <b>Likes</b></li>
                      <li><img src='/lunartImages/tagsuperLikes.png' alt=""/> 10 <b>Super-Likes</b></li>
                      <li className='tagsTimer'><img src='/lunartImages/tagsTimer.png' alt=""/> 09:17:03</li>
                    </ul>
                  </div>
                  </a>
                </li>
                </SwiperSlide>

                <SwiperSlide>
                <li>
                <a href="/collection-detail">
                  <div className='tagsProductsHeader'>
                    <h5>Pink Evening Sunset<b>Digital Art</b></h5>
                    <span><img src="/lunartImages/terra-luna.png" alt=""/> 80</span>
                  </div>
                  <div className='tagsImage'>
                    <img src="/lunartImages/imgSet.png" alt=""/>
                  </div>
                  <div className='tagsFooter'>
                    <ul>
                      <li><img src='/lunartImages/tagsFrvt.png' alt=""/> 770 <b>Likes</b></li>
                      <li><img src='/lunartImages/tagsuperLikes.png' alt=""/> 10 <b>Super-Likes</b></li>
                      <li className='tagsTimer'><img src='/lunartImages/tagsTimer.png' alt=""/> 09:17:03</li>
                    </ul>
                  </div>
                  </a>
                </li>
                </SwiperSlide>
                </Swiper>
                </ul>
                </div>
            
            </div>
            </div>
        <NftFooter />
      </div>
  );
};

export default ArtDetail;
