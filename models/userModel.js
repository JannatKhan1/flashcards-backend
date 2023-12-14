const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
    },
    sets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Set',
        }
    ],
},
{
    timestamps: true,
});


const User = mongoose.model('User', userSchema);

module.exports = User;


