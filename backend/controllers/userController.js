const asyncHandler = require('express-async-handler')

const User = require('../model/user');
const { hashPassword } = require('../utils/helpers');
const Token = require('../model/token')
const {decodeJWT} = require('../utils/decodeJWT')

const updateUser = asyncHandler(async (req, res) => {

    const { email,   password, firstName, lastName} = req.body;
    const { id } = req.params

    //Confirm data
    if(!id || !email ){
        res.status(400).json({ message: 'All fields are required'})
    }

    const user = await User.findById(id).exec()

    if(!user){
        return res.status(400).json({ message: 'User not found'})
    }

    // Check if the provided password matches the stored password
  if (password) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }
  }

    //Checking for same usr

    const duplicate = await User.findOne({ email }).lean().exec()

    if(duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate Username'})
    }

    user.firstName = firstName
    user.lastName = lastName
    user.email = email
    


   

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
        const decodedUser = req.params.id
        const user = await User.findById(decodedUser)
        res.status(200).json(user)
    } catch (error) {

        res.status(400).json({ message: 'Invalid Password'})
        
        
    }
}

const getUsers = asyncHandler(async (req, res) => {

    const users = await User.find().select('-password').lean()
    if(!users) {
        return res.status(400).json({ message: 'No user '})
    }

    res.json(users)
})


const getUserProfile = asyncHandler(async (req, res) => {
   
    const userId = req.user.userId;
    if (userId) {
      try {
        const user = await User.findById(userId);
        if (user) {
          const { _id, email, firstName, lastName } = user;
          res.json({ id: _id, email, firstName, lastName });
        } else {
          res.status(404).json({ message: 'User not found' });
        }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
      }
    } else {
      res.status(401).json({ message: 'You are not authenticated' });
    }
  })
  
    
module.exports = {  updateUser, deleteUser, getUser, getUsers, getUserProfile };