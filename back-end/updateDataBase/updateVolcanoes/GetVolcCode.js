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
let volcCodeList = {}
function getVolcCode(volc_name){
    let volcCode = ""
    if (volc_name.includes("Unnamed")){
        volcCode = "UN"+volc_name.slice(7)
        volcCodeList[volcCode] = volc_name
        return
    }
    const specialChars = /[\s-,'_[]+/
    wordList = volc_name.split(specialChars)
    var filteredWordList = wordList.filter( word => word[0] && word[0] == word[0].toUpperCase())
    let change
    if(filteredWordList.length == 1){
        volcCode = volc_name.slice(0,2).toUpperCase()
        let i=2
        change = volc_name[i].toUpperCase()
        while((!(/[a-zA-Z]/).test(change) || volcCodeList[volcCode+change]) && i<volc_name.length-1){
            change = volc_name[++i].toUpperCase()
        }
        volcCode = volcCode+change
    }else if(filteredWordList.length == 2){
        let listChange = ""
        filteredWordList.map(word=>{
            listChange += word.slice(1)
        })
        let i=0
        change = listChange[i].toUpperCase()
        volcCode = filteredWordList[0][0] + change + filteredWordList[1][0]
        while((!(/[a-zA-Z]/).test(change) || volcCodeList[volcCode]) && i<listChange.length-1){
            change = listChange[++i].toUpperCase()
            volcCode = filteredWordList[0][0] + change + filteredWordList[1][0]
        }
    }else{
        change = filteredWordList[2][0]
        volcCode = filteredWordList[0][0]+filteredWordList[1][0]+change
        let listChange=""
        filteredWordList.map(word=>{
            listChange += word.slice(1)
        })
        let i=0
        while((!(/[a-zA-Z]/).test(change) || volcCodeList[volcCode]) && i<listChange.length-1){
            change = listChange[i++].toUpperCase()
            volcCode = filteredWordList[0][0]+filteredWordList[1][0]+change
        }
    }
    let i=1
    while(volcCodeList[volcCode]){
        if(i==1){
            volcCode+= i.toString()
        }else{
            volcCode = volcCode.slice(0,-1) + i.toString()
        }
        i++
    }
    volcCodeList[volcCode] = volc_name
}

let {Volcano} = require("../../models/volcano")
async function getvolc(){
    await Volcano.find({}, function(err,docs){
        if(err){console.log(err)}
        else{
            docs.map(doc=>{
                getVolcCode(doc.volc_name)
            })
        }
    })
}
getvolc()
    .then(res => { 
        // stringify JSON Object
        console.log(Object.keys(volcCodeList).length)
        var jsonContent = JSON.stringify(volcCodeList);
        
        fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
        
            console.log("JSON file has been saved.");
        });
    })
    .catch(err => console.log(err))
