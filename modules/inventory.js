const mongoose = require('mongoose');

const InventorySchema = mongoose.Schema({
    User_ID: String,
    Quiz_Juste:Number,
    Quiz_Faux:Number,
    Quiz_NA:Number,
    Time:String
})

module.exports = mongoose.model("inventory", InventorySchema)