function ageError (age) {
    const errObj = {}
    if (!age){
        errObj.age = "age not found"
    }
    if (age > 120){
        errObj.age = "age is more than 120 years"
    }
    return errObj
}
function passwordError (password) {
    const errObj = {}
    if (!password){
        errObj.password = "password not found"
    } else {
        if (password.length > 25){
            errObj.password = "password is more than 25 character length"
        }
        if (password.length < 3){
            errObj.password = "password is less than 3 character length"
        }
    }
    return errObj
}

function emailError (email) {
    const errObj = {}
    if (!email){
        errObj.email = "email not found"
    } else {
        if (email.length > 25){
            errObj.email = "email is more than 25 character length"
        }
        if (email.length < 3){
            errObj.email = "email is less than 3 character length"
        }
        if (email.split("@").length !== 2) {
            errObj.email = "no proper email found"
        }
    }
    return errObj
}

function nameError (name) {
    const errObj = {}
    if (!name){
        errObj.name = "name not found"
    } else {
        if (name.length > 25){
            errObj.name = "name is more than 25 character length"
        }
        if (name.length < 3){
            errObj.name = "name is less than 3 character length"
        }
    }
    return errObj
}
function validateUser (array) {
    const errorsList = []
    for (let item of array){
        const errors = []
        const name = item?.name
        const email = item?.email
        const password = item?.password
        const age = item?.age
        
        const nameErrorObj = nameError(name)
        if (Object.keys(nameErrorObj).length > 0){
            errors.push(nameErrorObj)
        }

        const emailErrorObj = emailError(email)
        if (Object.keys(emailErrorObj).length > 0){
            errors.push(emailErrorObj)
        }

        const passwordErrorObj = passwordError(password)
        if (Object.keys(passwordErrorObj).length > 0){
            errors.push(passwordErrorObj)
        }

        const ageErrorobj = ageError(age)
        if (Object.keys(ageErrorobj).length > 0){
            errors.push(ageErrorobj)
        }
        errorsList.push(errors)
    }
    return errorsList
}

function validateSingleUser (item) {
    
        const name = item?.name
        const email = item?.email
        const password = item?.password
        const age = item?.age
        const errors = []
        const nameErrorObj = nameError(name)
        if (Object.keys(nameErrorObj).length > 0){
            errors.push(nameErrorObj)
        }

        const emailErrorObj = emailError(email)
        if (Object.keys(emailErrorObj).length > 0){
            errors.push(emailErrorObj)
        }

        const passwordErrorObj = passwordError(password)
        if (Object.keys(passwordErrorObj).length > 0){
            errors.push(passwordErrorObj)
        }

        const ageErrorobj = ageError(age)
        if (Object.keys(ageErrorobj).length > 0){
            errors.push(ageErrorobj)
        }
        return errors
}

module.exports = {
    validateUser : validateUser,
    validateSingleUser: validateSingleUser
}