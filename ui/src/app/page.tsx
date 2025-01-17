"use client"
import WalletConnect from "@/components/WalletConnect";
import AddLiquidity from "@/components/AddLiquidity";
import RemoveLiquidity from "@/components/RemoveLiquidity";
import Swap from "@/components/Swap";
import Web3Provider from "@/web3Provider";
import Balance from "@/components/Balance";
import PermitComponent from "@/components/Permit";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {

  return (
    <Web3Provider>

      <div className="bg-gray-800 min-h-screen text-white">

        <div className="container mx-auto p-4 space-y-8">
          <div className="p-4 bg-gray-700 rounded-lg">
            <WalletConnect />
          </div>
          {/* Row 1: WalletConnect, Balance, PermitComponent, AddLiquidity */}
          <div className="grid grid-cols-2 gap-4">

            <div className="p-4 bg-gray-700 rounded-lg">
              <Balance />
            </div>
          </div>
          <ToastContainer
            toastClassName={() =>
              "relative flex p-4 min-h-10 rounded-lg shadow-md bg-gray-700 text-white"
            }
            className={() => "text-sm font-medium"}
            position="top-right"
            closeButton={false}
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-700 rounded-lg">
              <PermitComponent />
            </div>
            <div className="p-4 bg-gray-700 rounded-lg">
              <AddLiquidity />
            </div>
          </div>


          {/* Row 2: RemoveLiquidity, Swap */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-700 rounded-lg">
              <RemoveLiquidity />
            </div>
            <div className="p-4 bg-gray-700 rounded-lg">
              <Swap />
            </div>
          </div>
        </div>

      </div>


    </Web3Provider>
  );
};

export default App;
