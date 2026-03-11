const mongo = require('mongoose')
const schema = new mongo.Schema({
    assignemp : String,
    task : String,
    sdate : String,
    edate : String,
    priority : {
        type : String,
        default : "Low"
    },
    position : String,
    des : String,
    taskid : String
})

const Assignmodel = mongo.model('taskmanage', schema)

module.exports = Assignmodel;