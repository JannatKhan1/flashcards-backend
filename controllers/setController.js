//set is created for particular user. Look for userID

const asyncHandler = require('express-async-handler')

const Set = require('../models/setModel')

// @desc    Get user sets
// @route   GET /api/sets
// @access  Private
const getSets = asyncHandler(async (req, res) => {
  const sets = await Set.find({ user: req.user.id })

  res.status(200).json(sets)
})

// @desc    Get user set by id
// @route   GET /api/sets/:id
// @access  Private
const getSet = asyncHandler(async (req, res) => {
  const set = await Set.findById(req.params.id)

  if (!set) {
    res.status(404)
    throw new Error('Set not found')
  }

  if (set.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not Authorized')
  }

  res.status(200).json(set)
})

// @desc    Create new set
// @route   POST /api/sets
// @access  Private
const createSet = asyncHandler(async (req, res) => {
  const { setName } = req.body

  if (!setName) {
    res.status(400)
    throw new Error('Please add a name to the set')
  }

  const set = await Set.create({
    setName,
    cards:[],
    user: req.user.id
  })

  res.status(201).json(set)
})

// @desc    Delete set
// @route   DELETE /api/sets/:id
// @access  Private
const deleteSet = asyncHandler(async (req, res) => {
  try {
    const deletedSet = await Set.findByIdAndDelete(req.params.id);

    if (!deletedSet) {
      // If the document was not found, return a 404 status code
      return res.status(404).json({
        status: 'Not Found',
        message: 'Set not found',
      });
    }

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



// @desc    Update set
// @route   PUT /api/sets/updateSet/:id
// @access  Private
const updateSet = asyncHandler(async (req, res) => {
  const set = await Set.findById(req.params.id);

  if (!set) {
    res.status(404);
    throw new Error('Set not found');
  }

  if (set.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not Authorized');
  }

  // Create a filter object using the set's ID
  const filter = { _id: req.params.id };

  // Create an update object with the name field
  const update = { setName: req.body.setName };

  // Use the updateOne method to update the ticket
  const updatedSet = await Set.updateOne(filter, update);

  // Check if the update was successful
  if (updatedSet.nModified === 1) {
    // Set was updated successfully
    res.status(200).json({ success: true, message: 'Set updated' });
  } else {
    res.status(200).json({ success: true, message: 'No changes made to the set' });
  }
});

module.exports = {
  getSets,
  getSet,
  createSet,
  deleteSet,
  updateSet,
}