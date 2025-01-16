export interface EnvConfig {
    wallectConnectProjectId: string;
    rpcUrl: string;
    chainId: number;
}

export const envConfig: EnvConfig = {
    wallectConnectProjectId: process.env
        .NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
    rpcUrl: process.env.NEXT_PUBLIC_BLAST_SEPOLIA_RPC_URL as string,
    chainId: Number(process.env.NEXT_PUBLIC_BLAST_CHAIN_ID),
};
