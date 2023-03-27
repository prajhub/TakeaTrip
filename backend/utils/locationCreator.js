require('dotenv').config();
const axios = require('axios');
const City = require('../model/city')
const Continent = require('../model/continent')
const State = require('../model/state')
const Region = require('../model/region')
const Country = require('../model/country')



async function createLocation (name)  {
    
    const username = process.env.ROADGOAT_API_KEY;
    const password = process.env.ROADGOAT_SECRET_KEY;

    const auth = Buffer.from(`${username}:${password}`).toString('base64')

    const headers = {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
    };


    const locationName = name

    try {
        
        
 
         // If data does not exist, make an API request and store in db
         const response = await axios.get(`https://api.roadgoat.com/api/v2/destinations/auto_complete?q=${locationName}`, { headers })
         
         const cityData = response.data.data[0]
       
 
         let model = null;
 
         switch(cityData.attributes.destination_type) {
             case "Continent":
                 model = Continent;
                 break;
             case "Country":
                 model = Country;
                 break;
             case "State":
                 model = State;
                 break;
             case "Region":
                 model = Region;
                 break;
             case "City":
                 model = City;
                 break;
 
             default:
                 return res.status(500).json({ error: "Invalid destination type" });
             
         }
 
         const existingData = await model.findOne({ name: cityData.attributes.short_name });
             if (existingData) 
             {
                 return res.json(existingData);
             }
 
             
 
 
         const newCity = new model({
                 name: cityData.attributes.short_name,
                 country: cityData.attributes.name.split(", ").pop(),
                 type: cityData.attributes.destination_type,
                 latitude: cityData.attributes.latitude,
                 longitude: cityData.attributes.longitude,
                
 
               });

         
         await newCity.save();
         res.json(newCity);



    } catch (error) {
        
    }
}

module.exports.createLocation = createLocation;
