import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Modal from '../../components/Modal';
import Wallet from '../../components/Wallet';
import { useWallet } from '@terra-money/use-wallet';
import { useTerraWebapp } from 'hooks/context';

interface Props {
  handleSidebar: Function;
} 
const NftHeaderHome: FC<Props> = handleSidebar => {
  const [menuToggle, setToggle] = useState(false);
  const [isOpenStakeModal, setIsOpenStakeModal] = useState(false);
  const [nftToggle, setNftToogle] = useState(false);
  const [scrolledClassName, setScrolledClassName] = useState('nftHeader');
  const { isConnected, address, balances } = useTerraWebapp();
  const { availableConnections, availableInstallations, connect, disconnect } =
    useWallet();

  const closeStakeModal = () => {
    setIsOpenStakeModal(false);
  };

  const onDisconnect = () => {
    disconnect();
  };

  const toggleMenu = () => {
    setToggle(!menuToggle);
    handleSidebar.handleSidebar(!menuToggle);
  };
  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 30) {
      setScrolledClassName('scrolled');
    } else {
      setScrolledClassName('nftHeader');
    }
  };

  useEffect(() => {
    if ( isConnected ) {
      setIsOpenStakeModal(false)
    } 
  }, [isConnected]);

  useEffect(() => {
   window.addEventListener('scroll', handleScroll);
  });

  return (
    <>    
      <div className={scrolledClassName}>
        <header className={menuToggle ? 'mobileHeader' : 'header'}>
          <div className='wrap'>
            <div className='logo'>
              <Link to='/' rel='noreferrer'>
                <img className='logo_img' src='/lunartImages/lunartLogo.svg' alt='logo' />
              </Link>
            </div>
            <a className='menu_icon' onClick={toggleMenu}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='50'
                height='41'
                viewBox='0 0 50 41'
                fill='none'
              >
                <path
                  d='M0 10C0 4.47715 4.47715 0 10 0H40C45.5228 0 50 4.47715 50 10V31C50 36.5228 45.5228 41 40 41H10C4.47715 41 0 36.5228 0 31V10Z'
                  fill='#1B1B1B'
                />
                <rect x='10' y='19' width='30' height='3' fill='white' />
                <rect x='10' y='28' width='30' height='3' fill='white' />
                <rect x='10' y='10' width='30' height='3' fill='white' />
              </svg>
            </a>
            <nav className='navbar'>
              <div className='logo'>
                <img className='logo_img' src='/lunartImages/lunartLogo.svg' alt='logo' />
              </div>
              <div className='icn_cloz' onClick={toggleMenu}></div>
              <ul className='menu'>
              <li className='loginCredHeaderHold'>
                  <Wallet
                    onConnect={() => setIsOpenStakeModal(true)}
                    onDisconnect={onDisconnect}
                  />
                </li>
                {/* <li>
                  <Link to='/' rel='noreferrer'>
                    Home
                  </Link>
                </li> */}
                <li>
                  <a
                    href=''
                    rel='noreferrer'
                  >
                    Bakery
                  </a>
                </li>
                <li>
                  <a
                    href=''
                    rel='noreferrer'
                  >
                    Collection
                  </a>
                </li>
                <li
                  onClick={() => {
                    setNftToogle(!nftToggle);
                  }}
                  className={clsx(
                    'dropdown_list',
                    nftToggle ? 'activeNftDropdown' : ''
                  )}
                >
                <Link to='/' rel='noreferrer'>
                Artists
                  </Link>
                </li>
                
                <li>
                  <a
                    href='https://www.loop.markets/community/'
                    rel='noreferrer'
                  >
                    Staking
                  </a>
                </li>
                <li>
                  <a
                    href='https://learn.loop.markets/'
                    rel='noreferrer'
                  >
                    Farming
                  </a>
                </li>
               
              </ul>
              <ul className='menu mneuValues'>
                <li className='loginCredHeaderHold'>
                  <Wallet
                    onConnect={() => setIsOpenStakeModal(true)}
                    onDisconnect={onDisconnect}
                  />
                </li>
              </ul>
              {/* <div className='trendingNewMenu'>
                <div className='trendingNewMenuLabel Actsidebar'>
                  Side Menu's
                </div>
              <ul className='sidemenuBar'>
              <li  className='trendingActiveMenu'><a href="/nftExplore"><span><img src='/m1.svg' alt='menu' /><img src='/m1a.svg' alt='menu' /></span> Marketplace</a></li>
                  <li><a href="/launchpad"><span><img src='/m2.svg' alt='menu' /><img src='/m2a.svg' alt='menu' /></span> Launchpad</a></li>
                  <li><a href="/collections"><span><img src='/m3.svg' alt='menu' /><img src='/m3a.svg' alt='menu' /></span> Collections</a></li>
                  <li><a href="/nftFarm"><span><img src='/m5.svg' alt='menu' /><img src='/m5a.svg' alt='menu' /></span> Minting Studio</a></li>
                </ul>
                <ul>
                  <li><a href="/myNft"><span><img src='/m5.svg' alt='menu' /><img src='/m5a.svg' alt='menu' /></span> My NFTs</a></li>
                  <li><a href=""><span><img src='/m8.svg' alt='menu' /><img src='/m8a.svg' alt='menu' /></span> Log Out</a></li>
                </ul>
              </div> */}
            </nav>
          </div>
          {!address && (
            <Modal
              isOpen={isOpenStakeModal}
              title='Connect to a Wallet'
              onClose={closeStakeModal}
            >
              <div className='Contract_box'>
                <div className='trending'>
                  <div className='wrapper'>
                    <div className='btn_box'>
                      {availableConnections
                        .filter(wallet => {
                          return !availableInstallations.some(
                            i => i.identifier === wallet.identifier
                          );
                        })
                        .map(({ type, identifier, name, icon }) =>
                          type === 'READONLY' ? (
                            ''
                          ) : name === 'Wallet Connect' ? (
                            <button
                              className='wallet_btn'
                              key={identifier}
                              onClick={() => connect(type, identifier)}
                            >
                              <img src={icon} alt={name} />
                              Connect Mobile Wallet
                            </button>
                          ) : (
                            <button
                              className='wallet_btn'
                              key={identifier}
                              onClick={() => connect(type, identifier)}
                            >
                              <img src={icon} alt={name} />
                              Connect {name}
                            </button>
                          )
                        )}
                      {availableInstallations.map(
                        ({ type, identifier, name, icon, url }) => (
                          <button
                            className='wallet_btn'
                            key={identifier}
                            onClick={() => (window.location.href = url)}
                          >
                            <img src={icon} alt={name} />
                            Install {name}
                          </button>
                        )
                      )}
                      {/* {<a
                      href='#'
                      style={{ backgroundImage: `url('/extention.png')` }}
                      className='connect'
                    >
                      {' '}
                      Connect Terra Station <b>Extention</b>
                    </a>
                    <a
                      href='#'
                      style={{ backgroundImage: `url('/mobile.png')` }}
                      className='connect'
                    >
                      {' '}
                      Connect Terra Station <b>Mobile</b>
                    </a> */}
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          )}
        </header>
      </div>
    </>
  );
};

export default NftHeaderHome;
