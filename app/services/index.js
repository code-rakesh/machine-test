const Doctor = require("../models/doctor")
const User = require("../models/patient")
const bcrypt = require("bcrypt")
const saltRounds = 10
const jwt = require("jsonwebtoken")
const Booking = require("../models/bookings")
async function AddDoctorToDb(body) {
    const doctors = body?.doctors
    if (!doctors?.length) {
        throw new Error("No doctors found")
    }
    const arr  = []
    let i = 0
    while (i < doctors.length) {
        const elem = doctors[i]
        const obj = JSON.parse(JSON.stringify(elem))
        obj.created_at = new Date()
        const hash = await bcrypt.hash(obj?.password, saltRounds)
        obj.password = hash
        const doctorObj = new Doctor(obj)
        arr.push(doctorObj)
        i = i + 1
    }
    const resp = await Doctor.insertMany(arr)
    return resp
}

async function AddUsersToDb(body) {
    const users = body?.users
    if (!users?.length) {
        throw new Error("No doctors found")
    }
    const arr  = []

    for (let elem of users) {
        const obj = JSON.parse(JSON.stringify(elem))
        obj.created_at = new Date()
        const hash = await bcrypt.hash(obj?.password, saltRounds)
        obj.password = hash
        const userObj = new User(obj)
        arr.push(userObj)
    }
    const resp = await User.insertMany(arr)
    return resp
}

async function AddSingleUserToDb(body) {
    const obj = JSON.parse(JSON.stringify(body))
    obj.created_at = new Date()
    const hash = await bcrypt.hash(obj?.password, saltRounds)
    obj.password = hash
    const userObj = new User(obj)
    const resp = await userObj.save()
    return resp
}

async function LoginFromDB(body) {
    const obj = JSON.parse(JSON.stringify(body))
    const user = await User.findOne({email:obj.email})
    const compare = await bcrypt.compare(obj.password, user.password)
    if (!compare) {
        throw new Error("credential does not match")
    }
    const token = jwt.sign({id:user._id, name:user.name, email:user.email, age: user.age},"ABC123456")
    
    return {
        email: user.email,
        name: user.email,
        id: user._id,
        token: token
    }
}

async function LoginDoctorFromDB(body) {
    const obj = JSON.parse(JSON.stringify(body))
    const user = await Doctor.findOne({email:obj.email})
    const compare = await bcrypt.compare(obj.password, user.password)
    if (!compare) {
        throw new Error("credential does not match")
    }
    const token = jwt.sign({id:user._id, name:user.name, email:user.email,
        department: user.department},"ABC123456")
    
    return {
        email: user.email,
        name: user.email,
        id: user._id,
        token: token
    }
}

async function ListDoctorsFromDb(query) {

    const doctors = await Doctor.find({},{name:1,department:1,degree:1})

    const bookings = await Booking.find({
        date: query?.date,
        status: "booked"
    })
    const arr = []
  
    for (let elem of doctors) {
        let bookedslots = bookings.filter((el)=> {
            if (String(el.doctor) === String(elem._id)) {
                return true
            }
            return false
        }).map((booking)=>{
            return {
                date :  booking.date,
                slot : booking.slot
            }
        })
        let doctorObj = JSON.parse(JSON.stringify(elem))
      
        doctorObj.bookings = bookedslots
        arr.push(doctorObj)
    }
    return arr
}

async function ListBookingsFromDb(query, user) {

    console.log(query, user)
    const bookings = await Booking.find({
        date: query?.date,
        doctor: user.id
    }).populate({path:'user', select:'_id name Age'})
    
  
    
    return bookings
}

async function BookAppointmentDb(body, user) {

    const existingBooking = await Booking.countDocuments({
        doctor : body.doctor,
        date   : body.date,
        slot   : body.slot
    })
    if (existingBooking > 0) {
        return {
            success: false,
            message: "slot not available"
        }
    }
    const bookingObj = new Booking({
        doctor : body.doctor,
        user   : user.id,
        date   : body.date,
        slot   : body.slot,
        status : "booked"
    })
    const resp = await bookingObj.save()
    return resp
}
module.exports = {
    AddDoctorToDb,
    AddUsersToDb,
    AddSingleUserToDb,
    LoginFromDB,
    LoginDoctorFromDB,
    ListDoctorsFromDb,
    BookAppointmentDb,
    ListBookingsFromDb
}