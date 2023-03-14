import ReactDOM from 'react-dom';
import { useState } from 'react'
import { InstantSearch, SearchBox, Hits, Highlight, Configure } from 'react-instantsearch-dom';
import {instantMeiliSearch} from '@meilisearch/instant-meilisearch';

const searchClient = instantMeiliSearch(
  "http://localhost:7700"
);

function App() {
  return (
    <InstantSearch indexName="meteorites" searchClient={searchClient}>
      <SearchBox />
      <Hits hitComponent={Hit} />
      <Configure hitsPerPage={10} />
    </InstantSearch>
  );
}

const Hit = (props: any) => (
  <Highlight attribute="name" hit={props.hit} />
);

export default App;
