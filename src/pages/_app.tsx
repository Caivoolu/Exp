// pages/_app.tsx
import '../styles/global.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, type Locale } from '@rainbow-me/rainbowkit';
import { config } from '../wagmi';

import Sidebar from '../components/Sidebar';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter() as { locale: Locale };

  useEffect(() => {
    document.body.classList.add('neo-bg');

    // Load feather-icons script once if not loaded
    if (!document.querySelector('script#feather-icons')) {
      const script = document.createElement('script');
      script.id = 'feather-icons';
      script.src = 'https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale={locale}>
          {/* Sidebar fixed di kiri */}
          <Sidebar />
          {/* Konten halaman utama */}
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;