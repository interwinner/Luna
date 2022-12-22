import React from 'react';

const BondStep3 = (props: any) => {
  return (
    <>
      <div className='decideFarm'>
        <div className='decideFarmManage'>
          <ul className='decideFarmHead'>
            <li>Pool</li>
            <li>
              LP Balance <img src='info.png' alt='info' />
            </li>
            <li>Value</li>
            {/* <li>TX Fee Profit</li> */}
            <li>Currrent APR</li>
            <li>&nbsp;</li>
          </ul>
          <ul className='decideFarmList'>
            <li>
              <div className='multiFlagImg'>
                <img src='image87.svg' alt='image87.svg' />
                <img src='image86.svg' alt='image86.svg' />
              </div>
              LUNA - UST
            </li>
            <li>5.000401 LP</li>
            <li className='multiValues'>
              76,733.35 UST
              <div className='loop'>
                <p>7,542.00 LOOP</p>
                <p>29,323.00 UST</p>
              </div>
            </li>
            {/* <li>231 UST</li> */}
            <li>55%</li>
            <li>
              <span className='arrowDrown'>
                <img src='dArrow.png' alt='' />
              </span>
            </li>
          </ul>
        </div>
        <div className='FarmManageMobile'>
          <div>
            <label>Pool</label>{' '}
            <span>
              <div className='multiFlagImg'>
                <img src='image87.svg' alt='image87.svg' />
                <img src='image86.svg' alt='image86.svg' />
              </div>
              LUNA - UST
            </span>
          </div>

          <div>
            <label>
              LP Balance <img src='info.png' alt='info' />
            </label>
            <span>5.000401 LP</span>
          </div>
          <div>
            <label>Value</label>
            <span className='multiValues'>
              76,733.35 UST
              <div className='loop'>
                <p>7,542.00 LOOP</p>
                <p>29,323.00 UST</p>
              </div>
            </span>
          </div>
          <div>
            <label>TX Fee Profit</label>
            <span>231 UST</span>
          </div>
          <div>
            <label>APY</label>
            <span>
              55% <img src='dArrow.png' alt='image' />
            </span>
          </div>
        </div>
        <div className='decideFarmHolder'>
          <div className='decideBalance'>
            <div className='decideBalanceTop'>
              <div className='decideBalanceSplit'>
                Balance: <span>5.00041</span> LOOP
                <span className='highlight'>MAX</span>
              </div>
              <div className='decideBalanceSplit decideBalanceSplitEmpty'></div>
            </div>
          </div>
          <div className='decideBalance decideBalanceStake'>
            <div className='decideBalanceManage'>
              <div className='decideBalanceSplit first'>
                <span><input type="text" value="3.000401 LP" /></span>
                <p>~10,000 UST</p>
              </div>
              <div className='decideBalanceSplit'>
                <button className='primaryBtnTask'>STAKE</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BondStep3;
