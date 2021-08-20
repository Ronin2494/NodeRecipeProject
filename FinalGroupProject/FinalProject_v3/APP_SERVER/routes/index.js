var express = require('express');
var router = express.Router();
const cntrlr = require('../controllers/main')
const cntrlabt = require('../controllers/about');
const ctrlfood = require('../controllers/food')

/* GET home page. */
router.get('/', cntrlr.index);
router.get('/about', cntrlabt.AboutPage)
router.get('/list', ctrlfood.listDisplay)
router.get('/display', ctrlfood.display)
router.route('/new').get(ctrlfood.addNewFood).post(ctrlfood.create)
router.get('/details/:foodid', ctrlfood.details)

module.exports = router;
