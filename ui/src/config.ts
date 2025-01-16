export interface EnvConfig {
    wallectConnectProjectId: string;
    rpcUrl: string;
    chainId: string;
}

export const envConfig: EnvConfig = {
    wallectConnectProjectId: process.env
        .NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
    rpcUrl: process.env.NEXT_BLAST_SEPOLIA_RPC_URL as string,
    chainId: process.env.NEXT_BLAST_CHAIN_ID as string,

};
