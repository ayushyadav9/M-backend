const mongoose = require("mongoose");
const { Schema } = mongoose;


const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  rating: {
      rate: {
          type:Number
      },
      count: {
          type:Number
      }
  }
});
const Products = mongoose.model('products',ProductSchema)
module.exports = Products;

