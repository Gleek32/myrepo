const Bootcamp = require('../models/Bootcamp');

// @description Gets all bootcamps
// Get /api/v1/bootcamps
// @access Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all bootcamps'});
  
};

// @description Gets single bootcamp
// Get /api/v1/bootcamps/:id
// @access   Public
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Show bootcamp ${req.params.id}` });
  
};

// @description Create new bootcamp
// POST /api/v1/bootcamps
// @access Private
exports.createBootcamp =  (req, res, next) => {
  console.log(req.body);
  res.status(200).json({ success: true, msg: 'Create New bootcamp'});
  };
/*{
  try {
  const bootcamp = await Bootcamp.create(req.body);

res.status(201).json({
  sucess: true,
  data: bootcamp
});
  } catch (err) {
    res.status(400).json({success: false});
  }*/
  
  


// @description Update bootcamp
// PUT /api/v1/bootcamps
// @access Private
exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Update bootcamps ${req.params.id}` });
};

// @description Delete bootcamp
// Delete /api/v1/bootcamps
// @access Private
exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Delete bootcamps ${req.params.id}` });
};

