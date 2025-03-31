import { Header } from "./components/Layout/Header";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { MapContainer } from "./components/Map/MapContainer";
import { Footer } from "./components/Layout/Footer";
import { ThemeProvider } from "./context/ThemeContext";
import { PathProvider } from "./context/PathContext";
import { MapControlProvider } from "./hooks/useMapControl";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./styles/App.module.scss";

function App() {
    return (
        <ThemeProvider>
            <PathProvider>
                <MapControlProvider>
                    <div className={styles.app}>
                        <Header />
                        <main className={styles.mainContent}>
                            <Sidebar />
                            <MapContainer />
                        </main>
                        <Footer />
                        <ToastContainer
                            position="bottom-right"
                            theme="colored"
                        />
                    </div>
                </MapControlProvider>
            </PathProvider>
        </ThemeProvider>
    );
}

export default App;
