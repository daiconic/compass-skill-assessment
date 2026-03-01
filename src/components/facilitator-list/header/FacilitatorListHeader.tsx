import type { SubmitEvent } from "react";
import styles from "./FacilitatorListHeader.module.css";
import { FacilitatorSearchForm } from "./FacilitatorSearchForm";

type FacilitatorListHeaderProps = {
  title: string;
  searchDefaultValue: string;
  onSearchSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
};

export function FacilitatorListHeader({
  title,
  searchDefaultValue,
  onSearchSubmit,
}: FacilitatorListHeaderProps) {
  return (
    <div className={styles.titleRow}>
      <h1>{title}</h1>
      <FacilitatorSearchForm
        defaultValue={searchDefaultValue}
        onSubmit={onSearchSubmit}
      />
    </div>
  );
}
