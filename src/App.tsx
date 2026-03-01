import { FacilitatorListContent } from "./components/facilitator-list/FacilitatorListContent";
import { FacilitatorListLayout } from "./components/facilitator-list/FacilitatorListLayout";
import { useFacilitatorSearchParams } from "./components/facilitator-list/useFacilitatorSearchParams";
import { Header } from "./components/header/Header";

function App() {
  const { page, setPage, sort, setSort, search, setSearch } =
    useFacilitatorSearchParams();

  return (
    <div className="page">
      <Header />
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
