import { useMemo } from 'react';
import { Contract, ContractInterface } from '@ethersproject/contracts';
import { useAccount } from './useAccount';
import { useEthersProvider } from './useEthersProvider';
import { AddressZero } from '@ethersproject/constants';
import { isAddress, getProvider } from '@/utils';
import { Address } from 'viem';
import { LPContract } from '@/types/LP';


export function useContract(
  contractAddress: Address,
  ABI: ContractInterface
):
  | Contract
  | LPContract
  | undefined {
  const { chainId, address: userAddress } = useAccount();
  const provider = useEthersProvider({ chainId });

  return useMemo(() => {
    if (!isAddress(contractAddress) || contractAddress === AddressZero) {
      return undefined;
    }

    if (!userAddress) {
      const privateProvider = getProvider();
      return new Contract(contractAddress, ABI, privateProvider);
    }

    const signer = provider?.getSigner(userAddress);

    return new Contract(contractAddress, ABI, signer);
  }, [contractAddress, ABI, provider, userAddress]);
}
