const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const sampleSchema = new Schema({
  volc_num:{type:Number,required:true},
  afe_code:{type:String, required: true},
  sample_id:{type:Number, required: true},
  sample_date:{type:Date},
  vent_loc_lat:{type:Number},
  vent_loc_lon:{type:Number},
  vent_loc_elevation:{type:Number},
  onset_unrest_eruptive_cycle :{type:Date},
  onset_new_eruptive_phase:{type:Date},
  sample_loc_lat:{type:Number},
  sample_loc_lon:{type:Number},
  sample_loc_elevation:{type:Number},
  technique:{type:String},
  sample_surface:{type:String},
  collector:{type:String},
  stirred_with:{type:String},
  ultrasound_cleaning:{type:String},
  sieved:{type:String},
  leached_with:{type:String}
})

const Sample = mongoose.model('Sample', sampleSchema)
module.exports ={Sample}