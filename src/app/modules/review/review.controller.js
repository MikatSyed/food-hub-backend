import catchAsync from "../../../shared/catchAsync.js"
import { ReviewService } from "./review.service.js"
import sendResponse from '../../../shared/sendResponse.js'
import httpStatus from "http-status"


const postReview = catchAsync(async (req, res, next) => {
    try {
      console.log(req.body,'11')
      const { ...reviewData } = req.body
      const id = req.user.userId
  
      const result = await ReviewService.postReview(reviewData,id)
  
      sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Review posted successfully!',
        data: result,
      })
    } catch (err) {
      next(err)
    }
  })

  const getReviewByServiceId = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await ReviewService.getReviewByServiceId(id);
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Review retrived successfully',
      data: result,
    });
  });
  
  export const ReviewController = {
    postReview,
    getReviewByServiceId
  }