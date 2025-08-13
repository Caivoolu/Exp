// src/components/pages/home.tsx
import React from 'react';
import styles from './ui/home.module.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';

// Impor ikon-ikon yang diperlukan (contoh)
// Anda perlu memastikan ikon-ikon ini ada di folder `public/iconsite`
import SwapIcon from '/public/iconsite/swap.png';
import PoolIcon from '/public/iconsite/pool.png';
import LabIcon from '/public/iconsite/lab.png';
import NftIcon from '/public/iconsite/nft.png';

// Impor ikon-ikon kecil (contoh)
import Icon1 from '/public/iconsite/icons1.png';
import Icon2 from '/public/iconsite/icons2.png';
import Icon3 from '/public/iconsite/icons3.png';
// ... tambahkan ikon lain sesuai kebutuhan

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.header}>
        <ConnectButton />
      </div>

      <div className={styles.heroSection}>
        <h1 className={styles.title}>NeoPlat Defi</h1>
        <p className={styles.description}>
          Platform DeFi terdesentralisasi dengan antarmuka neomorphism yang intuitif dan aman.
          NeoPlat menawarkan berbagai fitur keuangan terdesentralisasi seperti swap token,
          manajemen pool likuiditas, dan laboratorium eksperimental untuk inovasi DeFi.
        </p>
      </div>

      <div className={styles.featureGrid}>
        <div className={styles.featureCard}>
          <img src={SwapIcon.src} alt="Swap Icon" className={styles.cardIcon} />
          <h2 className={styles.cardTitle}>Swap</h2>
          <p className={styles.cardDescription}>Tukar token secara instan dengan biaya rendah.</p>
        </div>
        <div className={styles.featureCard}>
          <img src={PoolIcon.src} alt="Pool Icon" className={styles.cardIcon} />
          <h2 className={styles.cardTitle}>Pool</h2>
          <p className={styles.cardDescription}>Berikan likuiditas dan dapatkan imbalan.</p>
        </div>
        <div className={styles.featureCard}>
          <img src={LabIcon.src} alt="Lab Icon" className={styles.cardIcon} />
          <h2 className={styles.cardTitle}>Lab</h2>
          <p className={styles.cardDescription}>Eksperimen dengan fitur defi baru.</p>
        </div>
        <div className={styles.featureCard}>
          <img src={NftIcon.src} alt="NFT Icon" className={styles.cardIcon} />
          <h2 className={styles.cardTitle}>Market</h2>
          <p className={styles.cardDescription}>Jelajahi dan jual beli NFT.</p>
        </div>
      </div>

      <div className={styles.iconGallery}>
        <img src={Icon1.src} alt="Icon 1" className={styles.galleryIcon} />
        <img src={Icon2.src} alt="Icon 2" className={styles.galleryIcon} />
        <img src={Icon3.src} alt="Icon 3" className={styles.galleryIcon} />
        {/* Tambahkan elemen <img> untuk semua ikon lain di sini */}
      </div>
    </div>
  );
};

export default Home;
