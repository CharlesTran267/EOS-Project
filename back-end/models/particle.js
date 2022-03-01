const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const particleSchema = new Schema({
    volc_num: {type:Number,required:true},
    volc_name:{type:String},
    ed_num:{type: Number},
    afe_id:{type:String, required:true},
    sample_id :{type:Number, required: true},
    id: {type:Number, required: true},
    batch:{type:Number},
    index: {type:Number},
    instrument:{type:String},
    imgURL:{type:String},
    gsLow:{type: Number, enum:[0,1,2,3,4]},
    gsUp:{type: Number, enum:[0,1,2,3,4]},
    multi_focus:{type:Boolean},
    magnification:{type: Number},
    basic_component: {type:String, enum:["free crystal","altered material","lithic","juvenile"]}, 
    crystal_type:{type: String},//  enum:["plagioclase","pyroxene", "amfibole","sulfur"]
    juvenile_type:{ type:String, enum:["recycled juvenile","hydrothermally altered juvenile","juvenile"]},
    altered_material_type:{type: String, enmu:["weathered material", "hydrothermally altered material"]},
    crystallinity_and_color:{type:String, enum:["low crystallinity black", "low crystallinity transparent", "mid crystallinity black", "mid crystallinity transparent","high crystallinity black", "high crystallinity transparent"]}, // 6 comnbinations
    alteration_degree: {type:String, enum:["none", "slight","moderate","high"]}, 
    shape:{type:String, enum: ["shape","blocky", "fluidal", "microtubular","highly vesicular","spongy","pumice"]},
    software: {type: String},
    device: {type: String},
    ligh_intensity: {type: Number},
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