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


var wb = xlsx.readFile("Full database vogripa.xls")

var e_info = wb.Sheets["VOGRIPA_Version2a"]

var e_info_json = xlsx.utils.sheet_to_json(e_info)
let edCodeList= {}
let{Volcano} = require("../../models/volcano")
let{Eruption} = require("../../models/eruption")
function updateEruption(){
    e_info_json.map(async(e)=>{
        await Volcano.find({"volc_num": e["Vnum"]},async function(err,volc){
            if(err){console.log(err)}
            else{
                if(volc[0]){
                    let i=0
                    let ed_code = volc[0].volc_code + i.toString()
                    while(edCodeList[ed_code]){
                        i++
                        ed_code = volc[0].volc_code + i.toString()
                    }
                    edCodeList[ed_code]= true
                let eruption = {
                    volc_num: e["Vnum"],
                    volc_name: e["Volcano Name"],
                    in_GVP: false,
                    ed_code: ed_code,
                    ed_category: e["Derivation"]?e["Derivation"]:null,
                    ed_VEI: e['Maximum VEI']?e['Maximum VEI']:null,
                    ed_startday_unc: e["Date Start Error"]?e["Date Start Error"]:null,
                    ed_yearsBP: e["Year BP"]?e["Year BP"]:null,
                    ed_yearsBP_unc: e["Year BP Error"]?e["Year BP Error"]:null,
                }
                let stime =[]
                let ed_stime
                if(e["Eruption Start Year"]){
                    stime.push(e["Eruption Start Year"])
                    if(e["Eruption Start Month"]){
                        stime.push(e["Eruption Start Month"])
                        if(e["Eruption Start Day"]){
                            stime.push(e["Eruption Start Day"])
                        }else{
                            stime.push("1")
                        }
                    }else{
                        stime.push("1")
                    }
                }
                if(stime.length!=0){
                    ed_stime = new Date(stime)
                    eruption.ed_stime = ed_stime
                }
                const newEruption = new Eruption(eruption)
                await newEruption.save()
                    .then(() => console.log('Eruption added!'))
                    .catch(err => console.log('Error: ' + stime));
                }  
            }
        })
    })
}
updateEruption()
console.log("done!")
