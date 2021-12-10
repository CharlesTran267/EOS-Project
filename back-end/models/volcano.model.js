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
const generalSchema = new Schema({
  id: {type:Number, required: true},
  imgURL:{type:String,required: true},
  volc_id: {type:Number,required: true},
  volc_name: {type:String,required: true},
  afe_id: {type:Number,required: true},
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
const afeSchema = new Schema({
  id: {type: Number,required: true},
  volc_id: {type: Number},
  volc_name: {type:String,required: true},
  ed_stime: {type: Date, required: true},
  onset_unrest_e: {type: Date},
  onset_new_phase: {type: Date},
  vent_lon: {type: Number},
  vent_lat:{type: Number},
  elevation: {type: Number},
  prevail_wind_north: {type: String},
  rain: {type: String},
  snow: {type: String},
  lightnings: {type: Boolean},
  plume_color: {type: String},
  fumarolic_activity: {type: String},
  degassing: {type: String},
  dome_growth: {type: Boolean},
  crater_incandescence: {type: Boolean},
},{
  timestamps: true
})
const sampleSchema = new Schema({
  sample_stime: {type: Date, required: true},
  sample_lat: {type: Number, required: true},
  sample_lon: {type: Number, required: true},
  technique: {type: String},
  sample_surface: {type: String},
  collectors: {type: Array},
  stirred: {type:Boolean},
  ultrasonicated: {type: Boolean},
  sieved: {type: String},
  leached:{type: String},
},{
  timestamps: true
})
const eruptionSchema = new Schema({
  id: {type:Number,required: true},
  start: {type: Date,required: true},
  end:{type:Date},
  imgURL:{type:String},
  eruptiveStyle: {type:String},
  volc_id: {type:Number,required: true},
  volc_name: {type:String,required: true},
},{
  timestamps: true
})
const volcanoSchema = new Schema({
  name:{type:String, required: true},
  id: {type: Number,required:true},
  imgURL:{type:String,required: true},
  silicaContent: {type:String,required:true},
  tas: {type:String, required: true},
}, {
  timestamps: true,
});

const Volcano = mongoose.model('Volcano', volcanoSchema);
const Eruption = mongoose.model('Eruption', eruptionSchema);
const General = mongoose.model('General', generalSchema);
const Particle = mongoose.model('Particle', particleSchema);
const AFE = mongoose.model('AFE', afeSchema);
const Sample = mongoose.model('Sample', sampleSchema);
const Image = mongoose.model("Image",imageSchema)
module.exports = {
  Volcano: Volcano,
  Eruption: Eruption,
  General: General,
  Particle: Particle,
  AFE: AFE,
  Sample: Sample,
  Image: Image
}
