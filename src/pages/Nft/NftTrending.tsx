import { useEffect, useReducer, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Select, { components } from 'react-select';
import { useDebouncedCallback } from 'use-debounce';
import clsx from 'clsx';
import TrendingPosts from '../TrendingPosts';
import Nft from '../../components/Nft';
import NftPopup from '../../components/NftPopup';
import { useWallet } from '@terra-money/use-wallet';
// -------------------------------------------------------------------------------------------------------------------------
// import { useLCDClient } from '@terra-money/wallet-provider'
// *************************************************************************************************************************
import { useTerraWebapp } from 'hooks/context';
// -------------------------------------------------------------------------------------------------------------------------
// interface AuctionInfo {
//   auction_ids: number[],
//   token_address: string,
//   token_id: string
// }

// interface NFTInfo {
//   owner: string,
//   name: string,
//   description: string,
//   image: string,
//   creator: string,
//   token1_addr: string,
//   token1_amount: string,
//   token2_addr: string,
//   token2_amount: string,
//   vesting_period: number,
//   tier_index: number,
//   reward_contract_addr: string
// }

// interface TokenAuctionState {
//   start_time: number,
//   end_time: number,
//   high_bidder_addr: string,
//   high_bidder_amount: number,
//   coin_denom: string,
//   auction_id: number,
//   whitelist: string[],
//   owner: string,
//   token_id: string,
//   token_address: string,
//   is_cancelled: boolean,
// }

// interface NFTDetail {
//   id: number,
//   img: string,
//   name: string,
//   cat: string,
//   catName: string,
//   price: string,
//   timeLeft: string,
//   apr: string,
//   type: number,
//   desc: string
// }
// *************************************************************************************************************************

let postsPerPageStart = 12;
let postsPerPage = 12;
let arrayForHoldingPosts: any = [];
let skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let startPage = 0;
let endPage = 16;

type WalletProps = {
  onConnect: () => void;
  onDisconnect: () => void;
};

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <div className='selectIconCustom'>
        <img src='polygonDropArrow.png' alt='polygonDropArrow.png' />
      </div>
    </components.DropdownIndicator>
  );
};

enum SelectOpenType {
  REWARD,
  SORTBY,
  COLLECTION,
}

enum ACTIVEFILTER {
  ALL = 'All',
  BUYNOW = 'Buy Now',
  AUCTION = 'Auction',
  NEW = 'New',
}

const sortByOptions = [
  { value: 'Yield High to Low', label: 'Yield High to Low' },
  { value: 'Yield Low to High', label: 'Yield Low to High' },
  // { value: 'Price High to Low', label: 'Price High to Low' },
  // { value: 'Price Low To High', label: 'Price Low To High' },
  // { value: 'LP Hight to Low', label: 'LP Hight to Low' },
  // { value: 'LP Low to High', label: 'LP Low to High' },
  // { value: 'Newest', label: 'Newest' },
  // { value: 'Oldest', label: 'Oldest' },
];

const categoryOptions = [
  { value: 'LOOP', label: 'LOOP LP Bonds' },
  { value: 'LOOPR', label: 'LOOPR LP Bonds' },
  { value: 'LUNA', label: 'LUNA LP Bonds' },
  { value: 'BTC', label: 'BTC LP Bonds' },
  { value: 'ETH', label: 'ETH LP Bonds' },
  { value: 'BNB', label: 'BNB LP Bonds' },
  { value: 'SOL', label: 'SOL LP Bonds' },
];

const collectionOptions = [
  {tokenName: 'Bucksta LP Lock'},
  {tokenName: 'Spaced Ape'}
]

export const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    background: 'none',
    border: 0,
  }),
  menu: (provided: any, state: any) => ({
    ...provided,
    padding: 0,
    background: '#313336',
    margin: 0,
  }),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    backgroundImage: 'url(/images/polygonDropArrow.png)',
  }),
  placeholder: (provided: any, state: any) => ({
    ...provided,
    fontSize: '14px',
    color: '#ffffff',
  }),
  input: (provided: any, state: any) => ({
    ...provided,
    padding: 0,
    fontSize: '14px',
    color: '#ffffff',
  }),
  indicatorSeparator: (provided: any, state: any) => ({
    ...provided,
    background: 'none',
  }),
  container: (provided: any, state: any) => ({
    ...provided,
    display: 'inline-block',
    width: '120px',
  }),
  valueContainer: (provided: any, state: any) => ({
    ...provided,
    border: '0px',
    color: '#ffffff',
    background: '#313336',
    padding: '0',
    fontSize: '12px',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    border: '0px',
    color: '#ffffff',
    background: state.isSelected || state.isFocused ? '#1b1b1b' : '#313336',
    padding: '5px 10px',
    fontSize: '12px',
    '&:hover': {
      background: '#1b1b1b',
    },
    '&:focus': {
      background: '#1b1b1b',
    },
  }),
  singleValue: (provided: any, state: any) => ({
    ...provided,
    transition: 'opacity 300ms',
    color: '#ffffff',
    fontSize: '12px',
    optionName: 'display:none',
  }),
};
const optionSetDivide = {
  input: (provided: any, state: any) => ({
    ...provided,
    // display: 'none !important'
  }),
  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    padding: '0',
  }),
  indicatorSeparator: (provided: any, state: any) => ({
    ...provided,
    display: 'none !important',
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    padding: '2px 5px',
    fontSize: '11px',
    background: state.isSelected || state.isFocused ? '#1b1b1b' : '#313336',
    textAlign: 'center',
    '&:hover': {
      background: '#1b1b1b',
    },
  }),
};
export const customStylesSelect = { ...customStyles, ...optionSetDivide };

const reducer = (state: { togglePopup: any; toggleInfo: any }, action: any) => {
  switch (action.type) {
    case 'togglePopup':
      return {
        togglePopup: !state.togglePopup,
        toggleInfo: state.toggleInfo,
      };
    // if (state.toggleInfo) {
    //   return {
    //     togglePopup: !state.togglePopup,
    //     toggleInfo: state.toggleInfo,
    //   };
    // } else {
    //   return { togglePopup: state.togglePopup, toggleInfo: state.toggleInfo };
    // }

    case 'toggleInfo':
      return { togglePopup: state.togglePopup, toggleInfo: action.value };
    default:
      return state;
  }
};



const NftTrending = (props: any) => {

  // -------------------------------------------------------------------------------------------------------------------------
  // /const lcd = useLCDClient()
  // *************************************************************************************************************************
  const { availableConnections, availableInstallations, connect, disconnect } =
    useWallet();

  const { isConnected } = useTerraWebapp();
  const onDisconnect = () => {
    disconnect();
  };

  const pageName = window.location.pathname;
  const [state, dispatch] = useReducer(reducer, {
    togglePopup: null,
    toggleInfo: null,
  });
  const [activeFilter, setFilterActive] = useState(ACTIVEFILTER.ALL);
  const textSearchEL = useRef(null);
  // loadMore
  const [postsToShow, SetPostsToShow] = useState<any[]>([]);
  // -------------------------------------------------------------------------------------------------------------------------
  // const [allPosts, setAllPosts] = useState<any[]>([]);
  // *************************************************************************************************************************
  const [loading, SetLoading] = useState(false);
  const [next, setNext] = useState(postsPerPageStart);
  // loadMore
  const [searchInputExplore, SetSearchInputExplore] = useState('');
  const [exploreSearchValue, SetExploreSearchValue] = useState<any[]>([]);

  const [minPrice, SetMinPrice] = useState(0);
  const [maxPrice, SetMaxPrice] = useState(0);
  const [currentPostPopup, SetCurrentPostPopup] = useState(null);
  const [exploreCategoryOptions, SetExploreCategoryOptions] =
    useState<any[]>(categoryOptions);
    const [exploreCollectionOptions, SetExploreCollectionOptions] = useState<any[]>(collectionOptions);
  const [exploreSortByOptions, SetExploreSortByOptions] =
    useState<any[]>(sortByOptions);
  const [exploreCategoryValue, SetExploreCategoryValue] = useState<any[]>([]);
  const [exploreCollectionValue, SetExploreCollectionValue] = useState<any[]>([]);
  const [search, SetSearch] = useState('');
  const [sortByOptionsSelected, SetSortByOptionsSelected] = useState(
    sortByOptions[0]
  );
  const [priceOptionsSelected, SetPriceOptionsSelected] = useState({
    value: '',
  });
  const [changePriceTrigger, SetChangePriceTrigger] = useState(false);
  const [rewardSearchValue, setRewardSearchValue] = useState('');
  const [collectionSearchValue, setCollectionSearchValue] = useState('');
  const inputCatText = useRef<HTMLInputElement>(null);
  const inputCollectionText = useRef<HTMLInputElement>(null);
  const inputCatTextHome = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState<number>();


  const debounced = useDebouncedCallback(
      (callback) => {
        callback();
      },
      500,
      // The maximum time func is allowed to be delayed before it's invoked:
  );
  // -------------------------------------------------------------------------------------------------------------------------
  // useEffect(() => {
  //   (async () => {
  //     const auctionInfos: AuctionInfo[] = await fetchAuctionPosts(lcd, token_address, '0', 12)
  //     setAllPosts(auctionInfos)
  //   })()
  // }, [])

  // const fetchAuctionPosts = async (lcd: LCDClient, tokenAddress: string, startAfter: string, limit: number) => {
  //   const auctionInfos: AuctionInfo[] = await lcd.wasm.contractQuery('andromedaprotocol', {AuctionInfosForAddress: {token_address: 'string', start_after: 'string', limit: 'u64'}})
  //   const callsForAuctionState = auctionInfos.map(i => {
  //     return lcd.wasm.contractQuery('andromedaprotocol', {LatestAuctionState: {token_id: ''}})
  //   })
  //   const callsForExtraTokenInfo = auctionInfos.map(i => {
  //     return lcd.wasm.contractQuery('launchpad_nft_contract', {nft_info: {token_id: ''}})
  //   })
  //   const response1: NFTInfo[] = await Promise.all(callsForExtraTokenInfo)
  //   const response2: TokenAuctionState[] = await Promise.all(callsForAuctionState)
  //   let _nftData: NFTDetail[] = auctionInfos.map((i, index) => {
  //     return {
  //       id: i.token_id,
  //       img: response1[index].image,
  //       name: response1[index].name,
  //       cat: 'none',
  //       catName: 'none',
  //       price: 'none',
  //       timeLeft: response2[index].end_time,
  //       apr: 'none',
  //       desc: response1[index].description
  //     }
  //   })
  //   return _nftData
  // }
  // *************************************************************************************************************************

  useEffect(() => {
    // page window scroll
    function handleScroll() {
      const footer: any = document.getElementById('footerId');
      if (!loading) {
        if (
          window.innerHeight + document.documentElement.scrollTop >
          footer.offsetTop
        )

        if (postsPerPage !== 0) {
          SetLoading(true);
          startPage = endPage;
          endPage = endPage + postsPerPage;
          const oldPosts = arrayForHoldingPosts;
          // -------------------------------------------------------------------------------------------------------------------------

          // *************************************************************************************************************************
          setTimeout(() => {
            (async () => {
              const _arrayForHoldingPosts: any[] = await performFilter(oldPosts, minPrice, maxPrice, activeFilter, exploreCategoryValue, exploreCollectionValue, search, sortByOptionsSelected, exploreSearchValue);
              SetPostsToShow(_arrayForHoldingPosts);
              SetLoading(false);
            })()
          }, 1000);
        }
      }
    }

    if (props.pageIdentity === 'explore') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      // SetPriceOptionsSelected(priceOptions[0])
    }
    return () => {
      // cancel the subscription
      // SetPriceOptionsSelected({ value: '' });
    };

  }, [next, loading, props.pageIdentity, minPrice, maxPrice, activeFilter, exploreCategoryValue, exploreCollectionValue, search, sortByOptionsSelected, exploreSearchValue]);

  useEffect(() => {
    if (
      props.searchData &&
      props.searchData.category &&
      Array.isArray(props.searchData.category)
    ) {
      SetExploreCategoryValue(props.searchData.category);
    } else {
      if (
        props.searchData &&
        props.searchData.category &&
        !exploreCategoryValue.includes(props.searchData.category)
      ) {
        SetExploreCategoryValue([
          ...exploreCategoryValue,
          props.searchData.category,
        ]);
      }
    }

    // if (props.searchData && props.searchData.search) {
    //   // SetSearch(props.searchData.search);
    //   handleExploreSearchValue(props.searchData.search, 'value');
    // }
  }, [props.searchData, exploreCategoryValue]);

  useEffect(() => {
    startPage = 0;
    endPage = postsPerPageStart;

    if (open && props.pageIdentity === 'explore' && inputCatText.current) {
      inputCatText.current.focus();
    }
    if (open && props.pageIdentity !== 'explore' && inputCatTextHome.current) {
      inputCatTextHome.current.focus();
    }
  }, [
    props.pageIdentity,
    exploreCategoryValue,
    exploreSearchValue,
    minPrice,
    maxPrice,
    priceOptionsSelected,
    search,
    changePriceTrigger,
    exploreCategoryOptions,
    open,
    activeFilter,
  ]);

  function toggle(type: any) {
    open !== type ? setOpen(type) : setOpen(-1);
    setRewardSearchValue('');
  }
  function clickOnCurr() {
    document
      .getElementsByClassName('optionSet')[1]
      .classList.toggle('toggleust');
  }
  function handleSetSearchTop(e: any) {
    if (e.key === 'Enter' && e.target.value) {
      handleExploreSearchValue(e);
      SetSearch('');
    }
  }

  const performFilter = async (oldPosts = [], _minPrice: number, _maxPrice: number, _activeFilter: any, _exploreCategoryValue: any[], _exploreCollectionValue: any[], _search: any, _sortByOptionsSelected: any, _exploreSearchValue: any[]) => {

    let allPosts = TrendingPosts;
    // all filters

    // if(exploreCategoryValue.length > 0 || exploreSearchValue.length>0 || ('value' in priceOptionsSelected && priceOptionsSelected.value && changePriceTrigger) || search){
    //   allPosts = TrendingPosts.filter(row=> exploreCategoryValue.indexOf(row.cat) > -1 || exploreSearchValue.indexOf(row.cat) > -1 || row.cat == priceOptionsSelected.value.toUpperCase() || row.cat.indexOf(search.toUpperCase()) > -1);
    // }
    // if (search && props.pageIdentity !== 'explore') {
    if (_search) {
      allPosts = allPosts.filter(
        row => {
          let _token = `${row.tokenName}`
          if (row.tokenId) _token += ` #${row.tokenId}`
          return _token.toLowerCase().indexOf(_search.toLowerCase()) > -1 ||
          (row.desc.length > 0 &&
            row.desc.toLowerCase().indexOf(_search.toLowerCase()) > -1)
        }
      );
    }

    if (_exploreCategoryValue.length > 0) {
      const postHold: any = [];
      allPosts.filter(function (row) {
        _exploreCategoryValue.forEach(element => {
          if (row.catName.indexOf(element) > -1) {
            postHold.push(row);
            return true;
          }
          return false;
        });
      });
      allPosts = postHold;
    }

    if (_exploreCollectionValue.length > 0) {
      const postHold: any = [];
      allPosts.filter(function (row) {
        _exploreCollectionValue.forEach(element => {
          if (row.tokenName.indexOf(element) > -1) {
            postHold.push(row);
            return true;
          }
          return false;
        });
      });
      allPosts = postHold;
    }

    if (_exploreSearchValue.length > 0) {
      const postHoldS: any = [];
      allPosts = allPosts.filter(function (row) {
        _exploreSearchValue.forEach(element => {
          if (
            row.catName.indexOf(element) > -1 ||
            row.desc.toLowerCase().indexOf(element.toLowerCase()) > -1
          ) {
            postHoldS.push(row);
            return true;
          }
          return false;
        });
      });
      allPosts = postHoldS;
    }

    // if (
    //   priceOptionsSelected &&
    //   'value' in priceOptionsSelected &&
    //   priceOptionsSelected.value &&
    //   changePriceTrigger
    // ) {
    //   allPosts = allPosts.filter(
    //     row =>
    //       row.catName.indexOf(priceOptionsSelected.value.toUpperCase()) > -1
    //   );
    // }

    if (_activeFilter) {
      switch (_activeFilter) {
        case ACTIVEFILTER.AUCTION:
          allPosts = allPosts.filter(row => row.type === 2);
          break;
        case ACTIVEFILTER.BUYNOW:
          allPosts = allPosts.filter(row => row.type !== 2);
          break;
        case ACTIVEFILTER.NEW:
          allPosts = allPosts.sort((a, b) => b.id - a.id);
          break;
        default:
          allPosts = allPosts.sort((a, b) => a.id - b.id);
          break;
      }
    }

    switch(_sortByOptionsSelected.value) {
      case 'Yield High to Low':
        allPosts = allPosts.sort((a,b) => b.apr - a.apr)
        break;
      case 'Yield Low to High':
        allPosts = allPosts.sort((a,b) => a.apr - b.apr)
        break;
    }

    const _slicedPosts = allPosts.slice(startPage, endPage);
    arrayForHoldingPosts = [...oldPosts, ..._slicedPosts];
    return arrayForHoldingPosts
  }

  useEffect(() => {
    (async () => {
      const _arrayForHoldingPosts: any[] = await performFilter([], minPrice, maxPrice, activeFilter, exploreCategoryValue, exploreCollectionValue, search, sortByOptionsSelected, exploreSearchValue);
      SetPostsToShow(_arrayForHoldingPosts);
    })()
  }, [minPrice, maxPrice, activeFilter, exploreCategoryValue, exploreCollectionValue, search, sortByOptionsSelected, exploreSearchValue]);

  // loadMore on scroll
  const handleShowMorePosts = () => {
    if (postsPerPage !== 0) {
      SetLoading(true);
      startPage = endPage;
      endPage = endPage + postsPerPage;
      const oldPosts = arrayForHoldingPosts;
      // -------------------------------------------------------------------------------------------------------------------------

      // *************************************************************************************************************************
      setTimeout(() => {
        (async () => {
          const _arrayForHoldingPosts: any[] = await performFilter(oldPosts, minPrice, maxPrice, activeFilter, exploreCategoryValue, exploreCollectionValue, search, sortByOptionsSelected, exploreSearchValue);
          SetPostsToShow(_arrayForHoldingPosts);
          SetLoading(false);
        })()
      }, 1000);
    }
  };
  function handleToggleSmallLarge(value: boolean) {
    dispatch({ type: 'toggleInfo', value: value });
    resetVariables(value, false);
  }

  // reset Variables
  function resetVariables(value: boolean, sidebarFilter = false) {
    arrayForHoldingPosts = [];
    // postsPerPageStart = value ? 36 : 16;
    postsPerPageStart = 12;
    // postsPerPage = value ? 12 : 8;
    postsPerPage = 12;
    // setNext(value ? 36 : 16);
    setNext(12);
    // skeleton = value
    //   ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    //   : [1, 2, 3, 4, 5, 6, 7, 8];
    skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    startPage = 0;
    if (sidebarFilter) {
      postsPerPageStart = 12;
      postsPerPage = 0;
    }
    endPage = postsPerPageStart;
  }

  // handle Sortby Option
  function handleSortByOptionsSelected(event: any) {
    SetSortByOptionsSelected(event);
  }
  // handle Price Option
  // function handleSetPriceOptionsSelected(event: any) {
  //   SetChangePriceTrigger(true);
  //   if (priceOptionsSelected.value === event.value) {
  //     SetPriceOptionsSelected({ value: '' });
  //   } else {
  //     SetPriceOptionsSelected(event);
  //   }
  //   clickOnCurr();
  // }
  // add search filter
  function handleExploreSearchValue(event: any, type = 'event') {
    const value = type === 'event' ? event.target.value : event;
    if (value.length > 0) {
      SetExploreSearchValue([...exploreSearchValue, value.toUpperCase()]);
      SetSearchInputExplore('');
    }
  }
  function removeSearchExplore(index: number) {
    SetExploreSearchValue([
      ...exploreSearchValue.slice(0, index),
      ...exploreSearchValue.slice(index + 1),
    ]);
  }
  function handleCategoryExplore(event: any) {
    if (!exploreCategoryValue.includes(event.value)) {
      SetExploreCategoryValue([...exploreCategoryValue, event.value]);
    } else {
      let selectionAfterRemoval = exploreCategoryValue;
      selectionAfterRemoval = selectionAfterRemoval.filter(
        current => current !== event.value
      );
      SetExploreCategoryValue([...selectionAfterRemoval]);
    }
  }
  function handleCollectionExplore(event: any) {
    if (!exploreCollectionValue.includes(event.tokenName)) {
      SetExploreCollectionValue([...exploreCollectionValue, event.tokenName]);
    } else {
      let selectionAfterRemoval = exploreCollectionValue;
      selectionAfterRemoval = selectionAfterRemoval.filter(
        current => current !== event.tokenName
      );
      SetExploreCollectionValue([...selectionAfterRemoval]);
    }
  }
  // function removeCategoryExplore(value: string) {
  //   const index = exploreCategoryValue.indexOf(value);
  //   SetExploreCategoryValue([
  //     ...exploreCategoryValue.slice(0, index),
  //     ...exploreCategoryValue.slice(index + 1),
  //   ]);
  // }
  // remove category filter

  // active multi dropdown
  function isItemInSelection(item: any) {
    if (exploreCategoryValue.some(current => current === item.value)) {
      return true;
    }
    return false;
  }
  function isCollectionItemInSelection(item: any) {
    if (exploreCollectionValue.some(current => current === item.tokenName)) {
      return true;
    }
    return false;
  }

  function isSortByItemInSelection(item: any) {
    if (sortByOptionsSelected.value === item.value) {
      return true;
    }
    return false;
  }

  function handleChangeRewardText(value: any) {
    setRewardSearchValue(value);
    const filteredValue = categoryOptions.filter(
      row => row.label.indexOf(value.toUpperCase()) > -1
    );
    SetExploreCategoryOptions(filteredValue);
  }

  function handleChangeCollectionText(value: any) {
    setCollectionSearchValue(value);
    const filteredValue = collectionOptions.filter(
      row => row.tokenName.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
    SetExploreCollectionOptions(filteredValue);
  }

  // handle sort by filter
  // function handleSortByExplore(event: any) {}
  // handle sort text filter
  function handleChangeSortByText(value: any) {
    const filteredValue = sortByOptions.filter(
      row => row.label.toUpperCase().indexOf(value.toUpperCase()) > -1
    );
    SetExploreSortByOptions(filteredValue);
  }

  const selectCustomElementRef = useRef<any>([]);
  const selectCustomElement = (el: any) => {
    if (el && !selectCustomElementRef.current.includes(el)) {
      selectCustomElementRef.current.push(el);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick, false);
  }, [selectCustomElementRef]);

  const handleOutsideClick = (event: any) => {
    const filtered = selectCustomElementRef.current.filter((row: any) =>
      row?.contains(event.target)
    );
    if (filtered.length === 0) {
      setOpen(-1);
    }
  };

  function handleAucBuyNewFilter(value: any) {
    if (activeFilter === value) {
      setFilterActive(ACTIVEFILTER.ALL);
    } else {
      setFilterActive(value);
    }

    resetVariables(state.toggleInfo, value === ACTIVEFILTER.NEW);
  }

  return (
    <>
      <div className='trending'>
        <div className='wrapper'>
          <div className='trendingInner'>
            <h2
              className={
                pageName === '/nftExplore' ? 'hideContent' : 'showContent'
              }
            >
              Trending NFTs
            </h2>
            <div
              className={
                pageName === '/nftExplore' ? 'showContent' : 'hideContent'
              }
            >
              {/* <Link
                className='backLink'
                to={{
                  pathname: '/',
                }}
              >
                <img src='aro_lft.png' alt='aro_lft.png' /> Back to Mainpage
              </Link> */}
              <h3 className='exploreHeading'>
              Explore all DeFi NFTs
              </h3>
            </div>
            <div className='trendingFiltersHub'>
              {/* Left Side Trending Filters Start from here */}

              <div className='trendingNewMenu'>
              <ul>
                  <li  className='trendingActiveMenu'><a href="/nftExplore"><span><img src='/m1.svg' alt='menu' /><img src='/m1a.svg' alt='menu' /></span> Marketplace</a></li>
                  <li><a href="/launchpad"><span><img src='/m2.svg' alt='menu' /><img src='/m2a.svg' alt='menu' /></span> Launchpad</a></li>
                  <li><a href="/collections"><span><img src='/m3.svg' alt='menu' /><img src='/m3a.svg' alt='menu' /></span> Collections</a></li>
                  <li><a href="/nftFarm"><span><img src='/m5.svg' alt='menu' /><img src='/m5a.svg' alt='menu' /></span> Minting Studio</a></li>
                  {/* <li><a href=""><span><img src='/m4.svg' alt='menu' /><img src='/m4a.svg' alt='menu' /></span> Staking</a></li> */}
                  {/* <li><a href="/nftCreation"><span><img src='/m6.svg' alt='menu' /><img src='/m6a.svg' alt='menu' /></span> Mint NFTs</a></li> */}
                </ul>
                <ul>
                  {/* <li><a href=""><span><img src='/m7.svg' alt='menu' /><img src='/m7a.svg' alt='menu' /></span> Settings</a></li> */}
                  <li><a href="/myNft"><span><img src='/m5.svg' alt='menu' /><img src='/m5a.svg' alt='menu' /></span> My NFTs</a></li>
                  {/* {isConnected && (<li><a onClick={onDisconnect}><span><img src='/m8.svg' alt='menu' /><img src='/m8a.svg' alt='menu' /></span> Disconnect</a></li>)} */}
                  <li><a href=""><span><img src='/m8.svg' alt='menu' /><img src='/m8a.svg' alt='menu' /></span> Log Out</a></li>
                </ul>
              </div>

              {/* Left Side Trending Filters end here */}

              {/* Right Side Upper Trending Filters Start from here */}

              <div className='trendingFiltersRight hideMakingNew'>
                <div className='trendingFiltersHomeTrending'>
                  <div className='trendingFiltersLeft'>
                    <div className='trendingFiltersNew'>
                      <div className='trending1Explore'>
                        <div className='minPrice'>
                          <span>
                            <label>price:</label>
                            <input
                              type='number'
                              placeholder='Min'
                              onChange={evt =>
                                  debounced(props.setMinPrice(evt.target.value))
                              }
                            />
                          </span>
                        </div>
                        <div className='maxPrice'>
                          <span>
                            <label>price:</label>
                            <input
                              type='number'
                              placeholder='Max'
                              onChange={evt =>
                                  debounced(props.setMaxPrice(evt.target.value))
                              }
                            />
                          </span>
                        </div>
                      </div>
                      <div className='trending2Explore'>
                        <button
                          className={
                            activeFilter === ACTIVEFILTER.AUCTION
                              ? 'trendingActive'
                              : ''
                          }
                          onClick={() =>
                            handleAucBuyNewFilter(ACTIVEFILTER.AUCTION)
                          }
                        >
                          Auction
                        </button>
                        <button
                          className={
                            activeFilter === ACTIVEFILTER.BUYNOW
                              ? 'trendingActive'
                              : ''
                          }
                          onClick={() =>
                            handleAucBuyNewFilter(ACTIVEFILTER.BUYNOW)
                          }
                        >
                          Buy Now
                        </button>
                      </div>

                      <div className='trending3Explore'>
                        {/*<span>*/}
                        {/*  <label>*/}
                        {/*    <img src='search.svg' alt='search' /> Search:*/}
                        {/*  </label>*/}
                        {/*  <input*/}
                        {/*    type='text'*/}
                        {/*    placeholder='token, description'*/}
                        {/*    // onChange={event => props.setSearchString(event.target.value)}*/}
                        {/*  />*/}
                        {/*</span>*/}
                      </div>
                      <div className='trending4Explore customDropDown'>
                        {/* <span> */}
                        {/* <label>Select:</label> */}
                        <div ref={selectCustomElement} className='selectCustom'>
                          <div className='ddwrapper'>
                            <div
                              tabIndex={0}
                              className='ddheader'
                              role='button'
                              // onKeyPress={() => toggle()}
                              onClick={() => toggle(SelectOpenType.REWARD)}
                            >
                              <div
                                className={`ddheader__title ${
                                  open === SelectOpenType.REWARD ? 'open' : ''
                                }`}
                              >
                                <p className='ddheader__titleBold inputCat'>
                                  <input
                                    ref={inputCatTextHome}
                                    type='text'
                                    onChange={event =>
                                      handleChangeRewardText(
                                        event.target.value
                                      )
                                    }
                                    placeholder='Search'
                                  />
                                </p>
                                <p className='ddheader__titleBold inputText'>
                                  <label>Select:</label>
                                  Category
                                </p>
                              </div>
                            </div>
                            {open === SelectOpenType.REWARD && (
                              <ul className={clsx('ddlist', 'fullHeight')}>
                                {exploreCategoryOptions.map((item, index) => (
                                  <li
                                    className={`ddlistitem ${
                                      isItemInSelection(item) ? 'active' : ''
                                    }`}
                                    key={index}
                                  >
                                    <button
                                      type='button'
                                      onClick={() =>
                                        handleCategoryExplore(item)
                                      }
                                    >
                                      <div className='optionName'>
                                        <span>{item.value}</span>
                                        <img
                                          src={
                                            isItemInSelection(item)
                                              ? 'check-icon-active.svg'
                                              : 'check-icon.svg'
                                          }
                                          alt='check-icon'
                                        />
                                      </div>
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                        {/* <Select components={{DropdownIndicator}} placeholder="Category" className="select" styles={customStyles}  options={categoryOptions} onChange={handleCategoryExplore} /> */}
                        {/* </span> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='trendingFiltersExplore'>
                  <div className='trendingFilters'>
                    <div className='trending3'>
                      <span>
                        <label>
                          <img src='search.svg' alt='search' /> Search:
                        </label>
                        <input
                          ref={textSearchEL}
                          type='text'
                          value={props.searchString}
                          onChange={event => props.setSearchString(event.target.value)}
                          onKeyDown={e => {
                            if (
                              e.code === 'Enter' ||
                              e.code === 'NumpadEnter'
                            ) {
                              handleSetSearchTop(e);
                            }
                          }}
                          placeholder='token, description'
                        />
                      </span>
                    </div>
                    <div className='trending4'>
                      <div ref={selectCustomElement} className='selectCustom'>
                        <div className='ddwrapper'>
                          <div
                            tabIndex={0}
                            className='ddheader'
                            role='button'
                            // onKeyPress={() => toggle()}
                            onClick={() => toggle(SelectOpenType.SORTBY)}
                          >
                            <div
                              className={`ddheader__title ${
                                open === SelectOpenType.SORTBY ? 'open' : ''
                              }`}
                            >
                              <p className='ddheader__titleBold inputCat'>
                                <input
                                  ref={inputCatText}
                                  type='text'
                                  onChange={event =>
                                    handleChangeSortByText(event.target.value)
                                  }
                                  onClick={event => event.stopPropagation()}
                                  placeholder='Search'
                                />
                              </p>
                              <p className='ddheader__titleBold inputText'>
                                <label>
                                  <img src='filter-more.png' alt='filter' />{' '}
                                  Sort by: &nbsp;
                                </label>
                                {sortByOptionsSelected.value}
                              </p>
                            </div>
                          </div>
                          {open === SelectOpenType.SORTBY && (
                            <ul className={clsx('ddlist', 'fullHeight')}>
                              {exploreSortByOptions.map((item, index) => (
                                <li
                                  className={`ddlistitem ${
                                    isSortByItemInSelection(item)
                                      ? 'active'
                                      : ''
                                  }`}
                                  key={index}
                                  >
                                  <button
                                    type='button'
                                    onClick={() => handleSortByOptionsSelected(item)}
                                  >
                                    <div className='optionName'>
                                      <span>{item.label}</span>
                                      <img
                                        src={
                                          isSortByItemInSelection(item)
                                            ? 'check-icon-active.svg'
                                            : 'check-icon.svg'
                                        }
                                        alt='check-icon'
                                      />
                                    </div>
                                  </button>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                      {/* <span> */}
                      {/* <label>
                          <img src='filter-more.png' alt='filter' /> Sort by:
                        </label> */}
                      {/* <Dropdown title="Yield" items={sortByOptions} /> */}

                      {/* <Select components={{DropdownIndicator}}  styles={customStyles} options={sortByOptions} value={sortByOptionsSelected} onChange={handleSortByOptionsSelected}/> */}
                      {/* </span> */}
                    </div>
                    <div className='trending5'>
                      <button
                        className={state.toggleInfo ? '' : 'gridActive'}
                        onClick={() => handleToggleSmallLarge(false)}
                        // dispatch({ type: 'toggleInfo', value: false })
                      >
                        <img src='grid.svg' alt='' />
                      </button>
                      <button
                        className={state.toggleInfo ? 'gridActive' : ''}
                        onClick={() => handleToggleSmallLarge(true)}
                        // dispatch({ type: 'toggleInfo', value: true })
                      >
                        <img src='gridmore.svg' alt='' />
                      </button>
                    </div>
                  </div>
                </div>
                <div className='newFilterJey'>
                  <section className='newFilterJeyInner'>
                    <div className='newFilterJeyLeft'>
<section><label><img src='/search.svg' alt="search"/> Search:</label><input type="text" placeholder='reward token, collection, NFT '/></section>
<section>
  <div className='jeyDrops'>
    <span>Sale</span>
    <div className='jeyDropsValues'>
      <b>Sale</b>
      <b>Purchase</b>
      </div>
</div>
<div className='jeyDrops'>
    <span>Reward Token </span>
    <div className='jeyDropsValues'>
      <b>Reward Token </b>
      <b>Reward Token </b>
      </div>
</div>
<div className='jeyDrops'>
    <span>Sort</span>
    <div className='jeyDropsValues'>
      <b>Sort</b>
      <b>Sort</b>
      </div>
</div>
</section>
                    </div>
                    <div className='newFilterJeyRight'>
                      <section><button className='jeyActive'><i>Tokens</i></button><button><i>No Tokens</i></button></section>
                      <section><button className='jeyActive'><i>Ascending</i></button><button><i>Descending</i></button></section>
                    </div>
                  </section>
                </div>
                <div className='trendingFiltersLeft'>
                  <div className='trendingFiltersNew'>
                    <div className='trendingFiltersNewHub'>
                      <div className='trending2Explore'>
                        <button
                          className={
                            activeFilter === ACTIVEFILTER.AUCTION
                              ? 'trendingActive'
                              : ''
                          }
                          onClick={() =>
                            handleAucBuyNewFilter(ACTIVEFILTER.AUCTION)
                          }
                        >
                          {ACTIVEFILTER.AUCTION}
                        </button>
                        <button
                          className={
                            activeFilter === ACTIVEFILTER.BUYNOW
                              ? 'trendingActive'
                              : ''
                          }
                          onClick={() =>
                            handleAucBuyNewFilter(ACTIVEFILTER.BUYNOW)
                          }
                        >
                          {ACTIVEFILTER.BUYNOW}
                        </button>
                      </div>
                      <div className='trending1Explore'>
                        <div className='mobWidth'>
                          <span>
                            <label>Price:</label>
                            <input
                              type='number'
                              placeholder='Min'
                              onChange={evt => {
                                debounced(props.setMinPrice(evt.target.value))
                              }
                            }
                            />
                          </span>
                          <span>
                            <label>Price:</label>
                            <input
                              type='number'
                              placeholder='Max'
                              onChange={evt =>
                                  debounced(props.setMaxPrice(evt.target.value))
                              }
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className='trending4ExploreHub'>
                      <div className='trending4Explore customDropDown'>
                        <div ref={selectCustomElement} className='selectCustom'>
                          <div className='ddwrapper'>
                            <div
                              tabIndex={0}
                              className='ddheader'
                              role='button'
                              // onKeyPress={() => toggle()}
                              onClick={() => toggle(SelectOpenType.REWARD)}
                            >
                              <div
                                className={`ddheader__title ${
                                  open === SelectOpenType.REWARD ? 'open' : ''
                                }`}
                              >
                                <p className='ddheader__titleBold inputCat'>
                                  <input
                                    ref={inputCatText}
                                    type='text'
                                    value={rewardSearchValue}
                                    onChange={event =>
                                      handleChangeRewardText(
                                        event.target.value
                                      )
                                    }
                                    onClick={(e) => {e.stopPropagation()}}
                                    placeholder='Search'
                                  />
                                </p>
                                <p className='ddheader__titleBold inputText'>
                                  Reward Token
                                </p>
                              </div>
                            </div>
                            {open === SelectOpenType.REWARD && (
                              <ul className='ddlist'>
                                {exploreCategoryOptions.map((item, index) => (
                                  <li
                                    className={`ddlistitem ${
                                      isItemInSelection(item) ? 'active' : ''
                                    }`}
                                    key={index}
                                  >
                                    <button
                                      type='button'
                                      onClick={() =>
                                        handleCategoryExplore(item)
                                      }
                                    >
                                      <div className='optionName'>
                                        <span>{item.value}</span>
                                        <img
                                          src={
                                            isItemInSelection(item)
                                              ? 'check-icon-active.svg'
                                              : 'check-icon.svg'
                                          }
                                          alt='check-icon'
                                        />
                                      </div>
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>

                        {/* <div className='dropItemsHolder'>
                      <ul className='dropItems'>
                        {categoryOptions.length>0 && categoryOptions.map((item, index) => (
                          <li key={index}>{item.label}</li>
                        ))}
                      </ul>
                    </div> */}

                        {/* <span> */}
                        {/* <label>Select:</label> */}
                        {/* <Dropdown title="Category" items={categoryOptions} multiSelect/> */}
                        {/* <Select isSearchable={true} components={{DropdownIndicator}}  placeholder="Category" className="select" styles={customStyles}  options={categoryOptions} onChange={handleCategoryExplore} /> */}
                        {/* </span> */}
                      </div>
                      <div className='trending4Explore customDropDown'>
                        <div ref={selectCustomElement} className='selectCustom'>
                          <div className='ddwrapper'>
                            <div
                              tabIndex={0}
                              className='ddheader'
                              role='button'
                              // onKeyPress={() => toggle()}
                              onClick={() => toggle(SelectOpenType.COLLECTION)}
                            >
                              <div
                                className={`ddheader__title ${
                                  open === SelectOpenType.COLLECTION ? 'open' : ''
                                }`}
                              >
                                <p className='ddheader__titleBold inputCat'>
                                  <input
                                    ref={inputCollectionText}
                                    type='text'
                                    value={collectionSearchValue}
                                    onChange={event =>
                                      handleChangeCollectionText(
                                        event.target.value
                                      )
                                    }
                                    onClick={(e) => {e.stopPropagation()}}
                                    placeholder='Search'
                                  />
                                </p>
                                <p className='ddheader__titleBold inputText'>
                                  Collections
                                </p>
                              </div>
                            </div>
                            {open === SelectOpenType.COLLECTION && (
                              <ul className='ddlist'>
                                {exploreCollectionOptions.map((item, index) => (
                                  <li
                                    className={`ddlistitem ${
                                      isCollectionItemInSelection(item) ? 'active' : ''
                                    }`}
                                    key={index}
                                  >
                                    <button
                                      type='button'
                                      onClick={() =>
                                        handleCollectionExplore(item)
                                      }
                                    >
                                      <div className='optionName'>
                                        <span>{item.tokenName}</span>
                                        <img
                                          src={
                                            isCollectionItemInSelection(item)
                                              ? 'check-icon-active.svg'
                                              : 'check-icon.svg'
                                          }
                                          alt='check-icon'
                                        />
                                      </div>
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>

                        {/* <div className='dropItemsHolder'>
                      <ul className='dropItems'>
                        {categoryOptions.length>0 && categoryOptions.map((item, index) => (
                          <li key={index}>{item.label}</li>
                        ))}
                      </ul>
                    </div> */}

                        {/* <span> */}
                        {/* <label>Select:</label> */}
                        {/* <Dropdown title="Category" items={categoryOptions} multiSelect/> */}
                        {/* <Select isSearchable={true} components={{DropdownIndicator}}  placeholder="Category" className="select" styles={customStyles}  options={categoryOptions} onChange={handleCategoryExplore} /> */}
                        {/* </span> */}
                      </div>
                      {/* {exploreCategoryValue && exploreCategoryValue.length > 0 && (
                        <div className='trendingExploreValues'>
                          {exploreCategoryValue.map((item, index) => (
                            <span key={index}>
                              {item}
                              <label
                                onClick={() => removeCategoryExplore(item)}
                              >
                                <i className='far fa-times-circle'></i>
                              </label>
                            </span>
                          ))}
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>
                <div className='trendingInfo'>
                  <ul className={state.toggleInfo ? 'trendingInfoGrid' : ''}>
                    {props.filteredNFTs && props.filteredNFTs.length > 0
                      ? props.filteredNFTs.map((postObj: any, index: any) => (
                          <Nft
                            key={index}
                            postObj={postObj}
                            index={index}
                            state={state}
                            handleTogglePopupClick={() =>
                              dispatch({ type: 'togglePopup' })
                            }
                            SetCurrentPost={SetCurrentPostPopup}
                          />
                        ))
                      : !loading && (
                          <div className='noPosts'>
                            <p>No NFTs yet</p>
                          </div>
                        )}

                    {loading &&
                      skeleton.map((item, index) => (
                        <li className='skeletonLoading' key={index}>
                          <div className='img skeleton'>&nbsp;</div>
                          <span
                            // className={state.toggleInfo ? 'popBlowHide' : ''}
                          >
                            <label className='skeleton labelSkeleton'>
                              &nbsp;
                            </label>
                            <label className='skeleton'>&nbsp;</label>
                          </span>
                        </li>
                      ))}
                  </ul>
                  {props.pageIdentity !== 'explore' && (
                    <a className='refreshBtn' onClick={handleShowMorePosts}>
                      <img src='refresh.png' alt='refresh' /> LOAD MORE
                    </a>
                  )}

                  <Link
                    className='showme'
                    to={{
                      pathname: '/nftExplore',
                    }}
                  >
                    all NFTs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NftPopup
          currentPost={currentPostPopup}
          state={state}
          handleTogglePopupClick={() => [
            dispatch({ type: 'togglePopup' }),
            dispatch({ type: 'toggleInfo', value: false }),
          ]}
        />
      </div>
    </>
  );
};

export default NftTrending;
