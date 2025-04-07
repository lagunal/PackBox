var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/users', userController.registerUser);

router.post('/login', userController.loginUser);

router.get('/packages', userController.getPackages);

router.put('/bookings', userController.bookSlot);

router.put('/bookings/:emailId', userController.cancelBooking);



module.exports = router;

