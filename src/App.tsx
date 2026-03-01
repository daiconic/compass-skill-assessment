import type { SubmitEvent } from "react";
import { FacilitatorListContent } from "./components/facilitator-list/FacilitatorListContent";
import { FacilitatorListLayout } from "./components/facilitator-list/FacilitatorListLayout";
import { useFacilitatorSearchParams } from "./components/facilitator-list/useFacilitatorSearchParams";
import { Header } from "./components/header/Header";

function App() {
  const facilitatorSearchParams = useFacilitatorSearchParams();

  function handleSearchSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const nextSearch = String(formData.get("search") ?? "");

    void facilitatorSearchParams.setSearch(nextSearch);
  }

  return (
    <div className="page">
      <Header />
      <FacilitatorListLayout
        search={facilitatorSearchParams.search}
        onSearchSubmit={handleSearchSubmit}
      >
        <FacilitatorListContent {...facilitatorSearchParams} />
      </FacilitatorListLayout>
    </div>
  );
}

export default App;
