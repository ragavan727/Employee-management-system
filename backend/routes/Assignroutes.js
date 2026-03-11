const express = require('express')
const app = express();
const route = express.Router();
const Assignmodel = require('../model/Assignmodel');

app.use(express.json())

route.post('/assgnintask', async(req, res)=>{
    try{
        const {assignemp, task, sdate, edate, priority, position, des, taskid} = req.body
        const add = new Assignmodel({
            assignemp, task, sdate, edate, priority, position, des, taskid
        })
        await add.save();
        res.status(200).json({
            msg : "sucess"
        })
    }
    catch(err){
        res.status(500).json({
            msg : "failed"
        })
    }
     
})


route.put('/updatassigntask/:id', async(req, res)=>{
    try{
        let id = req.params.id
        const update = await Assignmodel.findOneAndUpdate({taskid : id}, req.body,{returnDocument : "after"})
        res.status(200).json({msg : "sucess"})
    }
    catch{
        res.status(500).json({msg : "failed"})
    }
})



route.delete('/delassign/:id', async(req, res)=>{
    try{
    const did = req.params.id
    const del = await Assignmodel.findOneAndDelete({taskid : did}); 
    res.status(200).json({msg : "sucess"})
    }
    catch{
        res.status(500).json({msg : "failed"})
    }
})

route.get('/getassign', async(req, res) =>{
    try{
    const datas = await Assignmodel.find();
    res.status(200).json({
        message : "sucess",
        data : datas
    
    })
    }
    catch(err){
        res.status(500).json({msg : "failed"})
    }
})

module.exports = route