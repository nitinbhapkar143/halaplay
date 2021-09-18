const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const schema = mongoose.Schema;

const userSchema = new schema({
    email: {
        type: String,
        required: [true, 'Please enter an email address.'],
        unique: [true, 'The email address is taken.'],
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a valid email address.']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password.'],
        minLength: [4, 'Password should be at least 4 characters.'],
        maxLength: [20, 'Password should be at max 20 characters.'],
    }
});

userSchema.index({ email: 1 });

userSchema.pre('save', async function(next) {
	this.password = await bcrypt.hash(this.password, 10)
    next();
});

userSchema.methods.comparePassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);