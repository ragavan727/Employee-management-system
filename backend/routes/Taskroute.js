const taskmodel = require('../model/taskmodel')
const express = require('express')
const route = express.Router(); 
const app = express();

app.use(express.json())

route.post('/addtask', async(req, res)=>{
    try{
        const {taskname, taskid, startdate, enddate, department, status, des} = req.body
        const add = new taskmodel({
            taskname, taskid, startdate, enddate, department, status, des
        })
        await add.save();
        res.json({
            msg : "sucess"
        })
    }
    catch(err){
        res.json({
            msg : "failed"
        })
    }
     
})

route.get('/gettask', async(req, res) =>{
    try{
    const datatask = await taskmodel.find();
    res.status(200).json({
        message : "sucess",
        data : datatask
    
    })
    }
    catch(err){
        res.status(500).json({msg : "failed"})
    }
})

route.put('/updatetask/:id', async(req, res)=>{
    try{
        let id = req.params.id
        const update = await taskmodel.findOneAndUpdate({taskid : id}, req.body,{returnDocument : "after"})
        res.status(200).json({msg : "sucess"})
    }
    catch{
        res.status(500).json({msg : "failed"})
    }
})

route.delete('/taskdel/:id', async(req, res)=>{
    try{
    let id = req.params.id
    const del = await taskmodel.findOneAndDelete({taskid : id})
    res.status(200).json({
        message : "deleted"
    })
    }
    catch{
        res.status(500).json({msg : "failed"})
    }
})

route.put('/update-status/:id', async (req, res) => {
    try{
        const id = req.params.id
        const { position } = req.body
        const update = await taskmodel.findOneAndUpdate(
            { taskid: id },          
            { $set: { position: position } },
            { returnDocument: 'after' }            
        )

        res.status(200).json({
            message: "Status Updated",
            data: update
        })

    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
})

route.get("/checktask/:userid", async (req, res) => {

    try{

        const taskid = req.params.userid;
        const user = await taskmodel.findOne({ taskid: taskid });

        if(user){
            res.json({ message: "yes" });
        }else{
            res.json({ message: "no" });
        }
        
    }
    catch(err){
        res.json({ exists: false });
    }

});

module.exports = route