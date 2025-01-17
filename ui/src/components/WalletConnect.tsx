"use client"
import React from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';


const WalletConnect: React.FC = () => {

  return (
    <div className="flex justify-between items-center p-4">
      <h1 className="text-4xl font-semibold text-white-800">PEER2PLAY</h1>
      <img className="w-128 h-36" src="https://media.licdn.com/dms/image/v2/D5616AQH0-nym6b-uJA/profile-displaybackgroundimage-shrink_200_800/profile-displaybackgroundimage-shrink_200_800/0/1719467553984?e=2147483647&v=beta&t=_WhrM1DepH9OHuYhoKYP5kzat41Su0e20IEj7Eigui8"/>
     <ConnectButton/>
    </div>
  );
};

export default WalletConnect;
