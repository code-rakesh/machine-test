const mongoose = require('mongoose')

const doctorSchema = new mongoose.Schema({
    name: String,
    department: String,
    degree: String,
    email:String,
    password:String,
    created_at: Date
  })

  const Doctor = mongoose.model('Doctor', doctorSchema)

  module.exports = Doctor