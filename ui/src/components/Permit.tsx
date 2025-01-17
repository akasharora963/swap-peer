import React, { useState } from "react";
import { ethers } from "ethers";
import { getProvider } from "@/utils";
import { testErc20Abi } from "@/constants/abi/erc20";
import { ERC20_TEST_TOKEN_LIST, LP, TokenInfo } from "@/constants/token";
import { useAccount } from "@/hooks/useAccount";
import { useEthersProvider } from "@/hooks/useEthersProvider";

const PermitComponent = () => {
    const [amount, setAmount] = useState("");
    const [deadline, setDeadline] = useState("");
    const [inputToken, setInputToken] = useState("Token A");


    const { chainId, address: userAddress } = useAccount();

    const provider = useEthersProvider({ chainId })

    const handlePermit = async () => {

        const signer = provider?.getSigner(userAddress);

        if (!signer) {
            console.error("Signer not available. Ensure the user is connected.");
            return;
        }

        const token = inputToken === "Token A" ? ERC20_TEST_TOKEN_LIST[0] : ERC20_TEST_TOKEN_LIST[1]

        const owner = userAddress;

        const tokenContract = new ethers.Contract(token.address, testErc20Abi, signer as unknown as ethers.ContractRunner);

        // Step 1: Get nonce and DOMAIN_SEPARATOR
        const nonce = await tokenContract.nonces(owner);

        // Step 2: Define Permit Data
        const value = ethers.parseUnits(amount, 18);
        const deadlineTimestamp = Math.floor(Date.now() / 1000) + parseInt(deadline, 10); // Current time + user-defined seconds

        const permitData = {
            owner,
            spender: LP,
            value: value.toString(),
            nonce: nonce.toString(),
            deadline: deadlineTimestamp.toString()
        };

        const domain = {
            name: token.name,
            version: "1",
            chainId: chainId,
            verifyingContract: token.address
        };

        const types = {
            Permit: [
                { name: "owner", type: "address" },
                { name: "spender", type: "address" },
                { name: "value", type: "uint256" },
                { name: "nonce", type: "uint256" },
                { name: "deadline", type: "uint256" }
            ]
        };

        // Step 3: Sign Typed Data
        const signature = await signer?._signTypedData(domain, types, permitData);

        const { r, s, v } = ethers.Signature.from(signature);

        // Step 4: Call permit on the contract
        try {
            const tx = await tokenContract.permit(owner, LP, value, deadlineTimestamp, v, r, s);
            // await tx.wait()
            alert("Permit successful!");
        } catch (error) {
            console.error(error);
            alert("Error during permit");
        }
    };

    return (
        <div className="space-y-4 p-4">
            <h3>ERC20 Permit</h3>
            <div>
                <input
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Token Amount"
                    className="p-2 rounded bg-gray-700 text-white"
                />
            </div>
            <div>
                <input
                    type="text"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    placeholder="Deadline (in sec)"
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
            <button onClick={handlePermit} className="bg-cyan-500 text-white p-3 rounded-lg hover:bg-cyan-600">Permit</button>
        </div>
    );
};

export default PermitComponent;
