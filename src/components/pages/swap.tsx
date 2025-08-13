// src/components/pages/swap.tsx
import styles from './ui/swap.module.css';

const Swap = () => {
    return (
        <div className={styles.swapContainer}>
            <iframe
                src="https://relay.link/swap?embed=true"
                className={styles.swapFrame}
                title="Relay Swap Widget"
            ></iframe>
        </div>
    );
};

export default Swap;
