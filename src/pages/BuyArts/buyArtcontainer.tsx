import react from 'react'
import BuyArts from './buyArts';
import CrossIcon from '../../assets/icons/cross.svg'


export const BuyArtSection = ({ handlebuyArtPopState}: any) => (
  <div className='buyArtsWrapper'>
    <div>
      <button className="round-close-button" onClick={() => { handlebuyArtPopState(false)}}>
        <img src={CrossIcon} />
      </button>
    </div>
    <div className="heading">
      <p className="heading-title">Buy ARTS</p>
    </div>
    <BuyArts />
  </div>
)


const BuyArtContainer = () => {
  return (
    <>
      <div className="buy-art-container" id='buyArts-page'>
        <BuyArtSection />
      </div>
    </>
  )
}




export default BuyArtContainer;