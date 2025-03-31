import React, { createContext, useContext, useState, ReactNode } from "react";
import { PathInfo } from "../types/map";

// 預設路徑資訊
const defaultPathsInfo: PathInfo[] = [
    {
        id: "path-1",
        name: "東區路線",
        description: "穿過城市東區的主要道路，經過多個景點和商業區",
        distance: "5.2 公里",
        time: "約 25 分鐘",
        type: "default",
        svgPath: "M200,150 C300,100 400,200 500,150 S600,300 700,250",
        color: "#FF5252",
    },
    {
        id: "path-2",
        name: "中央路線",
        description: "連接城市南北的中央通道，是市區最繁忙的交通路線",
        distance: "7.8 公里",
        time: "約 35 分鐘",
        type: "default",
        svgPath: "M150,300 C250,350 350,250 450,300 S650,350 750,320",
        color: "#4CAF50",
    },
    {
        id: "path-3",
        name: "西區環線",
        description: "環繞西區的循環路線，可欣賞城市天際線和河岸風光",
        distance: "8.5 公里",
        time: "約 40 分鐘",
        type: "default",
        svgPath: "M120,400 C220,500 320,450 500,470 S650,520 700,450",
        color: "#2196F3",
    },
];

interface PathContextType {
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

const PathContext = createContext<PathContextType | undefined>(undefined);

interface PathProviderProps {
    children: ReactNode;
}

export const PathProvider = ({ children }: PathProviderProps) => {
    const [selectedPath, setSelectedPath] = useState<string | null>(null);
    const [pathsInfo, setPathsInfo] = useState<PathInfo[]>(defaultPathsInfo);
    const [favoritePathIds, setFavoritePathIds] = useState<string[]>([]);
    const [isDrawingMode, setDrawingMode] = useState<boolean>(false);
    const [drawnPaths, setDrawnPaths] = useState<string[]>([]);

    const handlePathSelect = (pathId: string | null) => {
        setSelectedPath(pathId === selectedPath ? null : pathId);
    };

    const getSelectedPathInfo = () => {
        return pathsInfo.find((path) => path.id === selectedPath);
    };

    const updatePath = (pathId: string, updates: Partial<PathInfo>) => {
        setPathsInfo((paths) =>
            paths.map((path) =>
                path.id === pathId ? { ...path, ...updates } : path
            )
        );
    };

    const addPath = (path: Omit<PathInfo, "id">) => {
        const newPath = {
            ...path,
            id: `path-${Date.now()}`, // 生成唯一ID
        };
        setPathsInfo((paths) => [...paths, newPath]);
    };

    const removePath = (pathId: string) => {
        setPathsInfo((paths) => paths.filter((path) => path.id !== pathId));
        if (selectedPath === pathId) {
            setSelectedPath(null);
        }
    };

    const isFavorite = (pathId: string) => {
        return favoritePathIds.includes(pathId);
    };

    const toggleFavorite = (pathId: string) => {
        setFavoritePathIds((prevIds) => {
            if (prevIds.includes(pathId)) {
                return prevIds.filter((id) => id !== pathId);
            } else {
                return [...prevIds, pathId];
            }
        });
    };

    const addDrawnPath = (path: string) => {
        setDrawnPaths((prevPaths) => [...prevPaths, path]);
    };

    const clearDrawnPaths = () => {
        setDrawnPaths([]);
    };

    return (
        <PathContext.Provider
            value={{
                selectedPath,
                setSelectedPath: handlePathSelect,
                pathsInfo,
                getSelectedPathInfo,
                updatePath,
                addPath,
                removePath,
                isFavorite,
                toggleFavorite,
                favoritePathIds,
                isDrawingMode,
                setDrawingMode,
                drawnPaths,
                addDrawnPath,
                clearDrawnPaths,
            }}
        >
            {children}
        </PathContext.Provider>
    );
};

export const usePath = (): PathContextType => {
    const context = useContext(PathContext);
    if (context === undefined) {
        throw new Error("usePath must be used within a PathProvider");
    }
    return context;
};
