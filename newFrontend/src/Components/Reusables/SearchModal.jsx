import React, { useState } from 'react'
import { ReactSearchAutocomplete } from 'react-search-autocomplete'



const SearchModal = () => {

    //RoadGoat

    const apiKey = "db74c6662487fca2900735e17eea9206"
    const apiSecret = "acb2a4405d2c89caddb737adea47b327"
    const auth = btoa(apiKey + ":" + apiSecret).toString('base64');
    const headers = { 'Authorization': 'Basic ' + auth };




    const [ locations , setLocations ] = useState([])

    console.log(locations)

    
      
      const handleOnSearch = (string, results) => {
        
        fetch(`https://api.roadgoat.com/api/v2/destinations/auto_complete?q=${string}`, {
            method: 'GET',
            headers: headers
            })
            .then(response => response.json())
            .then(data => setLocations(data))
            .catch(error => console.error(error));
        }
    
      const handleOnHover = (result) => {
        // the item hovered
       
      }
    
      const handleOnSelect = (item) => {
        // the item selected
       
      }
    
      const handleOnFocus = () => {
        console.log('Focused')
      }
    
      const handleOnClear = () => {
        console.log("Cleared");
      };


      const formatResult = (location) => {
        return (
          <>
            <span style={{ display: 'block', textAlign: 'left' }}>{location[0].attributes.name}</span>
            
          </>
        )
      }



  return (
    <>
    
    <ReactSearchAutocomplete
            items={locations}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            onClear={handleOnClear}
            formatResult={formatResult}
            styling={{ zIndex: 4,  }} // To display it on top of the search box below
            autoFocus
          />
    
    </>
  )
}

export default SearchModal