"use client"
import WalletConnect from "@/components/WalletConnect";
import AddLiquidity from "@/components/AddLiquidity";
import RemoveLiquidity from "@/components/RemoveLiquidity";
import Swap from "@/components/Swap";
import Web3Provider from "@/web3Provider";
import Balance from "@/components/Balance";
import PermitComponent from "@/components/Permit";

const App: React.FC = () => {

  return (
    <Web3Provider>

      <div className="bg-gray-800 min-h-screen text-white">
        <div className="container mx-auto p-4">
          <WalletConnect />
          <Balance />
          <PermitComponent />
          <AddLiquidity />
          <RemoveLiquidity />
          <Swap />
        </div>
      </div>

    </Web3Provider>
  );
};

export default App;
