var program = require("commander");
var fs = require("fs")
var path = require("path")
var axios =  require("axios")
program.version('0.0.1')
program
  .command('post [folderpath] [volc_id] [volc_name]')
  .description('this is the command to post data from the folder')
  .action(function(folderpath,volc_id,volc_name){
      fs.readdir(folderpath,(err,files)=>{
        if(err){
          console.log(err)
        }
        else {
          files.forEach(function(file,index){
            var filepath = path.join(folderpath,file)
            var info = getInfo(file,volc_id,volc_name,filepath);
            axios.post("http://localhost:5001/volcanoes/particles/add",info)
            .catch(err => console.log(err))
          })
        }
      })
    
  })
program.parse(process.argv)
function getInfo(filename,id,name,filepath){
  var arr = filename.split("_")
  var info = {
    id: arr[2],
    index: arr[3],
    instrument: "b",
    imgURL: filepath,
    particleType: "",
    glassyType: "",
    crystallinity:"",
    alteration: "",
    shape: "",
    volc_id: id,
    volc_name:name,
    afe_id:"1",
    gen_id:"1",
    microscope:"",
    software: "",
    device: "",
    magnification: "",
    ligh_intensity:"",
    epis_dias_light: "",
    scale_ref: ""
  }
  switch(arr[0]){
    case "holohyaline": 
      info.crystallinity = "Low Transparent";
      break;
    case "obsidian":
      info.crystallinity = "Low Black";
      break;
    case "dotted":
      info.crystallinity = "Mid";
      break;
    case "dome":
      info.crystallinity = "High";
      break;
  }
  if(arr[4][0] == "N"){
    info.glassyType = "Non-juvenile"
  }
  else info.glassyType = "Juvenile"
  const l = arr[4].length;
  switch(arr[4][l-1]){
    case "n": 
      info.alteration = "None";
      break;
    case "l":
      info.alteration = "Slight";
      break;
    case "m":
      info.alteration = "Moderate";
      break;
    case "b":
      info.shape = "Blocky";
      break;
    case "f":
      info.shape = "Fluidal";
      break;
    case "v":
      info.shape = "Highly vesicular";
      break;
    case "t":
      info.shape = "Microtubular"
      break;
    case "s":
      info.shape = "Spongy"

  }
  return info;
}