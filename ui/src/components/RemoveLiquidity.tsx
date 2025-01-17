"use client"
import React, { useState } from "react";
import { ethers } from "ethers";
import { useAccount } from "@/hooks/useAccount";
import { useBalance } from "wagmi";
import { LPT } from "@/constants/token";
import { useLP } from "@/hooks/useLP";

const RemoveLiquidity = () => {
  const [percentage, setPercentage] = useState(0);

  const { address } = useAccount()

  const { removeLiquidity } = useLP()

  const lpt = useBalance({
    address: address,
    token: LPT
  })

  const removeLiquidityLp = async () => {

    if (Number(lpt.data?.formatted) === 0 || percentage === 0) return;

    const liquidityAmount = (percentage * Number(lpt.data?.formatted)) / 100

    const tx = await removeLiquidity(ethers.parseUnits(liquidityAmount.toString(), 18));
    alert("Liquidity Removed Successfully!");
    window.location.reload()
  };



  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl text-white">Remove Liquidity</h2>
      <div className="p-6 max-w-md mx-auto space-y-4">
        <h2 className="text-lg font-semibold text-white-800">Select Percentage</h2>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min="0"
            max="100"
            value={percentage}
            onChange={(e) => setPercentage(Number(e.target.value))}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <span className="text-sm font-medium text-white-700">{percentage}%</span>
        </div>
        <button onClick={removeLiquidityLp} className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600">
          Remove Liquidity
        </button>
      </div>
    </div>
  );
};

export default RemoveLiquidity;
