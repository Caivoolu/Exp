import React, { useEffect, useRef } from 'react';
import styles from '../styles/sidebar.module.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface SidebarProps {
  active: string;
  setActive: (key: string) => void;
}

const ICONS: Record<string, string> = {
  home: 'home',
  lab: 'tool',
  market: 'shopping-cart',
  games: 'dollar-sign',
  about: 'info',
  profile: 'user',
};

const Sidebar: React.FC<SidebarProps> = ({ active, setActive }) => {
  const connectButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).feather) {
      (window as any).feather.replace();
    }
  }, [active]);

  const handleClick = (key: string) => {
    if (key === 'profile' && connectButtonRef.current) {
      // Simulasi klik ConnectButton
      const button = connectButtonRef.current.querySelector('button');
      button?.click();
    } else {
      setActive(key);
    }
  };

  return (
    <>
      <aside className={styles.sidebarContainer}>
        <div className={styles.sidebarFrame}>
          {Object.keys(ICONS).map((key) => {
            const isFloating = key === 'about' || key === 'profile';
            return (
              <button
                key={key}
                className={`${styles.cButton} ${active === key ? styles.cButtonActive : ''} ${isFloating ? `${styles.floating} ${styles[key] || ''}` : ''}`}
                onClick={() => handleClick(key)}
              >
                <i data-feather={ICONS[key]}></i>
              </button>
            );
          })}
        </div>
      </aside>
      {/* Hidden ConnectButton, trigger lewat profil */}
      <div ref={connectButtonRef} style={{ display: 'none' }}>
        <ConnectButton showBalance={false} chainStatus="none" />
      </div>
    </>
  );
};

export default Sidebar;
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
