const mongoose = require('mongoose');
const axios = require("axios")
const uri = "mongodb+srv://Charlestran267:dung2678@cluster0.qhfcr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);

mongoose.connection
    .once("open",()=> console.log("Connected"))
    .on("error", error => {
        console.log("eror: ", error)
    })

let {Volcano} = require('../models/volcano')

async function getVolcList(){
    await Volcano.find({},(err,volcs)=>{
        if(err){console.log(err)}
        else{
            volcs.map(volc=>{
                volc
            })
        }
    })
}
