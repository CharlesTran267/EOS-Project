const mongoose = require('mongoose');
const axios = require("axios")
var xlsx = require("xlsx")
const uri = "mongodb+srv://Charlestran267:dung2678@cluster0.qhfcr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);

mongoose.connection
    .once("open",()=> console.log("Connected"))
    .on("error", error => {
        console.log("eror: ", error)
    })

let {Eruption} = require("../models/eruption")
async function test(date,volc_num){
    await Eruption.aggregate([
        {
            $match:{volc_num: volc_num}
        },
        {
            $project : {
                volc_num:1,
                ed_num:1,
                ed_code:1,
                ed_stime : 1,
                ed_etime:1,
                difference : {
                    $abs : {
                        $subtract : ["$ed_stime",date]
                    }
                }
            }
        },
        {
            $sort : {difference : 1}
        }
        ]).then(eruptions=>{
            eruptions = eruptions.filter(e=>e.difference!= null)
            if(eruptions.length>3){
            eruptions = eruptions.slice(0,3)
            }
            console.log(eruptions)
        })
        .catch(err=> console.log(err))
}
let date = new Date("2014-02-28")
test(date,273083)