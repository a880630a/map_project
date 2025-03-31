import React, { memo } from "react";
import { usePath } from "../../context/PathContext";
import styles from "../../styles/Map/SVGPaths.module.scss";

export const SVGPaths: React.FC = memo(() => {
    const { pathsInfo, selectedPath } = usePath();

    return (
        <g className={styles.pathsContainer}>
            {pathsInfo.map((path) => (
                <path
                    key={path.id}
                    data-id={path.id}
                    d={path.svgPath}
                    className={`${styles.path} ${
                        selectedPath === path.id ? styles.selectedPath : ""
                    }`}
                    style={{ stroke: path.color }}
                />
            ))}
        </g>
    );
});

SVGPaths.displayName = "SVGPaths";

export default SVGPaths;
