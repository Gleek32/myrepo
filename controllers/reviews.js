const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Review = require('../models/Review');
const Bootcamp = require('../models/Bootcamp');

// @description Gets reviews
// Get /api/v1/reviews
// route Get /api/v1/bootcamps/:bootcamId/reviews
// @access Public
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) { 
    const reviews = await Review.find({ bootcamp: req.params.bootcampId });

  return res.status(200).json({
    success: true,
    count: reviews.length,
    data: reviews
  });
  } else {
    res.status(200).json(res.advancedResults);
  }

 });

 // @description Gets single review
// Get /api/v1/reviews/:id
// route Get /api/v1/reviews/:id
// @access Public
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description'
  });

  if(!review) {
    return next(
    new ErrorResponse(`No review found with the id of ${req.params.id}`, 404));
    
  }

  res.status(200).json({
    success: true,
    data: review
  });
  
 });

 // @description Add Review
// Post /api/v1/bootcamp/:bootcampId/reviews
// @access Private
exports.addReview = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if(!bootcamp) {
    return next(
      new ErrorResponse(
        `No bootcamp with the id of ${req.params.bootcampId}`, 404
      )
    );
  }

  const review = await Review.create(req.body);
  

  res.status(201).json({
    success: true,
    data: review
  });
  
 });

 // @description Update Review
// Put /api/v1/bootcamp/:bootcampId/reviews
// @access Private
exports.updateReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  if(!review) {
    return next(
      new ErrorResponse(
        `No review with the id of ${req.params.Id}`, 404
      )
    );
  }

  // Make sure review belomgs to user or user is admin
  if(review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `Not authorize to update review`, 401
      )
    );
  }
 
  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  

  res.status(200).json({
    success: true,
    data: review
  });
  
 });

 // @description Delet Review
// Delete /api/v1/bootcamp/:bootcampId/reviews
// @access Private
exports.deleteReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if(!review) {
    return next(
      new ErrorResponse(
        `No review with the id of ${req.params.Id}`, 404
      )
    );
  }

  // Make sure review belomgs to user or user is admin
  if(review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `Not authorize to delete review`, 401
      )
    );
  }
 
 await review.remove(); 
  

  res.status(200).json({
    success: true,
    data: {}
  });
  
 });