import React, { useEffect } from 'react';
import styles from './sidebar.module.css';
import Home from './pages/home';
import Swap from './pages/swap';
import Pool from './pages/pool';
import Market from './pages/shopping-cart';
import Lab from './pages/tool';
import Info from './pages/info';
import User from './pages/user';

declare const feather: any;

const PAGES = {
  home: Home,
  swap: Swap,
  pool: Pool,
  market: Market,
  lab: Lab,
  about: Info,
  profile: User,
};

const Sidebar = ({ setActivePage, activePage }) => {
  useEffect(() => {
    if (typeof feather !== 'undefined' && feather.replace) {
      feather.replace();
    }
  }, [activePage]);

  const handleClick = (key) => {
    setActivePage(key);
  };

  const ActiveComponent = PAGES[activePage];

  return (
    <>
      <div className={styles.sidebarContainer}>
        <aside className={styles.sidebarFrame}>
          {(Object.keys(PAGES)).map((key) => (
            <button
              key={key}
              className={`${styles.cButton} ${activePage === key ? styles.cButtonActive : ''}`}
              onClick={() => handleClick(key)}
            >
              <i data-feather={iconName(key)}></i>
            </button>
          ))}
        </aside>
      </div>
      <main className={styles.contentFrame}>
        <ActiveComponent />
      </main>
    </>
  );
};

function iconName(key) {
  switch (key) {
    case 'home':
      return 'home';
    case 'swap':
      return 'refresh-cw';
    case 'pool':
      return 'database';
    case 'market':
      return 'shopping-cart';
    case 'lab':
      return 'tool';
    case 'about':
      return 'info';
    case 'profile':
      return 'user';
    default:
      return 'circle';
  }
}

export default Sidebar;
