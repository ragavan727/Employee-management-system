const mongo = require('mongoose')
const schema = new mongo.Schema({
    username : String,
    userid : {
        type : String,
        
    },
    department : String,
    role : String,
    skill : String,
    email : {
        type : String,
        
    },
    phone : Number,
    place : String,
    join : Date,
    status : {
        type :String,
        
    }
})

const emplyoemodel = mongo.model('employedetail', schema)

module.exports = emplyoemodel;