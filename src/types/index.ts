export interface PathInfo {
    id: string;
    name: string;
    description: string;
    distance: string;
    time: string;
}

export interface ThemeContextType {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
}

export interface PathContextType {
    selectedPath: string | null;
    setSelectedPath: (pathId: string | null) => void;
    pathsInfo: PathInfo[];
    getSelectedPathInfo: () => PathInfo | undefined;
    updatePath: (pathId: string, updates: Partial<PathInfo>) => void;
    addPath: (path: Omit<PathInfo, "id">) => void;
    removePath: (pathId: string) => void;
    isFavorite: (pathId: string) => boolean;
    toggleFavorite: (pathId: string) => void;
    favoritePathIds: string[];
    isDrawingMode: boolean;
    setDrawingMode: (drawing: boolean) => void;
    drawnPaths: string[];
    addDrawnPath: (path: string) => void;
    clearDrawnPaths: () => void;
}

export interface Point {
    x: number;
    y: number;
}

export interface DrawnPath {
    id: string;
    points: Point[];
    color: string;
    width: number;
    name?: string;
}

// MapControl 相關類型
export interface MapActionPayload {
    routeId?: string;
    zoomLevel?: number;
    position?: { x: number; y: number };
}

export enum MapActionTypes {
    ZOOM_IN = "ZOOM_IN",
    ZOOM_OUT = "ZOOM_OUT",
    RESET_VIEW = "RESET_VIEW",
    SELECT_ROUTE = "SELECT_ROUTE",
    TOGGLE_FULLSCREEN = "TOGGLE_FULLSCREEN",
}

export interface MapActionHandlers {
    [MapActionTypes.ZOOM_IN]: () => void;
    [MapActionTypes.ZOOM_OUT]: () => void;
    [MapActionTypes.RESET_VIEW]: () => void;
    [MapActionTypes.SELECT_ROUTE]: (payload: MapActionPayload) => void;
    [MapActionTypes.TOGGLE_FULLSCREEN]: () => void;
}
