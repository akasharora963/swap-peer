import { Address } from 'viem';

export interface TokenInfo {
  readonly chainId: number;
  readonly address: Address;
  readonly name: string;
  readonly decimals: number;
  readonly symbol: string;
  readonly logoURI?: string;
}

export const ERC20_TEST_TOKEN_LIST: TokenInfo[] = [
    {
      address: '0x8c96F45dC30F01d74Be48729783a7811325dA4c1',
      name: 'Peer',
      symbol: 'PER',
      chainId: 168587773,
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/SpaceFinance/default-token-list/master/assets/0xD88957c98D65E9bee30304290f734847De09B990.png',
    },
    {
      address: '0x0bB64c93a01EF98687143a5885b2aF44A3705F2c',
      name: 'Play',
      symbol: 'PLY',
      chainId: 168587773,
      decimals: 18,
      logoURI:
        'https://raw.githubusercontent.com/SpaceFinance/default-token-list/master/assets/0x4200000000000000000000000000000000000022.png',
    }
]

export const LP = "0xC7c8642F16077227bC241B809A6A93eFF67a428B"

export const LPT = "0xb788cc8162cf064580685964c926ef49b74044ba"