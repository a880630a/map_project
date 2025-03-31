import React, { useCallback, useRef, useState } from "react";
import { ReactSVGPanZoom } from "react-svg-pan-zoom";
import styles from "../../styles/Map/SVGPaths.module.scss";

interface Point {
    x: number;
    y: number;
}

interface PathDrawerProps {
    mapViewerRef: React.MutableRefObject<ReactSVGPanZoom>;
    svgRef: React.MutableRefObject<SVGSVGElement>;
    isDrawingMode: boolean;
    onPathComplete: (path: string) => void;
}

export const PathDrawer: React.FC<PathDrawerProps> = ({
    mapViewerRef,
    svgRef,
    isDrawingMode,
    onPathComplete,
}) => {
    const [isDrawing, setIsDrawing] = useState(false);
    const [points, setPoints] = useState<Point[]>([]);
    const lastPointTimeRef = useRef(0);
    const minTimeBetweenPoints = 20; // 最小點之間的時間間隔（毫秒）

    const transformCoordinates = useCallback(
        (event: React.MouseEvent<SVGGElement>): Point | null => {
            if (!mapViewerRef.current || !svgRef.current) return null;

            try {
                const svg = svgRef.current;
                const viewer = mapViewerRef.current;

                // 獲取 SVG 的 CTM（當前變換矩陣）
                const ctm = svg.getScreenCTM();
                if (!ctm) return null;

                // 創建點
                const pt = svg.createSVGPoint();
                pt.x = event.clientX;
                pt.y = event.clientY;

                // 轉換座標
                const svgPoint = pt.matrixTransform(ctm.inverse());

                // 考慮 ReactSVGPanZoom 的縮放和平移
                const viewerState = viewer.getValue();
                const x =
                    (svgPoint.x - viewerState.translationX) / viewerState.scale;
                const y =
                    (svgPoint.y - viewerState.translationY) / viewerState.scale;

                return { x, y };
            } catch (error) {
                console.error("座標轉換錯誤:", error);
                return null;
            }
        },
        [mapViewerRef, svgRef]
    );

    const startDrawing = useCallback(
        (e: React.MouseEvent<SVGGElement>) => {
            if (!isDrawingMode) return;

            const point = transformCoordinates(e);
            if (point) {
                setIsDrawing(true);
                setPoints([point]);
                e.stopPropagation();
                e.preventDefault();
            }
        },
        [isDrawingMode, transformCoordinates]
    );

    const draw = useCallback(
        (e: React.MouseEvent<SVGGElement>) => {
            if (!isDrawing || !isDrawingMode) return;

            const now = Date.now();
            if (now - lastPointTimeRef.current < minTimeBetweenPoints) return;

            const point = transformCoordinates(e);
            if (!point) return;

            setPoints((prevPoints) => {
                if (prevPoints.length === 0) return [point];

                const lastPoint = prevPoints[prevPoints.length - 1];
                const distance = Math.sqrt(
                    Math.pow(point.x - lastPoint.x, 2) +
                        Math.pow(point.y - lastPoint.y, 2)
                );

                // 如果點太近，不添加
                if (distance < 5) return prevPoints;

                return [...prevPoints, point];
            });

            lastPointTimeRef.current = now;
            e.stopPropagation();
            e.preventDefault();
        },
        [isDrawing, isDrawingMode, transformCoordinates]
    );

    const stopDrawing = useCallback(
        (e: React.MouseEvent<SVGGElement>) => {
            if (!isDrawing) return;

            setIsDrawing(false);
            if (points.length > 1) {
                const pathData = pointsToPath(points);
                onPathComplete(pathData);
            }
            setPoints([]);
            e.stopPropagation();
            e.preventDefault();
        },
        [isDrawing, points, onPathComplete]
    );

    const pointsToPath = (pts: Point[]): string => {
        if (pts.length < 2) return "";

        let path = `M ${pts[0].x},${pts[0].y}`;

        // 使用曲線平滑處理
        for (let i = 1; i < pts.length; i++) {
            path += ` L ${pts[i].x},${pts[i].y}`;
        }

        return path;
    };

    return (
        <g
            className={styles.drawingLayer}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
        >
            {isDrawing && points.length > 1 && (
                <path d={pointsToPath(points)} className={styles.drawingPath} />
            )}
        </g>
    );
};

export default PathDrawer;
