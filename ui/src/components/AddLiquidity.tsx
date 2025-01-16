"use client"
import React, { useState } from "react";
import { ethers } from "ethers";

const AddLiquidity = () => {
  const [amountA, setAmountA] = useState<string>("");
  const [amountB, setAmountB] = useState<string>("");

//   const addLiquidity = async () => {
//     if (!provider || !account) return;

//     // Implement the contract interaction for adding liquidity
//     const contract = new ethers.Contract("LiquidityPoolAddress", ["addLiquidity"], provider.getSigner());

//     const tx = await contract.addLiquidity(ethers.utils.parseUnits(amountA, 18), ethers.utils.parseUnits(amountB, 18));
//     await tx.wait();
//     alert("Liquidity Added Successfully!");
//   };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl text-white">Add Liquidity</h2>
      <div>
        <input
          type="text"
          value={amountA}
          onChange={(e) => setAmountA(e.target.value)}
          placeholder="Token A Amount"
          className="p-2 rounded bg-gray-700 text-white"
        />
      </div>
      <div>
        <input
          type="text"
          value={amountB}
          onChange={(e) => setAmountB(e.target.value)}
          placeholder="Token B Amount"
          className="p-2 rounded bg-gray-700 text-white"
        />
      </div>
      <button onClick={() => alert("hi")} className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600">
        Add Liquidity
      </button>
    </div>
  );
};

export default AddLiquidity;
