const mongoose = require("mongoose");
const { Schema } = mongoose;

const HintsSchema = new Schema({
    hintStatement:{
        type:String
    },
    category:{
        type:String
    },
    level:{
        type:Number
    }
})

const Hints = mongoose.model('hints',HintsSchema)
module.exports = Hints;