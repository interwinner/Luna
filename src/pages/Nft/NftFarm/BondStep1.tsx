import React from 'react';

const BondStep1 = (props: any) => {
  return (
    <>
      <div className='preview'>
        <h4>Preview</h4>
        <div className='trendingInfo'>
          <ul className=''>
            {props.postsToShow.length > 0 &&
              props.postsToShow.map((postObj: any, index: any) => (
                <li key={index}>
                  <div className='imageHolder'>
                    <img src={'/' + postObj.img} alt={postObj.img} />
                    <div className='imgFloatContent'>
                      <div className='apr'>
                        <span>
                          APR: <i>{postObj.apr}</i>
                        </span>
                      </div>
                      {postObj.type === 2 && (
                        <div className='aprTimeLeft'>
                          <span>
                            <img
                              src='/active-hammer.svg'
                              alt='/active-hammer.svg'
                            />
                            {postObj.timeLeft}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <span className=''>
                    <label>
                      <b>{postObj.catName}</b>{' '}
                      <p>
                        Price: <i>{postObj.price}</i> &nbsp;UST
                      </p>
                    </label>
                    <label className='belowLabel'>
                      <p>{postObj.name}</p>
                    </label>
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className='previewYield'>
        {/* <h4>Yield</h4> */}
        <div className='previewMap'>
          <img src='/mapFarm.svg' alt='/mapFarm.svg' />
        </div>
      </div>
    </>
  );
};

export default BondStep1;
