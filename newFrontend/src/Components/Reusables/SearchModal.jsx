import React, { useState, useEffect } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import _ from 'lodash';

const SearchModal = () => {


  const handleOnSearch = _.debounce((string, results) => {
    
  }, 500);
  

  const handleOnHover = (result) => {
    // the item hovered
  };

  const handleOnSelect = (item) => {
    // the item selected

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
       
      />
    </>
  );
};

export default SearchModal;
