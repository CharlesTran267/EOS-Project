const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const particleSchema = new Schema({
    volc_num: {type:Number,required:true},
    volc_name:{type:String},
    afe_id:{type:Number, required:true},
    sample_id :{type:Number, required: true},
    id: {type:Number, required: true},
    batch:{type:Number},
    index: {type:Number},
    instrument:{type:String},
    imgURL:{type:String},
    gsLow:{type: Number},
    gsUp:{type: Number},
    multi_focus:{type:Boolean},
    magnification:{type: Number},
    particleType: {type:String}, 
    glassyType: {type:String},
    crystallinity:{type:String}, 
    alteration: {type:String}, 
    shape:{type:String},
    microscope: {type: String},
    software: {type: String},
    device: {type: String},
    ligh_intensity: {type: String},
    epis_dias_light: {type: String},
    scale_ref: {type: String},
    convexity: {type:Number},
    rectangularity: {type:Number},
    elongation: {type:Number},
    roundness: {type:Number},
    circularity: {type:Number},
    eccentricity_moments: {type:Number},
    eccentricity_ellipse:{type:Number},
    solidity: {type:Number},
    aspect_rat: {type:Number},
    compactness: {type:Number},
    circ_rect: {type:Number},
    comp_elon: {type:Number},
    rect_comp: {type:Number},
    contrast: {type:Number},
    dissimilarity: {type:Number},
    homogeneity: {type:Number},
    energy: {type:Number},
    correlation: {type:Number},
    asm: {type:Number},
    blue_mean: {type:Number},
    blue_std: {type:Number},
    blue_mode: {type:Number},
    green_mean: {type:Number},
    green_std: {type:Number},
    green_mode: {type:Number},
    red_mean: {type:Number},
    red_std: {type:Number},
    red_mode: {type:Number},

  },{
    timestamps: true
  })

const Particle = mongoose.model('Particle', particleSchema);

module.exports = {Particle}