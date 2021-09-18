const jwt = require('jsonwebtoken');
const userDataAccess = require("../dataAccess/user");
const helperServie = require("./helper");
const publisher = require("../rabbitmq/publisher")

exports.signup = async user => {
    try{        
        if(!user.email) return { statusCode : 400, status : false, message : 'Email field is empty.'};
        if(!user.password) return { statusCode : 400, status : false, message : 'Password field is empty.'};
        const newUser = await userDataAccess.add(user.email, user.password);
        if(!newUser) return { statusCode : 200, success : false, message : 'Something went wrong. Please try later.'};
        return { statusCode : 200, status: true, user : { email : newUser.email , _id : newUser._id }, message: 'User created.'};
    }catch(err){
        throw err
    }
}

exports.authenticate = async user => {
    try{
        if(!user.email) return { status : false, statusCode : 400, message : 'Email field is empty.'};
        if(!user.password) return { status : false, statusCode : 400, message : 'Password field is empty.'};
        const dbUser = await userDataAccess.get(user.email, { password : 1 });
        if(!dbUser) return { status : false, statusCode : 401, message : 'Invalid email or password.'};
        const validUser = dbUser.comparePassword(user.password);
        if(!validUser) return { statusCode : 401, status : false, message : 'Invalid email or password.'};
        if(helperServie.isFifthRequest()) return { statusCode : 429, status : false, message : 'Too many requests.'};
        const serviceResponse = await publisher.publish(user.email);
        if(!serviceResponse) return { statusCode : 401, status: false, message: 'Request invalidated by third party service.'};
        const token = jwt.sign({ email : user.email, userId : dbUser._id }, process.env.JWT_SECRET, {expiresIn : '24h'});
        return { statusCode : 200, status: true, token: token, message: 'User Authenticated.'};
    }catch(err){
        throw err
    }
    
}
