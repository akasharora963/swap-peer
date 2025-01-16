// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/PeerToken.sol";

contract DeployTokens is Script {
    function run() external {
        vm.startBroadcast();

        // Deploy TokenA
        PeerToken tokenA = new PeerToken("Peer", "PER", 1_000_000);
        console.log("TokenA deployed at:", address(tokenA));

        // Deploy TokenB
        PeerToken tokenB = new PeerToken("Play", "PLY", 1_000_000);
        console.log("TokenB deployed at:", address(tokenB));

        vm.stopBroadcast();
    }
}
