const mongoose = require('mongoose');
const uri = "mongodb+srv://Charlestran267:dung2678@cluster0.qhfcr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);

mongoose.connection
    .once("open",()=> console.log("Connected"))
    .on("error", error => {
        console.log("eror: ", error)
    })

let{Particle}= require("../../models/particle")

async function deleteParticle(){
    await Particle.deleteMany({imgURL:/NJhy/i},function(err,docs){
        if(err){console.log(err)}
        else {console.log("Deleted")}
    })
}
deleteParticle().catch(err=>console.log(err))