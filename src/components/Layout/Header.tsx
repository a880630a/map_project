import { useTheme } from "../../context/ThemeContext";
import styles from "../../styles/Layout/Header.module.scss";

export const Header = () => {
    const { isDarkMode, toggleDarkMode } = useTheme();

    return (
        <header className={styles.header}>
            <h1 className={styles.title}>城市路線導覽</h1>
            <div className={styles.actions}>
                <button
                    className={styles.themeToggle}
                    onClick={toggleDarkMode}
                    aria-label={
                        isDarkMode ? "切換到亮色模式" : "切換到暗色模式"
                    }
                >
                    {isDarkMode ? "🌙" : "☀️"}
                </button>
            </div>
        </header>
    );
};
