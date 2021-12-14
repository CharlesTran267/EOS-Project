const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const imageSchema = new Schema({
  imageURL:{type:String, required:true},
  gsLow:{type: Number, required: true},
  gsUp:{type: Number, required: true},
  magnification:{type: Number, required: true},
  volc_id: {type:Number, required: true},
  par_id: {type:Number, required: true},
  multi_focus:{type:Boolean, required: true}
},{
  timestamps:true
})
const Image = mongoose.model("Image",imageSchema)
module.exports = {Image}