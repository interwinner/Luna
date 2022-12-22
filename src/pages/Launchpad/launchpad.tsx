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

const Launchpad = (props: any) => {
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

      <div className={sidebarActive ? 'sidebarActiveBg' : ''}>
        <div className='launchSection'>
          <div className='launchSectionBanner'>
            <img src='/Launchpad.jpg' alt='Launchpad' />
            <div className='launchSectionText'>
              <div>
                <h5>Launch your DeFi NFTs with yield on Loop today</h5>
                <p>
                  Give back to your community with a daily token distribution
                  when the NFT is staked.
                </p>
                <span>
                  <button>UPCOMING</button>
                  <button>
                    {' '}
                    <Link
                      className='exploreBtn'
                      to={{
                        pathname: '/nftExplore',
                      }}
                    >
                      MARKETPLACE
                    </Link>
                  </button>
                </span>
              </div>
            </div>
          </div>

          <div className='launchUcomingProject'>
            <h6>Upcoming Projects</h6>

            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              navigation
              loop
              autoplay={{ delay: 7000 }}
              className='feedSwiper'
              slideToClickedSlide
              breakpoints={{
                1200: {
                  freeMode: true,
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                768: {
                  freeMode: true,
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                640: {
                  freeMode: true,
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                320: {
                  freeMode: true,
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
              }}
            >
              <SwiperSlide>
                <div className='launchUcomingSlider'>
                  <div className='launchUcomingSliderInner'>
                  <div className='daynamicSlider'>
<div><img src="/rect1.png" alt="rect" /></div>
<div><img src="/rect2.png" alt="rect" /></div>
<div><img src="/rect3.png" alt="rect" /></div>
            </div>
                    <span>
                      <img src='/exploreThumb.png' alt='thumb' />
                    </span>
                    <h6>LUNI</h6>
                    <div>
                      <a href=''>
                        <img src='/s1.png' alt='thumb' />
                      </a>
                      <a href=''>
                        <img src='/s2.png' alt='thumb' />
                      </a>
                      <a href=''>
                        <img src='/s3.png' alt='thumb' />
                      </a>
                    </div>
                    <label>
                      Start Date <b>14 Jan 2022</b>
                    </label>
                    <label>
                      Start Time <b>TBA</b>
                    </label>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='launchUcomingSlider'>
                  <div className='launchUcomingSliderInner'>
                  <div className='daynamicSlider'>
<div><img src="/rect1.png" alt="rect" /></div>
<div><img src="/rect2.png" alt="rect" /></div>
<div><img src="/rect3.png" alt="rect" /></div>
            </div>
                    <span>
                      <img src='/exploreThumb.png' alt='thumb' />
                    </span>
                    <h6>Silent Solohos</h6>
                    <div>
                      <a href=''>
                        <img src='/s1.png' alt='thumb' />
                      </a>
                      <a href=''>
                        <img src='/s2.png' alt='thumb' />
                      </a>
                      <a href=''>
                        <img src='/s3.png' alt='thumb' />
                      </a>
                    </div>
                    <label>
                      Start Date <b>14 Jan 2022</b>
                    </label>
                    <label>
                      Start Time <b>TBA</b>
                    </label>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='launchUcomingSlider'>
                  <div className='launchUcomingSliderInner'>
                  <div className='daynamicSlider'>
<div><img src="/rect1.png" alt="rect" /></div>
<div><img src="/rect2.png" alt="rect" /></div>
<div><img src="/rect3.png" alt="rect" /></div>
            </div>
                    <span>
                      <img src='/exploreThumb.png' alt='thumb' />
                    </span>
                    <h6>TerraBay</h6>
                    <div>
                      <a href=''>
                        <img src='/s1.png' alt='thumb' />
                      </a>
                      <a href=''>
                        <img src='/s2.png' alt='thumb' />
                      </a>
                      <a href=''>
                        <img src='/s3.png' alt='thumb' />
                      </a>
                    </div>
                    <label>
                      Start Date <b>14 Jan 2022</b>
                    </label>
                    <label>
                      Start Time <b>TBA</b>
                    </label>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>

          <div className='launchCompletedProjects'>
            <h6>Completed Projects</h6>
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              navigation
              loop
              autoplay={{ delay: 7000 }}
              className='feedSwiper'
              slideToClickedSlide
              breakpoints={{
                1200: {
                  freeMode: true,
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                768: {
                  freeMode: true,
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                640: {
                  freeMode: true,
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                320: {
                  freeMode: true,
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
              }}
            >
              <SwiperSlide>
                <div className='launchCompletedSlider'>
                  <div className='launchCompletedSliderInner'>
                    <span>
                      <img src='/exploreThumb.png' alt='thumb' />
                      Chill Dude
                    </span>
                    <p>2,500 items</p>
                    <div className='launchlist'>
                      <div className='whitelist'>
                        <p>
                          <a href=''>WHITELIST</a>
                          <a href=''>PUBLIC MINT</a>
                        </p>
                        <p>
                          2,00<b>2,500 Minted</b>
                        </p>
                      </div>
                      <div className='launchLoader'>
                        <div></div>
                      </div>
                      <div className='pricingCompleted'>
                        <b>Mint Price</b>
                        <p>120 UST</p>
                      </div>
                      <div className='pricingCompleted'>
                        <b>End Date</b>
                        <p>30 Dec 2021</p>
                      </div>
                      <div className='pricingCompleted'>
                        <b>End Time</b>
                        <p>12:00am UTC</p>
                      </div>
                      <div className='pricingCompleted'>
                        <b>Minimum LUA Power Required</b>
                        <p>0</p>
                      </div>
                      <button>Buy on Market</button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='launchCompletedSlider'>
                  <div className='launchCompletedSliderInner'>
                    <span>
                      <img src='/exploreThumb.png' alt='thumb' />
                      Spaced Apes
                    </span>
                    <p>2,500 items</p>
                    <div className='launchlist'>
                      <div className='whitelist'>
                        <p>
                          {' '}
                          <a href=''>WHITELIST</a>
                          <a href=''>PUBLIC MINT</a>
                        </p>
                        <p>
                          2,00<b>2,500 Minted</b>
                        </p>
                      </div>
                      <div className='launchLoader'>
                        <div></div>
                      </div>
                      <div className='pricingCompleted'>
                        <b>Mint Price</b>
                        <p>120 UST</p>
                      </div>
                      <div className='pricingCompleted'>
                        <b>End Date</b>
                        <p>30 Dec 2021</p>
                      </div>
                      <div className='pricingCompleted'>
                        <b>End Time</b>
                        <p>12:00am UTC</p>
                      </div>
                      <div className='pricingCompleted'>
                        <b>Minimum LUA Power Required</b>
                        <p>0</p>
                      </div>
                      <button>Buy on Market</button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className='launchCompletedSlider'>
                  <div className='launchCompletedSliderInner'>
                    <span>
                      <img src='/exploreThumb.png' alt='thumb' />
                      Rainbow Cate
                    </span>
                    <p>2,500 items</p>
                    <div className='launchlist'>
                      <div className='whitelist'>
                        <p>
                          {' '}
                          <a href=''>WHITELIST</a>
                          <a href=''>PUBLIC MINT</a>
                        </p>
                        <p>
                          2,00<b>2,500 Minted</b>
                        </p>
                      </div>
                      <div className='launchLoader'>
                        <div></div>
                      </div>
                      <div className='pricingCompleted'>
                        <b>Mint Price</b>
                        <p>120 UST</p>
                      </div>
                      <div className='pricingCompleted'>
                        <b>End Date</b>
                        <p>30 Dec 2021</p>
                      </div>
                      <div className='pricingCompleted'>
                        <b>End Time</b>
                        <p>12:00am UTC</p>
                      </div>
                      <div className='pricingCompleted'>
                        <b>Minimum LUA Power Required</b>
                        <p>0</p>
                      </div>
                      <button>Buy on Market</button>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className='dontMiss'>
            <h6>Don’t miss out on what’s next</h6>
            <p>
              Sign up to our newsletter and stay up to date with the latest news
              from LOOP Venturees. Be first to hear about NFT launches and
              exclusive events.
            </p>
            <input type='text' placeholder='youremail@example.com' />
            <button>Subscribe</button>
          </div>
        </div>
        <NftFooter />
      </div>
    </div>
  );
};

export default Launchpad;
