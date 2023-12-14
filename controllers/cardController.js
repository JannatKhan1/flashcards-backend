const asyncHandler = require('express-async-handler');

const Card = require('../models/cardModel');
const Set = require('../models/setModel');



// @desc    Create a new card in a set
// @route   POST /api/cards/:setID/createCard
// @access  Private
const createCard = asyncHandler(async (req, res) => {
    const {setID} = req.params
    const {question,answer} = req.body
    const set = await Set.findById(setID)

  // Check if the set exists
  if (!set) {
    return res.status(404).json({ success: false, message: 'Set not found' });
  }

  // Create a new card
  const card = await Card.create({ set: setID, question, answer });

  // Update the set's cards array
  set.cards.push(card.id);
  await set.save();

  res.status(201).json({ success: true, message: 'Card created', data: card });
});


// @desc    Delete a card
// @route   DELETE /api/cards/:id
// @access  Private
const deleteCard = asyncHandler(async (req, res) => {
    const cardID = req.params.id
    console.log(cardID)
  
    try {
      // Find the card and delete it
      const deletedCard = await Card.findByIdAndDelete(cardID);
  
      if (!deletedCard) {
        return res.status(404).json({
          status: 'Not Found',
          message: 'Card not found',
        });
      }
  
      // Find the set associated with the card
      const set = await Set.findById(deletedCard.set);
      if (!set) {
        return res.status(404).json({ success: false, message: 'Set not found' });
      }
  
      // Remove the card from the set's cards array
      set.cards = set.cards.filter(setCardID => setCardID.toString() !== cardID);
      await set.save();
  
      res.status(204).json({
        status: 'Success',
        data: {},
      });
    } catch (err) {
      res.status(500).json({
        status: 'Failed',
        message: err.message,
      });
    }
  });
  
// @desc    View all cards in a set
// @route   GET /api/cards/set/:setId
// @access  Private 
const viewAllCardsInSet = asyncHandler(async (req, res) => {
    const setId = req.params.setId;
  
    // Check if the set exists
    const set = await Set.findById(setId);
  
    if (!set) {
      return res.status(404).json({ success: false, message: 'Set not found' });
    }
  
    // Retrieve all cards in the set
    const cardsInSet = await Card.find({ set: set._id });
  
    res.status(200).json({ success: true, data: cardsInSet });
  });

// @desc    View a single card in a set
// @route   GET /api/cards/:cardId
// @access  Private 

const viewCard = asyncHandler(async (req, res) => {
const cardID = req.params.cardId;

try {
const card = await Card.findOne({ _id: cardID })

if (!card) {
    return res.status(404).json({ success: false, message: 'Card not found in the set' });
}

res.status(200).json({ success: true, data: card });
} catch (err) {
res.status(500).json({ status: 'Failed', message: err.message });
}
});

// @desc    Update Q n A on a card
// @route   PUT /api/cards/:cardId
// @access  Private 

const updateQnA = asyncHandler(async (req, res) => {
    const cardID = req.params.cardId;
  
    try {
      const card = await Card.findByIdAndUpdate(
        cardID,
        { $set: { question: req.body.question, answer: req.body.answer } },
        { new: true }
      );
  
      res.status(200).json({ success: true, message: 'Card question and answer updated', data: card });
    } catch (err) {
      res.status(500).json({ status: 'Failed', message: err.message });
    }
  });

// @desc    Add Q img  on a card
// @route   POST /api/cards/:cardId/addImage
// @access  Private 

  const addImage = asyncHandler(async (req, res) => {
    const cardID = req.params.cardId;
  
    try {
      const card = await Card.findByIdAndUpdate(
        cardID,
        { $set: { questionImage: req.body.questionImage } },
        { new: true }
      );
  
      res.status(200).json({ success: true, message: 'Question image added', data: card });
    } catch (err) {
      res.status(500).json({ status: 'Failed', message: err.message });
    }
  });

// @desc    Update Q img  on a card
// @route   PUT /api/cards/:cardId/editImage
// @access  Private 

const updateImage = asyncHandler(async (req, res) => {
    const cardID = req.params.cardId;

    try {
    const card = await Card.findByIdAndUpdate(
        cardID,
        { $set: { questionImage: req.body.questionImage } },
        { new: true }
    );

    res.status(200).json({ success: true, message: 'Card question image updated', data: card });
    } catch (err) {
    res.status(500).json({ status: 'Failed', message: err.message });
    }
});


// @desc    Delete Q img  on a card
// @route   DELETE /api/cards/:cardId/deleteImage
// @access  Private 

const deleteImage = asyncHandler(async (req, res) => {
    const cardID = req.params.cardId;
  
    try {
      const card = await Card.findByIdAndUpdate(
        cardID,
        { $unset: { questionImage: 1 } },
        { new: true }
      );
  
      res.status(200).json({ success: true, message: 'Card question image deleted', data: card });
    } catch (err) {
      res.status(500).json({ status: 'Failed', message: err.message });
    }
  });
  

  
  

module.exports = {
  createCard,
  deleteCard,
  viewAllCardsInSet,
  viewCard,
  updateQnA,
  addImage,
  updateImage,
  deleteImage
};
