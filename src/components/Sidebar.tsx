import React, { useEffect, useState } from 'react';
import styles from '../styles/sidebar.module.css';

// Impor komponen halaman
import Home from './pages/home';
import Tool from './pages/tool';
import ShoppingCart from './pages/shopping-cart';
import DollarSign from './pages/dollar-sign';
import Info from './pages/info';
import User from './pages/user';

// Deklarasi global untuk feather-icons
declare const feather: any;

// Mapping halaman
const PAGES = {
  home: <Home />,
    lab: <Tool />,
      market: <ShoppingCart />,
        games: <DollarSign />,
          about: <Info />,
            profile: <User />,
            };

            const Sidebar = () => {
              const [active, setActive] = useState<keyof typeof PAGES>('home');

                useEffect(() => {
                    if (typeof feather !== 'undefined' && feather.replace) {
                          feather.replace();
                              }
                                }, [active]);

                                  const handleClick = (key: keyof typeof PAGES) => {
                                      setActive(key);
                                        };

                                          return (
                                              <>
                                                    <div className={styles.sidebarContainer} role="complementary" aria-label="Sidebar container">
                                                            <aside className={styles.sidebarFrame} role="navigation" aria-label="Sidebar tombol">
                                                                      {(Object.keys(PAGES) as Array<keyof typeof PAGES>).map((key) => {
                                                                                  const isFloating = key === 'about' || key === 'profile';
                                                                                              return (
                                                                                                            <button
                                                                                                                            key={key}
                                                                                                                                            className={`${styles.cButton} ${active === key ? styles.cButtonActive : ''} ${isFloating ? `${styles.floating} ${styles[key] || ''}` : ''}`}
                                                                                                                                                            aria-label={key}
                                                                                                                                                                            onClick={() => handleClick(key)}
                                                                                                                                                                                          >
                                                                                                                                                                                                          <i data-feather={iconName(key)}></i>
                                                                                                                                                                                                                        </button>
                                                                                                                                                                                                                                    );
                                                                                                                                                                                                                                              })}
                                                                                                                                                                                                                                                      </aside>
                                                                                                                                                                                                                                                            </div>

                                                                                                                                                                                                                                                                  <main className={styles.contentFrame} role="main" aria-live="polite">
                                                                                                                                                                                                                                                                          {PAGES[active]}
                                                                                                                                                                                                                                                                                </main>
                                                                                                                                                                                                                                                                                    </>
                                                                                                                                                                                                                                                                                      );
                                                                                                                                                                                                                                                                                      };

                                                                                                                                                                                                                                                                                      function iconName(key: keyof typeof PAGES): string {
                                                                                                                                                                                                                                                                                        switch (key) {
                                                                                                                                                                                                                                                                                            case 'home':
                                                                                                                                                                                                                                                                                                  return 'home';
                                                                                                                                                                                                                                                                                                      case 'lab':
                                                                                                                                                                                                                                                                                                            return 'tool';
                                                                                                                                                                                                                                                                                                                case 'market':
                                                                                                                                                                                                                                                                                                                      return 'shopping-cart';
                                                                                                                                                                                                                                                                                                                          case 'games':
                                                                                                                                                                                                                                                                                                                                return 'dollar-sign';
                                                                                                                                                                                                                                                                                                                                    case 'about':
                                                                                                                                                                                                                                                                                                                                          return 'info';
                                                                                                                                                                                                                                                                                                                                              case 'profile':
                                                                                                                                                                                                                                                                                                                                                    return 'user';
                                                                                                                                                                                                                                                                                                                                                        default:
                                                                                                                                                                                                                                                                                                                                                              return 'circle';
                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                export default Sidebar;