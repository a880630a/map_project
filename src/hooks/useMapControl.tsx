import {
    useState,
    useCallback,
    createContext,
    useContext,
    ReactNode,
    useEffect,
    useRef,
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
} from "../types/index";
import { usePath } from "../context/PathContext";

interface MapControlContextType {
    tool: string;
    setTool: (tool: string) => void;
    value: Value;
    onChangeValue: (value: Value) => void;
    zoomIn: () => void;
    zoomOut: () => void;
    resetView: () => void;
    handleClick: (event: ViewerMouseEvent) => void;
    isFullscreen: boolean;
    executeMapAction: (
        action: MapActionTypes,
        payload?: MapActionPayload
    ) => void;
    mapViewerRef: React.RefObject<SVGPanZoom>;
    containerRef: React.RefObject<HTMLDivElement>;
}

const initialValue: Value = {
    version: 2,
    mode: "idle",
    focus: false,
    a: 1,
    b: 0,
    c: 0,
    d: 1,
    e: 0,
    f: 0,
    viewerWidth: 800,
    viewerHeight: 600,
    SVGWidth: 800,
    SVGHeight: 600,
    startX: null,
    startY: null,
    endX: null,
    endY: null,
    miniatureOpen: false,
};

const MapControlContext = createContext<MapControlContextType | undefined>(
    undefined
);

const useProvideMapControl = (): MapControlContextType => {
    const [tool, setTool] = useState<string>(TOOL_PAN);
    const [value, setValue] = useState<Value>(initialValue);
    const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
    const mapViewerRef = useRef<SVGPanZoom>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { setSelectedPath } = usePath();

    // 監聽全螢幕狀態變化
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => {
            document.removeEventListener(
                "fullscreenchange",
                handleFullscreenChange
            );
        };
    }, []);

    const onChangeValue = (newValue: Value) => {
        setValue(newValue);
    };

    const handleClick = (event: ViewerMouseEvent) => {
        const target = event.originalEvent.target as Element;
        const pathId = target.getAttribute("data-path-id");

        if (pathId) {
            setSelectedPath(pathId);
        }
    };

    const zoomIn = useCallback(() => {
        if (mapViewerRef.current) {
            mapViewerRef.current.zoomOnViewerCenter(1.1);
        }
    }, []);

    const zoomOut = useCallback(() => {
        if (mapViewerRef.current) {
            mapViewerRef.current.zoomOnViewerCenter(0.9);
        }
    }, []);

    const resetView = useCallback(() => {
        if (mapViewerRef.current) {
            mapViewerRef.current.fitToViewer();
        }
    }, []);

    const toggleFullscreen = useCallback(() => {
        if (!containerRef.current) return;

        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().catch((err) => {
                console.error(`無法進入全螢幕模式: ${err.message}`);
            });
        } else {
            document.exitFullscreen().catch((err) => {
                console.error(`無法離開全螢幕模式: ${err.message}`);
            });
        }
    }, []);

    const actionHandlers: MapActionHandlers = {
        [MapActionTypes.ZOOM_IN]: zoomIn,
        [MapActionTypes.ZOOM_OUT]: zoomOut,
        [MapActionTypes.RESET_VIEW]: resetView,
        [MapActionTypes.SELECT_ROUTE]: (payload: MapActionPayload) => {
            if (payload?.routeId) {
                setSelectedPath(payload.routeId);
            }
        },
        [MapActionTypes.TOGGLE_FULLSCREEN]: toggleFullscreen,
    };

    const executeMapAction = (
        action: MapActionTypes,
        payload?: MapActionPayload
    ) => {
        const handler = actionHandlers[action];
        if (handler) {
            handler(payload as any);
        } else {
            console.warn(`未處理的地圖操作: ${action}`);
        }
    };

    return {
        tool,
        setTool,
        value,
        onChangeValue,
        zoomIn,
        zoomOut,
        resetView,
        handleClick,
        isFullscreen,
        executeMapAction,
        mapViewerRef,
        containerRef,
    };
};

interface MapControlProviderProps {
    children: ReactNode;
}

export const MapControlProvider = ({ children }: MapControlProviderProps) => {
    const mapControl = useProvideMapControl();
    return (
        <MapControlContext.Provider value={mapControl}>
            {children}
        </MapControlContext.Provider>
    );
};

export const useMapControl = (): MapControlContextType => {
    const context = useContext(MapControlContext);
    if (context === undefined) {
        throw new Error("useMapControl 必須在 MapControlProvider 內使用");
    }
    return context;
};
