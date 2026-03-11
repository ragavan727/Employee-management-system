const mongo = require('mongoose')

const schema = new mongo.Schema({
    username : {
        type: String,
        default : "Admin"
    },
    password : {
        type: String,
        default : "Admin@123"
    }
})

const Loginmodel = mongo.model("logindetails", schema)
module.exports = Loginmodel