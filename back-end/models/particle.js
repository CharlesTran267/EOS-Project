const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const particleSchema = new Schema({
    id: {type:Number, required: true},
    index: {type:Number},
    instrument:{type:String},
    imgURL:{type:String, required: true},
    particleType: {type:String}, 
    glassyType: {type:String},
    crystallinity:{type:String}, 
    alteration: {type:String}, 
    shape:{type:String},
    volc_id: {type:Number},
    volc_name: {type:String,required: true},
    afe_id: {type:Number,required: true},
    gen_id: {type:Number,required: true},
    microscope: {type: String},
    software: {type: String},
    device: {type: String},
    magnification: {type: String},
    ligh_intensity: {type: String},
    epis_dias_light: {type: String},
    scale_ref: {type: String}
  },{
    timestamps: true
  })

const Particle = mongoose.model('Particle', particleSchema);

module.exports = {Particle}