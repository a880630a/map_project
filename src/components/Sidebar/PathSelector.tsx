import { usePath } from "../../context/PathContext";
import styles from "../../styles/Sidebar/PathSelector.module.scss";

export const PathSelector = () => {
    const { pathsInfo, selectedPath, setSelectedPath } = usePath();

    return (
        <div className={styles.controlPanel}>
            <h2>路線選擇</h2>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="搜尋路線..."
                    className={styles.searchInput}
                />
            </div>
            <div className={styles.pathOptions}>
                {pathsInfo.map((path) => (
                    <button
                        key={path.id}
                        className={`${styles.pathButton} ${
                            selectedPath === path.id ? styles.active : ""
                        }`}
                        onClick={() => setSelectedPath(path.id)}
                    >
                        {path.name}
                    </button>
                ))}
            </div>
        </div>
    );
};
