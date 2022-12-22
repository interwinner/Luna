import { useState } from 'react';
import NftFooter from '../Nft/NftFooter';
import NftHeader from '../Nft/NftHeader';
const collectionsdetail = (props: any) => {
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
<div className='headerBack'><a href="/collections">Back</a></div>
<div className='topCreationDetailsHub baseline'>
  <div className='topCreationLeft'>
  <div className='topCreationLeftNames'>
      <h6>SYN CITY: Limited Blueprint</h6>
</div>
<div className='topCreationLeftFollowers'>
<ul>
<li>
  <span className='artImage'><img src='/lunartImages/topartist1.png' alt="images"/></span>
    <h6>Digital Artist<p>Venom Jones</p></h6>
  </li>
  <li>
  <span className='artImage'><img src='/lunartImages/topartist.png' alt="images"/></span>
    <h6>Painter<p>David Russel</p></h6>
  </li>
</ul>
<div className='topFollowersCreation'>
<ul>

  <li>
  <button className='activeTopResult'><img src='/lunartImages/NotLiked.svg'/><img src='/lunartImages/Liked.svg'/></button>
    <h6>Likes<p>3,517</p></h6>
  </li>
  <li>
  <button><img src='/lunartImages/NotSuperliked.svg'/><img src='/lunartImages/SuperLiked.svg'/></button>
    <h6>Super-Likes<p>2,000</p></h6>
  </li>
  <li>
  <span><img src='/lunartImages/ItemsCollection.svg'/></span>
    <h6>Items<p>11K</p></h6>
  </li>
</ul>
</div>
<p>Jacob Jones Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles living on the Ethereum blockchain. Your Bored Ape doubles as your Yacht Club membership card, and grants access to members-only benefits, the first of which is access to THE BATHROOM, a collaborative graffiti board. Future areas and perks can be unlocked by the community through roadmap activation. Visit www.BoredApeYachtClub.com for more details.</p>
</div>
  </div>
  <div className='topCreationRight'>
    <span className="topCreationRightSpan"><img src="/lunartImages/p1.png" alt=""/></span>
    <ul><li><img src="/lunartImages/p2.png" alt=""/></li><li><img src="/lunartImages/p3.png" alt=""/></li><li><img src="/lunartImages/p4.png" alt=""/></li></ul>
  </div>
</div>
        </div>
      </div>
      <div className='launchpadArtistsInner artDetailset'>
          <div className='wrapper'>
            <h2><b>Items in </b>
            <span>Collection</span> <section><button className='active'>All</button><button><label><img src='/lunartImages/topartist1.png' alt="images"/></label> Venom Jones</button><button><label><img src='/lunartImages/topartist.png' alt="images"/></label> David Russel</button></section></h2>
            <div className='tagsProducts'>
              <ul className='gallerySet'>
                <li>
                <a href="">
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
                <li>
                <a href="">
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
                <li>
                <a href="">
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
                <li>
                <a href="">
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
                <li>
                <a href="">
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
                </ul>
                </div>
            
            </div>
            </div>
           
        <NftFooter />
      </div>
  );
};

export default collectionsdetail;
