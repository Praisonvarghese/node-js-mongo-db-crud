const express = require('express')
const router = express.Router()
const Courses = require('../routes/models/courses')

//get all courses
router.get('/',async (req,res)=>{
    try{
        const courses = await Courses.find()
        res.json(courses)
    }catch(err){
        res.status(500).json({message : err.message})
    }
})

//get course by id
router.get('/:id',getCourseById,async (req,res)=>{
   res.json(res.course)
})

//add new course
router.post('/',async (req,res)=>{
    const course = new Courses({
        courseName : req.body.courseName,
        courseDescription : req.body.courseDescription
    })

    try{
        const newCourse = await course.save()
        res.status(201).json(newCourse)
    }catch(err){
        res.status(400).json({message : err.message})
    }
})

//update existing course 
router.patch('/:id',getCourseById,async (req,res)=>{
    if(req.body.courseName != null){
        res.course.courseName = req.body.courseName 
    }
    if(req.body.courseDescription != null){
        res.course.courseDescription = req.body.courseDescription 
    }
    try{
        const updatedCourse = await res.course.save()
        res.status(200).json(updatedCourse)
    }catch(err){
        res.status(500).json({message : err.message})
    }
})

//delete course by id
router.delete('/:id',getCourseById,async (req,res)=>{
    try{
        await res.course.remove();
        res.json({message:'Course deleted'})
    }catch(err){
        res.status(500).json({message : err.message})
    }
})


async function  getCourseById(req,res,next){
    try{
        course = await Courses.findById(req.params.id)
        if(course == null) return res.status(500).json({message : "Can Not find Course"})
    }catch(err){
        return res.status(500).json({message : err.message})
    }
    res.course = course
    next()
}

module.exports = router