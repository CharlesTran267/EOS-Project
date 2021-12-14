const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const volcanoSchema = new Schema({
  vd_cavw:{type:String},
  vd_num:{type:Number,required:true},
  vd_name:{type:String,required:true},
  vd_name2:{type:String},
  vd_tzone:{type:String},
  vd_mcont:{type:String},
  vd_com:{type:String},
  cc_id:{type:String},
  cc_id2:{type:String},
  cc_id3:{type:String},
  cc_id4:{type:String},
  cc_id5:{type:String},
  vd_loaddate:{type:Date},
  vd_pubdate:{type:Date},
  cc_id_load:{type:String},
  vd_inf_status:{type:String},
  vd_inf_desc:{type:String},
  vd_inf_slat:{type:String},
  vd_inf_slon:{type:String},
  vd_inf_selev:{type:String},
  vd_inf_type:{type:String},
  vd_inf_country:{type:String},
  vd_inf_subreg:{type:String},

});
const volcano2Schema = new Schema({
  name:{type:String,required:true},
  id:{type:Number},
  imgURL:{type:String}
},{
  timestamps:true
})
const Volcano = mongoose.model('Volcano', volcanoSchema);
const Volcano2 = mongoose.model('Volcano2', volcano2Schema)
module.exports =  {Volcano,Volcano2};
