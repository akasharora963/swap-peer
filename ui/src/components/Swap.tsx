"use client"
import React, { useState } from "react";
import { ethers } from "ethers";

const Swap = () => {
  const [inputAmount, setInputAmount] = useState<string>("");
  const [inputToken, setInputToken] = useState<string>("Token A");
  const [outputToken, setOutputToken] = useState<string>("Token B");

//   const swapTokens = async () => {
//     if (!provider || !account) return;

//     const contract = new ethers.Contract("LiquidityPoolAddress", ["swap"], provider.getSigner());

//     const tx = await contract.swap(ethers.utils.parseUnits(inputAmount, 18), inputToken === "Token A" ? "Token A" : "Token B");
//     await tx.wait();
//     alert("Swap Successful!");
//   };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl text-white">Swap Tokens</h2>
      <div>
        <input
          type="text"
          value={inputAmount}
          onChange={(e) => setInputAmount(e.target.value)}
          placeholder="Input Amount"
          className="p-2 rounded bg-gray-700 text-white"
        />
      </div>
      <div>
        <select value={inputToken} onChange={(e) => setInputToken(e.target.value)} className="p-2 rounded bg-gray-700 text-white">
          <option value="Token A">Token A</option>
          <option value="Token B">Token B</option>
        </select>
      </div>
     
      <button onClick={() => alert('swap')} className="bg-yellow-500 text-white p-3 rounded-lg hover:bg-yellow-600">
        Swap
      </button>
    </div>
  );
};

export default Swap;
