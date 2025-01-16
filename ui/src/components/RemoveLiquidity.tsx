"use client"
import React, { useState } from "react";
import { ethers } from "ethers";

const RemoveLiquidity = () => {
  const [liquidityAmount, setLiquidityAmount] = useState<string>("");

//   const removeLiquidity = async () => {
//     if (!provider || !account) return;

//     // Implement the contract interaction for removing liquidity
//     const contract = new ethers.Contract("LiquidityPoolAddress", ["removeLiquidity"], provider.getSigner());

//     const tx = await contract.removeLiquidity(ethers.utils.parseUnits(liquidityAmount, 18));
//     await tx.wait();
//     alert("Liquidity Removed Successfully!");
//   };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl text-white">Remove Liquidity</h2>
      <div>
        <input
          type="text"
          value={liquidityAmount}
          onChange={(e) => setLiquidityAmount(e.target.value)}
          placeholder="Liquidity Amount"
          className="p-2 rounded bg-gray-700 text-white"
        />
      </div>
      <button onClick={() => alert("hi")} className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600">
        Remove Liquidity
      </button>
    </div>
  );
};

export default RemoveLiquidity;
