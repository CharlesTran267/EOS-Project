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
    console.log(filteredWordList)
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
let test = ["Kick 'em Jenny"]

getVolcCode(test[0])

console.log(volcCodeList)
