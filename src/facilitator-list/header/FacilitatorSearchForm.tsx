import type { SubmitEvent } from "react";
import { TextInput } from "../../components/text-input/TextInput";
import styles from "./FacilitatorSearchForm.module.css";
import searchIcon from "../../assets/icon-search.svg";

type FacilitatorSearchFormProps = {
  defaultValue: string;
  onSubmit: (query: string) => void;
};

/** 検索フォーム */
export function FacilitatorSearchForm({
  defaultValue,
  onSubmit,
}: FacilitatorSearchFormProps) {
  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const query = String(formData.get("search") ?? "");

    onSubmit(query);
  }

  return (
    <form className={styles.searchForm} onSubmit={handleSubmit}>
      <TextInput
        type="text"
        name="search"
        placeholder="名前、ログインIDで検索"
        defaultValue={defaultValue}
        endAdornment={
          <button type="submit" className={styles.searchButton} aria-label="検索">
            <img className={styles.searchIcon} src={searchIcon} alt="" />
          </button>
        }
      />
    </form>
  );
}
