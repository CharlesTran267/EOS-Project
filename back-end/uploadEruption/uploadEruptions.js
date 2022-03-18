const json_file = require("./eruption-json.json")
const axios = require("axios")
const data = json_file["Workbook"]["Worksheet"]["Table"]["Row"]

for(var i=2;i<data.length;i++){
    const rowData = data[i]["Cell"]
    const eruption={
        volc_num:rowData[0]["Data"],
        volc_name:rowData[1]["Data"],
        in_GVP: true,
        ed_num:rowData[2]["Data"],
        ed_category:rowData[3]?rowData[3]["Data"]:null,
        ed_area: rowData[4]?rowData[4]["Data"]:null,
        ed_VEI: rowData[5]?rowData[5]["Data"]:null,
        ed_VEI_mod: rowData[6]?rowData[6]["Data"]:null,
        ed_startyear_mod: rowData[7]?rowData[7]["Data"]:null,
        ed_startyear_unc:rowData[9]?rowData[9]["Data"]:null,
        ed_startday_mod:rowData[11]?rowData[11]["Data"]:null,
        ed_startday_unc:rowData[13]?rowData[13]["Data"]:null,
        ed_evidence:rowData[14]?rowData[14]["Data"]:null,
        ed_endyear_mod:rowData[15]?rowData[15]["Data"]:null,
        ed_endyear_unc:rowData[17]?rowData[17]["Data"]:null,
        ed_endday_mod:rowData[19]?rowData[19]["Data"]:null,
        ed_endday_unc:rowData[21]?rowData[21]["Data"]:null,
        ed_latitude:rowData[22]?rowData[22]["Data"]:null,
        ed_longitude:rowData[23]?rowData[23]["Data"]:null,
    }
    if(rowData[8] && rowData[10] && rowData[12] && rowData[10]["Data"] && rowData[8]["Data"] && rowData[12]["Data"]){
        const startTime = new Date(rowData[8]["Data"],rowData[10]["Data"],rowData[12]["Data"])
        eruption.ed_stime = startTime
    }
    if(rowData[16] && rowData[18] && rowData[20] && rowData[16]["Data"] && rowData[18]["Data"] && rowData[20]["Data"]){
        const endTime = new Date(rowData[16]["Data"],rowData[18]["Data"],rowData[20]["Data"])
        eruption.ed_etime = endTime
    }
    axios.post("http://localhost:5001/volcanoes/eruptions/add",eruption)
            .catch(err => console.log(err))
}