import React from 'react';

const NftPopup = (props: any) => {
  const state = props.state;
  return (
    <>
      {state.togglePopup !== null && (state.toggleInfo || !state.toggleInfo) && (
        <a href={`/nftDetail/${props.currentPost.id}`}>
          <div className={state.togglePopup ? '' : state.popBlowHide}>
            <div className='popBlow' onClick={props.handleTogglePopupClick}>
              <ul>
                <li>
                  <div>
                    <img src='/trendingPost5.png' alt='trending' />

                    <img className='goMore' src='/arrow.svg' alt='trending' />
                  </div>
                  <span>
                    <label>
                      <b>{props.currentPost.catName}</b>
                      <p>
                        Price: <i>{props.currentPost.price}</i>&nbsp;UST
                      </p>
                    </label>
                    <label className='belowLabel'>
                      <b>{props.currentPost.name}</b>
                      <p>
                        APR:<i>{props.currentPost.apr}</i>
                      </p>
                    </label>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </a>
      )}
    </>
  );
};
export default NftPopup;
