import React from "react";
import {
    RiFullscreenLine,
    RiFullscreenExitLine,
    RiPencilLine,
} from "react-icons/ri";
import styles from "../../styles/Map/MapControls.module.scss";
import { useMapControl } from "../../hooks/useMapControl";
import { MapActionTypes } from "../../types/index";
import { usePath } from "../../context/PathContext";

interface MapControlsProps {
    onZoomIn: () => void;
    onZoomOut: () => void;
    onResetView: () => void;
}

export const MapControls: React.FC<MapControlsProps> = ({
    onZoomIn,
    onZoomOut,
    onResetView,
}) => {
    const { executeMapAction, isFullscreen } = useMapControl();
    const { isDrawingMode, setDrawingMode } = usePath();

    const handleToggleFullscreen = () => {
        executeMapAction(MapActionTypes.TOGGLE_FULLSCREEN);
    };

    const handleToggleDrawingMode = () => {
        setDrawingMode(!isDrawingMode);
    };

    return (
        <div className={styles.mapControls}>
            <button
                onClick={onZoomIn}
                className={styles.controlButton}
                title="放大"
            >
                <svg viewBox="0 0 24 24" width="24" height="24">
                    <path
                        fill="currentColor"
                        d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"
                    />
                </svg>
            </button>
            <button
                onClick={onZoomOut}
                className={styles.controlButton}
                title="縮小"
            >
                <svg viewBox="0 0 24 24" width="24" height="24">
                    <path fill="currentColor" d="M19 13H5v-2h14v2z" />
                </svg>
            </button>
            <button
                onClick={onResetView}
                className={styles.controlButton}
                title="重置視圖"
            >
                <svg viewBox="0 0 24 24" width="24" height="24">
                    <path
                        fill="currentColor"
                        d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"
                    />
                </svg>
            </button>
            <button
                className={`${styles.controlButton} ${styles.fullscreenButton}`}
                onClick={handleToggleFullscreen}
                aria-label={isFullscreen ? "離開全螢幕" : "進入全螢幕"}
            >
                {isFullscreen ? (
                    <RiFullscreenExitLine size={24} />
                ) : (
                    <RiFullscreenLine size={24} />
                )}
            </button>
            <button
                className={`${styles.controlButton} ${styles.drawButton} ${
                    isDrawingMode ? styles.active : ""
                }`}
                onClick={handleToggleDrawingMode}
                aria-label={isDrawingMode ? "停止繪製" : "開始繪製"}
            >
                <RiPencilLine size={24} />
            </button>
        </div>
    );
};

export default MapControls;
