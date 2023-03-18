import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import {
  Configure,
  Highlight,
  Hits,
  InstantSearch,
  SearchBox,
} from "react-instantsearch-dom";

const searchClient = instantMeiliSearch("http://localhost:7700");

// fetching json from backend and posting to meili instance
fetch("http://localhost:1337/meteorites")
  .then((data) => data.json())
  .then((data) => {
    fetch("http://localhost:7700/indexes/meteorites/documents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  });

function App() {
  return (
    <InstantSearch indexName="meteorites" searchClient={searchClient}>
      <SearchBox />
      <Hits hitComponent={Hit} />
      <Configure hitsPerPage={10} />
    </InstantSearch>
  );
}

const Hit = (props: any) => <Highlight attribute="name" hit={props.hit} />;

export default App;
