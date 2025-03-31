import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePath } from "../../context/PathContext";
import { PathInfo } from "../../types/map";
import styles from "../../styles/Sidebar/RouteEditor.module.scss";

export const RouteEditor: React.FC = () => {
    const { selectedPath, getSelectedPathInfo, updatePath } = usePath();
    const [formData, setFormData] = useState<Partial<PathInfo>>({});
    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const pathInfo = getSelectedPathInfo();

    useEffect(() => {
        if (pathInfo) {
            setFormData({
                name: pathInfo.name,
                description: pathInfo.description,
                distance: pathInfo.distance,
                time: pathInfo.time,
            });
        } else {
            setFormData({});
            setIsEditing(false);
        }
    }, [pathInfo]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedPath && formData) {
            setIsSubmitting(true);

            try {
                // 模擬網絡請求，實際應用中可能會有實際的數據保存操作
                await new Promise((resolve) => setTimeout(resolve, 500));

                // 更新路徑信息
                updatePath(selectedPath, formData);

                // 成功提示
                setIsSubmitting(false);
                setIsEditing(false);
            } catch (error) {
                console.error("更新路線信息失敗:", error);
                setIsSubmitting(false);
            }
        }
    };

    const handleCancel = () => {
        // 如果取消，重置表單數據為原始數據
        if (pathInfo) {
            setFormData({
                name: pathInfo.name,
                description: pathInfo.description,
                distance: pathInfo.distance,
                time: pathInfo.time,
            });
        }
        setIsEditing(false);
    };

    if (!pathInfo) return null;

    return (
        <div className={styles.editorContainer}>
            <AnimatePresence mode="wait">
                {isEditing ? (
                    <motion.form
                        className={styles.editForm}
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h3 className={styles.formTitle}>編輯路線資訊</h3>

                        <div className={styles.formGroup}>
                            <label htmlFor="name">路線名稱</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name || ""}
                                onChange={handleChange}
                                className={styles.input}
                                required
                                autoComplete="off"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="description">描述</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description || ""}
                                onChange={handleChange}
                                rows={3}
                                className={styles.textarea}
                                autoComplete="off"
                            />
                        </div>

                        <div className={styles.formRow}>
                            <div className={styles.formGroup}>
                                <label htmlFor="distance">距離</label>
                                <input
                                    type="text"
                                    id="distance"
                                    name="distance"
                                    value={formData.distance || ""}
                                    onChange={handleChange}
                                    className={styles.input}
                                    autoComplete="off"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="time">時間</label>
                                <input
                                    type="text"
                                    id="time"
                                    name="time"
                                    value={formData.time || ""}
                                    onChange={handleChange}
                                    className={styles.input}
                                    autoComplete="off"
                                />
                            </div>
                        </div>

                        <div className={styles.buttonGroup}>
                            <button
                                type="button"
                                className={styles.cancelButton}
                                onClick={handleCancel}
                                disabled={isSubmitting}
                            >
                                取消
                            </button>
                            <button
                                type="submit"
                                className={styles.saveButton}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className={styles.loadingSpinner}>
                                        <span className={styles.dot}></span>
                                        <span className={styles.dot}></span>
                                        <span className={styles.dot}></span>
                                    </span>
                                ) : (
                                    "儲存"
                                )}
                            </button>
                        </div>
                    </motion.form>
                ) : (
                    <motion.div
                        className={styles.viewMode}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button
                            className={styles.editButton}
                            onClick={() => setIsEditing(true)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="16"
                                height="16"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={styles.editIcon}
                            >
                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                            編輯路線
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
