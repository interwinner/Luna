import React from 'react';

const BondStep2 = (props: any) => {
  return (
    <>
      <div className='previewStep2 fullWidth'>
        <div className='trendingInfo'>
          <ul className='trendingInfoGrid'>
            {props.postsToShow.length > 0 &&
              props.postsToShow.map((postObj: any, index: any) => (
                <li key={index}>
                  <input type="checkbox"/>
                  <div className='imageHolder'>
                    <img src={'/' + postObj.img} alt={postObj.img} />
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default BondStep2;
