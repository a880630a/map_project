import { createContext, useState, useContext, ReactNode } from "react";
import { PathContextType, PathInfo } from "../types";

// 預設路徑資訊
const defaultPathsInfo: PathInfo[] = [
    {
        id: "path-1",
        name: "東區路線",
        description: "穿過城市東區的主要道路，經過多個景點和商業區",
        distance: "5.2 公里",
        time: "約 25 分鐘",
    },
    {
        id: "path-2",
        name: "中央路線",
        description: "連接城市南北的中央通道，是市區最繁忙的交通路線",
        distance: "7.8 公里",
        time: "約 35 分鐘",
    },
    {
        id: "path-3",
        name: "西區環線",
        description: "環繞西區的循環路線，可欣賞城市天際線和河岸風光",
        distance: "8.5 公里",
        time: "約 40 分鐘",
    },
];

const PathContext = createContext<PathContextType>({
    selectedPath: null,
    setSelectedPath: () => {},
    pathsInfo: defaultPathsInfo,
    getSelectedPathInfo: () => undefined,
});

interface PathProviderProps {
    children: ReactNode;
}

export const PathProvider = ({ children }: PathProviderProps) => {
    const [selectedPath, setSelectedPath] = useState<string | null>(null);
    const [pathsInfo] = useState<PathInfo[]>(defaultPathsInfo);

    const handlePathSelect = (pathId: string | null) => {
        setSelectedPath(pathId === selectedPath ? null : pathId);
    };

    const getSelectedPathInfo = () => {
        return pathsInfo.find((path) => path.id === selectedPath);
    };

    return (
        <PathContext.Provider
            value={{
                selectedPath,
                setSelectedPath: handlePathSelect,
                pathsInfo,
                getSelectedPathInfo,
            }}
        >
            {children}
        </PathContext.Provider>
    );
};

export const usePath = () => useContext(PathContext);
