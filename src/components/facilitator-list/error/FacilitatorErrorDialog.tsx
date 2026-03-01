import styles from "./FacilitatorErrorDialog.module.css";

type FacilitatorErrorDialogProps = {
  onRetry: () => void;
};

export function FacilitatorErrorDialog({
  onRetry,
}: FacilitatorErrorDialogProps) {
  return (
    <div className={styles.overlay}>
      <section
        className={styles.dialog}
        role="alertdialog"
        aria-labelledby="facilitator-error-message"
        aria-modal="true"
      >
        <p id="facilitator-error-message" className={styles.message}>
          通信エラーが発生しました。
        </p>
        <button
          type="button"
          className={styles.retryButton}
          onClick={onRetry}
        >
          リトライ
        </button>
      </section>
    </div>
  );
}
