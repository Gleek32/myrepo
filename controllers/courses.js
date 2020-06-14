const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Review = require('../models/Review');
const Bootcamp = require('../models/Bootcamp');

// @description Gets reviews
// Get /api/v1/reviews
// route Get /api/v1/bootcamps/:bootcamId/reviews
// @access Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) { 
    const reviews = await Review.find({ bootcamp: req.params.bootcampId });

  return res.status(200).json({
    success: true,
    count: reviews.length,
    data: reviews
  });
  } else {
    res.status(200).json(res.advancedResults);
    
    /*query = Course.find().populate(/*'bootcamp'{
      //this is to choose only specific items to desplay from bootcamp
      path: 'bootcamp',
      select: 'name description'*/
    }
  });



// @description Gets a single course
// Get /api/v1/courses/:id
// @access Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description'
  });

  if(!course) {
    return next(new ErrorResponse(`No course with the id of ${req.params.id} `), 404);
  }


  res.status(200).json({
    success: true,
    data: course
  });
});

// @description Add course
// Post /api/v1/courses/:id
// @access Private
exports.addCourse = asyncHandler(async (req, res, next) => {
req.body.bootcamp = req.params.bootcampId;
req.body.user = req.user.id;
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if(!bootcamp) {
    return next(new ErrorResponse(`No bootcamp with the id of ${req.params.bootcampId} `), 404);
  }

  // Make sure user is bootcamp owner
if(bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
  return next(
    new ErrorResponse(`User ${req.user.id} is not authorized to add a course to bootcamp ${bootcamp._id}`, 401)
  );
}

   const course = await Course.create(req.body);

  res.status(200).json({
    success: true,
    data: course
  });
});

// @description Update a course
// Put /api/v1/courses/:id
// @access Private
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);


    if(!course) {
      return next(new ErrorResponse(`No course with the id of ${req.params.Id} `), 404);
    }

    // Make sure user is course owner
if(course.user.toString() !== req.user.id && req.user.role !== 'admin') {
  return next(
    new ErrorResponse(`User ${req.user.id} is not authorized to update bootcamp ${course._id}`, 401)
  );
}

     course = await Course.findByIdAndUpdate(req.params.id, req.body, {
       new: true,
       runValidators: true
     });

    res.status(200).json({
      success: true,
      data: course
    });
  });

  // @description Delete a course
// Delete /api/v1/courses/:id
// @access Private
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);


    if(!course) {
      return next(new ErrorResponse(`No course with the id of ${req.params.Id} `), 404);
    }

    // Make sure user is course owner
if(course.user.toString() !== req.user.id && req.user.role !== 'admin') {
  return next(
    new ErrorResponse(`User ${req.user.id} is not authorized to delete bootcamp ${course._id}`, 401)
  );
}

    await course.remove();

    res.status(200).json({
      success: true,
      data: {}
    });
  });
