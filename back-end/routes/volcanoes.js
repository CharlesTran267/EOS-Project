const router = require('express').Router();
let {Volcano, Eruption, General, Particle, AFE, Sample,Image} = require('../models/volcano.model');
// Volcano routes
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
router.get("/volcanoes_by_id", (req, res) => {
  let type = req.query.type
  let volcanoIds = req.query.id

  console.log("req.query.id", req.query.id)

  if (type === "array") {
      let ids = req.query.id.split(',');
      volcanoIds = [];
      volcanoIds = ids.map(item => {
          return item
      })
  }

  console.log("volcanoeIDs", volcanoIds)

  Volcano.find({ 'id': { $in: volcanoIds } })
      .exec((err, volcanoes) => {
          if (err) return res.status(400).send(err)
          return res.status(200).send(volcanoes)
      })
});
// Eruption routes
router.route('/getEruptions').get((req, res) => {
  Eruption.find()
    .exec((err, eruptions) => {
      if(err) return res.status(400).json({success:false , err})
      res.status(200).json({success:true, eruptions})
    })
});

router.route('/eruptions/add').post((req, res) => {
  if(req.body.start<=req.body.end){
    const newEruption = new Eruption(req.body);
    newEruption.save()
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
  Eruption.find({volc_name:volc,start:{$lte: date},end:{$gte:date}})
    .exec((err, eruption) => {
      if (err) return res.status(400).send(err)
      return res.status(200).send(eruption)
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
    const newAFE = new AFE(req.body);
  
    newAFE.save()
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
// sample routes
router.route('/getSample').get((req, res) => {
  Sample.find()
    .exec((err, samples) => {
      if(err) return res.status(400).json({success:false , err})
      res.status(200).json({success:true, samples})
    })
});

router.route('/samples/add').post((req, res) => {
    const newSample = new Sample(req.body);
  
    newSample.save()
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
// General routes
router.route('/getGenerals').get((req, res) => {
  General.find()
    .exec((err, generals) => {
      if(err) return res.status(400).json({success:false , err})
      res.status(200).json({success:true, generals})
    })
});

router.route('/generals/add').post((req, res) => {
    const newGeneral = new General(req.body);
  
    newGeneral.save()
    .then(() => res.json('General added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  });
router.route('/generals/:id').delete((req, res) => {
  General.findByIdAndDelete(req.params.id)
    .then(() => res.json('General deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.get("/generals_by_id", (req, res) => {
  let type = req.query.type
  let generalIds = req.query.id

  console.log("req.query.id", req.query.id)

  if (type === "array") {
      let ids = req.query.id.split(',');
      generalIds = [];
      generalIds = ids.map(item => {
          return item
      })
  }

  console.log("generalIDs", generalIds)

  General.find({ 'id': { $in: generalIds } })
      .exec((err, generals) => {
          if (err) return res.status(400).send(err)
          return res.status(200).send(generals)
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
// Image route

router.route('/getImage').get((req,res)=>{
    Image.find()
        .exec((err,images)=>{
            if(err) return res.status(400).json({success:false,err})
            res.status(200).json({sucess:true, images})
        })
})

router.route('/images/add').post((req, res) => {
  const newImage = new Image(req.body);
  newImage.save()
  .then(() => res.json('Image added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;