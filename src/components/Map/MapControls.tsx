import React from "react";
import {
    RiZoomInLine,
    RiZoomOutLine,
    RiFullscreenLine,
    RiFullscreenExitLine,
    RiRefreshLine,
} from "react-icons/ri";
import { useMapControl } from "../../hooks/useMapControl";
import { ReactSVGPanZoom } from "react-svg-pan-zoom";
import styles from "../../styles/Map/MapControls.module.scss";

interface MapControlProps {
    mapViewerRef: React.RefObject<ReactSVGPanZoom>;
}

export const MapControls: React.FC<MapControlProps> = ({ mapViewerRef }) => {
    const { executeMapAction, isFullscreen } = useMapControl();

    const handleZoomIn = () => {
        executeMapAction("ZOOM_IN", { viewerRef: mapViewerRef });
    };

    const handleZoomOut = () => {
        executeMapAction("ZOOM_OUT", { viewerRef: mapViewerRef });
    };

    const handleResetView = () => {
        executeMapAction("RESET_VIEW", { viewerRef: mapViewerRef });
    };

    const handleToggleFullscreen = () => {
        executeMapAction("TOGGLE_FULLSCREEN");
    };

    return (
        <div className={styles.mapControls}>
            <button
                onClick={handleZoomIn}
                aria-label="放大"
                className={styles.controlButton}
            >
                <RiZoomInLine />
            </button>
            <button
                onClick={handleZoomOut}
                aria-label="縮小"
                className={styles.controlButton}
            >
                <RiZoomOutLine />
            </button>
            <button
                onClick={handleResetView}
                aria-label="重置視圖"
                className={styles.controlButton}
            >
                <RiRefreshLine />
            </button>
            <button
                onClick={handleToggleFullscreen}
                aria-label={isFullscreen ? "退出全屏" : "全屏顯示"}
                className={styles.controlButton}
            >
                {isFullscreen ? <RiFullscreenExitLine /> : <RiFullscreenLine />}
            </button>
        </div>
    );
};
