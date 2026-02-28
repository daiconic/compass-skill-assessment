import styles from "./FacilitatorListHeader.module.css";

type FacilitatorListHeaderProps = {
  title: string;
  onCreate?: () => void;
};

export function FacilitatorListHeader({
  title,
  onCreate,
}: FacilitatorListHeaderProps) {
  return (
    <div className={styles.titleRow}>
      <h1>{title}</h1>
      <button type="button" className={styles.addButton} onClick={onCreate}>
        新規作成
      </button>
    </div>
  );
}
