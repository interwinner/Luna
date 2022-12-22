import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NftExplore from './pages/Nft/NftExplore/NftExplore';
import MyNft from './pages/MyNft/mynft';
import NftWelcome from './pages/Nft/NftWelcome/NftWelcome';
import NftExploreItemDetails from './pages/Nft/NftExplore/NftExploreItemDetails';
import NftCreation from './pages/Nft/NftExplore/nftCreation';
import ScrollToTop from './pages/Shared/ScrollToTop';
import NftFarm from './pages/Nft/NftFarm';
import Launchpad from './pages/Launchpad/launchpad';
import Collection from './pages/Collections/collections';
import Artist from './pages/Artist/artist';
import ArtistDetail from './pages/ArtistDetail/artist-detail';
import Farming from './pages/Farming';
import Staking from './pages/Staking/staking';
import BuyArts from 'pages/BuyArts';
import SpecialBurn from 'pages/Specialburns';
import ArtDetail from 'pages/ArtDetail/art-detail';
import CollectionsDetail from 'pages/CollectionsDetail/collectionsdetail';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Router>
        <ScrollToTop />
        <div className='App'>
          <Switch>
            <Route path='/' exact component={NftWelcome} />
            <Route path='/nftCreation' exact component={NftCreation} />
            <Route path='/myNft' exact component={MyNft} />
            <Route path='/nftExplore' exact component={NftExplore} />
            <Route path='/launchpad' exact component={Launchpad} />
            <Route path='/collections' exact component={Collection} />
            <Route path='/mynft' exact component={MyNft} />
            <Route path='/artist' exact component={Artist} />
            <Route path='/artist-detail' exact component={ArtistDetail} />
            <Route path='/farming' exact component={Farming} />
            <Route path='/staking' exact component={Staking} />
            <Route path='/buy' exact component={BuyArts} />
            <Route path="/burn" exact component={SpecialBurn} />
            <Route path="/art" exact component={SpecialBurn} />
            <Route path="/art-detail" exact component={ArtDetail} />
            <Route path="/collection-detail" exact component={CollectionsDetail} />
            <Route
              path='/nftDetail/:address/:id'
              exact
              component={NftExploreItemDetails}
            />
            <Route path='/nftFarm' exact component={NftFarm} />
          </Switch>
        </div>
      </Router>
    </React.Fragment>
  );
};

export default App;
