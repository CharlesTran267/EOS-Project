const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const afeSchema = new Schema({
    volc_num: {type: Number,required:true},
    afe_id:{type:String, required:true},
    yearsBP:{type:Number},
    ed_stime: {type: Date},
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

const AFE = mongoose.model('AFE', afeSchema);

module.exports={AFE}
