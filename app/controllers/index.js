const jwt = require("jsonwebtoken");
const User = require("../models/patient");
const { AddDoctorToDb, AddUsersToDb, AddSingleUserToDb,
   LoginFromDB,LoginDoctorFromDB,
    ListDoctorsFromDb, BookAppointmentDb, ListBookingsFromDb } = require("../services/index")
const { validateUser, validateSingleUser } = require("../helpers/validator");
const Doctor = require("../models/doctor");

async function authorize(req,role) {

  let token = req.headers?.authorization
  if (!token) {
    return {
      success:false,
    }
  }

 
  if (token.split(" ")?.length < 2) {
    return {
      success:false,
    }
  }

  token = token.split(" ")[1]
  if (token) {
    const data = await jwt.verify(token, "ABC123456")
    if (role === "user"){
      const userCount = await User.countDocuments({_id:data.id})
      if (userCount === 1) {
        return {
          success:true,
          data: data 
        }
      }
    }
    if (role === "doctor"){
      const userCount = await Doctor.countDocuments({_id:data.id})
      if (userCount === 1) {
        return {
          success:true,
          data: data 
        }
      }
    }
  }

  return {
    success:false,
  }
}

function AddDoctor(req, res) {
  const body = req.body; // the request body

  // process the request and send a response

  try {
    const response = AddDoctorToDb(body)
    return res.json({
        message:"success",
        payload: response?.status
    })
  }
  catch(err) {
    return {
        message:"failed",
        error: err.message
    }
  }
}

function AddMultipleUser(req, res) {
  const body = req.body; // the request body

  // process the request and send a response

  const errors = validateUser(body?.users)
  console.log("hello",errors)
  if (errors.length > 0) {
    return res.json({
      success: false,
      errors
    })
  }

  try {
    const response = AddUsersToDb(body)
    return res.json({
        message:"success",
        payload: response?.status
    })
  }
  catch(err) {
    return {
        message:"failed",
        error: err.message
    }
  }
}

function AddSingleUser(req, res) {
  const body = req.body; // the request body

  // process the request and send a response
  const errors = validateSingleUser(body)
  if (errors.length > 0) {
    return res.json({
      success:false,
      errors: errors
    })
  }
  try {
    const response = AddSingleUserToDb(body)
    return res.json({
        message:"success",
        payload: response?.status
    })
  }
  catch(err) {
    return {
        message:"failed",
        error: err.message
    }
  }
}

async function Login(req, res) {
  const body = req.body; // the request body

  // process the request and send a response

  try {
    const response = await LoginFromDB(body)
    return res.json({
        message:"success",
        payload: response
    })
  }
  catch(err) {
    return {
        message:"failed",
        error: err.message
    }
  }
}

async function LoginDoctor(req, res) {
  const body = req.body; // the request body

  // process the request and send a response

  try {
    const response = await LoginDoctorFromDB(body)
    return res.json({
        message:"success",
        payload: response
    })
  }
  catch(err) {
    return {
        message:"failed",
        error: err.message
    }
  }
}
async function ListDoctors(req, res) {
  const query = req.query; // the request body

  // process the request and send a response


  try {
    const auth = await authorize(req, "user")
  
    if (!auth?.success) {
      return res.json({
        message:"Autorization failed",
        message: false
      })
    }
    const response = await ListDoctorsFromDb(query)
    return res.json({
        message:"success",
        payload: response
    })
  }
  catch(err) {
    return {
        message:"failed",
        error: err.message
    }
  }
}

async function ListBookings(req, res) {
  const query = req.query; // the request body

  // process the request and send a response


  try {
    const auth = await authorize(req, "doctor")
    console.log(auth)
    if (!auth?.success) {
      return res.json({
        message:"Autorization failed",
        message: false
      })
    }
    const response = await ListBookingsFromDb(query, auth?.data)
    return res.json({
        message:"success",
        payload: response
    })
  }
  catch(err) {
    return res.json({
        message:"failed",
        error: err.message
    })
  }
}

async function BookAppointment(req, res) {
  const query = req.query; // the request body

  // process the request and send a response


  try {
    const auth = await authorize(req, "user")

    if (!auth?.success) {
      return res.json({
        message:"Autorization failed",
        message: false
      })
    }
    const response = await BookAppointmentDb(req?.body, auth?.data)
    return res.json({
        message:"success",
        payload: response
    })
  }
  catch(err) {
    return {
        message:"failed",
        error: err.message
    }
  }
}
module.exports = {
    AddDoctor,
    AddMultipleUser,
    AddSingleUser,
    Login,
    LoginDoctor,
    ListDoctors,
    ListBookings,
    BookAppointment
}