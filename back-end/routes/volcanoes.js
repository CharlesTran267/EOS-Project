const router = require('express').Router();
let {Volcano, Volcano2} = require('../models/volcano');
let {Eruption} = require('../models/eruption');
let {AFE} = require('../models/afe');
let {Sample} = require('../models/sample');
let {Particle} = require('../models/particle');

// Volcano routes
router.route('/renameVolcTable').post(async(req,res)=>{
  await Volcano.updateMany({}, { "$rename": req.body }, function(err, blocks) {
    if(err) { res.status(400).json("rename failed"); }
    else{
      res.json("rename successfully")
    }
});
})
router.route('/getVolcanoes').get((req, res) => {
  Volcano.find()
    .exec((err, volcanoes) => {
      if(err) return res.status(400).json({success:false , err})
      res.status(200).json({success:true, volcanoes})
    })
});

router.route('/add').post((req, res) => {
    const newVolcano = new Volcano(req.body);
  
    newVolcano.save()
    .then(() => res.json('Volcano added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  });
router.route('/:id').delete((req, res) => {
  Volcano.findByIdAndDelete(req.params.id)
    .then(() => res.json('Volcano deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.get("/volcano_by_number", (req, res) => {
  let volc_num = req.query.volc_num

  Volcano.find({ 'volc_num': volc_num })
      .exec((err, volcano) => {
          if (err) return res.status(400).send(err)
          return res.status(200).send(volcano)
      })
});
// Volcano2 routes
router.route('/getVolcanoes2').get((req, res) => {
  Volcano2.find()
    .exec((err, volcanoes) => {
      if(err) return res.status(400).json({success:false , err})
      res.status(200).json({success:true, volcanoes})
    })
});

router.route('/addVolcano2').post((req, res) => {
    const newVolcano2 = new Volcano2(req.body);
  
    newVolcano2.save()
    .then(() => res.json('Volcano added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  });
  router.route('/volcano2/update').post((req,res)=>{
    const filter = req.body.filter;
    const update  = req.body.update;
    const options = {new:true, useFindAndModify:false}
    Volcano2.findOneAndUpdate(filter,update,options)
    .then(() => res.json('Volcano2 updated!'))
    .catch(err => res.status(400).json('Error: ' + err));
  })
// Eruption routes
router.route('/getEruptions').get((req, res) => {
  Eruption.find()
    .exec((err, eruptions) => {
      if(err) return res.status(400).json({success:false , err})
      res.status(200).json({success:true, eruptions})
    })
});

router.route('/eruptions/add').post((req, res) => {
  if(!req.body.ed_starttime || !req.body.ed_endtime || req.body.ed_starttime<=req.body.ed_endtime){
    const newEruption = new Eruption(req.body);
    const query = {
      volc_num: newEruption.volc_num,
      ed_code: newEruption.ed_code
    }
    const options = {upsert:true, new:true, setDefaultsOnInsert: true}
    Eruption.findOneAndUpdate(query,newEruption,options)
    .then(() => res.json('Eruption added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  }
  else{
    res.json('end date must be more recently than start date')
  }
  });
router.route('/eruptions/:id').delete((req, res) => {
  Eruption.findByIdAndDelete(req.params.id)
    .then(() => res.json('Eruption deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.get("/eruptions_by_id", (req, res) => {
  let type = req.query.type
  let eruptionIds = req.query.id

  if (type === "array") {
      let ids = req.query.id.split(',');
      eruptionIds = [];
      eruptionIds = ids.map(item => {
          return item
      })
  }
  Eruption.find({ 'id': { $in: eruptionIds } })
      .exec((err, eruptions) => {
          if (err) return res.status(400).send(err)
          return res.status(200).send(eruptions)
      })
});
router.get("/eruption_by_date",(req,res)=>{
  let date = req.query.date;
  let volc = req.query.volc;
  Eruption.find({volc_num:volc,ed_stime:{$lte: date},ed_etime:{$gte:date}})
    .exec((err, eruption) => {
      if (err) return res.status(400).send(err)
      return res.status(200).send(eruption)
  })
})
router.get("/nearest_eruptions",async(req,res)=>{
  let date = new Date(req.query.afe_date)
  let volc_num = Number(req.query.volc)
  await Eruption.aggregate([
    {
        $match:{volc_num: volc_num}
    },
    {
        $project : {
            volc_num:1,
            ed_num:1,
            ed_code:1,
            ed_stime : 1,
            ed_etime:1,
            difference : {
                $abs : {
                    $subtract : ["$ed_stime",date]
                }
            }
        }
    },
    {
        $sort : {difference : 1}
    }
    ]).then(eruptions=>{
      eruptions = eruptions.filter(e=>e.difference!= null)
      if(eruptions.length>3){
        eruptions = eruptions.slice(0,3)
      }
      return res.status(200).send(eruptions)
    })
    .catch(err=> res.status(400).send(err))
})
router.get("/nearest_eruptions_yearsBP",async(req,res)=>{
  let yearsBP = Number(req.query.yearsBP)
  let volc_num = Number(req.query.volc)
  await Eruption.aggregate([
    {
        $match:{volc_num: volc_num}
    },
    {
        $project : {
            volc_num:1,
            ed_num:1,
            ed_code:1,
            ed_yearsBP:1,
            difference : {
                $abs : {
                    $subtract : ["$ed_yearsBP",yearsBP]
                }
            }
        }
    },
    {
        $sort : {difference : 1}
    }
    ]).then(eruptions=>{
      eruptions = eruptions.filter(e=>e.difference!= null)
      if(eruptions.length>3){
        eruptions = eruptions.slice(0,3)
      }
      return res.status(200).send(eruptions)
    })
    .catch(err=> res.status(400).send(err))
})
router.get("/post_eruption",async(req,res)=>{
  let date = new Date(req.query.afe_date)
  let volc_num = Number(req.query.volc)
  await Eruption.aggregate([
    {
        $match:{volc_num: volc_num}
    },
    {
        $project : {
            volc_num:1,
            ed_num:1,
            ed_code:1,
            ed_stime : 1,
            ed_etime:1,
            difference : {
              $subtract : [date,"$ed_stime"]
            }
        }
    },
    {
        $sort : {difference : 1}
    }
    ]).then(eruptions=>{
      eruptions = eruptions.filter(e=>e.difference!= null && e.difference>0)
      return res.status(200).send(eruptions[0])
    })
    .catch(err=> res.status(400).send(err))
})
router.get("/post_eruption_yearsBP",async(req,res)=>{
  let yearsBP = Number(req.query.yearsBP)
  let volc_num = Number(req.query.volc)
  await Eruption.aggregate([
    {
        $match:{volc_num: volc_num}
    },
    {
        $project : {
            volc_num:1,
            ed_num:1,
            ed_code:1,
            ed_yearsBP:1,
            difference : {
              $subtract : [yearsBP,"$ed_yearsBP"]
            }
        }
    },
    {
        $sort : {difference : 1}
    }
    ]).then(eruptions=>{
      eruptions = eruptions.filter(e=>e.difference!= null && e.difference<0)
      console.log(eruptions)
      return res.status(200).send(eruptions[0])
    })
    .catch(err=> res.status(400).send(err))
})
router.get("/next_eruption_code",async(req,res)=>{
  let volc_num = Number(req.query.volc)
  await Eruption.find({volc_num: volc_num},function(err,eruptions){
    if(err){
      res.status(400).send(err)
    }else{
      let next_ed_code = eruptions[0].ed_code.split("_").slice(0,-1).join("_")+ "_" + eruptions.length.toString()
      res.status(200).send(next_ed_code)
    }
  })
})
// afe routes
router.route('/getAFE').get((req, res) => {
  AFE.find()
    .exec((err, afes) => {
      if(err) return res.status(400).json({success:false , err})
      res.status(200).json({success:true, afes})
    })
});

router.route('/afes/add').post((req, res) => {
    const newAFE = req.body;
    const query = {
      volc_num: newAFE.volc_num,
      afe_code: newAFE.afe_code
    }
    const options = {upsert:true, new:true, setDefaultsOnInsert: true}
    AFE.findOneAndUpdate(query,newAFE,options)
    .then(() => res.json('AFE added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  });
router.route('/afes/:id').delete((req, res) => {
  AFE.findByIdAndDelete(req.params.id)
    .then(() => res.json('AFE deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.get("/afes_by_id", (req, res) => {
  let type = req.query.type
  let afeIds = req.query.id

  console.log("req.query.id", req.query.id)

  if (type === "array") {
      let ids = req.query.id.split(',');
      afeIds = [];
      afeIds = ids.map(item => {
          return item
      })
  }

  console.log("afeIds:", afeIds)

  AFE.find({ 'id': { $in: afeIds } })
      .exec((err, afes) => {
          if (err) return res.status(400).send(err)
          return res.status(200).send(afes)
      })
});
router.get("/next_afe_code",async(req,res)=>{
  let ed_code = req.query.ed
  await AFE.find({afe_code:{$regex: ed_code }},function(err,afes){
    if(err){
      res.status(400).send(err)
    }else{
      let next_afe_code
      if(afes.length==0){
        next_afe_code = ed_code +"_DB0"
      }else{
        next_afe_code = afes[0].afe_code.slice(0,-1)+afes.length.toString()
      }
      res.status(200).send(next_afe_code)
    }
  })
})
// sample routes
router.route('/getSample').get((req, res) => {
  Sample.find()
    .exec((err, samples) => {
      if(err) return res.status(400).json({success:false , err})
      res.status(200).json({success:true, samples})
    })
});

router.route('/samples/add').post((req, res) => {
  const newSample = req.body;
  const query = {
    volc_num: newSample.volc_num,
    afe_code: newSample.afe_code,
    sample_id: newSample.sample_id
  }
  const options = {upsert:true, new:true, setDefaultsOnInsert: true}
  Sample.findOneAndUpdate(query,newSample,options)
  .then(() => res.json('Sample added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/samples/:id').delete((req, res) => {
  Sample.findByIdAndDelete(req.params.id)
    .then(() => res.json('Sample deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.get("/samples_by_id", (req, res) => {
  let type = req.query.type
  let sampleIds = req.query.id

  console.log("req.query.id", req.query.id)

  if (type === "array") {
      let ids = req.query.id.split(',');
      sampleIds = [];
      sampleIds = ids.map(item => {
          return item
      })
  }

  console.log("sampleIds:", sampleIds)

  Sample.find({ 'id': { $in: sampleIds } })
      .exec((err, samples) => {
          if (err) return res.status(400).send(err)
          return res.status(200).send(samples)
      })
});
// Particle route
router.route('/getParticles').get((req, res) => {
  Particle.find()
    .exec((err, particles) => {
      if(err) return res.status(400).json({success:false , err})
      res.status(200).json({success:true, particles})
    })
});

router.route('/particles/add').post((req, res) => {
    const newParticle = new Particle(req.body);
    newParticle.save()
    .then(() => res.json('Particle added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  });
router.route('/particles/:id').delete((req, res) => {
  Particle.findByIdAndDelete(req.params.id)
    .then(() => res.json('Particle deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.get("/particles_by_id", (req, res) => {
  let type = req.query.type
  let particleIds = req.query.id

  console.log("req.query.id", req.query.id)

  if (type === "array") {
      let ids = req.query.id.split(',');
      particleIds = [];
      particleIds = ids.map(item => {
          return item
      })
  }

  console.log("particleIDs", particleIds)

  Particle.find({ 'id': { $in: particleIds } })
      .exec((err, particles) => {
          if (err) return res.status(400).send(err)
          return res.status(200).send(particles)
      })
});
router.route('/particles/update').post((req,res)=>{
  const filter = req.body.filter;
  const update  = req.body.update;
  const options = {new:true, useFindAndModify:false}
  Particle.findOneAndUpdate(filter,update,options)
  .then(() => res.status(200).json({success:true}))
  .catch(err => res.status(400).json('Error: ' + err));
})
    
module.exports = router;