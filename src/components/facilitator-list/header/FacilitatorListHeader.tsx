import styles from "./FacilitatorListHeader.module.css";
import { FacilitatorSearchForm } from "./FacilitatorSearchForm";
import TeacherIcon from "../../../assets/icon-teacher.svg";

type FacilitatorListHeaderProps = {
  searchDefaultValue: string;
  onSearchSubmit: (query: string) => void;
};

export function FacilitatorListHeader({
  searchDefaultValue,
  onSearchSubmit,
}: FacilitatorListHeaderProps) {
  return (
    <div className={styles.titleRow}>
      <h1>
        <img src={TeacherIcon} alt="Teacher" />
        先生
      </h1>
      <FacilitatorSearchForm
        defaultValue={searchDefaultValue}
        onSubmit={onSearchSubmit}
      />
    </div>
  );
}
