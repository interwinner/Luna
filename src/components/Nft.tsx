import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Nft = (props: any) => {

  const [timeLeft, setTimeLeft] = useState('0')
  const [timeLeft2, setTimeLeft2] = useState('0')
  const postObj = props.postObj;
  const index = props.index;
  const state = props.state;
  useEffect(() => {
    const timer = setInterval(() => {
      const currentTime = Date.now()
      if (currentTime > postObj.endTime) {
        setTimeLeft('0')
        setTimeLeft2('0')
      }
      else {
        const timeDiff = (postObj.endTime - currentTime) / 1000
        const d = Math.floor(timeDiff / (3600*24)); 
        const h = Math.floor(timeDiff % (3600*24) / 3600);
        const m = Math.floor(timeDiff % 3600 / 60);
        const s = Math.floor(timeDiff % 60);

        setTimeLeft(d+'d'+' '+h+':'+m+':'+s)
        setTimeLeft2('<label><b>'+d+'</b>D</label> : <label><b>'+h+'</b>H</label> : <label><b>'+m+'</b>M</label> : <label><b>'+s+'</b>S</label>')
        
        /*
        _timeLeft = `${((timeDiff % 60000) / 1000).toFixed(0)}`
        if (timeDiff < 60000) {
          setTimeLeft(_timeLeft)
          setTimeLeft2('<label><b>0</b>D</label> : <label><b>0</b>H</label> : <label><b>0</b>M</label> : <label><b>'+_timeLeft+'</b>S</label>')
        }
        else {
          _timeLeft = `${((timeDiff % (60000 * 60)) / 60000).toFixed(0)}:${_timeLeft}`
          if (timeDiff < 60000 * 60) setTimeLeft(_timeLeft)
          else {
            _timeLeft = `${((timeDiff % (60000 * 60 * 24)) / (60000 * 60)).toFixed(0)}:${_timeLeft}`
            if (timeDiff < 60000 * 60 * 24) setTimeLeft(_timeLeft)
            else {
              _timeLeft = `${(timeDiff / (60000 * 60 * 24)).toFixed(0)}d ${_timeLeft}`
              setTimeLeft(_timeLeft)
            }
          }
        }*/
      }
    }, 1000)
    return () => clearInterval(timer)
  }, [postObj])
  return (
    <>
      <li
        key={index}
        onClick={() => {
          props.SetCurrentPost(postObj);
          // props.handleTogglePopupClick();
        }}
      >
        <Link to={`/nftDetail/${postObj.id}`}>
          <div className='imageHolder'>
            <img src={`/${postObj.img}`} alt={postObj.img} />
            {postObj.type === 2 &&
              !state.toggleInfo &&
              props.pageIdentity !== 'explore' && (
                <div className='aprTimeLeft aprTimeLeftTop'>
                  {/* <span>
                    <img
                      src='/active-hammer-black.svg'
                      alt='/active-hammer-black.svg'
                    />
                    {timeLeft} 
                  </span>*/}
                </div>
              )}
            <div
              className={`imgFloatContent`}
            >
              {/* <div className='apr'>
                <span>
                  APR: <i>{postObj.apr}%</i>
                </span>
              </div> */}
              {postObj.type === 2 && (
                <div className='aprTimeLeft'>
                  <span>
                    <img src='/active-hammer.svg' alt='/active-hammer.svg' />
                    {timeLeft}
                  </span>
                </div>
              )}
            </div>
          </div>
          <span>
            <label>
              <b>{postObj.catName}</b>{' '}
              <p>
                Price: <i>{postObj.price}</i> <b>UST</b>
              </p>
            </label>
            <label className='belowLabel'>
              <p>{`${postObj.tokenName}${postObj.tokenId !== '' ? ' #'+postObj.tokenId : ''}`}</p>
            </label>
            <label><p>Rewards: 10,000 LOOP/ 365 days</p></label>
            <div className='counterButton'>
              <button>BUY NOW</button>
              <div className='counterNewSet'>
                <span><img src='/counterT.png' alt="image"/></span>
                <span dangerouslySetInnerHTML={{ __html: timeLeft2}}></span>
              </div>
            </div>
          </span>
        </Link>
      </li>
    </>
  );
};
export default Nft;
