const RefreshToken = require('../model/refreshToken')
const { hashToken } = require('../utils/hashToken');

// used when we create a refresh token.
function addRefreshTokenToWhitelist({  refreshToken, userId }) {
  return RefreshToken.create({
    
      
      hashedToken: hashToken(refreshToken),
      userId
    
  });
}

// used to check if the token sent by the client is in the database.
function findRefreshTokenById(id) {
  return RefreshToken.findOne({
    where: {
      id,
    },
  });
}

// soft delete tokens after usage.
function deleteRefreshToken(id) {
  return RefreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true
    }
  });
}

function revokeTokens(userId) {
  return RefreshToken.updateMany({
    where: {
      userId
    },
    data: {
      revoked: true
    }
  });
}

module.exports = {
  addRefreshTokenToWhitelist,
  findRefreshTokenById,
  deleteRefreshToken,
  revokeTokens
};