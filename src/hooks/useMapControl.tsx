import {
    useState,
    useCallback,
    createContext,
    useContext,
    ReactNode,
    useEffect,
} from "react";
import {
    TOOL_PAN,
    TOOL_ZOOM_IN,
    TOOL_ZOOM_OUT,
    Value,
    ViewerMouseEvent,
    Tool,
} from "react-svg-pan-zoom";
import { SVGPanZoom } from "react-svg-pan-zoom/src/features/pan-zoom";
import {
    MapActionHandlers,
    MapActionPayload,
    MapActionTypes,
} from "../types/map";

interface MapControlContextType {
    tool: string;
    setTool: (tool: string) => void;
    value: Value;
    onChangeValue: (value: Value) => void;
    zoomIn: () => void;
    zoomOut: () => void;
    resetView: () => void;
    handleClick: (event: ViewerMouseEvent) => void;
}

const MapControlContext = createContext<MapControlContextType>({
    tool: TOOL_PAN,
    setTool: () => {},
    value: {} as Value,
    onChangeValue: () => {},
    zoomIn: () => {},
    zoomOut: () => {},
    resetView: () => {},
    handleClick: () => {},
});

interface MapControlProviderProps {
    children: ReactNode;
}

export const MapControlProvider = ({ children }: MapControlProviderProps) => {
    const [tool, setTool] = useState<Tool>("pan");
    const [value, setValue] = useState<Value>({
        version: 2,
        viewerWidth: 0,
        viewerHeight: 0,
        SVGWidth: 870,
        SVGHeight: 650,
        startX: null,
        startY: null,
        endX: null,
        endY: null,
        mode: "idle",
        focus: false,
        points: [],
        scale: 1,
        translation: { x: 0, y: 0 },
        scaleFactorMin: 0.5,
        scaleFactorMax: 5,
    });
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [viewerState, setViewerState] = useState({
        viewerWidth: window.innerWidth > 1600 ? 1600 : window.innerWidth - 40,
        viewerHeight: window.innerHeight > 800 ? 800 : window.innerHeight - 100,
    });

    // 處理視窗調整事件
    useEffect(() => {
        const updateDimensions = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            // 全屏模式
            if (isFullscreen) {
                setViewerState({
                    viewerWidth: width,
                    viewerHeight: height,
                });
            } else {
                // 一般模式，保持較大視圖限制
                setViewerState({
                    viewerWidth: width > 1600 ? 1600 : width - 40,
                    viewerHeight: height > 800 ? 800 : height - 100,
                });
            }
        };

        // 初始設定
        updateDimensions();

        // 監聽調整大小事件
        window.addEventListener("resize", updateDimensions);

        return () => {
            window.removeEventListener("resize", updateDimensions);
        };
    }, [isFullscreen]);

    /**
     * 切換全屏模式
     */
    const toggleFullscreen = useCallback(() => {
        setIsFullscreen((prev) => !prev);
    }, []);

    /**
     * 處理值變化
     */
    const onChangeValue = useCallback((value: Value) => {
        setValue(value);
    }, []);

    /**
     * 處理點擊
     */
    const handleClick = useCallback((event: MapActionPayload) => {
        console.log("Clicked Map:", event);
    }, []);

    /**
     * 切換工具類型
     */
    const setToolType = useCallback((type: Tool) => {
        setTool(type);
    }, []);

    /**
     * 放大
     */
    const zoomIn = useCallback((viewerRef: React.RefObject<SVGPanZoom>) => {
        if (viewerRef.current) {
            viewerRef.current.zoomOnViewerCenter(1.1);
        }
    }, []);

    /**
     * 縮小
     */
    const zoomOut = useCallback((viewerRef: React.RefObject<SVGPanZoom>) => {
        if (viewerRef.current) {
            viewerRef.current.zoomOnViewerCenter(0.9);
        }
    }, []);

    /**
     * 重設視圖
     */
    const resetView = useCallback((viewerRef: React.RefObject<SVGPanZoom>) => {
        if (viewerRef.current) {
            viewerRef.current.reset();
        }
    }, []);

    /**
     * 執行地圖動作
     */
    const executeMapAction = useCallback(
        (action: MapActionTypes, payload?: any) => {
            switch (action) {
                case "ZOOM_IN":
                    if (payload?.viewerRef) zoomIn(payload.viewerRef);
                    break;
                case "ZOOM_OUT":
                    if (payload?.viewerRef) zoomOut(payload.viewerRef);
                    break;
                case "RESET_VIEW":
                    if (payload?.viewerRef) resetView(payload.viewerRef);
                    break;
                case "TOGGLE_FULLSCREEN":
                    toggleFullscreen();
                    break;
                case "SET_TOOL":
                    if (payload?.tool) setToolType(payload.tool);
                    break;
            }
        },
        [zoomIn, zoomOut, resetView, toggleFullscreen, setToolType]
    );

    return (
        <MapControlContext.Provider
            value={{
                tool,
                setTool,
                value,
                onChangeValue,
                zoomIn,
                zoomOut,
                resetView,
                handleClick,
            }}
        >
            {children}
        </MapControlContext.Provider>
    );
};

export const useMapControl = (): MapActionHandlers => {
    const [tool, setTool] = useState<Tool>("pan");
    const [value, setValue] = useState<Value>({} as Value);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [viewerState, setViewerState] = useState({
        viewerWidth: window.innerWidth > 1600 ? 1600 : window.innerWidth - 40,
        viewerHeight: window.innerHeight > 800 ? 800 : window.innerHeight - 100,
    });

    // 處理視窗調整事件
    useEffect(() => {
        const updateDimensions = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            // 全屏模式
            if (isFullscreen) {
                setViewerState({
                    viewerWidth: width,
                    viewerHeight: height,
                });
            } else {
                // 一般模式，保持較大視圖限制
                setViewerState({
                    viewerWidth: width > 1600 ? 1600 : width - 40,
                    viewerHeight: height > 800 ? 800 : height - 100,
                });
            }
        };

        // 初始設定
        updateDimensions();

        // 監聽調整大小事件
        window.addEventListener("resize", updateDimensions);

        return () => {
            window.removeEventListener("resize", updateDimensions);
        };
    }, [isFullscreen]);

    /**
     * 切換全屏模式
     */
    const toggleFullscreen = useCallback(() => {
        setIsFullscreen((prev) => !prev);
    }, []);

    /**
     * 處理值變化
     */
    const onChangeValue = useCallback((value: Value) => {
        setValue(value);
    }, []);

    /**
     * 處理點擊
     */
    const handleClick = useCallback((event: MapActionPayload) => {
        console.log("Clicked Map:", event);
    }, []);

    /**
     * 切換工具類型
     */
    const setToolType = useCallback((type: Tool) => {
        setTool(type);
    }, []);

    /**
     * 放大
     */
    const zoomIn = useCallback((viewerRef: React.RefObject<SVGPanZoom>) => {
        if (viewerRef.current) {
            viewerRef.current.zoomOnViewerCenter(1.1);
        }
    }, []);

    /**
     * 縮小
     */
    const zoomOut = useCallback((viewerRef: React.RefObject<SVGPanZoom>) => {
        if (viewerRef.current) {
            viewerRef.current.zoomOnViewerCenter(0.9);
        }
    }, []);

    /**
     * 重設視圖
     */
    const resetView = useCallback((viewerRef: React.RefObject<SVGPanZoom>) => {
        if (viewerRef.current) {
            viewerRef.current.reset();
        }
    }, []);

    /**
     * 執行地圖動作
     */
    const executeMapAction = useCallback(
        (action: MapActionTypes, payload?: any) => {
            switch (action) {
                case "ZOOM_IN":
                    if (payload?.viewerRef) zoomIn(payload.viewerRef);
                    break;
                case "ZOOM_OUT":
                    if (payload?.viewerRef) zoomOut(payload.viewerRef);
                    break;
                case "RESET_VIEW":
                    if (payload?.viewerRef) resetView(payload.viewerRef);
                    break;
                case "TOGGLE_FULLSCREEN":
                    toggleFullscreen();
                    break;
                case "SET_TOOL":
                    if (payload?.tool) setToolType(payload.tool);
                    break;
            }
        },
        [zoomIn, zoomOut, resetView, toggleFullscreen, setToolType]
    );

    return {
        tool,
        value,
        viewerWidth: viewerState.viewerWidth,
        viewerHeight: viewerState.viewerHeight,
        isFullscreen,
        onChangeValue,
        handleClick,
        zoomIn,
        zoomOut,
        resetView,
        toggleFullscreen,
        setToolType,
        executeMapAction,
    };
};
