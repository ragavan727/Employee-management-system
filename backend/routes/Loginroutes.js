const express = require('express')
const route = express.Router();
const Loginmodel = require('../model/Loginmodel')

route.get('/login', async(req, res)=>{
    try{
        const data = await Loginmodel.find()
        res.status(200).json({
            data : data,
            message : "sucess"
        })
    }
    catch{
        res.status(500).json({
            message : "failed"
        })
    }
})


route.put('/updatelogin/:id', async(req, res)=>{
    try{
        const id = req.params.id
        const {username , password} = req.body

        await Loginmodel.findByIdAndUpdate(
            id,
            {username , password},
            {new:true}
        )

        res.status(200).json({
            message : "updated"
        })
    }
    catch{
        res.status(500).json({
            message:"failed"
        })
    }
})

module.exports = route;