import { useState } from 'react';

const BondStep4 = (props: any) => {
  const [farmingPeiod, SetFarmingPeriod] = useState([
    {
      period: '3 months',
      percent: '50%',
    },
    {
      period: '6 months',
      percent: '120%',
    },
    {
      period: 'Permanent',
      percent: '400%',
    },
  ]);
  return (
    <>
      <div className='farmingPeriodHold'>
        {farmingPeiod.map((item, index) => (
          <div key={index} className='farmingPeriod'>
        <input type="radio"/>
      <div className='farmingPeriodInner'>
            <div className='imageHolder'>
              <div className='image'></div>
              <div className='period'>{item.period}</div>
            </div>
            <div className='statics'>
              <span className='arrowUp'></span>
              <span>{item.percent}</span> APY
            </div>
            <p>100,000 LOOP (40,000 UST)</p>
            <p>1,099 LOOP/day</p>
            <p>91 days</p>
          </div>
      </div>
        ))}
      </div>
    </>
  );
};

export default BondStep4;
