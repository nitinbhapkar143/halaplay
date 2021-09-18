const user = require('../models/user');

exports.add = async (email, password) => {
    try {
        const newUser = new user({email, password});
        return await newUser.save();
    }catch(err){
        throw err;
    }
}

exports.get = async (email, select = {}) => {
    try {
        return await user.findOne( { email : email.toLowerCase() }).select(select).exec();
    }catch(err){
        throw err;
    }
}