const jwt = require('jsonwebtoken');
const {ACCESS_TOKEN_SECRET,REFRESH_TOKEN_SECRET} = require("../config/index")
const refreshToken = require('../models/token')
// const { ref } = require('joi');
class JWTServices{


    static signAccessToken(payload, expiryTime ){
        return jwt.sign(payload, ACCESS_TOKEN_SECRET, {expiresIn: expiryTime});
    }
    static signRefreshToken(payload, expiryTime ){
        return jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: expiryTime});
    }

    static verifyAccessToken(token){
        return jwt.verify(token, ACCESS_TOKEN_SECRET)
    }
    static verifyRefreshToken(token){
        return jwt.verify(token, REFRESH_TOKEN_SECRET)
    }

    static async storeRefreshToken (token, userId){
        try {
            const newToken = new refreshToken ({
                token: token,
                userId: userId
            })
            await newToken.save();
            
        } catch (error) {
            
        return next(error);
        // console.log(error);
        }
    }

  

}
module.exports = JWTServices;