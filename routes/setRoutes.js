const express = require('express')
const router = express.Router()
const {
  getSets,
  getSet,
  createSet,
  deleteSet,
  updateSet
} = require('../controllers/setController')

const { protect } = require('../middleware/authMiddleware')


router.route('/').get(protect, getSets).post(protect, createSet)
router
  .route('/:id')
  .get(protect, getSet)
  .delete(protect, deleteSet)

router.route('/updateSet/:id').put(protect, updateSet);

module.exports = router