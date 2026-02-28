import type { SubmitEvent } from "react";
import styles from "./FacilitatorSearchForm.module.css";
import searchIcon from "../../../assets/icon-search.svg";

type FacilitatorSearchFormProps = {
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
};

/** 検索フォーム */
export function FacilitatorSearchForm({
  onSubmit,
}: FacilitatorSearchFormProps) {
  return (
    <div className={styles.searchRow}>
      <form className={styles.searchForm} onSubmit={onSubmit}>
        <div className={styles.searchField}>
          <input
            className={styles.searchInput}
            type="text"
            name="search"
            placeholder="名前、ログインIDで検索"
          />
          <button
            type="submit"
            className={styles.searchButton}
            aria-label="検索"
          >
            <img className={styles.searchIcon} src={searchIcon} alt="" />
          </button>
        </div>
      </form>
    </div>
  );
}
