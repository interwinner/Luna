import React, { useCallback, useState } from 'react';

import { useTerraWebapp } from 'hooks/context';
import useTransaction from 'hooks/useTransaction';
import { mintMsg } from 'helper/contractMsg';

import TrendingPosts from '../../TrendingPosts';
import BondStep1 from './BondStep1';
import BondStep2 from './BondStep2';
import BondStep4 from './BondStep4';
import BondStep3 from './BondStep3';
import BondStep5 from './BondStep5';
import BondResult from './BondResult';

const NftFarm = () => {
  const { networkType, address } = useTerraWebapp();
  const { txStatus, txInfo, txHash, estimateGas, submit } = useTransaction();

  const [postsToShow] = useState<any[]>([TrendingPosts[0]]);
  const slicedPosts = TrendingPosts.slice(0, 5);
  const [postsToShowStep2] = useState<any[]>(slicedPosts);
  const [stepsData] = useState([
    {
      head: 'DeFi Minting Studio',
      step: 'Preview',
      subtitle: 'Create your Own NFT LP Bond',
    },
    {
      head: 'Choose your artwork',
      step: 'Artwork',
      subtitle: 'Customise your position',
    },
    {
      head: 'Choose how much LP to Bond',
      step: 'Liquidity',
      subtitle: 'Permanently lock your liquidity in the protocol',
    },
    {
      head: 'Choose distribution period',
      step: 'Term',
      subtitle: 'Guarantee Your yield',
    },
    {
      head: 'Mint your NFT LP Bond',
      step: 'Mint',
      subtitle: 'Guarantee Your yield',
    },

  ]);
  const [step, setStep] = useState(1);

  const btnHandler = useCallback(
    async (currentStep: number) => {
      setStep(currentStep <= 6 ? Math.max(1, currentStep) : 5);
      if (step === 5) {
        const txMsg = mintMsg({ address, networkType });
        const fee = await estimateGas(txMsg);
        console.log('FEE:', fee);
        submit(txMsg);
      }
    },
    [networkType, address, step, estimateGas, submit]
  );
  console.log('CONTRACT CALL', txStatus, txInfo, txHash);
  return (
    <div className='nftBondHold'>
      <div className='wrapper'>
        <div className='nftBond'>
          <div className='nftBondHeadHold'>
          { step != 6 && 
            <div className='nftBondHead'>
              <h2>{stepsData[step - 1] && stepsData[step - 1].head && stepsData[step - 1].head}</h2>
              <p>
                {stepsData[step - 1] && stepsData[step - 1].subtitle && stepsData[step - 1].subtitle}
              </p>
            </div>
            }
            <div className='nftBondSection'>
              <div className='nftBondPreviewYield'>
                {step === 1 && <BondStep1 postsToShow={postsToShow} />}
                {step === 2 && <BondStep2 postsToShow={postsToShowStep2} />}
                {step === 3 && <BondStep3 />}
                {step === 4 && <BondStep4 />}
                {step === 5 && <BondStep5 postsToShow={postsToShow} />}
                {step === 6 && <BondResult />}
              </div>
            </div>
          </div>
          { step != 6 && <div className='nftBondFoot'>
            
            <div className='bondNavigation'>
              <div className='navSteps'>
                {stepsData.map((item, index) => (
                  <>
                    <div key={index} className='stp stepsHigh'>
                      <span
                        className={`${index + 2 < step ? 'final' : ''} ${
                          index + 1 < step ? 'complete' : ''
                        } ${index + 1 === step ? 'active' : ''}`}
                      >
                        {index + 1 < step ? (
                          <img src='/iconCheck.svg' alt='' />
                        ) : (
                          index + 1
                        )}
                      </span>
                      <h6
                        className={`${index + 2 < step ? 'final' : ''} ${
                          index + 1 < step ? 'complete' : ''
                        } ${index + 1 === step ? 'active' : ''}`}
                      >
                        {item.step}
                      </h6>
                    </div>
                    {index !== stepsData.length - 1 && (
                      <div className='stp stepsLine'>
                        <div
                          className={`${index + 2 < step ? 'final' : ''} ${
                            index + 1 < step ? 'complete' : ''
                          } ${index + 1 === step ? 'active' : ''}`}
                        ></div>
                      </div>
                    )}
                  </>
                ))}
              </div>
            </div>
            <div
              className={`bondBtn ${
                step > 1 && step < 5 ? 'bothbtn' : ''
              } primaryBtnTask`}
            >
              <button
                
                className={`${
                  step < 2 || step > 5 ? 'hidenow' : ''
                } primaryBtnTask`}
                onClick={() => btnHandler(step - 1)}
                style={{ marginRight: '14px' }}
              >
                Back
              </button>
              <button
                onClick={() => btnHandler(step + 1)}
                className={`${step > 4 ? 'final' : ''} primaryBtnTask`}
              >
                {step < 2 ? 'Start' : step === 5 ? 'Mint Now!' : 'Next'}
              </button>
            </div>
           
            
          </div>
          } 
        </div>
      </div>
    </div>
  );
};

export default NftFarm;
