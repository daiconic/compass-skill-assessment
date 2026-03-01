import { FacilitatorListContent } from "./facilitator-list/FacilitatorListContent";
import { FacilitatorListLayout } from "./facilitator-list/FacilitatorListLayout";
import { useFacilitatorSearchParams } from "./hooks/useFacilitatorSearchParams";
import { Header } from "./header/Header";

// ダミーのユーザー名
const USER_NAME = "因幡深雪";

/**
 * アプリケーションのエントリーポイント
 *
 * クエリパラメータなどページに紐づく状態の管理は基本的にここで行う
 */
function App() {
  const { page, setPage, sort, setSort, search, setSearch } =
    useFacilitatorSearchParams();

  return (
    <div className="page">
      <Header userName={USER_NAME} />
      <FacilitatorListLayout search={search} onSearchSubmit={setSearch}>
        <FacilitatorListContent
          page={page}
          setPage={setPage}
          sort={sort}
          setSort={setSort}
          search={search}
        />
      </FacilitatorListLayout>
    </div>
  );
}

export default App;
