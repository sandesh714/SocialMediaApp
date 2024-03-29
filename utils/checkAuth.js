const jwt = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY;
const { AuthenticationError } = require('apollo-server');
module.exports = (context) => {

    const authHeader = context.req.headers.authorization;

    if(authHeader){
        // Bearer ...
        const token = authHeader.split('Bearer ')[1];
        if (token){
            try{
                const user = jwt.verify(token, secret_key);
        
                return user;
            } catch(err){
                throw new AuthenticationError("Invalid/Expired token");
            }
        } 
        throw new Error("Authentication token must be \'Bearer [token]");
    }
    throw new Error("Authorization header must be \'Bearer [token]");
}