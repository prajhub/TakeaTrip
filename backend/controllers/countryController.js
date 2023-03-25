const Country = require('../model/country')

require('dotenv').config();


const createCountry = async (req, res) => {

    const { name,  desc, hotels, restaurants, thingstodo } = req.body

    if ( !name || !desc ) {
        return res.status(400).json({ message: "All field required"})
    }

    try {
        const newCountry = await Country.create({ name,  desc, hotels, restaurants, thingstodo })
        res.status(200).json({ newCountry })
    } catch (error) {
        res.status(500).json(error)
        console.log(error)
    }
}

const getAllCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getSingleCountry = async (req, res) => {
    const { name } = req.params;
  
    try {
      const country = await Country.findOne({ name });
  
      if (!country) {
        return res.status(404).json({ message: 'Country not found' });
      }
  
      res.status(200).json(country);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  };
  
  // const deleteCountry = async (req, res) => {
  //   try {
  //     const countryName = req.params.name;
  //     const deletedCountry = await Country.findOneAndDelete({ name: countryName });
  //     if (!deletedCountry) {
  //       return res.status(404).json({ message: `Country with name ${countryName} not found.` });
  //     }
  //     await Location.deleteMany({ _id: { $in: deletedCountry.locations } });
  //     res.status(200).json({ message: `Deleted country ${countryName} and its associated locations.` });
  //   } catch (error) {
  //     res.status(500).json({ error: error.message });
  //   }
  // };

module.exports = { createCountry, getAllCountries, getSingleCountry }