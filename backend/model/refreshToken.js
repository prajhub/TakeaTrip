const mongoose = require('mongoose');
const user = require('./user').schema;


const RefreshTokenSchema = new mongoose.Schema({

    id: {
        type: mongoose.SchemaTypes.String
    },
    hashedToken: {
        type: mongoose.SchemaTypes.String
    },
    userId: {
        type: mongoose.SchemaTypes.String
    },
    User: {
        type: [user]
    },
    revoked: {
        type: mongoose.SchemaTypes.Boolean

    }

}, {timestamps: true })

module.exports = mongoose.model('refreshToken', RefreshTokenSchema);