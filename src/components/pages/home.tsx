// src/components/pages/home.tsx
import { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { parseEther, type BaseError } from 'viem';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import ERC721ABI from '@abis/ERC721.json';

export default function Home() {
  const [mintAmount, setMintAmount] = useState<string>('0');
  const { address, isConnected } = useAccount();
  const {
    data: hash,
    writeContract,
    isPending,
    error: writeError,
  } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const { data: totalSupply } = useReadContract({
    address: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS,
    abi: ERC721ABI,
    functionName: 'totalSupply',
  });

  const handleMint = async () => {
    try {
      writeContract({
        address: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS,
        abi: ERC721ABI,
        functionName: 'mint',
        args: [BigInt(mintAmount)],
        value: parseEther((0.01 * Number(mintAmount)).toString()),
      });
    } catch (error) {
      console.error('Minting failed:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ConnectButton />
      {isConnected && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold">NFT Minter</h2>
          <p>Total Supply: {totalSupply ? totalSupply.toString() : 'Loading...'}</p>
          <input
            type="number"
            value={mintAmount}
            onChange={(e) => setMintAmount(e.target.value)}
            className="mt-2 p-2 border rounded"
            placeholder="Enter amount to mint"
          />
          <button
            onClick={handleMint}
            disabled={isPending || isConfirming}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            {isPending || isConfirming ? 'Minting...' : 'Mint NFT'}
          </button>
          {writeError && (
            <p className="mt-2 text-red-500">
              Error: {(writeError as BaseError).shortMessage || writeError.message}
            </p>
          )}
          {isConfirmed && (
            <p className="mt-2 text-green-500">Mint successful!</p>
          )}
        </div>
      )}
    </div>
  );
}
