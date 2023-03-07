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
        res.sendStatus(400).json(error)
    }


}


const updateFoodService = async (req, res) => {

    try {
        const updatedFoodService = await FoodService.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true})
        res.status(200).json(updatedFoodService)
    } catch (error) {

        res.status(500).json(error)
        console.log(error)
        
    }
}



const deleteFoodService = async (req, res) => {

    try {
        await FoodService.findByIdAndDelete(req.params.id)
        res.status(200).json("The food service has been deleted.")
    } catch (error) {

        res.status(500).json(error)
        console.log(error)
        
    }
}





module.exports = { createNewFoodService, updateFoodService, deleteFoodService }