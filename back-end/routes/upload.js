const express = require('express');
const router = express.Router();
const path = require('path')
const fs = require('fs');
const multer = require('multer');

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

router.post("/uploadImage", upload.array('files'), (req, res) => {
    imagePaths=[]
    fileNames=[]
    for(var i=0; i<req.files.length;i++){
        imagePaths.push(req.files[i].path)
        fileNames.push(req.files[i].fileName)
    }
    res.json({success:true, image:imagePaths, fileName: fileNames })
});

module.exports = router;