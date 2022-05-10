var program = require("commander");
var fs = require("fs")
var path = require("path")
var axios =  require("axios")
program.version('0.0.1')
program
  .command('post [folderpath] [volc_num]')
  .description('this is the command to post data from the folder')
  .action(function(folderpath,volc_num){
      fs.readdir(folderpath,(err,files)=>{
        if(err){
          console.log(err)
        }
        else {
          files.forEach(function(file,index){
            var filepath = path.join(folderpath,file)
            var info = getInfo(file,volc_num,filepath);
            axios.post("http://localhost:5001/volcanoes/particles/add",info.particle)
            .catch(err => console.log(err))
            axios.post("http://localhost:5001/volcanoes/afes/add",info.afe)
            .catch(err => console.log(err))
            axios.post("http://localhost:5001/volcanoes/samples/add",info.sample)
            .catch(err => console.log(err))
          })
        }
      })
    
  })
program.parse(process.argv)
function getInfo(file,volc_num,filepath){
    const breakDown = file.split('_')
    const afe = {
        volc_num: volc_num,
        afe_id: breakDown[0].slice(-1)
    }
    const sample = {
        volc_num: volc_num,
        afe_id: breakDown[0].slice(-1),
        sample_id: breakDown[1]
    }
    const particle = {
        volc_num: volc_num,
        afe_id: breakDown[0].slice(-1),
        sample_id: breakDown[1],
        id: breakDown[3],
        batch: breakDown[2],
        imgURL: filepath,
        gsLow: breakDown[6][3],
        gsUp: breakDown[6][7],
        magnification: breakDown[5][0]
    }
    if(breakDown[4][0]=='b'){
        particle.instrument = "binocular";
        particle.index = breakDown[4][1]
        particle.multi_focus = false
    }else {
        particle.multi_focus = true
    }
    const label = breakDown[7]
    switch(label){
        case "pg": particle.particleType = "free crystal"; particle.crystalType = "plagioclase";break;
        case "px": particle.particleType = "free crystal";particle.crystalType = "pyroxene";break;
        case "amf": particle.particleType = "free crystal";particle.crystalType = "amfibole";break;
        case "su": particle.particleType = "free crystal";particle.crystalType = "sulfide";break;
        case "ol": particle.particleType = "free crystal";particle.crystalType = "olivine";break;
        default: 
            if(label[0]=='J'){
                particle.particleType = "juvenile"
                particle.glassyType = "juvenile"
                switch(label.slice(1,5)){
                    case "lctr": particle.crystallinity = "low";particle.color="transparent" ;break;
                    case "lcbl": particle.crystallinity = "low";particle.color ="black"; break;
                    case "mctr" : particle.crystallinity = "mid";particle.color="transparent" ; break;
                    case "mcbl": particle.crystallinity = "mid"; particle.color ="black";break;
                    case "hctr": particle.crystallinity = "high"; particle.color="transparent" ;break;
                    case "hcbl": particle.crystallinity = "high";particle.color ="black";break;
                    default: particle.crystallinity = ""
                }
                switch(label.slice(6)){
                    case "b": particle.shape = "blocky";break;
                    case "f": particle.shape = "fluidal";break;
                    case "s": particle.shape = "spongy";break;
                    case "hv": particle.shape = "highly vesicular";break;
                    case "mt": particle.shape = "microtubular";break;
                    case "p": particle.shape = "pumice";break;
                    default: particle.shape = "";break;
                }
            }else if(label.slice(0,3)=="NJli"){
                particle.particleType = "altered material"
                particle.glassyType = "non-juvenile";
                if(label=="NJliagg") {
                    particle.shape = "aggregates"
                }else{
                    switch(label.slice(4)){
                        case "n": particle.alteration = "none"; break;
                        case "l": particle.alteration = "slight";break;
                        case "m": particle.alteration = "moderate"; break;
                        case "h": particle.alteration = "high"; break;
                        default : particle.alteration = ""
                    }
                }
            }
            else{
                particle.particleType = "lithics"
                particle.glassyType = "non-juvenile";
                switch(label.slice(2,6)){
                    case "lctr": particle.crystallinity = "low";particle.color="transparent" ;break;
                    case "lcbl": particle.crystallinity = "low";particle.color ="black"; break;
                    case "mctr" : particle.crystallinity = "mid";particle.color="transparent" ; break;
                    case "mcbl": particle.crystallinity = "mid"; particle.color ="black";break;
                    case "hctr": particle.crystallinity = "high"; particle.color="transparent" ;break;
                    case "hcbl": particle.crystallinity = "high";particle.color ="black";break;
                    default: particle.crystallinity = ""
                }
                switch(label.slice(-1)){
                    case "n": particle.alteration = "none"; break;
                    case "l": particle.alteration = "slight";break;
                    case "m": particle.alteration = "moderate"; break;
                    case "h": particle.alteration = "high"; break;
                    default : particle.alteration = ""
                }
            }
            
    }
    const info = {
        afe: afe,
        sample: sample,
        particle: particle
    }
     return info;

}
