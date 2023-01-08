const passport = require('passport')
const { Strategy } = require('passport-local')
const User = require('../model/user');
const { comparePassword } = require('../utils/helpers');


passport.use(
    new Strategy(
        {
            usernameField: 'email',
        }, 
        async (email, password, done) => {
            console.log(email);
            console.log(password)

            try {
                if(!email || !password){
                    throw new Error('Missing credentials')
                }
                const userDB = await User.findOne({ email })
                if (!userDB) throw new Error('User not found')
                const isValid = comparePassword(password, userDB.password)
                if (isValid) {
                    console.log('Authenticated Succesfully')
                    done(null, userDB)
                } else {
                    done(null, null)
                }
            } catch (error) {

                done(error, null)
                
            }
    }
    )
    
);