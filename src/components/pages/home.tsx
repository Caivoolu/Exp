import { useState, useEffect } from 'react';
// Impor ini sudah benar untuk wagmi v2. Jika Anda masih melihat error di sini,
// coba hapus folder node_modules dan file yarn.lock, lalu jalankan `yarn install` lagi.
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { parseEther, type BaseError } from 'viem';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import ERC721ABI from '@abis/ERC721.json'; // Pastikan alias '@abis' telah dikonfigurasi di tsconfig.json

const contractAddress = '0xC979f38572119baC6dbe61Fd783aC3841A5C4F9C';
const fallbackImageUrl =
  'https://bafybeidmnlsjfs2ua7qo6knidj5fbcml2p2pphu3un3qmwvmi54ofjcztm.ipfs.nftstorage.link/';

const Home = () => {
  // useAccount adalah hook yang benar untuk mendapatkan informasi dompet di wagmi v2.
  const { address, isConnected } = useAccount();

  const [mintAmount, setMintAmount] = useState(1);
  const [nftImage, setNftImage] = useState<string>(fallbackImageUrl);

  const pricePerToken = parseEther('0.01');
  const totalValue = BigInt(mintAmount) * pricePerToken;

  // useReadContract digunakan untuk memanggil fungsi `view` atau `pure` dari smart contract.
  // Hook ini dinonaktifkan hingga dompet terhubung untuk mencegah pemanggilan yang tidak perlu.
  const { data: tokenUri } = useReadContract({
    address: contractAddress,
    abi: ERC721ABI,
    functionName: 'tokenURI',
    args: [1n], // Menggunakan BigInt literal. Diasumsikan kita ingin menampilkan gambar token pertama sebagai pratinjau.
    query: {
      enabled: isConnected,
    },
  });

  // useEffect ini akan mengambil metadata NFT dari tokenURI.
  useEffect(() => {
    if (typeof tokenUri === 'string' && tokenUri) {
      // URI IPFS mungkin perlu dikonversi ke gateway HTTP.
      // Fetch ini mengasumsikan URI adalah HTTP langsung atau sudah di-proxy dengan benar.
      fetch(tokenUri)
        .then((res) => {
          if (!res.ok) throw new Error('Gagal mengambil metadata');
          return res.json();
        })
        .then((metadata) => {
          // Memeriksa properti 'image' di metadata dan memperbarui state.
          if (metadata.image) {
            setNftImage(metadata.image);
          } else {
            setNftImage(fallbackImageUrl);
          }
        })
        .catch(() => {
          setNftImage(fallbackImageUrl);
        });
    }
  }, [tokenUri]);


  // useWriteContract mempersiapkan transaksi, tetapi tidak langsung mengirimkannya.
  const { data: hash, isPending, error, writeContract } = useWriteContract();

  const handleMint = () => {
    // Pastikan fungsi writeContract sudah tersedia sebelum dipanggil.
    if (!writeContract) {
      console.error("Fungsi untuk mint tidak tersedia.");
      return;
    }
    // Argumen untuk fungsi `claim` harus sama persis dengan yang ada di ABI kontrak.
    writeContract({
      address: contractAddress,
      abi: ERC721ABI,
      functionName: 'claim',
      args: [
        address,      // Alamat yang terhubung akan menjadi penerima NFT.
        BigInt(mintAmount), // Jumlah yang akan di-mint.
        '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', // Alamat mata uang (untuk token native).
        pricePerToken, // Harga per token.
        {
          proof: [],
          quantityLimitPerWallet: 0n,
          pricePerToken: pricePerToken,
          currency: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
        },
        '0x', // Data byte tambahan, biasanya kosong.
      ],
      value: totalValue, // Nilai total transaksi dalam satuan wei.
    });
  };

  // useWaitForTransactionReceipt melacak status transaksi setelah dikirim.
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
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
              onChange={(e) => setMintAmount(parseInt(e.target.value) || 1)}
              className="neo-input"
              disabled={isPending || isConfirming}
              placeholder="Masukkan jumlah"
              style={{ width: '100%', padding: '8px', borderRadius: '8px', marginBottom: '16px' }}
            />
            <button
              onClick={handleMint}
              disabled={!writeContract || isPending || isConfirming}
              className="neo-button accent"
              style={{ width: '100%', padding: '12px', borderRadius: '12px', cursor: 'pointer' }}
            >
              {isPending ? 'Cek Dompet...' : isConfirming ? 'Minting...' : 'Mint NFT'}
            </button>
            {error && (
              <p className="mt-4 small" style={{ color: '#ff6b6b' }}>
                Error: {(error as BaseError).shortMessage || error.message}
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
