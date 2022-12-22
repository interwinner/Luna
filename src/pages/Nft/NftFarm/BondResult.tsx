import React from 'react';

const BondResult = (props: any) => {
  return (
    <>
    <div className='waitApprovalHub'>
      <div className='waitApprovalPopup approval1'>
          <span><img className='rotating' src='./timer.png' alt=""/></span>
          <h6>Waiting for approval</h6>
          <p>Approve transaction from extension or mobile app to mint your LP NFT!</p>
          <button>CANCEL</button>
      </div>

      <div className='waitApprovalPopup approval2'>
          <span><img className='rotating' src='./loader.png' alt=""/></span>
          <h6>Minting Your LP NFT!</h6>
          <p>Please wait while your request is being processed</p>
          <button>CANCEL</button>
      </div>

      <div className='waitApprovalPopup approval3'>
          <span><img src='./waitTick.png' alt=""/></span>
          <h6>LP NFT Minted!</h6>
          <p>Your transaction has been successfull!</p>
          <label><b>Transaction ID :</b> 19kjhe3h2ieuh1eho1neiu23eoneoi12e01ux</label>
          <div className='buttonMints'><button>Mint Another</button>
          <button>View NFT</button></div>
      </div>

      <div className='waitApprovalPopup approval4'>
          <span><img src='./close1.png' alt=""/></span>
          <h6>Transaction Failed</h6>
          <p>Not to worry, it happens sometimes due to platform congestion. Try again.</p>
          <button className='mintNow'>Mint Now!</button>
      </div>
    </div>
    </>
  );
};

export default BondResult;
