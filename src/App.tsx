import clsx from "clsx";
import "./App.css";
import styles from "./App.module.scss";
import { useState } from "react";

interface PathInfo {
    id: string;
    name: string;
    description: string;
    distance: string;
    time: string;
}

function App() {
    const [selectedPath, setSelectedPath] = useState<string | null>(null);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

    const pathsInfo: PathInfo[] = [
        {
            id: "path-1",
            name: "東區路線",
            description: "穿過城市東區的主要道路，經過多個景點和商業區",
            distance: "5.2 公里",
            time: "約 25 分鐘",
        },
        {
            id: "path-2",
            name: "中央路線",
            description: "連接城市南北的中央通道，是市區最繁忙的交通路線",
            distance: "7.8 公里",
            time: "約 35 分鐘",
        },
        {
            id: "path-3",
            name: "西區環線",
            description: "環繞西區的循環路線，可欣賞城市天際線和河岸風光",
            distance: "8.5 公里",
            time: "約 40 分鐘",
        },
    ];

    const handlePathClick = (pathId: string) => {
        setSelectedPath(pathId === selectedPath ? null : pathId);
    };

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const getSelectedPathInfo = () => {
        return pathsInfo.find((path) => path.id === selectedPath);
    };

    return (
        <div
            className={`${styles.appContainer} ${
                isDarkMode ? styles.darkMode : ""
            }`}
        >
            <div className={styles.header}>
                <h1 className={styles.title}>城市路線導覽</h1>
                <button
                    className={styles.themeToggle}
                    onClick={toggleDarkMode}
                    aria-label={
                        isDarkMode ? "切換至亮色模式" : "切換至暗色模式"
                    }
                >
                    {isDarkMode ? "☀️" : "🌙"}
                </button>
            </div>

            <div className={styles.mainContent}>
                <div className={styles.mapContainer}>
                    <svg
                        className={styles.map}
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        width="100%"
                        height="100%"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="-0.5 -0.5 871 651"
                    >
                        <rect
                            fill="#ffffff"
                            width="100%"
                            height="100%"
                            x="0"
                            y="0"
                        />
                        <g>
                            <g>
                                <g>
                                    <g>
                                        <rect
                                            x="270"
                                            y="300"
                                            width="120"
                                            height="60"
                                            fill="#ffffff"
                                            stroke="#000000"
                                            pointer-events="all"
                                        />
                                    </g>
                                </g>
                                <g>
                                    <g>
                                        <rect
                                            x="330"
                                            y="410"
                                            width="120"
                                            height="60"
                                            fill="#ffffff"
                                            stroke="#000000"
                                            pointer-events="all"
                                        />
                                    </g>
                                </g>
                                <g>
                                    <g>
                                        <rect
                                            x="130"
                                            y="300"
                                            width="120"
                                            height="60"
                                            fill="#ffffff"
                                            stroke="#000000"
                                            pointer-events="all"
                                        />
                                    </g>
                                </g>
                                <g>
                                    <g>
                                        <rect
                                            x="295"
                                            y="140"
                                            width="235"
                                            height="140"
                                            fill="#ffffff"
                                            stroke="#000000"
                                            pointer-events="all"
                                        />
                                    </g>
                                </g>
                                <g>
                                    <g>
                                        <rect
                                            x="0"
                                            y="490"
                                            width="300"
                                            height="130"
                                            fill="#ffffff"
                                            stroke="#000000"
                                            pointer-events="all"
                                        />
                                    </g>
                                </g>
                                <g>
                                    <g>
                                        <rect
                                            x="190"
                                            y="410"
                                            width="120"
                                            height="60"
                                            fill="#ffffff"
                                            stroke="#000000"
                                            pointer-events="all"
                                        />
                                    </g>
                                </g>
                                <g>
                                    <g>
                                        <rect
                                            x="410"
                                            y="300"
                                            width="120"
                                            height="60"
                                            fill="#ffffff"
                                            stroke="#000000"
                                            pointer-events="all"
                                        />
                                    </g>
                                </g>
                                <g>
                                    <g>
                                        <rect
                                            x="330"
                                            y="490"
                                            width="120"
                                            height="60"
                                            fill="#ffffff"
                                            stroke="#000000"
                                            pointer-events="all"
                                        />
                                    </g>
                                </g>
                                <g>
                                    <g>
                                        <rect
                                            x="490"
                                            y="80"
                                            width="390"
                                            height="230"
                                            fill="#ffffff"
                                            stroke="#000000"
                                            transform="rotate(90,685,195)"
                                            pointer-events="all"
                                        />
                                    </g>
                                </g>
                                <g>
                                    <g>
                                        <rect
                                            x="570"
                                            y="410"
                                            width="120"
                                            height="60"
                                            fill="#ffffff"
                                            stroke="#000000"
                                            pointer-events="all"
                                        />
                                    </g>
                                </g>
                                <g>
                                    <g>
                                        <rect
                                            x="330"
                                            y="570"
                                            width="120"
                                            height="60"
                                            fill="#ffffff"
                                            stroke="#000000"
                                            pointer-events="all"
                                        />
                                    </g>
                                </g>
                                <g>
                                    <g>
                                        <rect
                                            x="570"
                                            y="500"
                                            width="300"
                                            height="150"
                                            fill="#ffffff"
                                            stroke="#000000"
                                            pointer-events="all"
                                        />
                                    </g>
                                </g>
                                <g
                                    className={`${styles.pathGroup} ${
                                        selectedPath === "path-1"
                                            ? styles.selected
                                            : ""
                                    }`}
                                    onClick={() => handlePathClick("path-1")}
                                >
                                    <path
                                        className={styles.path}
                                        d="M 495 639.5 L 485 639.5 L 485 520 L 485 450 L 485 405 L 194.99 405 L 195.01 389.49 L 184.51 389.48 L 200.04 370.5 L 215.51 389.52 L 205.01 389.51 L 205.01 395 L 495 395 L 495 450 L 495 520 Z"
                                        stroke-miterlimit="1.42"
                                        pointer-events="all"
                                    />
                                    <path
                                        className={styles.arrow}
                                        d="M 195.01 389.49 L 184.51 389.48 L 200.04 370.5 L 215.51 389.52 L 205.01 389.51"
                                        stroke-miterlimit="4"
                                        pointer-events="all"
                                    />
                                </g>
                                <g
                                    className={`${styles.pathGroup} ${
                                        selectedPath === "path-2"
                                            ? styles.selected
                                            : ""
                                    }`}
                                    onClick={() => handlePathClick("path-2")}
                                >
                                    <path
                                        className={styles.path}
                                        d="M 515 639.5 L 505 639.5 L 505 395 L 545 395 L 545 95 L 375 95 L 375 110.5 L 385.5 110.5 L 370 129.5 L 354.5 110.5 L 365 110.5 L 365 85 L 555 85 L 555 405 L 515 405 Z"
                                        stroke-miterlimit="1.42"
                                        pointer-events="all"
                                    />
                                    <path
                                        className={styles.arrow}
                                        d="M 375 110.5 L 385.5 110.5 L 370 129.5 L 354.5 110.5 L 365 110.5"
                                        stroke-miterlimit="4"
                                        pointer-events="all"
                                    />
                                </g>
                                <g
                                    className={`${styles.pathGroup} ${
                                        selectedPath === "path-3"
                                            ? styles.selected
                                            : ""
                                    }`}
                                    onClick={() => handlePathClick("path-3")}
                                >
                                    <path
                                        className={styles.path}
                                        d="M 515 639.5 L 505 639.5 L 505 485 L 835 485 L 835 235 L 829.5 235 L 829.5 245.5 L 810.5 230 L 829.5 214.5 L 829.5 225 L 845 225 L 845 495 L 515 495 Z"
                                        stroke-miterlimit="1.42"
                                        pointer-events="all"
                                    />
                                    <path
                                        className={styles.arrow}
                                        d="M 829.5 235 L 829.5 245.5 L 810.5 230 L 829.5 214.5 L 829.5 225"
                                        stroke-miterlimit="4"
                                        pointer-events="all"
                                    />
                                </g>
                            </g>
                        </g>
                    </svg>
                </div>

                <div className={styles.sidebar}>
                    <div className={styles.controlPanel}>
                        <h2>路線選擇</h2>
                        <div className={styles.pathOptions}>
                            {pathsInfo.map((path) => (
                                <button
                                    key={path.id}
                                    className={`${styles.pathButton} ${
                                        selectedPath === path.id
                                            ? styles.active
                                            : ""
                                    }`}
                                    onClick={() => handlePathClick(path.id)}
                                >
                                    {path.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {selectedPath && (
                        <div className={styles.pathDetails}>
                            <h3>{getSelectedPathInfo()?.name}</h3>
                            <p className={styles.description}>
                                {getSelectedPathInfo()?.description}
                            </p>
                            <div className={styles.stats}>
                                <div className={styles.stat}>
                                    <span className={styles.icon}>📏</span>
                                    <span className={styles.value}>
                                        {getSelectedPathInfo()?.distance}
                                    </span>
                                </div>
                                <div className={styles.stat}>
                                    <span className={styles.icon}>⏱️</span>
                                    <span className={styles.value}>
                                        {getSelectedPathInfo()?.time}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.footer}>
                <p>© 2025 城市路線導覽系統</p>
                <div className={styles.controls}>
                    <button className={styles.zoomButton} aria-label="放大">
                        +
                    </button>
                    <button className={styles.zoomButton} aria-label="縮小">
                        -
                    </button>
                    <button
                        className={styles.resetButton}
                        aria-label="重置視圖"
                    >
                        ↺
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
