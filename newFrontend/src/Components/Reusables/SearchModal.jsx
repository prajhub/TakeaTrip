import React, { useState, useEffect } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import _ from 'lodash';

const SearchModal = () => {
  const [apiResults, setApiResults] = useState([]);
  const [query, setQuery] = useState('');

  console.log(apiResults)

  const handleOnSearch = _.debounce((string, results) => {
    fetch(`http://localhost:5000/location/${string}`)
      .then((response) => response.json())
      .then((data) => {
        const apiResults = Array.isArray(data) ? data : [data];
  
        const locationsToAdd = apiResults.map((result) => {
          const location = { name: result.name, type: result.type };
          // Check if the location already exists in the array before adding it
          if (!locations.some((loc) => loc.name === location.name)) {
            return location;
          }
          return null;
        }).filter((location) => location !== null);
  
        setLocations((prevLocations) => [...prevLocations, ...locationsToAdd]);
      })
      .catch((error) => console.error(error));
  }, 500);
  

  const handleOnHover = (result) => {
    // the item hovered
  };

  const handleOnSelect = (item) => {
    // the item selected
    const location = { name: item.name, type: item.type };
    if (!localStorage.getItem(location.name)) {
      localStorage.setItem(location.name, JSON.stringify(location));
      setApiResults([]);
      setQuery('');
    }
  };

  const handleOnFocus = () => {
    console.log('Focused');
  };

  const handleOnClear = () => {
    setApiResults([]);
  };

  const formatResult = (location) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>{location.name}</span>
      </>
    );
  };

  // Clear the apiResults array and query on unmount
  useEffect(() => {
    return () => {
      setApiResults([]);
      setQuery('');
    };
  }, []);

  return (
    <>
      <ReactSearchAutocomplete
        items={apiResults}
        onSearch={handleOnSearch}
        onHover={handleOnHover}
        onSelect={handleOnSelect}
        onFocus={handleOnFocus}
        onClear={handleOnClear}
        formatResult={formatResult}
        styling={{ zIndex: 4 }}
        autoFocus
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </>
  );
};

export default SearchModal;
