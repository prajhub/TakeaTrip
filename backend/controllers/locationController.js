require('dotenv').config();
const axios = require('axios');



const getLocation = async (req, res) => {


    const query = req.query.q;
    const encodedQuery = encodeURIComponent(query)


    try {
    const encodedQuery = encodeURIComponent(query)
        const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${encodedQuery}&key=8beda53bb24a4f379a4bd297ccde4180`);
    
        const suggestions = response.data.results.map(result => ({
          name: result.formatted,
          latitude: result.geometry.lat,
          longitude: result.geometry.lng,
        }));
    
        res.json(suggestions);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }

}

module.exports = { getLocation };
