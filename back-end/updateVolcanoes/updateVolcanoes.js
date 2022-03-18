const  {MongoClient} = require("mongodb")
const uri = "mongodb+srv://Charlestran267:dung2678@cluster0.qhfcr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const client = new MongoClient(uri)

var xlsx = require("xlsx")

var wb = xlsx.readFile("GVP_Volcano_List_24Feb2021 (1).xlsx")

var volc_info = wb.Sheets["Volcano List"]

var volc_info_json = xlsx.utils.sheet_to_json(volc_info)
async function run(){
    await client.connect()
    const database = client.db("myFirstDatabase")
    const volcanoes = database.collection("volcanos")

    volc_info_json.map(async(volc)=>{
        const filter = {volc_name : volc.__EMPTY}
        const update = {
            $set:{
                tectonic_settings: volc.__EMPTY_8,
                mj_rock1: volc.__EMPTY_10,
                mj_rock2: volc.__EMPTY_11,
                mj_rock3: volc.__EMPTY_12,
                mj_rock4: volc.__EMPTY_13,
                mj_rock5: volc.__EMPTY_14,
                mn_rock1: volc.__EMPTY_15,
                mn_rock2: volc.__EMPTY_16,
                mn_rock3: volc.__EMPTY_17,
                mn_rock4: volc.__EMPTY_18,
                mn_rock5: volc.__EMPTY_19
            }
        }
        const result = await volcanoes.updateOne(filter,update)
        console.log(
            `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
            );
    })

}
run().catch(console.dir);