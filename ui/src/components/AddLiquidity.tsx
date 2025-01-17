"use client"
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useLP } from "@/hooks/useLP";

const AddLiquidity = () => {
  const [amountA, setAmountA] = useState<string>("");
  const [amountB, setAmountB] = useState<string>("");
  const [reserves, setReserves] = useState({
    resereveA: '',
    reserveB: ''
  })

  const { getReserves, addLiquidity } = useLP();

  useEffect(() => {
    async function fetchReserves() {

      const { formatedReserveA, formatedReserveB } = await getReserves();

      setReserves({
        resereveA: formatedReserveA,
        reserveB: formatedReserveB
      })


    }

    fetchReserves()

  }, [])

  const addLiquidityToLp = async () => {
    const tx = await addLiquidity(ethers.parseUnits(amountA, 18), ethers.parseUnits(amountB, 18));
    alert("Liquidity Added Successfully!");
    window.location.reload()
  };

  return (
    <div className="space-y-4 p-4">
      <h1 className="text-xl">Current Liquidity</h1>
      <h3>ReserveA: {reserves.resereveA}</h3>
      <h3>ReserveB: {reserves.reserveB}</h3>
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
      <button onClick={addLiquidityToLp} className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600">
        Add Liquidity
      </button>
    </div>
  );
};

export default AddLiquidity;
