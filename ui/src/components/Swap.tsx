"use client"
import React, { useState } from "react";
import { ethers } from "ethers";
import { ERC20_TEST_TOKEN_LIST } from "@/constants/token";
import { useLP } from "@/hooks/useLP";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { useAccount } from "@/hooks/useAccount";

const Swap = () => {
  const [inputAmount, setInputAmount] = useState<string>("");
  const [inputToken, setInputToken] = useState<string>("Token A");
  const [loading, setLoading] = useState(false)

  const { address } = useAccount()


  const { swap } = useLP()

  const swapTokens = async () => {

    if (!address || !inputAmount) return;
    setLoading(true)
    await swap(ethers.parseUnits(inputAmount, 18), inputToken === "Token A" ? ERC20_TEST_TOKEN_LIST[0].address : ERC20_TEST_TOKEN_LIST[1].address);
    toast.success("Swapped Successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
    setLoading(false)

    setTimeout(() => window.location.reload(), 4000)

  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl text-white">Swap Tokens</h2>
      <div >
        <input
          type="text"
          value={inputAmount}
          onChange={(e) => setInputAmount(e.target.value)}
          placeholder="Input Amount"
          className="p-2 rounded bg-gray-700 text-white border-2  border-white"
        />
      </div>
      <div>
        <h3>Select Token :</h3>
        <select value={inputToken} onChange={(e) => setInputToken(e.target.value)} className="p-2 rounded bg-gray-700 text-white border-2  border-white">
          <option value="Token A">Peer</option>
          <option value="Token B">Play</option>
        </select>
      </div>

      <button onClick={swapTokens} className="bg-yellow-500 text-white p-3 rounded-lg hover:bg-yellow-600">
        {loading ? <Loader /> : "Swap"}
      </button>
    </div>
  );
};

export default Swap;
