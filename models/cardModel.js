const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
    question: {
        type: String,
        required: [true, 'Please add a question'],
    },
    questionImage: {
        type: String,
    },
    answer: {
        type: String,
        required: [true, 'Please add an answer'],
    },
    set: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Set',
    },
}, {
    timestamps: true,
});


const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
