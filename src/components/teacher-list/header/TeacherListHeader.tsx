import styles from "./TeacherListHeader.module.css";

type TeacherListHeaderProps = {
  title: string;
  onCreate?: () => void;
};

export function TeacherListHeader({ title, onCreate }: TeacherListHeaderProps) {
  return (
    <div className={styles.titleRow}>
      <h1>{title}</h1>
      <button type="button" className={styles.addButton} onClick={onCreate}>
        新規作成
      </button>
    </div>
  );
}
