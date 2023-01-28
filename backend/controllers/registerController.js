
const User = require('../model/user')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { hashPassword } = require('../utils/helpers')
const bcrypt = require('bcrypt');
const handleNewUser = async (req, res) => {

    const { firstName, lastName, password, email} = req.body
    
    try {
        const userDB = await User.findOne({email}).exec();
        if (userDB) {
            res.status(400).send({ msg: 'User already exists!'})
        }else {
            const password = hashPassword(req.body.password)
            console.log(password)
            const newUser = await User.create({ firstName, lastName, password, email,
            
                "roles": { "user": 2001},
            })
            newUser.save().then(user => {
                res.send({
                    success: true,
                    message: "User created successfully",
                    user: {
                        id: user._id,
                        email: user.email
                    }
                })
            })
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = { handleNewUser };