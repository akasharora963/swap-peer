"use client"
import { ERC20_TEST_TOKEN_LIST } from "@/constants/token";
import React from "react";
import { useAccount, useBalance } from "wagmi";


const Balance: React.FC = () => {

  const { address } = useAccount()

  const tokenABalance = useBalance({
    address: address,
    token: ERC20_TEST_TOKEN_LIST[0].address
  })

  const tokenBBalance = useBalance({
    address: address,
    token: ERC20_TEST_TOKEN_LIST[1].address
  })


  return (
    
    <div className="flex space-x-8 justify-center items-center p-4">
      <h4>PEER Token : {tokenABalance.data?.formatted} PER</h4>
      <h4>PLAY Token : {tokenBBalance.data?.formatted} PLY</h4>
    </div>

  );
};

export default Balance;
