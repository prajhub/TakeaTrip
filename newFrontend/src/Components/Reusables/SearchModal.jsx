import React, { useState, useEffect } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import axios from 'axios';

const SearchModal = () => {
  const [accommodations, setAccommodations] = useState([]);
  const [foodServices, setFoodServices] = useState([]);
  const [locations, setLocations] = useState([]);
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const loadAccommodations = async () => {
      const response = await axios.get('http://localhost:5000/accommodation');
      setAccommodations(response.data);
    };

    const loadFoodServices = async () => {
      const response = await axios.get('http://localhost:5000/foodservice');
      setFoodServices(response.data);
    };

    if (text) {
      const fetchLocations = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/location/locations?q=${text}`);
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchLocations();
    } else {
      setLocations([]);
    }
    

    loadAccommodations();
    loadFoodServices();
   
  }, [text]);

  const onChangeHandler = (text) => {
    let matches = [];
    if (text.length > 0) {
      // Filter accommodations and food services
      const accoMatches = accommodations.filter((acco) => {
        const regex = new RegExp(`${text}`, 'gi');
        return acco.name.match(regex);
      });
      const foodMatches = foodServices.filter((food) => {
        const regex = new RegExp(`${text}`, 'gi');
        return food.name.match(regex);
      });
      matches = [...accoMatches, ...foodMatches];

      // Filter locations
      const locMatches = locations.filter((loc) => {
        const regex = new RegExp(`${text}`, 'gi');
        return loc.name.match(regex);
      });
      matches = [...matches, ...locMatches];
    }
    setSuggestions(matches);
    setText(text);
  };

  const formatResult = (result, index) => {
    return (
      <div key={index}>
        <span style={{ display: 'block', textAlign: 'left' }}>{result.name}</span>
      </div>
    );
  };

  return (
    <>
      <div className='container'>
        <input
          type='text'
          className='col-md-12 input mt-10 text-black'
          onChange={(e) => onChangeHandler(e.target.value)}
          value={text}
        />
        {suggestions &&
          suggestions.map((suggestion, i) => (
            <div key={i}>{formatResult(suggestion, i)}</div>
          ))}
      </div>
    </>
  );
};

export default SearchModal;
