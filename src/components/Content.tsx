import React from 'react';
import styles from '../styles/content.module.css';
import { useAccount } from 'wagmi';

interface ContentProps {
  active: string;
  pages: Record<string, React.ReactNode>;
}

const Content: React.FC<ContentProps> = ({ active, pages }) => {
  const { address, isConnected } = useAccount();

  return (
    <main className={styles.contentFrame}>
      {active === 'profile' ? (
        <div>
          {isConnected ? (
            <div>
              <h2>Wallet Connected!</h2>
              <p>Address: {address}</p>
            </div>
          ) : (
            <p>Click the profile icon to connect your wallet.</p>
          )}
        </div>
      ) : (
        pages[active]
      )}
    </main>
  );
};

export default Content;
