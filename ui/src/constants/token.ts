import { Address } from 'viem';

interface TokenInfo {
  readonly chainId: number;
  readonly address: Address;
  readonly name: string;
  readonly decimals: number;
  readonly symbol: string;
  readonly logoURI?: string;
}

export const ERC20_TEST_TOKEN_LIST: TokenInfo[] = [
    {
      address: '0xD88957c98D65E9bee30304290f734847De09B990',
      name: 'tSpace',
      symbol: 'tSPACE',
      chainId: 168587773,
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/SpaceFinance/default-token-list/master/assets/0xD88957c98D65E9bee30304290f734847De09B990.png',
    },
    {
      address: '0x4200000000000000000000000000000000000022',
      name: 'Usdb',
      symbol: 'USDB',
      chainId: 168587773,
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/SpaceFinance/default-token-list/master/assets/0x4200000000000000000000000000000000000022.png',
    }
]