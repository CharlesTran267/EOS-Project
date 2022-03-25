const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eruptionSchema = new Schema ({
    volc_num:{type:Number,required:true},
    volc_name:{type:String},
    ed_num:{type: Number},
    in_GVP:{type:Boolean},
    ed_code:{type:String},   
    ed_category:{type:String},
    ed_area: {type: String},
    ed_VEI: {type: Number},
    ed_VEI_mod: {type: String},
    ed_startyear_mod: {type: String},
    ed_yearsBP:{type:Number},
    ed_yearsBP_unc:{type:Number},
    ed_stime: {type:Date},
    ed_startyear_unc:{type:Number},
    ed_startday_mod:{type:String},
    ed_startday_unc:{type:Number},
    ed_evidence:{type:String},
    ed_endyear_mod:{type:String},
    ed_etime:{type:Date},
    ed_endyear_unc:{type:Number},
    ed_endday_mod:{type:String},
    ed_endday_unc:{type:Number},
    ed_latitude:{type:Number},
    ed_longitude:{type:Number},
    ed_rtype:{type:String}
},{
    timestamps:true
})

const Eruption = mongoose.model("Eruption", eruptionSchema)

module.exports = {Eruption}