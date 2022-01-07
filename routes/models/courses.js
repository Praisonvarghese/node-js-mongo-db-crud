const mongoose = require('mongoose')

const coursesSchema = new mongoose.Schema({
    courseName : {
        type:String,
        required:true
    },
    courseDescription :{
        type:String,
        required:true
    },
    startDate : {
        type:Date,
        required:true,
        default:Date.now
    }
})

module.exports= mongoose.model('Courses',coursesSchema)