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

      //  await Location.findById(newLocation._id).populate('country').exec();

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

  const deleteLocation = async (req, res) => {
    const { countryId, locationId } = req.params;

    try {
      // find the location in the database
      const location = await Location.findById(locationId)
      if (!location) {
        return res.status(404).json({ message: 'Location not found' });
      }
  
      // delete the location
      await location.remove();
  
      // remove the location from the country
      const country = await Country.findById(countryId);
      country.locations.pull(locationId);
      await country.save();
  
      res.json({ message: 'Location deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  
  }


module.exports = { createLocation, getSingleLocation, deleteLocation }