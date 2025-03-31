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
    viewerRef?: React.RefObject<any>;
    tool?: Tool;
    [key: string]: any;
}

/**
 * 地圖控制操作處理程序
 */
export interface MapActionHandlers {
    tool: Tool;
    value: Value;
    isFullscreen: boolean;
    onChangeValue: (value: Value) => void;
    handleClick: (event: any) => void;
    executeMapAction: (
        action: MapActionTypes,
        payload?: MapActionPayload
    ) => void;
}

export interface PathInfo {
    id: string;
    name: string;
    description: string;
    distance: string;
    time: string;
    type: "default" | "custom";
    svgPath: string; // SVG 路徑數據
    color?: string; // 路徑顏色
    favorite?: boolean; // 是否收藏
}

export interface Point {
    x: number;
    y: number;
}

export interface MapActionHandlers {
    executeMapAction: (action: string) => void;
}
