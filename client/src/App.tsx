import { instantMeiliSearch } from "@meilisearch/instant-meilisearch";
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { useEffect, useState } from "react";
import { Highlight } from "react-instantsearch-dom";
import { AppRouter } from "../../server/src/api";
import { Meteorite } from "./types/Meteorite";

// fetch JSON from b/e, post to search server
// prettier-ignore
const client = createTRPCProxyClient<AppRouter>({ links: [httpBatchLink({ url: "http://localhost:1337/trpc" })], });
async function main() {
  const result = await client.meteorites.query();
  fetch("http://localhost:7700/indexes/meteorites/documents", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(result),
  });
}
main();

const searchClient = instantMeiliSearch("http://localhost:7700");

function App() {
  const [resourceQuery, setResourceQuery] = useState("");
  const [resourceResults, setResourceResults] = useState<Meteorite[]>([]);

  useEffect(() => {
    fetch("http://localhost:7700/indexes/meteorites/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: resourceQuery,
        limit: 1000,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResourceResults(data.hits);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [resourceQuery]);

  function handleInputChange(event: any) {
    setResourceQuery(event.target.value);
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    // onSearch(resourceQuery);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={resourceQuery}
          onChange={handleInputChange}
          placeholder="Search..."
        ></input>
      </form>
      {resourceResults[0] &&
        resourceResults.map((meteorite) => {
          return <ul key={meteorite.id}>{meteorite?.name}</ul>;
        })}
    </>
  );
}

const Hit = (props: any) => <Highlight attribute="name" hit={props.hit} />;

export default App;
