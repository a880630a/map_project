import { Header } from "./components/Layout/Header";
import { Footer } from "./components/Layout/Footer";
import { MapContainer } from "./components/Map/MapContainer";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { useTheme } from "./context/ThemeContext";
import { PathProvider } from "./context/PathContext";
import { MapControlProvider } from "./hooks/useMapControl";
import styles from "./styles/App.module.scss";
import clsx from "clsx";

export default function App() {
    const { isDarkMode } = useTheme();

    return (
        <PathProvider>
            <MapControlProvider>
                <div
                    className={clsx(styles.appContainer, {
                        darkMode: isDarkMode,
                    })}
                >
                    <Header />
                    <main className={styles.mainContent}>
                        <Sidebar />
                        <MapContainer />
                    </main>
                    <Footer />
                </div>
            </MapControlProvider>
        </PathProvider>
    );
}
