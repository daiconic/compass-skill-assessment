import type { ReactNode } from "react";
import styles from "./FacilitatorListContent.module.css";
import { FacilitatorListHeader } from "./header/FacilitatorListHeader";

type FacilitatorListLayoutProps = {
  search: string;
  onSearchSubmit: (query: string) => void;
  children: ReactNode;
};

/**
 * 先生一覧の一覧部分のヘッダーを含むレイアウト
 */
export function FacilitatorListLayout({
  search,
  onSearchSubmit,
  children,
}: FacilitatorListLayoutProps) {
  return (
    <main className={styles.content}>
      <FacilitatorListHeader
        searchDefaultValue={search}
        onSearchSubmit={onSearchSubmit}
      />
      {children}
    </main>
  );
}
