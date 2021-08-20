var express = require("express");
var router = express.Router();
const ctrlfood = require('../controllers/food')
const auth = require('../../middleware/auth');

router.get('/foods', ctrlfood.getFoods);
router.get('/cuisine', ctrlfood.getCuisine);
router.post('/foods',auth, ctrlfood.createFood);

router.get('/foods/:foodid',  ctrlfood.getSingleFood);
router.put('/foods/:foodid',auth, ctrlfood.updateFood);
router.delete('/foods/:foodid',auth, ctrlfood.deleteFood);

router.get('/reviews/:foodid',  ctrlfood.getSingleFoodReviews);
router.post('/reviews/:foodid', ctrlfood.AddFoodReview);

module.exports = router;