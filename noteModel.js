const mongoose = require("mongoose")
const noteSchema = new mongoose.Schema({
    note:{type :String },
    userId:{type : String}
})

module.exports = mongoose.model('note',noteSchema)