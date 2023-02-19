
const User = require('../model/user')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { hashPassword } = require('../utils/helpers')
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler');



const handleNewUser = asyncHandler(async (req, res) => {

    const { firstName, lastName,  email} = req.body

    //Confirming Data
    if (!firstName || !lastName ||  !email) {
        return res.status(400).json({ message: "All field required"})
    }
    

    //Checking for existing users

    const duplicate = await User.findOne({ email })

    if (duplicate) {
        return res.status(400).json({ message: "User exist"})
    } else {

        const password = await hashPassword(req.body.password)
        const newUser = await User.create({ firstName, lastName, email, password})
        
        res.sendStatus(201).json({ newUser})
    }
        
        
      
          
       
            
        
    

    
    

   

    //Create and store new new user

    // const user = await User.create(userObject)

    // if(user) {
    //     res.status(201).json({ message: `New user ${firstName} created`}, {
    //         token: generateToken(user._id)
    //     })
    // } else {
    //     res.status(400).json({ message: "Invalid data"})
    // }
})  

module.exports = { handleNewUser };