const Location = require('../model/location')
const Country = require('../model/country')
require('dotenv').config();


const createLocation = async (req, res) => {

    const {country, name,  desc, hotels, restaurants, thingstodo } = req.body

    if (!country || !name || !desc) {
        return res.status(400).json({ message: "All field required"})
    }

    try {
        
       const findCountry = await Country.findOne({ name: country })
       if(!findCountry){
            return res.sendStatus(404).json({ message: 'Country not found cuh'})
       }

       const newLocation = await Location.create({
        name,
        desc,
        country: findCountry
       })

       findCountry.locations.push(newLocation)
       await findCountry.save()

       return res.status(201).json(newLocation)



    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }

    
}

const getSingleLocation = async (req, res) => {
    const { name, locationId } = req.params;
  
    try {
      // Find the Country document that matches the name
      const country = await Country.findOne({ name });
  
      if (!country) {
        return res.status(404).json({ message: 'Country not found' });
      }
  
      // Find all the Location documents that have the country's _id as a reference
      const location = await Location.find({ _id: locationId, country: country._id });

      if (!location) {
        return res.status(404).json({ message: 'Location not found' });
      }


      res.status(200).json(location);
    } catch (error) {
      res.status(500).json(error);
      
    }
  };


module.exports = { createLocation, getSingleLocation }