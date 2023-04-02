import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import {
  Configure,
  Highlight,
  Hits,
  InstantSearch,
  SearchBox,
} from "react-instantsearch-dom";
import { AppRouter } from "../../server/src/api";

// connecting to tRPC
const client = createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({ url: "http://localhost:1337/trpc" })],
});

async function main() {
  const result = await client.meteorites.query();

  fetch("http://localhost:7700/indexes/meteorites/documents", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(result),
  });
}

main();

const searchClient = instantMeiliSearch("http://localhost:7700");

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
