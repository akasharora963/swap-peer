# Liquidity Pool Architecture

This project implements a decentralized Liquidity Pool that supports the following features:

- Adding and removing liquidity.
- Swapping tokens with fees.
- Allocating a portion of swap fees to an insurance fund.
- Claiming fees and insurance funds.
- EIP-2612 (Permit) integration for gasless approvals.

The architecture is designed to ensure security, flexibility, and scalability.

## Overview

The Liquidity Pool consists of the following components:


### 1. Smart Contracts

#### LiquidityPool Contract
- Manages token swaps, liquidity addition/removal, and fee allocation.
- Features SafeERC20 methods to prevent issues with token transfers.
- Parameters:
  - `swapFeePercentage`: Fee charged on swaps (in basis points).
  - `insuranceFundPercentage`: Portion of fees allocated to the insurance fund.
  
#### LiquidityToken Contract
- ERC20 token representing liquidity provider (LP) shares.
- Minted upon liquidity addition and burned upon liquidity removal.

#### OpenZeppelin Integration
- `IERC20`: Standard interface for ERC20 tokens.
- `ReentrancyGuard`: Prevents reentrancy attacks.
- `SafeERC20`: Ensures secure token transfer operations.

### 2. Deployment and Testing

#### Deployed Addresses
PEER TOKEN : 0x8c96F45dC30F01d74Be48729783a7811325dA4c1
PLAY TOKEN : 0x0bB64c93a01EF98687143a5885b2aF44A3705F2c
LPT(Liquidity Token) :  0xb788cc8162cf064580685964c926ef49b74044ba
LIQUIDITY POOL : 0xC7c8642F16077227bC241B809A6A93eFF67a428B

#### Deployment
Deployed using Foundry scripts. Key parameters include:
- Addresses of `tokenA` and `tokenB`.
- Fee manager and insurance manager addresses.
- Swap fee and insurance fund percentages.

#### Testing
Comprehensive test suite using Foundry:
- Validates core functionalities (e.g., adding/removing liquidity, swaps).
- Tests edge cases, including invalid fee configurations and boundary conditions.

### 3. Frontend Integration

#### Framework
- Built with Next.js and TypeScript.
- Styled with Tailwind CSS.

#### Features
1. **Connecting Wallet**
   - Supports MetaMask and WalletConnect.
2. **Add Liquidity**
   - Allows users to deposit `tokenA` and `tokenB`.
3. **Remove Liquidity**
   - Enables withdrawal of tokens proportional to LP shares.
4. **Swap Tokens**
   - Provides real-time price impact and fee breakdown.

## Usage

### Prerequisites
- Node.js and npm installed.
- Foundry for testing and deployment.
- Smart contract dependencies (e.g., OpenZeppelin libraries).

### Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Compile smart contracts:
   ```bash
   forge build
   ```

4. Deploy contracts:
   ```bash
   forge script DeployScript --rpc-url <RPC_URL> --private-key <PRIVATE_KEY>
   ```

5. Run tests:
   ```bash
   forge test
   ```

### Frontend Development

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

4. Hosted at [https://swap-peer.vercel.app/](https://swap-peer.vercel.app/)

## Key Functionalities

### 1. Add Liquidity
- Input: `tokenA` and `tokenB` amounts.
- Output: Minted LP tokens proportional to the reserve ratio.

### 2. Remove Liquidity
- Input: LP token amount.
- Output: Corresponding `tokenA` and `tokenB` amounts.

### 3. Swap
- Input: Token type and amount.
- Output: Equivalent amount of the other token, adjusted for fees.

### 4. Claim Fees
- Callable by the fee manager.
- Transfers accumulated fees to the fee manager address.

### 5. Claim Insurance
- Callable by the insurance manager.
- Transfers allocated insurance funds.

## Security Features

- **Reentrancy Protection**: Secured by OpenZeppelin's `ReentrancyGuard`.
- **SafeERC20 Transfers**: Ensures secure interactions with tokens.
- **Permit Functionality**: Reduces gas overhead by enabling signature-based approvals.

## Customization

- Adjust `swapFeePercentage` and `insuranceFundPercentage` during deployment.
- Integrate additional functionalities like governance or multi-token support.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

For questions or suggestions, please contact akasharora963@gmail.com.

