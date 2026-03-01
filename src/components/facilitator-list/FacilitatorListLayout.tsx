import type { ReactNode } from "react";
import styles from "./FacilitatorListContent.module.css";
import { FacilitatorListHeader } from "./header/FacilitatorListHeader";

type FacilitatorListLayoutProps = {
  search: string;
  onSearchSubmit: (query: string) => void;
  children: ReactNode;
};

export function FacilitatorListLayout({
  search,
  onSearchSubmit,
  children,
}: FacilitatorListLayoutProps) {
  return (
    <main className={styles.content}>
      <FacilitatorListHeader
        title="先生一覧"
        searchDefaultValue={search}
        onSearchSubmit={onSearchSubmit}
      />
      {children}
    </main>
  );
}
