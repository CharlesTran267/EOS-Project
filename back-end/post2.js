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
        afe_id: breakDown[0]
    }
    const sample = {
        volc_num: volc_num,
        afe_id: breakDown[0],
        sample_id: breakDown[1]
    }
    const particle = {
        volc_num: volc_num,
        afe_id: breakDown[0],
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
        case "pg": particle.particleType = "plagioclase";break;
        case "px": particle.particleType = "pyroxene";break;
        case "amf": particle.particleType = "amfibole";break;
        case "su": particle.particleType = "sulfide";break;
        case "ol": particle.particleType = "olivine";break;
        default: 
            particle.particleType = "other";
            if(label[0]=='J'){
                particle.glassyType = "Juvenile"
                switch(label.slice(1,5)){
                    case "lctr": particle.crystallinity = "low transparent"; break;
                    case "lcbl": particle.crystallinity = "low black"; break;
                    case "mctr" : particle.crystallinity = "mid"; break;
                    case "mcbl": particle.crystallinity = "mid"; break;
                    case "hctr": particle.crystallinity = "high"; break;
                    case "hcbl": particle.crystallinity = "high";break;
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
                particle.glassyType = "Non-juvenile";
                switch(label.slice(4)){
                    case "n": particle.alteration = "none"; break;
                    case "l": particle.alteration = "slight";break;
                    case "m": particle.alteration = "moderate"; break;
                    case "h": particle.alteration = "high"; break;
                    default : particle.alteration = ""
                }
            }
            else{
                particle.glassyType = "Non-juvenile";
                switch(label.slice(2,6)){
                    case "lctr": particle.crystallinity = "low transparent"; break;
                    case "lcbl": particle.crystallinity = "low black"; break;
                    case "mctr" : particle.crystallinity = "mid"; break;
                    case "mcbl": particle.crystallinity = "mid"; break;
                    case "hctr": particle.crystallinity = "high"; break;
                    case "hcbl": particle.crystallinity = "high";break;
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