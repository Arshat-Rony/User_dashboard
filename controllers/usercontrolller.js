const { serverError, resourceError } = require('../errors/loginerror');
const bcrypt = require('bcrypt');

const User = require('../models/UserModel')

const loginValidation = require('../Validation/loginValidation')

const jwt = require('jsonwebtoken');


module.exports = {
    registration(req, res) {

        let { name, password } = req.body;

        bcrypt.hash(password, 10, function (err, hash) {
            if (err) {
                serverError(res, err)
            }
            if (hash) {
                password = hash
            }
        });
        let validate = loginValidation({ name, password });


        if (validate.isValid) {
            User.findOne({ name })
                .then(user => {
                    // checking the user available or not 
                    if (user) {
                        res.status(200).send({
                            message: "Name Already Exist"
                        })
                    }


                    if (!user) {

                        // user creation, saving and jwt token attach
                        const user = new User({
                            name, password,
                            clients: []
                        })

                        user.save()
                            .then(savedUser => {
                                let token = jwt.sign({
                                    _id: user._id,
                                    name: user.name,
                                    clients: []
                                }, "SECRET", { expiresIn: '1d' })
                                if (savedUser) {
                                    return res.status(200).json({
                                        message: "User Created Successfully",
                                        token,
                                    })

                                }
                            })
                            .catch(err => serverError(res, err))

                    }
                })
                .catch(err => serverError(res, err))
        } else {
            return res.send({
                error: validate.error
            })
        }
    },

    login(req, res) {
        let { name, password } = req.body;

        console.log(name, password)

        let validate = loginValidation({ name, password })
        console.log(validate)
        if (validate.isValid) {
            User.findOne({ name })
                .then(user => {
                    console.log(user, "from login")
                    if (!user) {
                        res.status(200).send({
                            message: "User Doesn't Exist"
                        })
                    }
                    if (user) {
                        bcrypt.compare(password, user.password, function (err, result) {
                            if (err) {
                                serverError(res, err)
                            }
                            if (result) {
                                res.status(200).send({
                                    message: "Login Successfull",
                                    user
                                })
                            }
                            if (!result) {
                                res.status(200).send({ message: "Password Didn't Match" })
                            }
                        });
                    }
                })
                .catch(err => console.log(err))
        } else {
            return res.send({
                error: validate.error
            })
        }

    },
    getSingleUser(req, res) {
        let { id } = req.params;
        User.findOne({ _id: id })
            .then(user => {
                res.status(200).send({
                    user
                })
            })
            .catch(err => serverError(res, err))
    },
    getAllUser(req, res) {
        User.find({})
            .then(alluser => {
                res.status(200).send({
                    alluser
                })
            })
            .catch(err => serverError(res, err))
    },
    updateUser(req, res) {
        let { id } = req.params;
        const { data } = req.body;

        User.findOne({ _id: id })
            .then(user => {
                if (user) {
                    const newUser = {
                        name: data.name,
                        mobile: data.mobile,
                        password: user.password,
                        email: data.email
                    }
                    User.findByIdAndUpdate(user._id, { $set: newUser }, { new: true })
                        .then(updatedUser => {
                            res.status(200).send({
                                message: "User updated successfully",
                                user: updatedUser,
                            })
                        })
                        .catch(err => serverError(res, err))
                }

            })
            .catch(err => serverError(res, err))
    },
    removeUser(req, res) {
        let { id } = req.params;
        User.findByIdAndDelete(id)
            .then(user => {
                res.status(200).send({
                    message: "User Deleted Successfully",
                    user
                })
            })
            .catch(err => serverError(res, err))
    }
}



