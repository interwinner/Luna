import { useState } from 'react';
import { Link } from 'react-router-dom';
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

const Artist = (props: any) => {
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
              <input placeholder='Search Artist Name' type="text"/>
            </section>
            <div className='mostTags'>
              <div className='mostDropdown'>
                <span>Most Followers <b></b></span>
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
                   <SwiperSlide><li><a href="">2D Artist</a></li></SwiperSlide>
                   <SwiperSlide><li className='tagsActive'><a href="">All</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">Painter</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">Photographer</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">Sketcher</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">Digital Artist</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">3D Artist</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">Oil Painter</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">2D Artist</a></li></SwiperSlide>
                   <SwiperSlide><li><a href="">Gaming</a></li></SwiperSlide> 
                   <SwiperSlide><li><a href="">Painter</a></li></SwiperSlide>
                   <SwiperSlide> <li><a href="">Photographer</a></li></SwiperSlide>
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
                  <div className='launchpadArtistsSliderInner'>
                    <a href="/artist-detail">
                    <div className='artistHeader'>
                      <span><img src='/lunartImages/profile.png' alt=""/></span>
                      <label>Jacob Jones<b>Oil Painter</b></label>
                    </div>
                    <div className='artistPainting'>
                    <span><img src='/lunartImages/p1.png' alt=""/></span>
                    <ul>
                    <li><img src='/lunartImages/p2.png' alt=""/></li>
                    <li><img src='/lunartImages/p3.png' alt=""/></li>
                    <li><img src='/lunartImages/p4.png' alt=""/></li>
                    </ul>
                    </div>
                    <div className='artistFooter'>
                    <ul>
                    <li><img src='/lunartImages/user.png'/> <b>22.5k <b>Followers</b></b></li>
                    <li><img src='/lunartImages/fvrt.png'/> <b>300.7k <b>Likes</b></b></li>
                    </ul>
                    </div>
                    </a>
                  </div>
                  <div className='launchpadArtistsSliderInner'>
                    <a href="/artist-detail">
                    <div className='artistHeader'>
                      <span><img src='/lunartImages/profile.png' alt=""/></span>
                      <label>Jacob Jones<b>Oil Painter</b></label>
                    </div>
                    <div className='artistPainting NoPaintings'>
                    <span><img src='/lunartImages/p5.png' alt=""/></span>
                    </div>
                    <div className='artistFooter'>
                    <ul>
                    <li><img src='/lunartImages/user.png'/> <b>22.5k <b>Followers</b></b></li>
                    <li><img src='/lunartImages/fvrt.png'/> <b>300.7k <b>Likes</b></b></li>
                    </ul>
                    </div></a>
                  </div>
                  <div className='launchpadArtistsSliderInner'>
                  <a href="/artist-detail">
                    <div className='artistHeader'>
                      <span><img src='/lunartImages/profile.png' alt=""/></span>
                      <label>Jacob Jones<b>Oil Painter</b></label>
                    </div>
                    <div className='artistPainting'>
                    <span><img src='/lunartImages/p1.png' alt=""/></span>
                    <ul>
                    <li><img src='/lunartImages/p2.png' alt=""/></li>
                    <li><img src='/lunartImages/p3.png' alt=""/></li>
                    <li><img src='/lunartImages/p4.png' alt=""/></li>
                    </ul>
                    </div>
                    <div className='artistFooter'>
                    <ul>
                    <li><img src='/lunartImages/user.png'/> <b>22.5k <b>Followers</b></b></li>
                    <li><img src='/lunartImages/fvrt.png'/> <b>300.7k <b>Likes</b></b></li>
                    </ul>
                    </div>
                    </a>
                  </div>

                  <div className='launchpadArtistsSliderInner'>
                  <a href="/artist-detail">
                    <div className='artistHeader'>
                      <span><img src='/lunartImages/profile.png' alt=""/></span>
                      <label>Jacob Jones<b>Oil Painter</b></label>
                    </div>
                    <div className='artistPainting'>
                    <span><img src='/lunartImages/p1.png' alt=""/></span>
                    <ul>
                    <li><img src='/lunartImages/p2.png' alt=""/></li>
                    <li><img src='/lunartImages/p3.png' alt=""/></li>
                    <li><img src='/lunartImages/p4.png' alt=""/></li>
                    </ul>
                    </div>
                    <div className='artistFooter'>
                    <ul>
                    <li><img src='/lunartImages/user.png'/> <b>22.5k <b>Followers</b></b></li>
                    <li><img src='/lunartImages/fvrt.png'/> <b>300.7k <b>Likes</b></b></li>
                    </ul>
                    </div>
                    </a>
                  </div>

                  <div className='launchpadArtistsSliderInner'>
                  <a href="/artist-detail">
                    <div className='artistHeader'>
                      <span><img src='/lunartImages/profile.png' alt=""/></span>
                      <label>Jacob Jones<b>Oil Painter</b></label>
                    </div>
                    <div className='artistPainting'>
                    <span><img src='/lunartImages/p1.png' alt=""/></span>
                    <ul>
                    <li><img src='/lunartImages/p2.png' alt=""/></li>
                    <li><img src='/lunartImages/p3.png' alt=""/></li>
                    <li><img src='/lunartImages/p4.png' alt=""/></li>
                    </ul>
                    </div>
                    <div className='artistFooter'>
                    <ul>
                    <li><img src='/lunartImages/user.png'/> <b>22.5k <b>Followers</b></b></li>
                    <li><img src='/lunartImages/fvrt.png'/> <b>300.7k <b>Likes</b></b></li>
                    </ul>
                    </div>
                    </a>
                  </div>

                  <div className='launchpadArtistsSliderInner'>
                  <a href="/artist-detail">
                    <div className='artistHeader'>
                      <span><img src='/lunartImages/profile.png' alt=""/></span>
                      <label>Jacob Jones<b>Oil Painter</b></label>
                    </div>
                    <div className='artistPainting'>
                    <span><img src='/lunartImages/p1.png' alt=""/></span>
                    <ul>
                    <li><img src='/lunartImages/p2.png' alt=""/></li>
                    <li><img src='/lunartImages/p3.png' alt=""/></li>
                    <li><img src='/lunartImages/p4.png' alt=""/></li>
                    </ul>
                    </div>
                    <div className='artistFooter'>
                    <ul>
                    <li><img src='/lunartImages/user.png'/> <b>22.5k <b>Followers</b></b></li>
                    <li><img src='/lunartImages/fvrt.png'/> <b>300.7k <b>Likes</b></b></li>
                    </ul>
                    </div>
                    </a>
                  </div>

                  <div className='launchpadArtistsSliderInner'>
                  <a href="/artist-detail">
                    <div className='artistHeader'>
                      <span><img src='/lunartImages/profile.png' alt=""/></span>
                      <label>Jacob Jones<b>Oil Painter</b></label>
                    </div>
                    <div className='artistPainting'>
                    <span><img src='/lunartImages/p1.png' alt=""/></span>
                    <ul>
                    <li><img src='/lunartImages/p2.png' alt=""/></li>
                    <li><img src='/lunartImages/p3.png' alt=""/></li>
                    <li><img src='/lunartImages/p4.png' alt=""/></li>
                    </ul>
                    </div>
                    <div className='artistFooter'>
                    <ul>
                    <li><img src='/lunartImages/user.png'/> <b>22.5k <b>Followers</b></b></li>
                    <li><img src='/lunartImages/fvrt.png'/> <b>300.7k <b>Likes</b></b></li>
                    </ul>
                    </div>
                    </a>
                  </div>

                  <div className='launchpadArtistsSliderInner'>
                  <a href="/artist-detail">
                    <div className='artistHeader'>
                      <span><img src='/lunartImages/profile.png' alt=""/></span>
                      <label>Jacob Jones<b>Oil Painter</b></label>
                    </div>
                    <div className='artistPainting'>
                    <span><img src='/lunartImages/p1.png' alt=""/></span>
                    <ul>
                    <li><img src='/lunartImages/p2.png' alt=""/></li>
                    <li><img src='/lunartImages/p3.png' alt=""/></li>
                    <li><img src='/lunartImages/p4.png' alt=""/></li>
                    </ul>
                    </div>
                    <div className='artistFooter'>
                    <ul>
                    <li><img src='/lunartImages/user.png'/> <b>22.5k <b>Followers</b></b></li>
                    <li><img src='/lunartImages/fvrt.png'/> <b>300.7k <b>Likes</b></b></li>
                    </ul>
                    </div>
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

export default Artist;
