const mongoose = require('mongoose');
const uri = "mongodb+srv://Charlestran267:dung2678@cluster0.qhfcr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);

mongoose.connection
    .once("open",()=> console.log("Connected"))
    .on("error", error => {
        console.log("eror: ", error)
    })
let{Volcano} = require("../../models/volcano")
removeList = {
  "cc_id":"",
  "cc_id2":"",
  "cc_id3":"",
  "cc_id4":"",
  "cc_id5":"",
  "vd_inf_id":"",
  "cc_id_load":"",
  "volc_etime":"",
  "volc_etime_unc":"",
  "volc_stime":"",
  "volc_stime_unc":"",
  "volc_loaddate":"",
  "volc_pubdate":"",

}
async function updateVolcTable(){
  await Volcano.updateMany({}, { $unset: removeList },{multi:true, strict:false}, function(err, docs) {
    if(err) { throw err; }
    console.log(docs)
  });
}
updateVolcTable().then(res=> console.log("finished")).catch(err=>console.log(err))