import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import NftFooter from '../NftFooter';
import NftTrending from '../NftTrending';
import NftHeader from '../NftHeader';
import { useLCDClient } from '@terra-money/wallet-provider';

import allNFTs from '../../TrendingPosts';

interface AuctionInfo {
  auction_ids: number[],
  token_address: string,
  token_id: string
}

interface NFTInfo {
  owner: string,
  name: string,
  description: string,
  image: string,
  creator: string,
  token1_addr: string,
  token1_amount: string,
  token2_addr: string,
  token2_amount: string,
  vesting_period: number,
  tier_index: number,
  reward_contract_addr: string
}

const NftExplore = (props: any) => {

  const lcd = useLCDClient()

  const [sidebarActive, setSidebar] = useState(false);
  const [auctionInfos, setAuctionInfos] = useState<NFTInfo[]>([])

  // filter options
  const [shownNFTs, setShownNFTs] = useState<any>(allNFTs)
  const [searchString, setSearchString] = useState<String>('')
  const [minPrice, setMinPrice] = useState<number>()
  const [maxPrice, setMaxPrice] = useState<number>()

  useEffect(() => {
    let filteredNFTs
    // filter by search keyword
    filteredNFTs = allNFTs.filter(
        ({tokenName, tokenId, desc, cat, catName}) => {
          // adding specific characters to avoid misleading in search
          const allTokenString = `${tokenName}&^**%${tokenId}&^**%${desc}&^**%${cat}&^**%${catName}`
          console.log(allTokenString)
          return allTokenString.toLowerCase().indexOf(searchString.toLowerCase()) > -1
        }
    );

    if (minPrice != undefined && minPrice > 0) {
      filteredNFTs = filteredNFTs.filter(({price}) => parseInt(price) >= minPrice);
    }
    if (maxPrice != undefined && maxPrice > 0) {
      filteredNFTs = filteredNFTs.filter(({price}) => parseInt(price) <= maxPrice);
    }

    setShownNFTs(filteredNFTs)
  }, [searchString, minPrice, maxPrice])

  const handleSidebar = (status: any) => {
    setSidebar(status);
  };
  const sendSearchData = {
    category:
      props.location && props.location.state && props.location.state.category
        ? props.location.state.category
        : null,
    search:
      props.location && props.location.state && props.location.state.search
        ? props.location.state.search
        : null,
  };
  return (
    <>
      <Helmet>
        <title>NFT | Explore</title>
      </Helmet>
      <div className='nftexploreMain'>
        <NftHeader handleSidebar={handleSidebar} />
        <div className={sidebarActive ? 'sidebarActiveBg' : ''}>
          <div>
            <NftTrending
                filteredNFTs={shownNFTs}
                pageIdentity='explore'
                setSearchString={setSearchString}
                searchString={searchString}
                setMinPrice={setMinPrice}
                setMaxPrice={setMaxPrice}
            />
          </div>
          <NftFooter />
        </div>
      </div>
    </>
  );
};

export default NftExplore;
