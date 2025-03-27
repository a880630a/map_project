import clsx from "clsx";
import { usePath } from "../../context/PathContext";
import styles from "../../styles/Map/SVGPaths.module.scss";

export const SVGPaths = () => {
    const { selectedPath, setSelectedPath } = usePath();

    const handlePathClick = (pathId: string) => {
        setSelectedPath(pathId);
    };

    return (
        <g>
            <g>
                <g>
                    {/* 建築物和地標 */}
                    <g>
                        <rect
                            x="270"
                            y="300"
                            width="120"
                            height="60"
                            fill="#ffffff"
                            stroke="#000000"
                            strokeWidth="1"
                            className={styles.building}
                        />
                    </g>
                    <g>
                        <rect
                            x="330"
                            y="410"
                            width="120"
                            height="60"
                            fill="#ffffff"
                            stroke="#000000"
                            strokeWidth="1"
                            className={styles.building}
                        />
                    </g>
                    <g>
                        <rect
                            x="130"
                            y="300"
                            width="120"
                            height="60"
                            fill="#ffffff"
                            stroke="#000000"
                            strokeWidth="1"
                            className={styles.building}
                        />
                    </g>
                    <g>
                        <rect
                            x="295"
                            y="140"
                            width="235"
                            height="140"
                            fill="#ffffff"
                            stroke="#000000"
                            strokeWidth="1"
                            className={styles.building}
                        />
                    </g>
                    <g>
                        <rect
                            x="0"
                            y="490"
                            width="300"
                            height="130"
                            fill="#ffffff"
                            stroke="#000000"
                            strokeWidth="1"
                            className={styles.building}
                        />
                    </g>
                    <g>
                        <rect
                            x="190"
                            y="410"
                            width="120"
                            height="60"
                            fill="#ffffff"
                            stroke="#000000"
                            strokeWidth="1"
                            className={styles.building}
                        />
                    </g>
                    <g>
                        <rect
                            x="410"
                            y="300"
                            width="120"
                            height="60"
                            fill="#ffffff"
                            stroke="#000000"
                            strokeWidth="1"
                            className={styles.building}
                        />
                    </g>
                    <g>
                        <rect
                            x="330"
                            y="490"
                            width="120"
                            height="60"
                            fill="#ffffff"
                            stroke="#000000"
                            strokeWidth="1"
                            className={styles.building}
                        />
                    </g>
                    <g>
                        <rect
                            x="490"
                            y="80"
                            width="390"
                            height="230"
                            fill="#ffffff"
                            stroke="#000000"
                            transform="rotate(90,685,195)"
                            strokeWidth="1"
                            className={styles.building}
                        />
                    </g>
                    <g>
                        <rect
                            x="570"
                            y="410"
                            width="120"
                            height="60"
                            fill="#ffffff"
                            stroke="#000000"
                            strokeWidth="1"
                            className={styles.building}
                        />
                    </g>
                    <g>
                        <rect
                            x="330"
                            y="570"
                            width="120"
                            height="60"
                            fill="#ffffff"
                            stroke="#000000"
                            strokeWidth="1"
                            className={styles.building}
                        />
                    </g>
                    <g>
                        <rect
                            x="570"
                            y="500"
                            width="300"
                            height="150"
                            fill="#ffffff"
                            stroke="#000000"
                            strokeWidth="1"
                            className={styles.building}
                        />
                    </g>

                    {/* 路徑 */}
                    <g
                        className={`${styles.pathGroup} ${
                            selectedPath === "path-1" ? styles.selected : ""
                        }`}
                        onClick={() => handlePathClick("path-1")}
                    >
                        <path
                            className={styles.path}
                            d="M 495 639.5 L 485 639.5 L 485 520 L 485 450 L 485 405 L 194.99 405 L 195.01 389.49 L 184.51 389.48 L 200.04 370.5 L 215.51 389.52 L 205.01 389.51 L 205.01 395 L 495 395 L 495 450 L 495 520 Z"
                            strokeMiterlimit="1.42"
                        />
                        <path
                            className={clsx(styles.arrow, {
                                [styles.activeArrow1]:
                                    selectedPath === "path-1",
                            })}
                            d="M 195.01 389.49 L 184.51 389.48 L 200.04 370.5 L 215.51 389.52 L 205.01 389.51"
                            strokeMiterlimit="4"
                        />
                        <circle
                            className={styles.pathMarker}
                            cx="200"
                            cy="380"
                            r="8"
                            data-tooltip="東區起點"
                        />
                        <circle
                            className={styles.pathMarker}
                            cx="490"
                            cy="580"
                            r="8"
                            data-tooltip="東區終點"
                        />
                    </g>
                    <g
                        className={`${styles.pathGroup} ${
                            selectedPath === "path-2" ? styles.selected : ""
                        }`}
                        onClick={() => handlePathClick("path-2")}
                    >
                        <path
                            className={styles.path}
                            d="M 515 639.5 L 505 639.5 L 505 395 L 545 395 L 545 95 L 375 95 L 375 110.5 L 385.5 110.5 L 370 129.5 L 354.5 110.5 L 365 110.5 L 365 85 L 555 85 L 555 405 L 515 405 Z"
                            strokeMiterlimit="1.42"
                        />
                        <path
                            className={clsx(styles.arrow, {
                                [styles.activeArrow2]:
                                    selectedPath === "path-2",
                            })}
                            d="M 375 110.5 L 385.5 110.5 L 370 129.5 L 354.5 110.5 L 365 110.5"
                            strokeMiterlimit="4"
                        />
                        <circle
                            className={styles.pathMarker}
                            cx="370"
                            cy="110"
                            r="8"
                            data-tooltip="中央路線起點"
                        />
                        <circle
                            className={styles.pathMarker}
                            cx="510"
                            cy="530"
                            r="8"
                            data-tooltip="中央路線終點"
                        />
                    </g>
                    <g
                        className={`${styles.pathGroup} ${
                            selectedPath === "path-3" ? styles.selected : ""
                        }`}
                        onClick={() => handlePathClick("path-3")}
                    >
                        <path
                            className={styles.path}
                            d="M 515 639.5 L 505 639.5 L 505 485 L 835 485 L 835 235 L 829.5 235 L 829.5 245.5 L 810.5 230 L 829.5 214.5 L 829.5 225 L 845 225 L 845 495 L 515 495 Z"
                            strokeMiterlimit="1.42"
                        />
                        <path
                            className={clsx(styles.arrow, {
                                [styles.activeArrow3]:
                                    selectedPath === "path-3",
                            })}
                            d="M 829.5 235 L 829.5 245.5 L 810.5 230 L 829.5 214.5 L 829.5 225"
                            strokeMiterlimit="4"
                        />
                        <circle
                            className={styles.pathMarker}
                            cx="830"
                            cy="230"
                            r="8"
                            data-tooltip="西區環線起點"
                        />
                        <circle
                            className={styles.pathMarker}
                            cx="510"
                            cy="580"
                            r="8"
                            data-tooltip="西區環線終點"
                        />
                    </g>
                </g>
            </g>
        </g>
    );
};
