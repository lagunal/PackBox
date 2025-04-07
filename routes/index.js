var express = require('express');
var router = express.Router();

const { registerUser, loginUser, getPackages, bookSlot, cancelBooking, deleteUser } = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/users', registerUser);

router.post('/login', loginUser);

router.get('/packages', getPackages);

router.put('/bookings', bookSlot);

router.put('/bookings/:emailId', cancelBooking);

router.delete('/users/:emailId', deleteUser);

module.exports = router;

