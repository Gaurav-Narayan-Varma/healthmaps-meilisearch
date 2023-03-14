import ReactDOM from 'react-dom';
import { useState } from 'react'
import { InstantSearch, SearchBox, Hits, Highlight, Configure } from 'react-instantsearch-dom';
import {instantMeiliSearch} from '@meilisearch/instant-meilisearch';
import fs from 'fs';

const searchClient = instantMeiliSearch(
  "http://localhost:7700"
);

fetch('http://localhost:1337/')
  .then(data => data.json())
  .then(data => {
    fetch('http://localhost:7700/indexes/meteorites/documents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
  });

// const meteoritesJson: string = `../meteorites.json`;

// fetch('http://localhost:7700/indexes/meteorites/documents', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: meteoritesJson
// })
// .then(response => {
//   console.log(response)
// })
// .catch(error => {
//   console.log(error)
// });

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
