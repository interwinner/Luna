import { useState } from 'react';
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
import NftFooter from '../Nft/NftFooter';
import NftHeader from '../Nft/NftHeader';

const Collections = (props: any) => {
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

  return (
    <div className='nftMain'>
      <NftHeader handleSidebar={handleSidebar} />
      <div className='artistHub'>
          <div className='wrapper'>            
        <div className='artistInner'>
          <div className='artistInnerHeader'>
            <section>
              <img src='/lunartImages/search.png'/>
              <input placeholder='Search Collection' type="text"/>
            </section>
            <div className='mostTags'>
              <div className='mostDropdown'>
                <span>Newest <b></b></span>
                <ul><li><a href="">Top</a></li><li><a href="">New</a></li><li><a href="">Oldest</a></li></ul>
              </div>
              <div className='tagsSlider'>
                <ul>
                <Swiper
              slidesPerView="auto"
              loopedSlides={1}
              navigation
              loop
              autoplay={{ delay: 7000 }}
              className='feedSwiper'
              slideToClickedSlide
                          >
                   <SwiperSlide><li className='tagsActive'><a href="">All</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">2D Artist</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">Painter</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">Photographer</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">Sketcher</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">Digital Artist</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">3D Artist</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">Oil Painter</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">2D Artist</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">Gaming</a></li></SwiperSlide> 
                   <SwiperSlide><li><a href="">Painter</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">Photographer</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">Sketcher</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">Digital Artist</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">3D Artist</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">Oil Painter</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">Gaming</a></li></SwiperSlide>
                  </Swiper>
                </ul>
              </div>
            </div>
          </div>
          <div className='launchpadArtists'>
        <div className='wrapper'>
          <div className='launchpadArtistsInner'>
              <div className='launchpadArtistsSlider'>
                 <div className='launchpadArtistsSliderInner collectionStart'>
                    <a href="/collection-detail">
                    <div className='artistPainting'>
                    <span><img src='/lunartImages/collection.png' alt=""/></span>
                    <ul>
                    <li><img src='/lunartImages/c1.png' alt=""/></li>
                    <li className='collectionsCounter'><img src='/lunartImages/c2.png' alt=""/><b>+55K</b></li>
                    </ul>
                    </div>
                    <div className='artistHeader'>
                      <span><img src='/lunartImages/cUser.png' alt=""/></span>
                      <label>SYN CITY: Limited Blueprint<b>Jacob Jones</b></label>
                      <section><img src='/lunartImages/fvrtCollection.png'/></section>
                    </div>
                    <p>The Blueprint owners will be able to acquire in-game assets. These will form the foundation of the in-game assets by providing incentives and perks within the SYN CITY ecosystem.</p>
                    </a>
                  </div>

                  <div className='launchpadArtistsSliderInner collectionStart'>
                    <a href="/collection-detail">
                    <div className='artistPainting'>
                    <span><img src='/lunartImages/collection.png' alt=""/></span>
                    <ul>
                    <li><img src='/lunartImages/c1.png' alt=""/></li>
                    <li className='collectionsCounter'><img src='/lunartImages/c2.png' alt=""/><b>+55K</b></li>
                    </ul>
                    </div>
                    <div className='artistHeader'>
                      <span><img src='/lunartImages/cUser.png' alt=""/></span>
                      <label>SYN CITY: Limited Blueprint<b>Jacob Jones</b></label>
                      <section><img src='/lunartImages/fvrtCollection.png'/></section>
                    </div>
                    <p>The Blueprint owners will be able to acquire in-game assets. These will form the foundation of the in-game assets by providing incentives and perks within the SYN CITY ecosystem.</p>
                    </a>
                  </div>

                  <div className='launchpadArtistsSliderInner collectionStart'>
                    <a href="/collection-detail">
                    <div className='artistPainting'>
                    <span><img src='/lunartImages/collection.png' alt=""/></span>
                    <ul>
                    <li><img src='/lunartImages/c1.png' alt=""/></li>
                    <li className='collectionsCounter'><img src='/lunartImages/c2.png' alt=""/><b>+55K</b></li>
                    </ul>
                    </div>
                    <div className='artistHeader'>
                      <span><img src='/lunartImages/cUser.png' alt=""/></span>
                      <label>SYN CITY: Limited Blueprint<b>Jacob Jones</b></label>
                      <section><img src='/lunartImages/fvrtCollection.png'/></section>
                    </div>
                    <p>The Blueprint owners will be able to acquire in-game assets. These will form the foundation of the in-game assets by providing incentives and perks within the SYN CITY ecosystem.</p>
                    </a>
                  </div>

                  <div className='launchpadArtistsSliderInner collectionStart'>
                    <a href="/collection-detail">
                    <div className='artistPainting'>
                    <span><img src='/lunartImages/collection.png' alt=""/></span>
                    <ul>
                    <li><img src='/lunartImages/c1.png' alt=""/></li>
                    <li className='collectionsCounter'><img src='/lunartImages/c2.png' alt=""/><b>+55K</b></li>
                    </ul>
                    </div>
                    <div className='artistHeader'>
                      <span><img src='/lunartImages/cUser.png' alt=""/></span>
                      <label>SYN CITY: Limited Blueprint<b>Jacob Jones</b></label>
                      <section><img src='/lunartImages/fvrtCollection.png'/></section>
                    </div>
                    <p>The Blueprint owners will be able to acquire in-game assets. These will form the foundation of the in-game assets by providing incentives and perks within the SYN CITY ecosystem.</p>
                    </a>
                  </div>

                  <div className='launchpadArtistsSliderInner collectionStart'>
                    <a href="/collection-detail">
                    <div className='artistPainting'>
                    <span><img src='/lunartImages/collection.png' alt=""/></span>
                    <ul>
                    <li><img src='/lunartImages/c1.png' alt=""/></li>
                    <li className='collectionsCounter'><img src='/lunartImages/c2.png' alt=""/><b>+55K</b></li>
                    </ul>
                    </div>
                    <div className='artistHeader'>
                      <span><img src='/lunartImages/cUser.png' alt=""/></span>
                      <label>SYN CITY: Limited Blueprint<b>Jacob Jones</b></label>
                      <section><img src='/lunartImages/fvrtCollection.png'/></section>
                    </div>
                    <p>The Blueprint owners will be able to acquire in-game assets. These will form the foundation of the in-game assets by providing incentives and perks within the SYN CITY ecosystem.</p>
                    </a>
                  </div>

                  <div className='launchpadArtistsSliderInner collectionStart'>
                    <a href="/collection-detail">
                    <div className='artistPainting'>
                    <span><img src='/lunartImages/collection.png' alt=""/></span>
                    <ul>
                    <li><img src='/lunartImages/c1.png' alt=""/></li>
                    <li className='collectionsCounter'><img src='/lunartImages/c2.png' alt=""/><b>+55K</b></li>
                    </ul>
                    </div>
                    <div className='artistHeader'>
                      <span><img src='/lunartImages/cUser.png' alt=""/></span>
                      <label>SYN CITY: Limited Blueprint<b>Jacob Jones</b></label>
                      <section><img src='/lunartImages/fvrtCollection.png'/></section>
                    </div>
                    <p>The Blueprint owners will be able to acquire in-game assets. These will form the foundation of the in-game assets by providing incentives and perks within the SYN CITY ecosystem.</p>
                    </a>
                  </div>

                  <div className='launchpadArtistsSliderInner collectionStart'>
                    <a href="/collection-detail">
                    <div className='artistPainting'>
                    <span><img src='/lunartImages/collection.png' alt=""/></span>
                    <ul>
                    <li><img src='/lunartImages/c1.png' alt=""/></li>
                    <li className='collectionsCounter'><img src='/lunartImages/c2.png' alt=""/><b>+55K</b></li>
                    </ul>
                    </div>
                    <div className='artistHeader'>
                      <span><img src='/lunartImages/cUser.png' alt=""/></span>
                      <label>SYN CITY: Limited Blueprint<b>Jacob Jones</b></label>
                      <section><img src='/lunartImages/fvrtCollection.png'/></section>
                    </div>
                    <p>The Blueprint owners will be able to acquire in-game assets. These will form the foundation of the in-game assets by providing incentives and perks within the SYN CITY ecosystem.</p>
                    </a>
                  </div>

                  <div className='launchpadArtistsSliderInner collectionStart'>
                    <a href="/collection-detail">
                    <div className='artistPainting'>
                    <span><img src='/lunartImages/collection.png' alt=""/></span>
                    <ul>
                    <li><img src='/lunartImages/c1.png' alt=""/></li>
                    <li className='collectionsCounter'><img src='/lunartImages/c2.png' alt=""/><b>+55K</b></li>
                    </ul>
                    </div>
                    <div className='artistHeader'>
                      <span><img src='/lunartImages/cUser.png' alt=""/></span>
                      <label>SYN CITY: Limited Blueprint<b>Jacob Jones</b></label>
                      <section><img src='/lunartImages/fvrtCollection.png'/></section>
                    </div>
                    <p>The Blueprint owners will be able to acquire in-game assets. These will form the foundation of the in-game assets by providing incentives and perks within the SYN CITY ecosystem.</p>
                    </a>
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
  );
};

export default Collections;
