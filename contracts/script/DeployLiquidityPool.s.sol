// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import {LiquidityPool} from "../src/LiquidityPool.sol";
import {LiquidityToken} from "../src/LiquidityToken.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DeployLiquidityPool is Script {
    uint256 public deployPrivateKey = vm.envUint("PRIVATE_KEY_DEPLOY");

    function run() external {
        // Input Parameters
        address tokenA = 0x8c96F45dC30F01d74Be48729783a7811325dA4c1;
        address tokenB = 0x0bB64c93a01EF98687143a5885b2aF44A3705F2c;
        address feeManager = vm.envAddress("FEE_MANAGER"); // Address for fees collection
        address insuranceManager = vm.envAddress("INSURANCE_MANAGER"); // Address for managing insurance fund
        uint256 swapFeePercentage = 100; // Swap fee in basis points
        uint256 insuranceFundPercentage = 50; // Insurance fund portion (0-100)

        // Validation
        require(swapFeePercentage <= 10000, "Swap fee too high");
        require(insuranceFundPercentage <= 100, "Insurance fund too high");

        // Start broadcasting transactions
        vm.startBroadcast(deployPrivateKey);

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
