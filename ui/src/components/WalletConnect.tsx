"use client"
import React from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';


const WalletConnect: React.FC = () => {

  return (
    <div className="flex justify-center items-center p-4">
     <ConnectButton/>
    </div>
  );
};

export default WalletConnect;
