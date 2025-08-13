// pages/_app.tsx
import '../styles/global.css';
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, type Locale } from '@rainbow-me/rainbowkit';
import { config } from '../wagmi';
import Sidebar from '../components/Sidebar';
import { useState } from 'react';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter() as { locale: Locale };
  const [activePage, setActivePage] = useState('home');

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider locale={locale}>
          <div className="flex w-full min-h-screen">
            <Sidebar setActivePage={setActivePage} activePage={activePage} />
            <main className="flex-grow flex items-center justify-center p-4">
              <Component {...pageProps} activePage={activePage} />
            </main>
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
