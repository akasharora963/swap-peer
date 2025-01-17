"use client"
import React, { useState } from "react";
import { ethers } from "ethers";
import { ConnectButton } from '@rainbow-me/rainbowkit';


const WalletConnect: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);

  return (
    <div className="flex justify-center items-center p-4">
     <ConnectButton/>
    </div>
  );
};

export default WalletConnect;
