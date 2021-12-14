const mongoose = require('mongoose');

const Schema = mongoose.Schema;
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

const General = mongoose.model('General', generalSchema);
const Sample = mongoose.model('Sample', sampleSchema)
module.exports ={General,Sample}