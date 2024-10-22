import { Review } from "./review.model.js";

const postReview = async (data, userId) => {
    // Add the userId to the data object
    const reviewData = { ...data, userId };
  
    // Create a new review using the Review model
    const review = await Review.create(reviewData);
  
    return review;
  };

  const getReviewByServiceId = async (serviceId) => {
    try {
      
      const reviews = await Review.find({ serviceId })
        .populate('userId')  
        .sort({ createdAt: -1 }); 
      
      return reviews;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error; 
    }
  };

  
  
  
  
  
  
  
  
  


export const ReviewService = {
    postReview,
    getReviewByServiceId
}