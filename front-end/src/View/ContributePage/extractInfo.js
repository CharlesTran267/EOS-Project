export default function extractInfo(file,volc_num,filepath){
    const breakDown = file.split('_')
    if(breakDown.length!=8) {return undefined}
    if(breakDown[6].length!=8) {return undefined}
    if(breakDown[4][1]== undefined) {return undefined}
    const afe = {
        volc_num: volc_num,
        afe_id: breakDown[0]
    }
    const sample = {
        volc_num: volc_num,
        afe_id: breakDown[0],
        sample_id: parseInt(breakDown[1],10)
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
        case "pg": particle.basic_component = "free crystal"; particle.crystal_type = "plagioclase";break;
        case "px": particle.basic_component = "free crystal";particle.crystal_type = "pyroxene";break;
        case "amf": particle.basic_component = "free crystal";particle.crystal_type = "amfibole";break;
        case "su": particle.basic_component = "free crystal";particle.crystal_type = "sulfide";break;
        case "ol": particle.basic_component = "free crystal";particle.crystal_type = "olivine";break;
        default: 
            if(label[0]=='J' || label[0] == "R" || label[0] == "H"){
                particle.basic_component = "juvenile"
                switch(label[0]){
                    case "J": particle.juvenile_type = "juvenile"; break;
                    case "R": particle.juvenile_type = "recycled juvenile"; break;
                    case "H": particle.juvenile_type = "hydrothermally altered juvenile"; break;
                }
                switch(label.slice(1,5)){
                    case "lctr": particle.crystallinity_and_color = "low crystallinity transparent"; break;
                    case "lcbl": particle.crystallinity_and_color = "low crystallinity black"; break;
                    case "mctr" : particle.crystallinity_and_color = "mid crystallinity transparent"; break;
                    case "mcbl": particle.crystallinity_and_color = "mid crystallinity black"; break;
                    case "hctr": particle.crystallinity_and_color = "high crystallinity transparent"; break;
                    case "hcbl": particle.crystallinity_and_color = "high crystallinity black";break;
                    default: particle.crystallinity_and_color = ""
                }
                switch(label.slice(5)){
                    case "b": particle.shape = "blocky";break;
                    case "f": particle.shape = "fluidal";break;
                    case "s": particle.shape = "spongy";break;
                    case "hv": particle.shape = "highly vesicular";break;
                    case "mt": particle.shape = "microtubular";break;
                    case "p": particle.shape = "pumice";break;
                    default: particle.shape = "";break;
                }
            }else if(label.slice(0,3)=="NJhy"){
                particle.basic_component = "altered material"
                if(label=="NJliagg") {
                    particle.shape = "aggregates"
                }else{
                    switch(label.slice(4)){
                        case "n": particle.alteration_degree = "none"; particle.altered_material_type = "weathered material"; break;
                        case "l": particle.alteration_degree = "slight"; particle.altered_material_type = "hydrothermally altered material";break;
                        case "m": particle.alteration_degree = "moderate"; particle.altered_material_type = "hydrothermally altered material"; break;
                        case "h": particle.alteration_degree = "high"; particle.altered_material_type = "hydrothermally altered material"; break;
                        default : particle.alteration_degree = ""
                    }
                }
            }
            else{
                particle.basic_component = "lithic"
                particle.glassyType = "non-juvenile";
                switch(label.slice(2,6)){
                    case "lctr": particle.crystallinity_and_color = "low transparent"; break;
                    case "lcbl": particle.crystallinity_and_color = "low black"; break;
                    case "mctr" : particle.crystallinity_and_color = "mid"; break;
                    case "mcbl": particle.crystallinity_and_color = "mid"; break;
                    case "hctr": particle.crystallinity_and_color = "high"; break;
                    case "hcbl": particle.crystallinity_and_color = "high";break;
                    default: particle.crystallinity_and_color = ""
                }
                switch(label.slice(-1)){
                    case "n": particle.alteration_degree = "none"; break;
                    case "l": particle.alteration_degree = "slight";break;
                    case "m": particle.alteration_degree = "moderate"; break;
                    case "h": particle.alteration_degree = "high"; break;
                    default : particle.alteration_degree = ""
                }
            }
            
    }
    Object.keys(particle).map(key=>{
        if(particle[key] == undefined) return undefined
    })
    const info = {
        afe: afe,
        sample: sample,
        particle: particle
    }
     return info;

}