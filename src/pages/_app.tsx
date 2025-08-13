import '../styles/global.css';
import type { AppProps } from 'next/app';
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Content from '../components/Content';
import Home from './home';
import Tool from './tool';
import ShoppingCart from './shopping-cart';
import DollarSign from './dollar-sign';
import Info from './info';
import User from './user';

const PAGES = {
  home: <Home />,
  lab: <Tool />,
  market: <ShoppingCart />,
  games: <DollarSign />,
  about: <Info />,
  profile: <User />, // Content profil akan menampilkan wallet info
};

function MyApp({ Component, pageProps }: AppProps) {
  const [active, setActive] = useState<keyof typeof PAGES>('home');

  // Feather icons
  useEffect(() => {
    if (!document.querySelector('script#feather-icons')) {
      const script = document.createElement('script');
      script.id = 'feather-icons';
      script.src = 'https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js';
      script.async = true;
      document.body.appendChild(script);
    } else if ((window as any).feather) {
      (window as any).feather.replace();
    }
  }, [active]);

  return (
    <div className="appWrapper">
      <Sidebar active={active} setActive={setActive} />
      <Content active={active} pages={PAGES} />
    </div>
  );
}

export default MyApp;
