const asyncHandler = require('express-async-handler')

const User = require('../model/user');
const { hashPassword } = require('../utils/helpers');




const updateUser = asyncHandler(async (req, res) => {

    const { id, email, roles, active, password} = req.body;

    //Confirm data
    if(!id || !email || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean'){
        res.status(400).json({ message: 'All fields are required'})
    }

    const user = await User.findById(id).exec()

    if(!user){
        return res.status(400).json({ message: 'User not found'})
    }

    //Checking for same usr

    const duplicate = await User.findOne({ email }).lean().exec()

    if(duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate Username'})
    }

    user.firstName = firstName
    user.lastName = lastName
    user.email = email
    user.roles = roles


    if(password) {
        user.password = await hashPassword(password)
    }

    const updatedUser = await user.save()

    res.json({ message: `${updatedUser.email} updated`})

})

const deleteUser = asyncHandler(async (req, res) => {

    const { id } = req.body

    if(!id) {
        return res.status(400).json({ message: 'User id is required'})
    }


    const user = await User.findById(id).exec()

    if(!user) {
        return res.status(400).json({ message: 'user not found'})
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.email} with ID ${result._id} deleted`

    res.json(reply)
    
})

const getUser = async (req, res) => {

    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {

        res.status(500).json(error)
        console.log(error)
        
    }
}

const getUsers = asyncHandler(async (req, res) => {

    const users = await User.find().select('-password').lean()
    if(!users) {
        return res.status(400).json({ message: 'No user '})
    }

    res.json(users)
})
    
module.exports = {  updateUser, deleteUser, getUser, getUsers };