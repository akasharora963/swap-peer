import { getAddress } from '@ethersproject/address';

import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { SupportedInterfaceChainId, getNetworkConfig } from '@/constants/chain';

import { envConfig } from '../config';

// returns the checksummed address if the address is valid, otherwise returns false
export function isAddress(value?: string | null | undefined): string | false {
  if (!value) {
    return false;
  }
  try {
    // Alphabetical letters must be made lowercase for getAddress to work.
    // See documentation here: https://docs.ethers.io/v5/api/utils/address/
    return getAddress(value.toLowerCase());
  } catch {
    return false;
  }
}


export const getProvider = (): StaticJsonRpcProvider => {
  const chainId = envConfig.chainId as SupportedInterfaceChainId;

  const config = getNetworkConfig(chainId);

  if (!config) {
    throw new Error(`Network config not found for chainId: ${chainId}`);
  }

  if (!config?.RPC[0]) {
    throw new Error(`No RPC URL found for chainId: ${chainId}`);
  }

  const provider = new StaticJsonRpcProvider(config.RPC[0], config.id);

  return provider;
};