// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Script.sol";
import "../src/PeerToken.sol";

contract DeployTokens is Script {
    uint256 public deployPrivateKey = vm.envUint("PRIVATE_KEY_DEPLOY");
    uint256 public constant INITIAL_SUPPLY = 100_000_000;

    function run() external {
        vm.startBroadcast(deployPrivateKey);

        // Deploy TokenA
        PeerToken tokenA = new PeerToken(INITIAL_SUPPLY, "Peer", "PER", 18);
        console.log("TokenA deployed at:", address(tokenA));

        // Deploy TokenB
        PeerToken tokenB = new PeerToken(INITIAL_SUPPLY, "Play", "PLY", 18);
        console.log("TokenB deployed at:", address(tokenB));

        vm.stopBroadcast();
    }
}
