export interface Point {
    x: number;
    y: number;
}

export interface PathInfo {
    id: string;
    name: string;
    description: string;
    distance: string;
    time: string;
    svgPath?: string; // SVG路徑數據
    color?: string; // 路徑顏色
    type?: string; // 路徑類型（預設或自定義）
}
