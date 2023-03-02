const FoodService = require('../model/foodservice')
const Location = require('../model/location')

const createNewFoodService = async ( req, res ) => {

    const { name, location, address, contact, type } = req.body

    if (!name || !location || !address || !contact || !type){
        res.sendStatus(400).json({ message: 'Please enter all fields'})
    }

    try {
        const foundLocation = await Location.findOne({ name: location})
        if (!foundLocation) {
            return res.status(404).json({ message: 'Location not found' });
            }


            const existingFoodService = await FoodService.findOne({ name })
            if(existingFoodService){
                return res.status(409).json({ message: 'The place already exists' });
            }


            const newFoodService = new FoodService({ name, location: foundLocation.name, address, contact, type });
            await newFoodService.save();

            foundLocation.restaurants.push(newFoodService)
            await foundLocation.save()

            res.status(200).json(newFoodService)

            


    } catch (error) {
        
    }


}

module.exports = { createNewFoodService }