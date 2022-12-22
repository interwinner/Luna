import NftExplore from './NftExplore/NftExplore';
import NftExploreItemDetails from './NftExplore/NftExploreItemDetails';
import NftWelcome from './NftWelcome/NftWelcome';
import NftCreation from './NftExplore/nftCreation';

const Nft = () => {
  const pageName = window.location.pathname;
  return (
    <div>
      {pageName === '/' && <NftWelcome />}
      {pageName === '/nftCreation' && <NftCreation />}
      {pageName === '/nftExplore' && <NftExplore />}
      {pageName === '/nftDetail' && <NftExploreItemDetails />}
    </div>
  );
};

export default Nft;
