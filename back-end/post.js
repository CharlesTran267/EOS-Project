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
    volc_num: id,
    volc_name:name,
    afe_id : 1,
    sample_id:1,
    id: arr[2],
    index: arr[3],
    instrument: "b",
    imgURL: filepath,
  }
  switch(arr[0]){
    case "holohyaline": 
      info.crystallinity = "low transparent";
      break;
    case "obsidian":
      info.crystallinity = "low black";
      break;
    case "dotted":
      info.crystallinity = "mid";
      break;
    case "dome":
      info.crystallinity = "high";
      break;
  }
  if(arr[4][0] == "N"){
    info.glassyType = "Non-juvenile"
  }
  else info.glassyType = "Juvenile"
  const l = arr[4].length;
  switch(arr[4][l-1]){
    case "n": 
      info.alteration = "none";
      break;
    case "l":
      info.alteration = "slight";
      break;
    case "m":
      info.alteration = "moderate";
      break;
    case "b":
      info.shape = "blocky";
      break;
    case "f":
      info.shape = "fluidal";
      break;
    case "v":
      info.shape = "highly vesicular";
      break;
    case "t":
      info.shape = "microtubular"
      break;
    case "s":
      info.shape = "spongy"

  }
  return info;
}