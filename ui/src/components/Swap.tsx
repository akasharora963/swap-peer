"use client"
import React, { useState } from "react";
import { ethers } from "ethers";
import { ERC20_TEST_TOKEN_LIST, TokenInfo } from "@/constants/token";
import { useLP } from "@/hooks/useLP";

const Swap = () => {
  const [inputAmount, setInputAmount] = useState<string>("");
  const [inputToken, setInputToken] = useState<string>("Token A");

  const { swap } = useLP()

  const swapTokens = async () => {
    await swap(ethers.parseUnits(inputAmount, 18), inputToken === "Token A" ? ERC20_TEST_TOKEN_LIST[0].address : ERC20_TEST_TOKEN_LIST[1].address);
    alert("Swap Successful!");
    window.location.reload()
  };

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
        <h3>Select Token :</h3>
        <select value={inputToken} onChange={(e) => setInputToken(e.target.value)} className="p-2 rounded bg-gray-700 text-white">
          <option value="Token A">Peer</option>
          <option value="Token B">Play</option>
        </select>
      </div>

      <button onClick={swapTokens} className="bg-yellow-500 text-white p-3 rounded-lg hover:bg-yellow-600">
        Swap
      </button>
    </div>
  );
};

export default Swap;
