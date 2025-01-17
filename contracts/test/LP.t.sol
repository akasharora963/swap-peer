// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Test.sol";
import "../src/LiquidityPool.sol";
import "../src/LiquidityToken.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockERC20 is ERC20 {
    constructor(string memory name, string memory symbol) ERC20(name, symbol) {}

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}

contract LiquidityPoolTest is Test {
    LiquidityPool public liquidityPool;
    MockERC20 public tokenA;
    MockERC20 public tokenB;

    address public user1 = address(0x1);
    address public user2 = address(0x2);
    address public feeManager = address(0x3);
    address public insuranceManager = address(0x4);

    function setUp() public {
        tokenA = new MockERC20("Token A", "TKA");
        tokenB = new MockERC20("Token B", "TKB");

        liquidityPool = new LiquidityPool(
            address(tokenA),
            address(tokenB),
            feeManager,
            insuranceManager,
            100, // 1% swap fee
            50   // 50% of fee to insurance
        );

        // Mint tokens for users
        tokenA.mint(user1, 1_000 ether);
        tokenB.mint(user1, 1_000 ether);

        tokenA.mint(user2, 1_000 ether);
        tokenB.mint(user2, 1_000 ether);
    }

    function testAddLiquidity() public {
        vm.startPrank(user1);
        tokenA.approve(address(liquidityPool), 100 ether);
        tokenB.approve(address(liquidityPool), 200 ether);

        liquidityPool.addLiquidity(100 ether, 200 ether);

        (uint256 reserveA, uint256 reserveB) = liquidityPool.getReserves();
        assertEq(reserveA, 100 ether);
        assertEq(reserveB, 200 ether);

        uint256 userBalance = LiquidityToken(liquidityPool.liquidityToken()).balanceOf(user1);
        assertEq(userBalance, 300 ether);
        vm.stopPrank();
    }

    function testRemoveLiquidity() public {
        vm.startPrank(user1);
        tokenA.approve(address(liquidityPool), 100 ether);
        tokenB.approve(address(liquidityPool), 200 ether);

        liquidityPool.addLiquidity(100 ether, 200 ether);
        uint256 liquidity = LiquidityToken(liquidityPool.liquidityToken()).balanceOf(user1);

        liquidityPool.removeLiquidity(liquidity);

        (uint256 reserveA, uint256 reserveB) = liquidityPool.getReserves();
        assertEq(reserveA, 0);
        assertEq(reserveB, 0);

        uint256 userTokenABalance = tokenA.balanceOf(user1);
        uint256 userTokenBBalance = tokenB.balanceOf(user1);
        assertEq(userTokenABalance, 1_000 ether);
        assertEq(userTokenBBalance, 1_000 ether);
        vm.stopPrank();
    }

    function testSwap() public {
        vm.startPrank(user1);
        tokenA.approve(address(liquidityPool), 100 ether);
        tokenB.approve(address(liquidityPool), 200 ether);

        liquidityPool.addLiquidity(100 ether, 200 ether);
        vm.stopPrank();

        vm.startPrank(user2);
        tokenA.approve(address(liquidityPool), 50 ether);

        liquidityPool.swap(50 ether, address(tokenA));

        (uint256 reserveA, uint256 reserveB) = liquidityPool.getReserves();
        assertGt(reserveA, 149 ether); // Reserve should increase
        assertLt(reserveB, 200 ether); // Reserve should decrease

        uint256 userTokenBBalance = tokenB.balanceOf(user2);
        assertGt(userTokenBBalance, 800 ether); // User should receive Token B
        vm.stopPrank();
    }

}
