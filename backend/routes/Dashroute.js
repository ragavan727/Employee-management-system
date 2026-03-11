const express = require('express')
const app = express();
const route = express.Router();
const Assignmodel = require('../model/Assignmodel');
const emplyoemodel = require('../model/emplyemodel')
const taskmodel = require('../model/taskmodel')

route.get('/totemp', async(req, res)=>{
    try{
    const totcount = await emplyoemodel.countDocuments();
    const departments = await emplyoemodel.distinct("department");
    const depcount = departments.length;
    res.status(200).json({
        empcount : totcount,
        depcount: depcount
    })
    }
    catch{
        res.status(500)
    }
})

route.get('/taskstats', async (req, res) => {
    try{

        const todo = await taskmodel.countDocuments({ position: "To Do" });
        const progress = await taskmodel.countDocuments({ position: "In progress" });
        const testing = await taskmodel.countDocuments({ position: "Testing" });
        const completed = await taskmodel.countDocuments({ position: "Completed" });
        const totalActive = await taskmodel.countDocuments({
            position: { $ne: "Completed" }
        });

        res.status(200).json({
            todo: todo,
            inprogress: progress,
            testing: testing,
            completed: completed,
            activeTasks: totalActive
        })

    }
    catch(err){
        res.status(500).json({error: err.message})
    }
})


route.get('/todaysubmit', async (req, res) => {
    try{

        const start = new Date();
        start.setHours(0,0,0,0);   // today start

        const end = new Date();
        end.setHours(23,59,59,999); // today end

        const count = await taskmodel.countDocuments({
            enddate: { $gte: start, $lte: end }
        });

        res.json({
            todaysubmit: count
        })

    }
    catch(err){
        res.status(500).json(err)
    }
})

route.get('/topemployee', async (req, res) => {
    try{

        const month = new Date().toISOString().slice(0,7); // example: 2026-03

        const data = await Assignmodel.aggregate([
            {
                $match:{
                    position: "completed",
                    sdate: { $regex: `^${month}` }
                }
            },
            {
                $group:{
                    _id: "$assignemp",
                    count: { $sum: 1 }
                }
            },
            {
                $sort:{ count:-1 }
            },
            {
                $limit:1
            }
        ])

        res.json(data)

    }
    catch(err){
        res.status(500).json(err)
    }
})

module.exports = route