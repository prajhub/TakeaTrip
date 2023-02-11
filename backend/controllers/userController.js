const User = require('../model/user')

// const createUser = async (req, res) => {

//     const newHotel = new User(req.body)

//     try {
//         const savedHotel = await newHotel.save()
//         res.status(200).json(savedHotel)
//     } catch (error) {

//         res.status(500).json(error)
//         console.log(error)
        
//     }
// }

const updateUser = async (req, res) => {

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true})
        res.status(200).json(updatedUser)
    } catch (error) {

        res.status(500).json(error)
        console.log(error)
        
    }
}

const deleteUser = async (req, res) => {

    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted.")
    } catch (error) {

        res.status(500).json(error)
        console.log(error)
        
    }
}

const getUser = async (req, res) => {

    try {
        const user = await User.find(req.params.id)
        res.status(200).json(user)
    } catch (error) {

        res.status(500).json(error)
        console.log(error)
        
    }
}

const getUsers = async (req, res) => {

    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {

        res.status(500).json(error)
        
    }
}
    
module.exports = {  updateUser, deleteUser, getUser, getUsers };