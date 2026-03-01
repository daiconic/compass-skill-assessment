import { FacilitatorListContent } from "./facilitator-list/FacilitatorListContent";
import { FacilitatorListLayout } from "./facilitator-list/FacilitatorListLayout";
import { useFacilitatorSearchParams } from "./facilitator-list/useFacilitatorSearchParams";
import { Header } from "./header/Header";

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
