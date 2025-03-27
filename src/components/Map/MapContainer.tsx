import { useRef, useEffect, useState } from "react";
import { ReactSVGPanZoom } from "react-svg-pan-zoom";
import { useMapControl } from "../../hooks/useMapControl";
import { usePath } from "../../context/PathContext";
import { SVGPaths } from "./SVGPaths";
import { MapControls } from "./MapControls";
import styles from "../../styles/Map/MapContainer.module.scss";

export const MapContainer = () => {
    const Viewer = useRef<ReactSVGPanZoom>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { selectedPath } = usePath();
    const { tool, value, onChangeValue, handleClick, isFullscreen } =
        useMapControl();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    // 計算容器尺寸
    const updateContainerSize = () => {
        if (containerRef.current) {
            const { clientWidth, clientHeight } = containerRef.current;
            setDimensions({
                width: clientWidth,
                height: clientHeight,
            });
        }
    };

    // 視窗大小變化時更新尺寸
    useEffect(() => {
        updateContainerSize();

        const resizeObserver = new ResizeObserver(() => {
            updateContainerSize();
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        window.addEventListener("resize", updateContainerSize);

        return () => {
            resizeObserver.disconnect();
            window.removeEventListener("resize", updateContainerSize);
        };
    }, []);

    // 尺寸變化後更新視圖
    useEffect(() => {
        if (Viewer.current && dimensions.width > 0 && dimensions.height > 0) {
            Viewer.current.fitToViewer();
        }
    }, [dimensions]);

    // 當全屏狀態改變時，更新容器樣式
    const containerClasses = isFullscreen
        ? `${styles.mapContainer} ${styles.fullscreen}`
        : styles.mapContainer;

    return (
        <div className={containerClasses} ref={containerRef}>
            {dimensions.width > 0 && dimensions.height > 0 && (
                <ReactSVGPanZoom
                    ref={Viewer}
                    width={dimensions.width}
                    height={dimensions.height}
                    tool={tool}
                    onChangeTool={() => {}}
                    value={value}
                    onChangeValue={onChangeValue}
                    onClick={handleClick}
                    background={
                        selectedPath ? "rgba(240, 240, 240, 0.9)" : "white"
                    }
                    miniatureProps={{
                        position: "none",
                        background: "white",
                        width: 100,
                        height: 80,
                    }}
                    toolbarProps={{ position: "none" }}
                    detectAutoPan={false}
                    preventPanOutside={true}
                    scaleFactorMin={0.5}
                    scaleFactorMax={5}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={dimensions.width}
                        height={dimensions.height}
                        viewBox="0 0 870 650"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        <defs>
                            <filter
                                id="glow"
                                x="-20%"
                                y="-20%"
                                width="140%"
                                height="140%"
                            >
                                <feGaussianBlur
                                    stdDeviation="5"
                                    result="blur"
                                />
                                <feColorMatrix
                                    in="blur"
                                    mode="matrix"
                                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                                    result="glow"
                                />
                                <feComposite
                                    in="SourceGraphic"
                                    in2="glow"
                                    operator="over"
                                />
                            </filter>
                        </defs>
                        <rect
                            fill="#ffffff"
                            width="100%"
                            height="100%"
                            x="0"
                            y="0"
                        />
                        <SVGPaths />
                    </svg>
                </ReactSVGPanZoom>
            )}
            <MapControls mapViewerRef={Viewer} />
        </div>
    );
};
