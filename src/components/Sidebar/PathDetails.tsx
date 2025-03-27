import { useState } from "react";
import { usePath } from "../../context/PathContext";
import styles from "../../styles/Sidebar/PathDetails.module.scss";

const TRAFFIC_STATUS = {
    "path-1": "順暢",
    "path-2": "擁擠",
    "path-3": "一般",
};

const CONGESTION_LEVEL = {
    順暢: "low",
    一般: "medium",
    擁擠: "high",
};

export const PathDetails = () => {
    const { selectedPath, getSelectedPathInfo } = usePath();
    const [isFavorite, setIsFavorite] = useState(false);

    // 如果沒有選擇路徑，返回空組件
    if (!selectedPath) return null;

    const pathInfo = getSelectedPathInfo();
    const trafficStatus =
        TRAFFIC_STATUS[selectedPath as keyof typeof TRAFFIC_STATUS] || "一般";
    const congestionClass =
        CONGESTION_LEVEL[trafficStatus as keyof typeof CONGESTION_LEVEL] ||
        "medium";

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    const sharePath = () => {
        alert("分享功能即將推出！");
    };

    return (
        <div className={styles.pathDetails}>
            <div className={styles.pathHeader}>
                <h3>{pathInfo?.name}</h3>
                <div className={styles.pathActions}>
                    <button
                        className={`${styles.favoriteButton} ${
                            isFavorite ? styles.active : ""
                        }`}
                        onClick={toggleFavorite}
                        aria-label={isFavorite ? "從收藏中移除" : "添加到收藏"}
                    >
                        {isFavorite ? "★" : "☆"}
                    </button>
                    <button
                        className={styles.shareButton}
                        onClick={sharePath}
                        aria-label="分享路線"
                    >
                        ↗
                    </button>
                </div>
            </div>

            <p className={styles.description}>{pathInfo?.description}</p>

            <div className={styles.stats}>
                <div className={styles.stat}>
                    <span className={styles.icon}>📏</span>
                    <span className={styles.value}>{pathInfo?.distance}</span>
                </div>
                <div className={styles.stat}>
                    <span className={styles.icon}>⏱️</span>
                    <span className={styles.value}>{pathInfo?.time}</span>
                </div>
                <div className={`${styles.stat} ${styles[congestionClass]}`}>
                    <span className={styles.icon}>🚦</span>
                    <span className={styles.value}>{trafficStatus}</span>
                </div>
            </div>

            <div className={styles.extraInfo}>
                <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>坡度</span>
                    <span className={styles.infoValue}>較平緩</span>
                </div>
                <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>適合時段</span>
                    <span className={styles.infoValue}>全天候</span>
                </div>
                <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>沿途設施</span>
                    <span className={styles.infoValue}>
                        休息站, 廁所, 飲水處
                    </span>
                </div>
            </div>
        </div>
    );
};
