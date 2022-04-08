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

let volcCodeList= {}
let sortedEList =[]
let{Volcano} = require("../../models/volcano")
let{Eruption} = require("../../models/eruption")

async function update(){
    await Volcano.find({},(err,volcs)=>{
        if(err){
            console.log(err)
        }
        volcs.map(volc => {
            volcCodeList[volc.volc_num] = volc.volc_code
        })
    })
    await Eruption.aggregate([
        {
            $project:{
                volc_num:1,
                ed_stime:1
            }
        },    
        {
            $sort:{
                volc_num:1,
                ed_stime:1
            }
        }
    ]).then(eds=> {
        sortedEList = eds
    }).catch(err=>console.log(err))
    sortedEList[0].ed_code = volcCodeList[sortedEList[0].volc_num]+"_0"
    let i=1
    let k = 0
    while(i<sortedEList.length){
        if(sortedEList[i].volc_num == sortedEList[i-1].volc_num){
            k++
        }else{
            k=0
        }
        sortedEList[i].ed_code = volcCodeList[sortedEList[i].volc_num]+"_"+k.toString()
        i++
    }
    sortedEList.map(async(e)=>{
        await Eruption.updateOne({
            _id: e["_id"],
        },{ed_code:e["ed_code"]},function (err,docs){
            if(err){
                console.log(err)
            }else{console.log("updated")}
        })
    })
    


}
update()