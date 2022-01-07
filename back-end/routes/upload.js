const express = require('express');
const router = express.Router();
const path = require('path')
const multer = require('multer');
const fs = require('fs')
const { promisify } = require('util')
const axios = require('axios')

const unlinkAsync = promisify(fs.unlink)

const { auth } = require("../middleware/auth");
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' || ext !== '.png') {
            return cb(res.status(400).end('only jpg, png are allowed'), false);
        }
        cb(null, true)
    }
})
const maxSize = 10*1024*1024
const upload = multer({storage: storage})


router.post("/uploadImage", upload.array('files'), async(req, res) => {
    imagePaths=[]
    fileNames=[]
    for(var i=0; i<req.files.length;i++){
        imagePaths.push(req.files[i].path)
        fileNames.push(req.files[i].fileName)   
         
    }        
    res.json({success:true, image:imagePaths, fileName: fileNames })
});
router.get("/mesureTool",async(req,res)=>{
    await axios.get('http://localhost:5005/api')
    .catch(err=>console.log(err))  
    const mesurement = require('../uploads/sample.json')
    Object.keys(mesurement).map((par)=>{
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
        axios.post("http://localhost:5001/volcanoes/particles/update",req)
        .then(res=>console.log("updated"))
        .catch(err=>console.log("error"))
    })
})
module.exports = router;