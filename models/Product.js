const mongoose = require("mongoose");
const { Schema } = mongoose;


const ProductSchema = new Schema({
  landingPageUrl: {type: String},
  productId: {type: Number},
  product: {type: String},
  productName: {type: String},
  rating: {type: Number},
  ratingCount: {type:Number},
  discount: {type:Number},
  brand:{type: String},
  searchImage:{type: String},
  effectiveDiscountPercentageAfterTax:{type:Number},
  effectiveDiscountAmountAfterTax: {type:Number},
  inventoryInfo:[{
    skuId:{type:Number},
    label:{type: String},
    inventory:{type:Number},
    available:{type:Boolean}
  }],
  sizes:{type: String},
  images:[{
    view:{type: String},
    src:{type: String}
  }],
  gender:{type: String},
  primaryColour:{type: String},
  discountLabel:{type: String},
  discountDisplayLabel:{type:String},
  additionalInfo:{type: String},
  category:{type: String},
  mrp:{type:Number},
  price:{type:Number},
  colorVariantAvailable:{type:Boolean},
  discountType:{type: String},
  catalogDate:{type: String},
  season:{type: String},
  year:{type: String},
  systemAttributes:[{
    attribute:{type: String},
    value:{type: String}
  }]

  
});
const Products = mongoose.model('products',ProductSchema)
module.exports = Products;


