import React from "react";
import styles from "../../styles/Map/MapBackground.module.scss";

interface MapBackgroundProps {
    width: number;
    height: number;
}

export const MapBackground: React.FC<MapBackgroundProps> = ({
    width,
    height,
}) => {
    return (
        <g className={styles.mapBackground}>
            {/* 背景 */}
            <rect
                x="0"
                y="0"
                width={width}
                height={height}
                fill="#f8f9fa"
                className={styles.background}
            />

            {/* 主要區域 */}
            <rect
                x="100"
                y="100"
                width="600"
                height="400"
                className={styles.mainArea}
            />

            {/* 建築物 */}
            <g className={styles.buildings}>
                <rect
                    x="270"
                    y="300"
                    width="120"
                    height="60"
                    className={styles.building}
                />
                <rect
                    x="330"
                    y="410"
                    width="120"
                    height="60"
                    className={styles.building}
                />
                <rect
                    x="130"
                    y="300"
                    width="120"
                    height="60"
                    className={styles.building}
                />
                <rect
                    x="295"
                    y="140"
                    width="235"
                    height="140"
                    className={styles.building}
                />
                <rect
                    x="0"
                    y="490"
                    width="300"
                    height="130"
                    className={styles.building}
                />
                <rect
                    x="190"
                    y="410"
                    width="120"
                    height="60"
                    className={styles.building}
                />
                <rect
                    x="410"
                    y="300"
                    width="120"
                    height="60"
                    className={styles.building}
                />
                <rect
                    x="330"
                    y="490"
                    width="120"
                    height="60"
                    className={styles.building}
                />
                <rect
                    x="490"
                    y="80"
                    width="390"
                    height="230"
                    transform="rotate(90,685,195)"
                    className={styles.building}
                />
                <rect
                    x="570"
                    y="410"
                    width="120"
                    height="60"
                    className={styles.building}
                />
                <rect
                    x="330"
                    y="570"
                    width="120"
                    height="60"
                    className={styles.building}
                />
                <rect
                    x="570"
                    y="500"
                    width="300"
                    height="150"
                    className={styles.building}
                />
            </g>

            {/* 道路 */}
            <g className={styles.roads}>
                <path d="M100,250 L700,250" className={styles.mainRoad} />
                <path d="M400,100 L400,500" className={styles.mainRoad} />
                <path d="M200,150 L600,150" className={styles.secondaryRoad} />
                <path d="M200,350 L600,350" className={styles.secondaryRoad} />
                <path d="M200,100 L200,500" className={styles.secondaryRoad} />
                <path d="M600,100 L600,500" className={styles.secondaryRoad} />
            </g>

            {/* 公園區域 */}
            <rect
                x="450"
                y="380"
                width="100"
                height="80"
                rx="10"
                className={styles.parkArea}
            />

            {/* 水域 */}
            <path
                d="M50,430 Q100,380 150,430 T250,430 T350,430 T450,430"
                className={styles.waterArea}
            />
        </g>
    );
};

export default MapBackground;
