const JWTServices = require("../services/JWTServices");
const User = require("../models/users");
const UserDTO = require("../dto/user");
// const { use } = require("../routes");

const auth = async (req, res, next) => {
    try {
        const {refreshToken, accessToken} = req.cookies;

        if(!refreshToken || !accessToken) {
            const error = {
                status: 401,
                message: "Unauthorized"
            }
            return next(error);
        }
        
            let _id;
            try {
                _id =  JWTServices.verifyAccessToken(accessToken);
                
            } catch (error) {
                return next(error);
            }
    
            let user;
            try {
                user = await User.findOne({_id: _id});
             }
             
             catch (error) {
                 return next(error);
            }
            const userDto = new UserDTO(user);
            req.user = userDto; 
            next();
    
        
           
    } catch (error) {
        return next(error);
        
    }
   
};
module.exports = auth;