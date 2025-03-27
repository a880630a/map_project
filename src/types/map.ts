import { Tool, Value } from "react-svg-pan-zoom";
import { SVGPanZoom } from "react-svg-pan-zoom/src/features/pan-zoom";
import React from "react";

/**
 * 地圖動作類型
 */
export type MapActionTypes =
    | "ZOOM_IN"
    | "ZOOM_OUT"
    | "RESET_VIEW"
    | "TOGGLE_FULLSCREEN"
    | "SET_TOOL";

/**
 * 地圖動作載荷
 */
export interface MapActionPayload {
    viewerRef?: React.RefObject<SVGPanZoom>;
    tool?: Tool;
    [key: string]: any;
}

/**
 * 地圖控制操作處理程序
 */
export interface MapActionHandlers {
    tool: Tool;
    value: Value;
    viewerWidth: number;
    viewerHeight: number;
    isFullscreen: boolean;
    onChangeValue: (value: Value) => void;
    handleClick: (event: any) => void;
    zoomIn: (viewerRef: React.RefObject<SVGPanZoom>) => void;
    zoomOut: (viewerRef: React.RefObject<SVGPanZoom>) => void;
    resetView: (viewerRef: React.RefObject<SVGPanZoom>) => void;
    toggleFullscreen: () => void;
    setToolType: (type: Tool) => void;
    executeMapAction: (
        action: MapActionTypes,
        payload?: MapActionPayload
    ) => void;
}
