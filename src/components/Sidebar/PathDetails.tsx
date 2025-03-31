import { usePath } from "../../context/PathContext";
import { RouteEditor } from "./RouteEditor";
import styles from "../../styles/Sidebar/PathDetails.module.scss";

export const PathDetails = () => {
    const { selectedPath, getSelectedPathInfo, isFavorite, toggleFavorite } =
        usePath();
    const pathInfo = getSelectedPathInfo();

    if (!selectedPath || !pathInfo) {
        return (
            <div className={styles.pathDetails}>
                <p className={styles.noSelection}>請從列表中選擇一條路線</p>
            </div>
        );
    }

    return (
        <div className={styles.pathDetails}>
            <div className={styles.pathHeader}>
                <h3>{pathInfo.name}</h3>
                <div className={styles.pathActions}>
                    <button
                        className={`${styles.favoriteButton} ${
                            isFavorite(selectedPath) ? styles.active : ""
                        }`}
                        onClick={() => toggleFavorite(selectedPath)}
                        aria-label={
                            isFavorite(selectedPath)
                                ? "從收藏中移除"
                                : "加入收藏"
                        }
                    >
                        {isFavorite(selectedPath) ? "★" : "☆"}
                    </button>
                    <button
                        className={styles.shareButton}
                        onClick={() => {
                            if (navigator.share) {
                                navigator.share({
                                    title: `城市路線導覽 - ${pathInfo.name}`,
                                    text: pathInfo.description,
                                    url: window.location.href,
                                });
                            } else {
                                // 回退方案：複製連結到剪貼簿
                                navigator.clipboard.writeText(
                                    window.location.href
                                );
                                alert("已複製連結到剪貼簿");
                            }
                        }}
                        aria-label="分享路線"
                    >
                        ↗
                    </button>
                </div>
            </div>
            <p className={styles.description}>{pathInfo.description}</p>

            <div className={styles.stats}>
                <div className={`${styles.stat} ${styles.medium}`}>
                    <span className={styles.icon}>⏱</span>
                    <span className={styles.value}>{pathInfo.time}</span>
                </div>
                <div className={`${styles.stat} ${styles.medium}`}>
                    <span className={styles.icon}>📏</span>
                    <span className={styles.value}>{pathInfo.distance}</span>
                </div>
            </div>

            <div className={styles.extraInfo}>
                <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>推薦交通方式</span>
                    <span className={styles.infoValue}>步行、自行車</span>
                </div>
                <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>適合時間</span>
                    <span className={styles.infoValue}>全天候</span>
                </div>
                <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>難度</span>
                    <span className={styles.infoValue}>初級</span>
                </div>
            </div>

            <RouteEditor />
        </div>
    );
};
