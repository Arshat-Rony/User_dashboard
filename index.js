const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const passport = require('passport')

const port = process.env.PORT || 8000;


// middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// checking the user is authenticated or not using passport
app.use(passport.initialize())
require('./passport')(passport)


// all route 
app.use("/vouche/users", require('./routers/loginrouter'))


app.get('/', (req, res) => {
    res.json({
        message: "Welcome to users dashbord application"
    })
})


app.listen(port, () => {
    console.log("server is running")

    mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.znjws22.mongodb.net/?retryWrites=true&w=majority`)
        .then(() => console.log("Database Connected"))
        .catch(e => console.log(e))
})