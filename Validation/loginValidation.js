const validate = user => {
    let error = {}

    if (!user.name) {
        error.name = "Please Provide Your Name"
    }

    if (!user.password) {
        error.password = "Please Provide Your Password"
    }

    if (user.name && !user.password) {
        error.password = "Please Provide Your Password"
    }

    if (user.password.length < 6) {
        error.password = "Password Lenght Must Be 6"
    }

    return {
        error,
        isValid: Object.keys(error).length === 0,
    }
}


module.exports = validate;