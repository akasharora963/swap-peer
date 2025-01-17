import { useCallback } from 'react';
import { useContract } from './useContract';
import { LPContract } from '@/types/LP'
import { Address } from 'viem';
import { LP } from '@/constants/token';
import { lpAbi } from '@/constants/abi/pool';
import { ethers } from 'ethers';


// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export function useLP() {
    const lp = useContract(
        LP as Address,
        lpAbi
    ) as LPContract;


    const addLiquidity = useCallback(
        async (amountA: bigint, amountB: bigint) => {
            if (!lp) return;

            const gasEstimate = await lp.estimateGas.addLiquidity(
                amountA,
                amountB
            );
            const tx = await lp.addLiquidity(amountA, amountB, {
                gasLimit: gasEstimate.toBigInt(),
            });
            await tx.wait();
            return tx;
        },
        [lp]
    );

    const removeLiquidity = useCallback(
        async (liquidityAmount: bigint) => {
            if (!lp) return;

            const gasEstimate = await lp.estimateGas.removeLiquidity(
                liquidityAmount
            );
            const tx = await lp.removeLiquidity(liquidityAmount, {
                gasLimit: gasEstimate.toBigInt(),
            });
            await tx.wait();
            return tx;
        },
        [lp]
    );

    const swap = useCallback(
        async (inputAmount: bigint, inputToken: Address) => {
            if (!lp) return;

            const gasEstimate = await lp.estimateGas.swap(
                inputAmount,
                inputToken
            );
            const tx = await lp.swap(inputAmount, inputToken, {
                gasLimit: gasEstimate.toBigInt(),
            });
            await tx.wait();
            return tx;
        },
        [lp]
    );

    const getReserves = useCallback(
        async (): Promise<{
            formatedReserveA: string,
            formatedReserveB: string
        }> => {
            if (!lp) {
                console.error('Router contract instance not available');
                return {
                    formatedReserveA: 'N/A',
                    formatedReserveB: 'N/A'
                };
            }

            try {
                const reserve = await lp.getReserves(); // need to handle edge cases for stable factor


                const formatedReserveA = ethers.formatUnits(
                    reserve[0].toString(),
                    18
                );
                const formatedReserveB = ethers.formatUnits(
                    reserve[1].toString(),
                    18
                );

                return {
                    formatedReserveA,
                    formatedReserveB
                };
            } catch (error) {
                console.error('Error fetching:', error);
                throw error;
            }
        },
        [lp]
    );

    return {
        addLiquidity,
        removeLiquidity,
        swap,
        getReserves
    }
}