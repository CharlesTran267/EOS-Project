
const mesurement = require('../imageMesurement.json')
const axios =  require('axios')

Object.keys(mesurement).map(par=>{
    const req={
        filter:{
            "imgURL":{"$regex":`${mesurement[par][""]}`}
        },
        update:{
            convexity: mesurement[par]["convexity"],
            rectangularity: mesurement[par]["rectangularity"],
            elongation: mesurement[par]["elongation"],
            roundness: mesurement[par]["roundness"],
            circularity: mesurement[par]["circularity"],
            eccentricity_moments: mesurement[par]["eccentricity_moments"],
            eccentricity_ellipse: mesurement[par]["eccentricity_ellipse"],
            solidity: mesurement[par]["solidity"],
            aspect_rat: mesurement[par]["aspect_rat"],
            compactness: mesurement[par]["compactness"],
            circ_rect: mesurement[par]["circ_rect"],
            comp_elon: mesurement[par]["comp_elon"],
            rect_comp: mesurement[par]["rect_comp"],
            contrast: mesurement[par]["contrast"],
            dissimilarity: mesurement[par]["dissimilarity"],
            homogeneity: mesurement[par]["homogeneity"],
            energy: mesurement[par]["energy"],
            correlation: mesurement[par]["correlation"],
            asm: mesurement[par]["asm"],
            blue_mean: mesurement[par]["blue_mean"],
            blue_std: mesurement[par]["blue_std"],
            blue_mode: mesurement[par]["blue_mode"],
            green_mean: mesurement[par]["green_mean"],
            green_std: mesurement[par]["green_std"],
            green_mode: mesurement[par]["green_mode"],
            red_mean: mesurement[par]["red_mean"],
            red_std: mesurement[par]["red_std"],
            red_mode: mesurement[par]["red_mode"],
        }
    }
    axios.post("http://localhost:5001/volcanoes/particles/update",req).catch(err=>console.log(err))
})
