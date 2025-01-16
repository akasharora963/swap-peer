// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {ERC20Permit} from "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";

contract LiquidityToken is ERC20, ERC20Permit {
    address public liquidityPool; 

    modifier onlyLiquidityPool() {
        require(msg.sender == liquidityPool, "Not authorized");
        _;
    }

    /// @notice Constructor for the LiquidityToken
    /// @param name The name of the liquidity token
    /// @param symbol The symbol of the liquidity token
    constructor(string memory name, string memory symbol)
        ERC20(name, symbol)
        ERC20Permit(name) // Initialize ERC20Permit with the token's name
    {}

    /// @notice Sets the liquidity pool address (callable once)
    /// @param pool Address of the liquidity pool contract
    function setLiquidityPool(address pool) external {
        require(liquidityPool == address(0), "Liquidity pool already set");
        require(pool != address(0), "Invalid pool address");
        liquidityPool = pool;
    }

    /// @notice Mint tokens to a specific address
    /// @param to The address receiving the minted tokens
    /// @param amount The amount of tokens to mint
    function mint(address to, uint256 amount) external onlyLiquidityPool {
        _mint(to, amount);
    }

    /// @notice Burn tokens from a specific address
    /// @param from The address whose tokens will be burned
    /// @param amount The amount of tokens to burn
    function burn(address from, uint256 amount) external onlyLiquidityPool {
        _burn(from, amount);
    }
}
