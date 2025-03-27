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
}
