import { useState, useEffect } from 'react';
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { parseEther, type BaseError } from 'viem';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import ERC721ABI from '@abis/ERC721.json';

const contractAddress = '0xC979f38572119baC6dbe61Fd783aC3841A5C4F9C';
const fallbackImageUrl =
  'https://bafybeidmnlsjfs2ua7qo6knidj5fbcml2p2pphu3un3qmwvmi54ofjcztm.ipfs.nftstorage.link/';

const Home = () => {
  const { address, isConnected } = useAccount();
  const [mintAmount, setMintAmount] = useState(1);
  const [nftImage, setNftImage] = useState<string>(fallbackImageUrl);

  const pricePerToken = parseEther('0.01');
  const totalValue = BigInt(mintAmount) * pricePerToken;

  const { data: tokenUri } = useReadContract({
    address: contractAddress,
    abi: ERC721ABI,
    functionName: 'tokenURI',
    args: [BigInt(1)], // Changed from 1n
    query: {
      enabled: isConnected,
    },
  });

  useEffect(() => {
    if (typeof tokenUri === 'string' && tokenUri) {
      const httpUri = tokenUri.startsWith('ipfs://')
        ? `https://ipfs.io/ipfs/${tokenUri.replace('ipfs://', '')}`
        : tokenUri;
      fetch(httpUri)
        .then((res) => {
          if (!res.ok) throw new Error('Gagal mengambil metadata');
          return res.json();
        })
        .then((metadata) => {
          if (metadata.image) {
            setNftImage(metadata.image);
          } else {
            console.warn('No image in metadata:', metadata);
            setNftImage(fallbackImageUrl);
          }
        })
        .catch((err) => {
          console.error('Failed to fetch metadata:', err);
          setNftImage(fallbackImageUrl);
        });
    }
  }, [tokenUri]);

  const { data: hash, isPending, error, writeContract } = useWriteContract();

  const handleMint = () => {
    if (!writeContract) {
      console.error('Fungsi untuk mint tidak tersedia.');
      return;
    }
    if (mintAmount < 1) {
      console.error('Jumlah mint harus lebih besar dari 0');
      return;
    }
    writeContract({
      address: contractAddress,
      abi: ERC721ABI,
      functionName: 'claim',
      args: [
        address,
        BigInt(mintAmount),
        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        pricePerToken,
        {
          proof: [],
          quantityLimitPerWallet: BigInt(0), // Changed from 0n
          pricePerToken: pricePerToken,
          currency: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        },
        '0x',
      ],
      value: totalValue,
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  return (
    <div className="neo-bg-mint">
      <div className="header" style={{ display: 'flex', justifyContent: 'flex-end', padding: '16px' }}>
        <ConnectButton />
      </div>

      <div className="nft-content" style={{ padding: '0 24px' }}>
        <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--neo-text)' }}>
          Mint Your NFT
        </h1>

        <img
          src={nftImage}
          alt="NFT Preview"
          className="nft-image"
          style={{ maxWidth: '300px', borderRadius: '16px' }}
        />

        {isConnected ? (
          <div className="neo-card p-6 w-full max-w-md vstack" style={{ marginTop: '24px' }}>
            <input
              type="number"
              min={1}
              value={mintAmount}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                setMintAmount(value >= 1 ? value : 1);
              }}
              className="neo-input"
              disabled={isPending || isConfirming}
              placeholder="Masukkan jumlah"
              style={{ width: '100%', padding: '8px', borderRadius: '8px', marginBottom: '16px' }}
            />
            <button
              onClick={handleMint}
              disabled={!writeContract || isPending || isConfirming || mintAmount < 1}
              className="neo-button accent"
              style={{ width: '100%', padding: '12px', borderRadius: '12px', cursor: 'pointer' }}
            >
              {isPending ? 'Cek Dompet...' : isConfirming ? 'Minting...' : 'Mint NFT'}
            </button>
            {error && (
              <p className="mt-4 small" style={{ color: '#ff6b6b' }}>
                Error: {(error as BaseError).shortMessage || error.message}
                {console.error('Mint error:', error)}
              </p>
            )}
            {isConfirmed && hash && (
              <p className="mt-4 small" style={{ color: '#4ade80' }}>
                Sukses!{' '}
                <a
                  href={`https://sepolia.etherscan.io/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--neo-accent)' }}
                >
                  Lihat Transaksi
                </a>
              </p>
            )}
          </div>
        ) : (
          <p className="small" style={{ marginTop: '24px' }}>
            Silakan hubungkan dompet Anda untuk mint NFT.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
