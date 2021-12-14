const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eruptionSchema = new Schema ({
    vd_num:{type:Number,required:true},
    ed_code:{type:String},
    ed_num:{type:Number},
    ed_name:{type:String},
    ed_nar:{type:String},
    ed_stime:{type:Date, required: true},
    ed_stime_bc:{type:String},
    ed_stime_unc:{type:String},
    ed_etime:{type:Date, required: true},
    ed_etime_bc:{type:String},
    ed_etime_unc:{type:String},
    ed_climax:{type:Date},
    ed_climax_bc:{type:String},
    ed_climax_unc:{type:Date},
    ed_vei:{type:String},
    ed_rtype:{type:String},
    ed_magamoving:{type:String},
    ed_com_1:{type:String},
    ed_com_2:{type:String},
    cc_id:{type:String},
    cc_id2:{type:String},
    cc_id3:{type:String},
    ed_loaddate:{type:Date},
    ed_pubdate:{type:Date}
})

const Eruption = mongoose.model("Eruption", eruptionSchema)

module.exports = {Eruption}