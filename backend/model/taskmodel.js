const mongoo = require('mongoose')
const schema = new mongoo.Schema({
    taskname :  String,
    taskid : String,
    startdate : Date,
    enddate : Date,
    department : String,
    des : String,
    status : {
        type : String,
        default : "Active"
    },
    position : {
        type : String,
        default : "To Do"
    }     
})

const taskmodel = mongoo.model('task', schema)

module.exports = taskmodel;