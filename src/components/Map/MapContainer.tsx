import React, { useEffect, useRef, useState, useCallback } from "react";
import {
    ReactSVGPanZoom,
    Tool,
    Value,
    TOOL_PAN,
    MODE_IDLE,
} from "react-svg-pan-zoom";
import { usePath } from "../../context/PathContext";
import { useMapControl } from "../../hooks/useMapControl";
import { SVGPaths } from "./SVGPaths";
import { PathDrawer } from "./PathDrawer";
import { MapControls } from "./MapControls";
import { MapBackground } from "./MapBackground";
import styles from "../../styles/Map/MapContainer.module.scss";
import { PathInfo } from "../../types/map";

interface Props {
    width?: number;
    height?: number;
}

const initialValue: Value = {
    version: 2,
    mode: MODE_IDLE,
    focus: false,
    a: 1,
    b: 0,
    c: 0,
    d: 1,
    e: 0,
    f: 0,
    viewerWidth: 0,
    viewerHeight: 0,
    SVGWidth: 0,
    SVGHeight: 0,
    startX: null,
    startY: null,
    endX: null,
    endY: null,
    miniatureOpen: true,
};

export const MapContainer: React.FC<Props> = ({
    width = 800,
    height = 600,
}) => {
    const mapViewerRef = useRef<ReactSVGPanZoom>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width, height });
    const [tool, setTool] = useState<Tool>(TOOL_PAN);
    const [value, setValue] = useState<Value>(initialValue);
    const { selectedPath, addPath, isDrawingMode } = usePath();
    const { zoomIn, zoomOut, resetView } = useMapControl();

    // 使用 useCallback 包裹 setValue 函數，避免每次渲染都創建新的函數
    const handleValueChange = useCallback((newValue: Value) => {
        setValue(newValue);
    }, []);

    // 使用 useCallback 包裹 setTool 函數
    const handleToolChange = useCallback((newTool: Tool) => {
        setTool(newTool);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const { width, height } =
                    containerRef.current.getBoundingClientRect();
                setDimensions({ width, height });
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // 減少依賴項，僅在 selectedPath 變更時執行
    useEffect(() => {
        if (selectedPath && mapViewerRef.current && svgRef.current) {
            const pathElement = svgRef.current.querySelector(
                `path[data-id="${selectedPath}"]`
            ) as SVGPathElement | null;
            if (pathElement) {
                const bbox = pathElement.getBBox();
                const padding = 50;

                // 設置新的視圖狀態
                mapViewerRef.current.fitSelection(
                    bbox.x - padding,
                    bbox.y - padding,
                    bbox.width + padding * 2,
                    bbox.height + padding * 2
                );
            }
        }
    }, [selectedPath]); // 移除 dimensions 依賴

    const handlePathComplete = (path: string) => {
        const newPath: Omit<PathInfo, "id"> = {
            name: `路線 ${Date.now()}`,
            description: "新建路線",
            distance: "計算中...",
            time: "計算中...",
            type: "custom",
            svgPath: path,
            color: "#FF0000",
        };
        addPath(newPath);
    };

    return (
        <div ref={containerRef} className={styles.mapContainer}>
            <ReactSVGPanZoom
                ref={mapViewerRef}
                width={dimensions.width}
                height={dimensions.height}
                tool={tool}
                value={value}
                onChangeTool={handleToolChange}
                onChangeValue={handleValueChange}
                background="transparent"
                scaleFactorMin={0.5}
                scaleFactorMax={4}
                miniatureProps={{
                    position: "none",
                    background: "transparent",
                    width: 100,
                    height: 80,
                }}
                toolbarProps={{ position: "none" }}
                onZoom={(e) => e.stopPropagation()}
                onPan={(e) => e.stopPropagation()}
            >
                <svg
                    ref={svgRef}
                    width={dimensions.width}
                    height={dimensions.height}
                    viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
                >
                    <MapBackground
                        width={dimensions.width}
                        height={dimensions.height}
                    />
                    <SVGPaths />
                    {isDrawingMode && (
                        <PathDrawer
                            mapViewerRef={
                                mapViewerRef as React.MutableRefObject<ReactSVGPanZoom>
                            }
                            svgRef={
                                svgRef as React.MutableRefObject<SVGSVGElement>
                            }
                            isDrawingMode={isDrawingMode}
                            onPathComplete={handlePathComplete}
                        />
                    )}
                </svg>
            </ReactSVGPanZoom>
            <MapControls
                onZoomIn={zoomIn}
                onZoomOut={zoomOut}
                onResetView={resetView}
            />
        </div>
    );
};

export default MapContainer;
