const express = require('express')
const route = express.Router();
const emplyoemodel = require('../model/emplyemodel')
const app = express();

app.use(express.json())


route.post('/addemp', async(req, res)=>{
    try{
        const { username, userid, department, role, skill, email, phone, place, join, status,} = req.body
        const addemp = new emplyoemodel({
        username,
        userid,
        department,
        role,
        skill,
        email,
        phone,
        place,
        join,
        status,
        })
        const saveemp = await addemp.save();
        res.status(200).json({
            message : "Added Sucessfuly",
        })
        
       
    }
     catch(err){
            res.status(500).json({
                message : "failed"
            })
        }
})

route.get('/getemp', async(req, res) => {
    try{
        let data  = await emplyoemodel.find()
        res.status(200).json({
            message : "sucess",
            datas : data    
        })
        
    }
    catch{
        res.status(500).json({
            messgae: "failed"
        })
    }
})
route.put('/updatemp/:id', async (req, res) => {
    try{

        const updateId = req.params.id
        
        const update = await emplyoemodel.findOneAndUpdate(
            { userid: updateId },
            req.body,
            { returnDocument: "after" }
        )

        res.status(200).json({
            message: "Employee Updated",
            data: update
        })

    }catch(err){
        res.status(500).json({
            message: err.message
        })
    }
})

route.delete('/deletemp/:id', async (req, res) =>{
    try{
    let delid = req.params.id
    const del = await emplyoemodel.findOneAndDelete({userid : delid})  
    res.status(200).json({
        message :"sucess"
    })
}
    catch(err){
        res.status(500).json({err : err})
    }
})

route.get("/checkuser/:userid", async (req, res) => {

    try{

        const userid = req.params.userid;
        const user = await emplyoemodel.findOne({ userid: userid });
        if(user){
            res.json({ message: "yes" });
        }else{
            res.json({ message: "no" });
        }
        
    }
    catch(err){
        res.json({ exists: "no" });
    }

});


module.exports = route