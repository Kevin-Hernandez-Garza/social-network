const { Schema, model} = require('mongoose');

// create the User model using the UserSchema
const User = model('User', UserSchema);

const UserSchema = new Schema({
    username: {
        type: String, 
        unique: true, 
        required: 'Username is required!',
        trim:true
    },
    email: {
        type: String, 
        unique: true, 
        required: 'Email is required!',
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    thoughts: {

    },
    friends: {
        
    }
});

//exporting the User model
module.exports = User;