const mongoose = require('mongoose');

const setSchema = mongoose.Schema({
    setName: {
        type: String,
        required: [true, 'Please add a name'],
    },
    cards: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Card',
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
}, {
    timestamps: true,
});


const Set = mongoose.model('Set', setSchema);

module.exports = Set;

