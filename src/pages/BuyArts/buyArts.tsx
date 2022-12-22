import React from 'react';
import RewardIcon from '../../assets/icons/rewards.svg'
import UstIcon from '../../assets/icons/ust.svg';
import './buy-arts.scss'
import DownArrow from '../../assets/icons/down_arrow.svg';
import CartIcon from '../../assets/icons/cart.svg'

const BuyArt = () => {
  return (
    <>
    {/* <Modal
              isOpen={isOpenStakeModal}
              title='Buy ARTS'
              onClose={closeStakeModal}
            >
              <div className='buyArtModal'>
              <div className="card-wrapper">

<div className="card-content-wrapper">

  <div className="card-heading">
    <p className='title'>Buy ARTS</p>
    <p className="sub-title">ARTS is the utility token for Lunart</p>
  </div> 

  <div className="">
    <div className="card-content-row">
      <div className="farm-form-text">
        Balance
      </div>
      <div className="farm-form-text">
        <span className="farm-form-text">0.00 </span>
        <span className="farm-form-text">UST</span>
        <span className="seperator"> |</span>
        <span className="colored"><a href="">Add Balance</a></span>
      </div>
    </div>
    <div className="input-box">
      <span ><img src={UstIcon} /><span>UST</span></span>
      <input type="text" placeholder='128' />
      <button>max</button>
    </div>
  </div>
  <div style={{ display: 'flex', justifyContent: 'center', padding: '24px', }}>
    <div className="round-button">
      <img src={DownArrow} />
    </div>
  </div>

  <div className="input-box-2">
    <span ><img src={RewardIcon} /><span>ARTS</span></span>
    <input type="text" placeholder='0.00' />
    <button>max</button>
  </div>

  <div >
    <button className="farm-button">
      <img src={CartIcon} /> Buy ARTS
    </button>
  </div>

</div>
</div>
              </div>
            </Modal> */}
      <div className="card-wrapper">

        <div className="card-content-wrapper">

          <div className="card-heading">
            <p className='title'>Buy ARTS</p>
            <p className="sub-title">ARTS is the utility token for Lunart</p>
          </div> 

          <div className="">
            <div className="card-content-row">
              <div className="farm-form-text">
                Balance
              </div>
              <div className="farm-form-text">
                <span className="farm-form-text">0.00 </span>
                <span className="farm-form-text">UST</span>
                <span className="seperator"> |</span>
                <span className="colored"><a href="">Add Balance</a></span>
              </div>
            </div>
            <div className="input-box">
              <span ><img src={UstIcon} /><span>UST</span></span>
              <input type="text" placeholder='128' />
              <button>max</button>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', padding: '24px', }}>
            <div className="round-button">
              <img src={DownArrow} />
            </div>
          </div>

          <div className="input-box-2">
            <span ><img src={RewardIcon} /><span>ARTS</span></span>
            <input type="text" placeholder='0.00' />
            <button>max</button>
          </div>

          <div >
            <button className="farm-button">
              <img src={CartIcon} /> Buy ARTS
            </button>
          </div>

        </div>
      </div>
    </>
  )
}

export default BuyArt;