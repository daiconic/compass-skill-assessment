import styles from "./FacilitatorLoadingOverlay.module.css";

export function FacilitatorLoadingOverlay() {
  return (
    <div
      className={styles.loadingOverlay}
      aria-busy="true"
      aria-live="polite"
    >
      <p className={styles.loadingMessage}>読み込み中...</p>
    </div>
  );
}
