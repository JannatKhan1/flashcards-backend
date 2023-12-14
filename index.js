const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const cors = require("cors")
const PORT = process.env.PORT || 5000

//Connect to database
connectDB()
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

//Routes
app.use('/api/users',require('./routes/userRoutes'))
app.use('/api/sets',require('./routes/setRoutes'))
app.use('/api/cards',require('./routes/cardRoutes'))

app.use(errorHandler)

app.listen(PORT,()=>console.log(`Server started on port ${PORT}`))