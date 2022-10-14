const router = require("express").Router();

const authenticate = require('../authenticate')

const { registration, login, removeUser, updateUser, getAllUser, getSingleUser } = require("../controllers/usercontrolller");


// registration route 
router.post('/registration', registration);

// login 
router.post('/login', login)

// get all the user 
router.get('/alluser', authenticate, getAllUser)

//get a single user
router.get('/singleuser/:id', authenticate, getSingleUser)

// update the user
router.put('/update/:id', authenticate, updateUser)


// delete the user 
router.delete('/delete/:id', authenticate, removeUser)


module.exports = router;