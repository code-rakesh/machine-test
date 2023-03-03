const express = require('express');
const router = express.Router();
const { AddDoctor, AddMultipleUser, AddSingleUser, Login, ListDoctors, BookAppointment, ListBookings, LoginDoctor } = require("../controllers/index")
router.post('/add-doctor', AddDoctor);
router.post('/add-multiple-user', AddMultipleUser)
router.post('/add-user', AddSingleUser)
router.post('/login-user', Login)
router.post('/login-doctor', LoginDoctor)
router.post('/book-doctor', BookAppointment)
router.get('/list-doctors', ListDoctors)
router.get('/list-bookings', ListBookings)
module.exports = router;