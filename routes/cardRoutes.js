const express = require('express')
const router = express.Router()
const {
  createCard,
  deleteCard,
  viewAllCardsInSet,
  viewCard,
  updateQnA,
  addImage,
  updateImage,
  deleteImage
} = require('../controllers/cardController')

const { protect } = require('../middleware/authMiddleware')


router.route('/:setID/createCard/').post(protect, createCard)
router
  .route('/:id')
  .delete(protect, deleteCard)

router.route('/set/:setId').get(protect,viewAllCardsInSet)
router.route('/:cardId')
    .get(protect,viewCard)
    .put(protect,updateQnA)

router.route('/:cardId/addImage').post(protect, addImage)
router.route('/:cardId/editImage').put(protect, updateImage)
router.route('/:cardId/deleteImage').delete(protect, deleteImage)

module.exports = router