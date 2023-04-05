require('dotenv').config();
const axios = require('axios');
const City = require('../model/city')
const Continent = require('../model/continent')
const State = require('../model/state')
const Region = require('../model/region')
const Country = require('../model/country')


const controlLocation = async (req, res) => {
    const username = process.env.ROADGOAT_API_KEY;
    const password = process.env.ROADGOAT_SECRET_KEY;

    const auth = Buffer.from(`${username}:${password}`).toString('base64')

    const headers = {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
    };
    
    const locationName = encodeURIComponent(req.params.name);
    try {
      // Check if the data already exists
      let existingData = await Promise.all([
        City.findOne({ name: locationName }),
        State.findOne({ name: locationName }),
        Country.findOne({ name: locationName }),
        Region.findOne({ name: locationName }),
        Continent.findOne({ name: locationName })
    ]);
    existingData = existingData.filter(data => data !== null);

    if (existingData.length > 0) {
        return res.json(existingData[0]);
    }

        // If data does not exist, make an API request and store in db
        const response = await axios.get(`https://api.roadgoat.com/api/v2/destinations/auto_complete?q=${locationName}`, { headers })
        
        const locationData = response.data.data[0]
       
        let model = null;

        switch(locationData.attributes.destination_type) {
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

       

        const newLocation = new model({
            name: locationData.attributes.short_name,
            country: locationData.attributes.name.split(", ").pop(),
            type: locationData.attributes.destination_type,
            latitude: locationData.attributes.latitude,
            longitude: locationData.attributes.longitude,
            photos: []
        });

        await newLocation.save();
        return res.json(newLocation);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { controlLocation };
