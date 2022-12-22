import React, { useEffect, useState } from 'react';
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
const NftPromotedSection = (props: any) => {
  const [sidebarActive, setSidebar] = useState(false);
  SwiperCore.use([Navigation, Scrollbar, Pagination, Autoplay]);
  const handleSidebar = (status: any) => {
    setSidebar(status);
  };
  // const handleClick = (array: any) => {
  //   props.history.push({
  //     pathname: '/nftExplore',
  //     state: { category: array }
  //   })
  // }

  return (
    <>
      <div className='launchpadArtists'>
        <div className='wrapper'>
          <div className='launchpadArtistsInner'>
            <h2><b>Featured</b>
            Lauchpad <span>Artists</span> <img src='/lunartImages/star.png' alt=""/><a href="/artist">View All</a></h2>
              <div className='launchpadArtistsSlider'>
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
                <a href="/artist-detail">
                  <div className='launchpadArtistsSliderInner'>
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
                  </div></a>
                  </SwiperSlide>
                  <SwiperSlide>
                  <a href="/artist-detail">
                  <div className='launchpadArtistsSliderInner'>
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
                    </div>
                  </div>
                  </a>
                  </SwiperSlide>
                  <SwiperSlide>
                  <a href="/artist-detail">
                  <div className='launchpadArtistsSliderInner'>
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
                  </div>
                  </a>
                  </SwiperSlide>
                  </Swiper>
                </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NftPromotedSection;
