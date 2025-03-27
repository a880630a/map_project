import { PathSelector } from "./PathSelector";
import { PathDetails } from "./PathDetails";
import styles from "../../styles/Sidebar/Sidebar.module.scss";

export const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <PathSelector />
            <PathDetails />
        </div>
    );
};
