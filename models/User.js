const mongoose = require("mongoose");
const Hints = require("./Hints");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name:{
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  provider: {
    type: String
  },
  currentHint:{
    type: Schema.Types.ObjectId,
    ref: 'Hints'
  },
  totalPuzzlesSolved:{
    type: Number,
    default:0
  },
  score:{
    type: Number,
    default: 0
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model('user',UserSchema)
module.exports = User;


