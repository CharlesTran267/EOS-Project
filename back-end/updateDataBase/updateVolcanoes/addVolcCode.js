const mongoose = require('mongoose');
const fs = require("fs")
const uri = "mongodb+srv://Charlestran267:dung2678@cluster0.qhfcr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);

mongoose.connection
    .once("open",()=> console.log("Connected"))
    .on("error", error => {
        console.log("eror: ", error)
    })

const volcCodeList = require("./output.json")
function inverse(obj){
    var retobj = {};
    for(var key in obj){
      retobj[obj[key]] = key;
    }
    return retobj;
}
const invertedList = inverse(volcCodeList)
console.log(Object.keys(invertedList).length)
let {Volcano} = require("../../models/volcano")
Object.keys(invertedList).map(async(volc_name)=>{
    await Volcano.updateOne({volc_name: volc_name},{volc_code: invertedList[volc_name]}, function(err,docs){
        if(err){console.log(err)}
    })
})