const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const volcanoSchema = new Schema({
  volc_cavw:{type:String},
  volc_num:{type:Number,required:true},
  volc_name:{type:String,required:true},
  volc_code:{type:String},
  volc_name2:{type:String},
  volc_tzone:{type:String},
  volc_mcont:{type:String},
  volc_com:{type:String},
  volc_inf_status:{type:String},
  volc_inf_desc:{type:String},
  volc_inf_slat:{type:String},
  volc_inf_slon:{type:String},
  volc_inf_selev:{type:String},
  volc_inf_type:{type:String},
  volc_inf_country:{type:String},
  volc_inf_subreg:{type:String},
  volc_inf_loc: {type: String},
  volc_inf_rtype:{type: String},
  volc_inf_evol:{type: String},
  volc_inf_numcald:{type: String},
  volc_inf_lcald_dia:{type: String},
  volc_inf_ycald_lat:{type: String},
  volc_inf_ycald_lon:{type: String},
  volc_inf_com:{type: String},
  ed_lasterupt:{type:Number},
  ed_evidence:{type: String},
  tectonic_settings:{type:String},
  mj_rock1:{type:String},
  mj_rock2:{type:String},
  mj_rock3:{type:String},
  mj_rock4:{type:String},
  mj_rock5:{type:String},
  mn_rock1:{type:String},
  mn_rock2:{type:String},
  mn_rock3:{type:String},
  mn_rock4:{type:String},
  mn_rock5:{type:String},


});
const volcano2Schema = new Schema({
  volc_name:{type:String,required:true},
  volc_num:{type:Number},
  imgURL:{type:String},
},{
  timestamps:true
})
const Volcano = mongoose.model('Volcano', volcanoSchema);
const Volcano2 = mongoose.model('Volcano2', volcano2Schema)
module.exports =  {Volcano,Volcano2};
