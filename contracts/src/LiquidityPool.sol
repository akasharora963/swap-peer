// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "./LiquidityToken.sol";

contract LiquidityPool is ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public tokenA;
    IERC20 public tokenB;
    LiquidityToken public liquidityToken;

    address public feeManager;
    address public insuranceManager;
    uint256 public swapFeePercentage; // Fee in basis points (1% = 100)
    uint256 public insuranceFundPercentage; // Portion of fees allocated to insurance fund

    uint256 public reserveA;
    uint256 public reserveB;
    uint256 public totalFeesA;
    uint256 public totalFeesB;
    uint256 public insuranceFundA;
    uint256 public insuranceFundB;

    event LiquidityAdded(
        address indexed user,
        uint256 tokenAAmount,
        uint256 tokenBAmount,
        uint256 liquidityMinted
    );
    event LiquidityRemoved(
        address indexed user,
        uint256 tokenAAmount,
        uint256 tokenBAmount,
        uint256 liquidityBurned
    );
    event TokenSwapped(
        address indexed user,
        uint256 inputAmount,
        uint256 outputAmount,
        address inputToken,
        address outputToken
    );
    event FeesClaimed(
        address indexed recipient,
        uint256 tokenAFees,
        uint256 tokenBFees
    );
    event InsuranceClaimed(
        address indexed insuranceManager,
        uint256 tokenAInsurance,
        uint256 tokenBInsurance
    );

    constructor(
        address _tokenA,
        address _tokenB,
        address _feeManager,
        address _insuranceManager,
        uint256 _swapFeePercentage,
        uint256 _insuranceFundPercentage
    ) {
        require(_swapFeePercentage <= 10000, "Swap fee must not exceed 100%");
        require(
            _insuranceFundPercentage <= 100,
            "Insurance fund portion must not exceed 100% of swap fee"
        );

        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
        feeManager = _feeManager;
        insuranceManager = _insuranceManager;
        swapFeePercentage = _swapFeePercentage;
        insuranceFundPercentage = _insuranceFundPercentage;

        // Deploy LiquidityToken
        liquidityToken = new LiquidityToken("Liquidity Pool Token", "LPT");
        liquidityToken.setLiquidityPool(address(this));
    }

    function addLiquidity(
        uint256 amountA,
        uint256 amountB
    ) external nonReentrant {
        require(amountA > 0 && amountB > 0, "Invalid amounts");

        tokenA.safeTransferFrom(msg.sender, address(this), amountA);
        tokenB.safeTransferFrom(msg.sender, address(this), amountB);

        uint256 liquidityMinted;
        if (reserveA == 0 && reserveB == 0) {
            liquidityMinted = amountA + amountB;
        } else {
            liquidityMinted =
                (amountA * liquidityToken.totalSupply()) /
                reserveA;
        }

        reserveA += amountA;
        reserveB += amountB;
        liquidityToken.mint(msg.sender, liquidityMinted);

        emit LiquidityAdded(msg.sender, amountA, amountB, liquidityMinted);
    }

    function removeLiquidity(uint256 liquidityAmount) external nonReentrant {
        require(liquidityAmount > 0, "Invalid amount");

        uint256 amountA = (liquidityAmount * reserveA) /
            liquidityToken.totalSupply();
        uint256 amountB = (liquidityAmount * reserveB) /
            liquidityToken.totalSupply();

        liquidityToken.burn(msg.sender, liquidityAmount);

        reserveA -= amountA;
        reserveB -= amountB;

        tokenA.safeTransfer(msg.sender, amountA);
        tokenB.safeTransfer(msg.sender, amountB);

        emit LiquidityRemoved(msg.sender, amountA, amountB, liquidityAmount);
    }

    function swap(
        uint256 inputAmount,
        address inputToken
    ) external nonReentrant {
        require(inputAmount > 0, "Invalid input amount");
        require(
            inputToken == address(tokenA) || inputToken == address(tokenB),
            "Invalid token"
        );

        bool isTokenA = inputToken == address(tokenA);
        IERC20 input = isTokenA ? tokenA : tokenB;
        IERC20 output = isTokenA ? tokenB : tokenA;

        uint256 inputReserve = isTokenA ? reserveA : reserveB;
        uint256 outputReserve = isTokenA ? reserveB : reserveA;

        uint256 fee = (inputAmount * swapFeePercentage) / 10000;
        uint256 insuranceAllocation = (fee * insuranceFundPercentage) / 100;
        uint256 amountAfterFee = inputAmount - fee;

        uint256 outputAmount = (amountAfterFee * outputReserve) /
            (inputReserve + amountAfterFee);

        input.safeTransferFrom(msg.sender, address(this), inputAmount);

        if (isTokenA) {
            totalFeesA += fee;
            insuranceFundA += insuranceAllocation;
            reserveA += inputAmount - fee;
            reserveB -= outputAmount;
        } else {
            totalFeesB += fee;
            insuranceFundB += insuranceAllocation;
            reserveB += inputAmount - fee;
            reserveA -= outputAmount;
        }

        output.safeTransfer(msg.sender, outputAmount);

        emit TokenSwapped(
            msg.sender,
            inputAmount,
            outputAmount,
            inputToken,
            address(output)
        );
    }

    function claimFees() external nonReentrant {
        require(msg.sender == feeManager, "Only fee manager can claim");

        uint256 claimedA = totalFeesA - insuranceFundA;
        uint256 claimedB = totalFeesB - insuranceFundB;

        totalFeesA = 0;
        totalFeesB = 0;

        tokenA.safeTransfer(feeManager, claimedA);
        tokenB.safeTransfer(feeManager, claimedB);

        emit FeesClaimed(feeManager, claimedA, claimedB);
    }

    function claimInsurance() external nonReentrant {
        require(
            msg.sender == insuranceManager,
            "Only insurance manager can claim"
        );

        uint256 insuranceA = insuranceFundA;
        uint256 insuranceB = insuranceFundB;

        require(
            insuranceA > 0 || insuranceB > 0,
            "No insurance funds to claim"
        );

        if (insuranceA > 0) {
            insuranceFundA = 0;
            tokenA.safeTransfer(insuranceManager, insuranceA);
        }

        if (insuranceB > 0) {
            insuranceFundB = 0;
            tokenB.safeTransfer(insuranceManager, insuranceB);
        }

        emit InsuranceClaimed(insuranceManager, insuranceA, insuranceB);
    }

    function getReserves() external view returns (uint256, uint256) {
        return (reserveA, reserveB);
    }

    function getInsuranceFunds() external view returns (uint256, uint256) {
        return (insuranceFundA, insuranceFundB);
    }
}
