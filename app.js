require('dotenv').config();
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL)
const db = mongoose.connection
db.on('error',(error)=>console.error(error))
db.once('open',()=>console.log('connecte to db'))

app.use(express.json())

const coursesRouter = require('./routes/courses')
app.use('/courses',coursesRouter)


app.listen(3000,()=>{
    console.log("Server Startted")
})