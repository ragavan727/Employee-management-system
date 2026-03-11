
require('dotenv').config();
const express = require('express')
const app = express();
const mongo = require('mongoose')
const emproute = require('./routes/employeroutes')
const taskroute = require('./routes/Taskroute')
const assignroute =  require('./routes/Assignroutes')
const Loginroute =  require('./routes/Loginroutes')
const droute =  require('./routes/Dashroute')

const cors = require('cors')


app.use(express.json())
app.use(cors());


mongo.connect(process.env.DB_URL)
.then(()=>{
    console.log("connected")
})
.catch((err) =>{
    console.log(err)
})

app.use('/', emproute)
app.use('/', taskroute)
app.use('/', assignroute)
app.use('/', droute)
app.use('/', Loginroute)



app.listen(process.env.PORT)