import axios from 'axios';
import { useQuery } from 'react-query';

import { useTerraWebapp } from './context';

type Denom = string;
type Amount = string;
type GasPrices = Record<Denom, Amount>;

const useGasPrice = () => {
  const { network } = useTerraWebapp();

  return useQuery('gasPrices', async () => {
    const { data } = await axios.get<GasPrices>('/v1/txs/gas_prices', {
      baseURL: network.lcd.replace('lcd', 'fcd'),
    });

    return data;
  });
};

export default (denom?: Denom) => {
  const { data: gasPrices } = useGasPrice();
  return gasPrices ? (denom ? gasPrices[denom] : gasPrices) : null;
};
