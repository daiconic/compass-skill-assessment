import type { SubmitEvent } from "react";
import styles from "./FacilitatorListHeader.module.css";
import { FacilitatorSearchForm } from "./FacilitatorSearchForm";

type FacilitatorListHeaderProps = {
  title: string;
  onSearchSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
};

export function FacilitatorListHeader({
  title,
  onSearchSubmit,
}: FacilitatorListHeaderProps) {
  return (
    <div className={styles.titleRow}>
      <h1>{title}</h1>
      <FacilitatorSearchForm onSubmit={onSearchSubmit} />
    </div>
  );
}
