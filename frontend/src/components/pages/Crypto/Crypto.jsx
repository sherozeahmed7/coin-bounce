import styles from './Crypto.module.css';
import { useState, useEffect } from "react";
import Loader from "../../Loader/Loader";
import { getCrypto } from "../../../api/external";

const Crypto = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        (async function cryptoApiCall() {
            const response = await getCrypto();
            setData(response || []); 
        })();
    }, []);

    if (data.length === 0) {
        return <Loader text="Cryptocurrencies" />;
    }

    return (
        <table className={styles.table}>
            <thead>
                <tr className={styles.head}>
                    <th>#</th>
                    <th>Coins</th>
                    <th>Symbol</th>
                    <th>Price</th>
                    <th>24h</th>
                </tr>
            </thead>
            <tbody>
                {data.map((coin) => (
                    <tr key={coin.id} className={styles.tableRow}>
                        <td>{coin.market_cap_rank}</td>
                        <td>
                            <div className={styles.logo}>
                                <img src={coin.image} width={40} height={40} alt={coin.name} />
                                {coin.name}
                            </div>
                        </td>
                        <td><div className={styles.symbol}>{coin.symbol.toUpperCase()}</div></td>
                        <td>${coin.current_price.toFixed(2)}</td>
                        <td>{coin.price_change_percentage_24h.toFixed(2)}%</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Crypto;