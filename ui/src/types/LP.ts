import { Contract, ContractTransaction, Overrides } from '@ethersproject/contracts';
//import { Address } from 'viem'

export interface LPContract extends Contract {
    getReserves(): Promise<bigint[]>;

    addLiquidity(
        amountA: bigint,
        amountB: bigint,
        overrides?: Overrides
    ): Promise<ContractTransaction>;

}