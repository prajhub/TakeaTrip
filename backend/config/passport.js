
const passport = require('passport');

const User = require('../model/user')
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const pubKey = require(process.env.JWT_SECRET)


const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: pubKey,
    algorithm: ['RS256']
}

const strategy = new JwtStrategy(options, (payload, done) => {
    User.findOne({ _id: payload.sub})
    .then((user) => {
        if(user) {
            return done(null, user)
        } else {
            return done(null, false);
        }
    })
    .catch(err => done(err, null))
})

module.exports = (passport) => {
    passport.use(strategy);
}