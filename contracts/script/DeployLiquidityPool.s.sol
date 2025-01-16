// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import {LiquidityPool} from "../src/LiquidityPool.sol";
import {LiquidityToken} from "../src/LiquidityToken.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DeployLiquidityPool is Script {
    function run() external {
        // Input Parameters
        address tokenA = vm.envAddress("TOKEN_A"); // Replace with actual token A address
        address tokenB = vm.envAddress("TOKEN_B"); // Replace with actual token B address
        address feeManager = vm.envAddress("FEE_RECIPIENT"); // Address for fees collection
        address insuranceManager = vm.envAddress("INSURANCE_MANAGER"); // Address for managing insurance fund
        uint256 swapFeePercentage = vm.envUint("SWAP_FEE_PERCENTAGE"); // Swap fee in basis points
        uint256 insuranceFundPercentage = vm.envUint("INSURANCE_FUND_PERCENTAGE"); // Insurance fund portion (0-100)

        // Validation
        require(swapFeePercentage <= 10000, "Swap fee too high");
        require(insuranceFundPercentage <= 100, "Insurance fund too high");

        // Start broadcasting transactions
        vm.startBroadcast();

        // Deploy LiquidityPool contract
        LiquidityPool lp = new LiquidityPool(
            tokenA,
            tokenB,
            feeManager,
            insuranceManager,
            swapFeePercentage,
            insuranceFundPercentage
        );

       

        vm.stopBroadcast();

        console.log("LiquidityPool deployed at:", address(lp));
    }
}
