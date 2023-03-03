const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    doctor: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    date:String,
    slot:{
        type: String, 
        enum: ['9.00 AM -9.30 AM', '9.30 AM -10.00 AM','10.00 AM -10.30 AM', '10.30 AM -11.00 AM',
        '11.00 AM -11.30 AM', '11.30 AM -12.00 PM','12.00 PM -12.30 PM', '12.30 PM -1.00 PM',
        '11.00 AM -11.30 AM', '2.30 AM -3.00 PM','3.00 PM -3.30 PM', '3.30 PM -4.00 PM',
        '4.00 PM -4.30 PM', '4.30 PM -5.00 PM']
    },
    status:{
        type: String, 
        enum: ['booked', 'Visited','Cancelled']
    },
    created_at: Date
  })

  const Booking = mongoose.model('Booking', bookingSchema)

  module.exports = Booking